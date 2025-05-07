import { ptBR } from "date-fns/locale/pt-BR"
import { useState } from "react"
import DatePicker from "react-datepicker"
import styled from "styled-components"
import { Habit } from "../../types/habitData"

interface HabitProps {
    habit: Habit;
}

export const RecordProgressComponent = ({habit}: HabitProps) => {
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()
    const [duration, setDuration] = useState<number | null>(null);


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
                <FormResult>
                    <FormButton type="button" variant="default">
                        Sucesso (+{habit.successPoints} pontos)
                    </FormButton>
                    <FormButton type="button" variant="default">
                        Falha (-{habit.failurePoints} pontos)
                    </FormButton>
                </FormResult>
            </FormItem>
            <FormItem>
                <Label>Observações</Label>
                <ProgressDetails placeholder="Adicione observações (opcional)"  />
            </FormItem>
            <FormItem>
                <FormButton type="button" variant="save">Salvar progresso</FormButton>
                <FormButton type="button" variant="delete">Excluir hábito</FormButton>
            </FormItem>
        </FormElement>
    )
}

const FormElement = styled.form`
    background: var(--background);
    padding: 20px;
    border-radius: 10px;
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
`

const Input = styled.input`
    background: black;
    color: white;
    border: 1px solid var(--light-background);
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    padding: 12px;
    margin: 5px 0 20px 0;
`

const FormResult = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 5px 0 20px 0;
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

  background: ${props => {
    switch (props.variant) {
      case 'save': return 'linear-gradient(to right, #4f46e5, #9333ea)';
      case 'failure': return '#f5222d';
      case 'save': return 'green';
      case 'delete': return '#ef4444';
      default: return 'var(--light-background)';
    }
  }};
`;
const ProgressDetails = styled.textarea`
    resize: none;
    height: 150px;
    border-radius: 10px;
    padding: 10px;
`