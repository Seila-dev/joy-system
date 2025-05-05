import styled from "styled-components"
import { HabitList } from "../habitList"
import useHabit from "../../contexts/hooks/useHabit";

export const HabitPage = () => {
    const { habits } = useHabit();
    return (
        <Container>
            <Introduction>
                    <div className="leftSide">
                        <h1 className="title">Gestão de Hábitos</h1>
                        <p className="description">Adicione, gerencie e acompanhe hábitos que você quer melhorar ou remover da sua vida de uma vez por todas.</p>
                    </div>
                    <div className="rightSide">
                        <button className="addQuest btn cta"><span className="material-symbols-outlined icon">add</span> <span className="removeResponsive">Novo hábito</span></button>
                    </div>
                </Introduction>
                
                { habits ? (
                    <HabitList />
                ) : (
                    <HabitNotfound>
                        <h1 className="title">Nenhum hábito encontrado</h1>
                        <p className="description">Adicione seu primeiro hábito para começar sua jornada.</p>
                    </HabitNotfound>
                )}
        </Container>
    )
}

const Container = styled.div`
    padding: 10px 50px;
    min-height: 100vh;
    height: 100%;
    transition: 0.25s ease-in-out;
    background: transparent;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    color: #e0e4ff;
`

const Introduction = styled.header`
    margin: 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    .description{
        margin: 5px 20px 0 0;
    }

    .rightSide{
        display: flex;
        align-items: center;
        margin-top: 10px;
        gap: 15px;
    }
    .btn{
        padding: 12px 16px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: fit-content;
        border-radius: 5px;
        color: var(--background);
        background: var(--tertiary);
        font-weight: 700;
    }
    .btn .icon{
        font-size: 20px;
        margin-right: 5px;
    }

    @media(max-width: 530px){
        flex-direction: column;
        .title{
            font-size: 25px;
        }
        .description{
            margin-top: 5px;
        }
        .btn{
            width: fit-content;
        }
        .rightSide{
            margin-top: 10px;
            width: 100%;
        }
    }
`

const HabitNotfound = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50vh;
    opacity: 0.6;
    text-align: center;

    .description{
        margin: 5px 0 0 0;
    }
`