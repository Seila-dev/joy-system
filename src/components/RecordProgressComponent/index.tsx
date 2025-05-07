import { ptBR } from "date-fns/locale/pt-BR"
import { useState } from "react"
import DatePicker from "react-datepicker"
import styled from "styled-components"
import { Habit } from "../../types/habitData"

interface HabitProps {
    habit: Habit;
}

export const RecordProgressComponent = ({ habit }: HabitProps) => {
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()
    const [duration, setDuration] = useState<number | null>(null);
    const [chooseOption, setChooseOption] = useState<boolean>(false)

    const toggleOption = () => {
        setChooseOption(!chooseOption)
    }


    return (
        <FormElement>
            <Title>Registrar progresso</Title>
            <FormItem>
                <Label>Data</Label>
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
                        <Input />
                    }
                />
            </FormItem>
            <FormItem>
                <Label>
                    Duração (minutos)
                </Label>
                <Input
                    id="duration"
                    type="text"
                    inputMode="numeric"
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setDuration(value ? Number(value) : null);
                    }}
                    value={duration !== null ? duration.toString() : ''}
                    placeholder="0"
                    maxLength={5}
                />
            </FormItem>
            <FormItem>
                <Label>
                    Resultado
                </Label>
                <FormSubmitButtons>
                    <FormButton
                        type="button"
                        variant={chooseOption === true ? 'failure' : 'default'}
                        className={chooseOption === true ? 'active' : ''}
                        onClick={() => toggleOption()}
                    >
                        Falha ( -{habit.failurePoints} )
                    </FormButton>
                    <FormButton
                        type="button"
                        variant={chooseOption === false ? 'success' : 'default'}
                        className={chooseOption === false ? 'active' : ''}
                        onClick={() => toggleOption()}
                    >
                        Sucesso ( +{habit.successPoints} )
                    </FormButton>
                </FormSubmitButtons>
            </FormItem>
            <FormItem>
                <Label>Observações</Label>
                <ProgressDetails placeholder="Adicione observações (opcional)" />
            </FormItem>
            <FormSubmitButtons>
                <FormButton type="button" variant="delete">
                    <span className="material-symbols-outlined viewAllIcon icon">
                        delete
                    </span>
                    <span>Excluir hábito</span>
                </FormButton>
                <FormButton type="button" variant="save">
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