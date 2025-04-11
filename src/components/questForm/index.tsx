import { useContext, useEffect, useState } from 'react';
import { QuestContext } from '../../contexts/QuestContext';
import { Quest } from '../../types/questData';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '../errorMessage';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import { ptBR } from 'date-fns/locale/pt-BR'
import api from '../../services/api';
import { parseCookies } from 'nookies';

const questSchema = z.object({
    title: z.string().min(1, { message: "Título é obrigatório" }).max(50, { message: "Título deve ter no máximo 50 caracteres" }),
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    timeline: z.enum(['DIARIO', 'SEMANAL', 'MENSAL', 'ANUAL']),
    difficulty: z.enum(['FACIL', 'MEDIO', 'DIFICIL', 'MUITO_DIFICIL']),
    validation: z.string().optional(),
    joys: z.number().min(0),
    highlight: z.boolean(),
    status: z.enum(['PENDENTE', 'COMPLETO', 'INCOMPLETO', 'NULO'])
});

type QuestFormData = z.infer<typeof questSchema>;

interface QuestFormProps {
    onClose?: () => void;
    initialData?: Quest | null;
    mode?: 'create' | 'edit';
}

export const QuestForm: React.FC<QuestFormProps> = ({
    onClose,
    initialData = null,
    mode = 'create'
}) => {
    const { addQuest, editQuest } = useContext(QuestContext);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch
    } = useForm<QuestFormData>({
        resolver: zodResolver(questSchema),
        mode: 'onBlur',
        defaultValues: mode === 'edit' && initialData ? {
            title: initialData.title ?? "",
            description: initialData.description ?? "",
            timeline: initialData.timeline ?? "DIARIO",
            difficulty: initialData.difficulty ?? "FACIL",
            validation: initialData.validation ?? "",
            joys: initialData.joys ?? 2,
            highlight: initialData.highlight ?? false,
            status: initialData.status ?? "PENDENTE"
        } : {
            title: '',
            description: '',
            timeline: 'DIARIO',
            difficulty: 'FACIL',
            validation: '',
            joys: 2,
            highlight: false,
            status: 'PENDENTE'
        }
    })


    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
        initialData?.validation
            ? new Date(initialData.validation)
            : null
    )

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    const [joysEstimated, setJoysEstimate] = useState<number>(2);
    const currentDifficulty = watch("difficulty")

    useEffect(() => {
        const fetchJoysEstimate = async (difficultyValue: string) => {
            const { 'joysystem.token': token } = parseCookies();
            try {
                const response = await api.get(`/reward?difficulty=${difficultyValue}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.data && response.data.joys) {
                    const newJoysEstimate = response.data.joys
                    setJoysEstimate(newJoysEstimate)

                } else {
                    console.error("responsta invalida da api", response.data)
                    setJoysEstimate(2)
                }
            } catch (error) {
                console.error('erro em buscar estimativa', error)
                setJoysEstimate(2)
            }
        }

        if (currentDifficulty) {
            fetchJoysEstimate(currentDifficulty)
        }
    }, [currentDifficulty])



    const onSubmit = async (data: QuestFormData) => {
        try {
            const questData: Omit<Quest, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
                ...data,
                validation: selectedDateTime
                    ? DateTime.fromJSDate(selectedDateTime)
                        .setZone('America/Sao_Paulo')
                        .toISO()
                    : new Date().toISOString().split('T')[0].replace(/-/g, '/')
            };

            if (mode === 'create') {
                await addQuest(questData as Quest);
            } else if (mode === 'edit' && initialData?.id) {
                await editQuest({
                    ...questData,
                    id: initialData.id,
                } as Quest);
            }

            reset();
            onClose?.();
        } catch (error) {
            console.error('Erro ao adicionar ou editar quest:', error);
            alert('Erro ao adicionar ou editar quest');
        }
    };


    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="headerForm">
                    <h2>{mode === 'create' ? 'Criar Nova Quest' : 'Editar Quest'}</h2>
                    <p className='description'>
                        {mode === 'create'
                            ? 'Crie uma nova quest para sua jornada.'
                            : 'Edite os detalhes da sua quest.'}
                    </p>
                </div>

                <div className='item'>
                    <label htmlFor="title">Título</label>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="title"
                                type="text"
                            />
                        )}
                    />
                    <p className='description'>Um belo título para nomear seu próximo desafio</p>
                    {errors?.title && <ErrorMessage>{errors?.title.message}</ErrorMessage>}
                </div>

                <div className='item'>
                    <label htmlFor="description">Descrição</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                id="description"
                            />
                        )}
                    />
                    <p className="description">Descreva detalhes sobre desafio</p>
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                </div>

                <div className="gridContainer">
                    <div className='item'>
                        <label htmlFor="timeline">Período da Quest</label>
                        <Controller
                            name="timeline"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="timeline"
                                >
                                    <option value="DIARIO">Diário (24h)</option>
                                    <option value="SEMANAL">Semanal (7d)</option>
                                    <option value="MENSAL">Mensal (30d)</option>
                                    <option value="ANUAL">Anual (+1 ano)</option>
                                </select>
                            )}
                        />
                        <p className="description">Período entre o inicio até a conclusão da sua Quest</p>
                    </div>

                    <div className='item'>
                        <label htmlFor="difficulty">Dificuldade</label>
                        <Controller
                            name="difficulty"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="difficulty"
                                >
                                    <option value="FACIL">Fácil</option>
                                    <option value="MEDIO">Médio</option>
                                    <option value="DIFICIL">Difícil</option>
                                    <option value="MUITO_DIFICIL">Muito Difícil</option>
                                </select>
                            )}
                        />
                        <p className="description">Nível de dificuldade</p>
                    </div>

                    <div className='item'>
                        <label htmlFor="validation">Data final</label>
                        <DatePicker
                            selected={selectedDateTime}
                            onChange={(date) => setSelectedDateTime(date)}
                            showTimeSelect
                            timeIntervals={15}
                            dateFormat="dd/MM/yyyy  HH:mm"
                            locale={ptBR}
                            timeCaption='Hora'
                            placeholderText='Selecione a data e hora'
                            isClearable
                            customInput={
                                <input style={{
                                    background: 'black',
                                    color: 'white',
                                    border: '1px solid var(--light-background)',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    width: '100%'
                                }} />
                            }
                        />
                        <p className="description">Informe uma data válida para o dia de conclusão</p>
                    </div>

                    <div className='item'>
                        <label htmlFor="joys">Joys</label>
                        <Controller
                            name="joys"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    id="joys"
                                    value={joysEstimated}
                                    onChange={() => {
                                        field.onChange(joysEstimated)
                                    }}
                                    disabled
                                />
                            )}
                        />
                        <p className="description">Recompensa baseada na dificuldade da quest</p>
                    </div>

                    <div className='item'>
                        <div className="highlightDiv">
                            <label htmlFor="highlight">Em Destaque</label>
                            <Controller
                                name="highlight"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <input
                                            id="highlight"
                                            className='highlight'
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                        />
                                        <label htmlFor="highlight"></label>
                                    </>
                                )}
                            />
                        </div>
                        <p className="description">Ative se quiser que apareça no menu principal</p>
                    </div>
                </div>

                <div className="buttons">
                    <button className='cancelBtn btnForm' onClick={() => onClose?.()}>Cancel</button>
                    <button type="submit" disabled={isSubmitting} className='submitBtn btnForm'>
                        {mode === 'create' ? 'Criar Quest' : 'Atualizar Quest'}
                    </button>
                </div>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Form = styled.form`
    width: 100%;
    max-width: 700px;
    padding: 30px;
    background: var(--background);
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    max-height: 700px;
    overflow-y: auto;
    z-index: 1000;

    .headerForm {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .description {
        margin: 5px 0 10px 0;
    }

    input, select, textarea {
        background: black;
        color: white;
        border-radius: 5px;
        border: 1px solid var(--light-background);
        outline: none;
        padding: 10px;
        font-size: 15px;
        width: 100%;
    }

    input:focus{
        outline: 1px solid #ccc;
    }

    textarea {
        height: 200px;
        resize: none;
    }

    select {
        cursor: pointer;
    }

    label {
        margin: 10px 0;
    }

    .item {
        display: flex;
        flex-direction: column;
    }

    .item .highlightDiv {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .item input[type="checkbox"] {
        accent-color: var(--secondary);
        width: 20px;
        height: 20px;
        cursor: pointer;
        border: none;
    }

    .gridContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }

    .btnForm {
        padding: 10px;
        align-items: center;
        justify-content: center;
        background: var(--secondary);
        cursor: pointer;
        color: black;
        border: none;
        border-radius: 5px;
        font-weight: 700;
        width: 120px;

    }

    .cancelBtn {
        background: transparent;
        border: 1px solid #ccc;
        color: white;
    }

    @media (max-width: 768px) {
        .gridContainer {
            grid-template-columns: 1fr;
        }

        .headerForm h2 {
            font-size: 20px;
        }

        .headerForm .description {
            font-size: 14px;
        }

        .submitBtn, .cancelBtn {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        padding: 20px;
    }
`;