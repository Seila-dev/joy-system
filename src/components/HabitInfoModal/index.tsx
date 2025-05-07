import styled from "styled-components"
import { Habit, HabitMethod, HabitType } from "../../types/habitData"
import { formatDate } from "../../utils/dateUtils";

interface HabitProps {
    habit: Habit;
}

export const HabitInfoModal = ({ habit }: HabitProps) => {

    return (
        <Element>
            <Title>Informações do hábito</Title>
            <FlexContainer>
                <ItemRow>
                    <ItemLeft>
                        Tipo
                    </ItemLeft>
                    <ItemRight>
                        <HabitTypeSpan $habitType={habit.type}>{habit.type === habit.type ? 'Bom' : 'Ruim'}</HabitTypeSpan>
                    </ItemRight>
                </ItemRow>
                <ItemRow>
                    <ItemLeft>
                        Método
                    </ItemLeft>
                    <ItemRight>
                        {habit.method === 'QUANTIDADE' ? 'Contagem' : 'Sim/Não'}
                    </ItemRight>
                </ItemRow>
                <ItemRow>
                    <ItemLeft>
                        <span className="material-symbols-outlined viewAllIcon icon">
                            calendar_today
                        </span>
                        Frequência
                    </ItemLeft>
                    <ItemRight>
                        {habit.frequency}
                    </ItemRight>
                </ItemRow>
                <ItemRow>
                    <ItemLeft>
                        <span className="material-symbols-outlined viewAllIcon icon">
                            switch_access
                        </span>
                        Meta
                    </ItemLeft>
                    <ItemRight>
                        {habit.title}
                    </ItemRight>
                </ItemRow>
                <ItemRow>
                    <ItemLeft>
                        <span className="material-symbols-outlined icon">
                            workspace_premium
                        </span>
                        Pontos
                    </ItemLeft>
                    <ItemRight>
                        <span className="green">+{habit.successPoints}</span>
                        /
                        <span className="red">-{habit.failurePoints}</span>
                    </ItemRight>
                </ItemRow>
                <ItemRow>
                    <ItemLeft>
                        <span className="material-symbols-outlined icon">
                            schedule
                        </span>
                        Criado em
                    </ItemLeft>
                    <ItemRight>
                        {formatDate(habit.createdAt)}
                    </ItemRight>
                </ItemRow>
            </FlexContainer>
        </Element>
    )
}

const Element = styled.section`
    background: var(--background);
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    height: 100%;

    @media(max-width: 768px){
        *{
            font-size: 12px !important;
        }
    }
`

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Title = styled.h2`
    margin-bottom: 25px;
    font-weight: 600;
    font-size: 25px;
`

const ItemRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    height: 100%;
`

const ItemLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 10px;
`

const ItemRight = styled.div`
    width: fit-content;
    display: flex;
    align-items: flex-end;
    text-align: end;
    text-transform: lowercase;
    gap: 5px;

    .red{
        color: var(--red);
    }

    .green{
        color: var(--greenText);
    }
`

const HabitTypeSpan = styled.span<{ $habitType: HabitType | undefined }>`
    background: ${({ $habitType }) => $habitType === 'BOM' ? 'var(--greenText)' : 'rgb(220 38 38)'};
    padding: 5px 10px;
    border-radius: 30px;
    font-weight: 600;
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