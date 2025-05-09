import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import styled from "styled-components"
import { Habit, HabitMethod, RecordProgress } from "../../types/habitData"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateTime } from "luxon"
import useHabit from "../../contexts/hooks/useHabit"
import { toast } from "sonner"

interface HabitProps {
    habit: Habit;
    deleteFunction?: () => void;
    saveFunction?: (e: React.FormEvent) => void;
    progressForm: RecordProgress;
    setProgressForm: React.Dispatch<React.SetStateAction<RecordProgress>>;
    onClose?: () => void;
    initialData?: RecordProgress | null;
    mode?: 'create' | 'edit';
}

const progressSchema = z.object({
    notes: z.string().optional(),
    joyPoints: z.number().optional(),
    date: z.string().min(1, { message: 'Data é obrigatória' }),
    value: z.number().min(0).optional(),
    isSuccess: z.boolean()
});

type ProgressFormData = z.infer<typeof progressSchema>;

export const RecordProgressComponent: React.FC<HabitProps> = ({
    habit,
    deleteFunction,
    onClose,
    initialData,
    mode,
}) => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ProgressFormData>({
        resolver: zodResolver(progressSchema),
        mode: 'onBlur',
        defaultValues: mode === 'edit' && initialData ? {
            notes: initialData.notes ?? "",
            date: initialData.date ?? "",
            joyPoints: initialData.joyPoints ?? 2,
            isSuccess: initialData.isSuccess ?? false,
            value: initialData.value ?? 0,
        } : {
            notes: "",
            date: "",
            joyPoints: 2,
            isSuccess: false,
            value: habit.method !== HabitMethod.INSTANTANEO ? 1 : 0
        }
    })

    const { habitProgress } = useHabit();
    const progress = habitProgress[habit.id] || [];

    const [chooseOption, setChooseOption] = useState<boolean>(
        !(initialData?.isSuccess === false)
    );

    useEffect(() => {
        setValue("isSuccess", chooseOption); // sincroniza com react-hook-form
    }, [chooseOption, setValue]);

    const { recordProgress, viewProgress, fetchHabitProgress, fetchHabitStats } = useHabit();

    const alreadyExistsProgressForDate = (date: string) => {
        const selectedDay = DateTime.fromISO(date).toFormat('yyyy-MM-dd');
        return progress?.some(prog => 
            DateTime.fromISO(prog.date).toFormat('yyyy-MM-dd') === selectedDay
        );
    };

    const onSubmit = async (data: ProgressFormData) => {
        if (habit.method !== HabitMethod.INSTANTANEO && (!data.value || data.value <= 0)) {
            toast.error('Preencha a duração ou quantidade com um valor maior que 0.');
            return;
        }
        if (alreadyExistsProgressForDate(data.date)) {
            toast.error('Você já registrou progresso para essa data.');
            return;
        }
    
        const isSuccess = chooseOption; 
    
        const progressData: RecordProgress = {
            ...data,
            isSuccess,
            date: data.date,
            joyPoints: isSuccess ? habit.successPoints : -habit.failurePoints,
            value: habit.method === HabitMethod.INSTANTANEO
                ? (isSuccess ? 1 : 0)
                : data.value ?? 0,
        };
    
        try {
            if (mode === 'create') {
                console.log('Sending to API:', progressData);
                await recordProgress(habit.id, progressData);
                await viewProgress(habit.id);
            }
    
            fetchHabitProgress(habit.id);
            fetchHabitStats(habit.id);
            reset();
            onClose?.();
        } catch (error) {
            console.error('Erro ao adicionar ou editar progresso:', error);
            toast.error('Erro ao adicionar ou editar progresso. Tente novamente mais tarde.');
        }
    };


    return (
        <FormElement onSubmit={handleSubmit(onSubmit)}>
            <Title>Registrar progresso</Title>
            <FormItem>
                <Label>Data</Label>
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date?.toISOString() ?? '')}
                            dateFormat="dd/MM/yyyy"
                            locale={ptBR}
                            placeholderText="Selecione a data"
                            isClearable
                            maxDate={new Date()}
                            customInput={<Input />}
                        />
                    )}
                />
                {errors.date && <span style={{ color: 'red' }}>{errors.date.message}</span>}
            </FormItem>
            {habit.method !== HabitMethod.INSTANTANEO && (
                <FormItem>
                    <Label>Contagem (vezes)</Label>
                    <Input
                        id="duration"
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        maxLength={5}
                        {...register('value', {
                            setValueAs: v => Number(String(v).replace(/\D/g, '')) || 0,
                        })}
                    />
                    {errors.value && <span style={{ color: 'red' }}>{errors.value.message}</span>}
                </FormItem>
            )}
            <FormItem>
                <Label>Resultado</Label>
                <FormSubmitButtons>
                    <FormButton
                        type="button"
                        variant={chooseOption === false ? 'failure' : 'default'}
                        className={!chooseOption ? 'active' : ''}
                        onClick={() => setChooseOption(false)}
                    >
                        Falha ( -{habit.failurePoints} )
                    </FormButton>
                    <FormButton
                        type="button"
                        variant={chooseOption === true ? 'success' : 'default'}
                        className={chooseOption ? 'active' : ''}
                        onClick={() => setChooseOption(true)}
                    >
                        Sucesso ( +{habit.successPoints} )
                    </FormButton>
                </FormSubmitButtons>
            </FormItem>
            <FormItem>
                <Label>Observações</Label>
                <ProgressDetails placeholder="Adicione observações (opcional)" {...register('notes')} />
                {errors.notes && <span style={{ color: 'red' }}>{errors.notes.message}</span>}
            </FormItem>
            <FormSubmitButtons>
                <FormButton type="button" variant="delete" onClick={deleteFunction}>
                    <span className="material-symbols-outlined viewAllIcon icon">
                        delete
                    </span>
                    <span>Excluir hábito</span>
                </FormButton>
                <FormButton type="submit" variant="save" disabled={isSubmitting}>
                    <span className="material-symbols-outlined viewAllIcon icon">
                        save
                    </span>
                    <span>Salvar</span>
                </FormButton>
            </FormSubmitButtons>
        </FormElement>
    )
}

const FormElement = styled.form`
    background: var(--background);
    padding: 20px;
    border-radius: 10px;
    display: grid;
    width: 100%;
    grid-area: RecordProgressComponent;

    @media(max-width: 768px){
        *{
            font-size: 12px !important;
        }
    }
`

const Title = styled.h2`
    margin-bottom: 25px;
    font-weight: 600;
    font-size: 25px;
`

const FormItem = styled.div`
    display: flex;
    flex-direction: column;

`

const Label = styled.label`
    margin-bottom: 5px;
    width: 100%;
`

const Input = styled.input`
    background: var(--light-background);
    color: white;
    border: 1px solid var(--light-background);
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    font-size: 18px;
    padding: 12px;
    margin: 5px 0 20px 0;
    transition: 0.05s ease-out;
    &:focus {
        outline: 1px solid #ccc;
    }
`

const FormButton = styled.button<{ variant?: 'success' | 'failure' | 'save' | 'delete' | 'default' }>`
    padding: 14px 20px;
    border-radius: 5px;
    border: none;
    width: 100%;
    color: white;
    font-weight: 700;
    max-height: 50px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.15s ease-out;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;

    background: ${props => {
        switch (props.variant) {
            case 'save': return 'linear-gradient(to left, #4f46e5, #9333ea)';
            case 'failure': return 'rgb(220 38 38)';
            case 'success': return 'rgb(5 145 102)';
            case 'delete': return '#ef4444';
            default: return 'var(--light-background)';
        }
    }};

    &:hover{
        transform: scale(102%);
    }

    @media(max-width: 560px){
        font-size: 10px !important;
        padding: 10px;
        width: 100%;
    }
`;
const ProgressDetails = styled.textarea`
    resize: none;
    height: 150px;
    border: 1px solid var(--light-background);
    border-radius: 5px;
    background: var(--light-background);
    padding: 10px;
    outline: none;
    color: white;
    font-size: 16px;
    margin: 5px 0 25px 0;
`

const FormSubmitButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 5px 0 20px 0;

    @media(max-width: 550px){
        grid-template-columns: 1fr;
    }
`