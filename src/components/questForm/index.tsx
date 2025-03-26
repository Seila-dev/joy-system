import { useContext } from 'react';
import { QuestContext } from '../../contexts/QuestContext';
import { Quest} from '../../types/questData';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '../errorMessage';

const questSchema = z.object({
    title: z.string().min(1, { message: "Título é obrigatório" }),
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
        reset 
    } = useForm<QuestFormData>({
        resolver: zodResolver(questSchema),
        defaultValues: mode === 'edit' && initialData ? {
            title: initialData.title ?? "",
            description: initialData.description ?? "",
            timeline: initialData.timeline ?? "DIARIO",
            difficulty: initialData.difficulty ?? "FACIL",
            validation: initialData.validation ?? "",
            joys: initialData.joys ?? 0,
            highlight: initialData.highlight ?? false,
            status: initialData.status ?? "PENDENTE"
        } : {
            title: '',
            description: '',
            timeline: 'DIARIO',
            difficulty: 'FACIL',
            validation: '',
            joys: 0,
            highlight: false,
            status: 'PENDENTE'
        }
    });

    const onSubmit = async (data: QuestFormData) => {
        try {
            const questData: Omit<Quest, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
                ...data,
                validation: data.validation || new Date().toISOString().split('T')[0].replace(/-/g, '/')
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
                <div className="header">
                    <h2>{mode === 'create' ? 'Criar Nova Quest' : 'Editar Quest'}</h2>
                    <p className='description'>
                        {mode === 'create' 
                            ? 'Crie uma nova quest para sua jornada.' 
                            : 'Edite os detalhes da sua quest.'}
                    </p>
                </div>

                <div className='item'>
                    <label htmlFor="title">Título da Quest</label>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="title"
                                type="text"
                                required
                            />
                        )}
                    />
                    {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
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
                                required
                            />
                        )}
                    />
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                </div>

                <div className="flexContainer">
                    <div className='item'>
                        <label htmlFor="timeline">Timeline</label>
                        <Controller
                            name="timeline"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="timeline"
                                >
                                    <option value="DIARIO">Diário</option>
                                    <option value="SEMANAL">Semanal</option>
                                    <option value="MENSAL">Mensal</option>
                                    <option value="ANUAL">Anual</option>
                                </select>
                            )}
                        />
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
                    </div>

                    <div className='item'>
                        <label htmlFor="validation">Data de Validação</label>
                        <Controller
                            name="validation"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="validation"
                                    type="date"
                                    placeholder="DD/MM/YYYY"
                                />
                            )}
                        />
                    </div>

                    <div className='item'>
                        <label htmlFor="joys">Joys</label>
                        <Controller
                            name="joys"
                            control={control}
                            render={({ field: { onChange, ...field } }) => (
                                <input
                                    {...field}
                                    id="joys"
                                    type="number"
                                    onChange={(e) => onChange(Number(e.target.value))}
                                />
                            )}
                        />
                    </div>

                    <div className='item'>
                        <label htmlFor="highlight">Em Destaque</label>
                        <Controller
                            name="highlight"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <input
                                    id="highlight"
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => onChange(e.target.checked)}
                                />
                            )}
                        />
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {mode === 'create' ? 'Criar Quest' : 'Atualizar Quest'}
                </button>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
     padding: 0 15px;
    position: absolute;
`

const Form = styled.form`
    display: flex;
    z-index: 1000;
    position: fixed;
     max-width: 700px; 
     margin: 15px 0;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 15px;
    background: var(--background);
    padding: 30px 15px;
    flex-direction: column;
    border-radius: 10px;

    .header .description{
        margin: 5px 0 20px 0;
    }
    input, select, textarea{
        background: black;
        resize: none;
        color: white;
        border-radius: 5px;
        border: 1px solid var(--light-background);
        outline: none;
        padding: 10px;
        font-size: 15px;
        width: 100%;
    }
    
    select{
        cursor: pointer;
    }
    label{
        margin: 10px 0;
    }

    .flexContainer{
        gap: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .item{
        display: flex;
        flex-direction: column;
    }

        @media (max-width: 768px) {
        .flexContainer {
            grid-template-columns: 1fr; 
        }

        .header h2 {
            font-size: 20px;
        }

        .header .description {
            font-size: 14px; 
        }

        button {
            width: 100%; 
        }
    }

     @media (max-width: 480px) {
        padding: 20px;
        .flexContainer {
            grid-template-columns: 1fr;
        }
    }
`

