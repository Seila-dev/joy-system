import styled from "styled-components"
import { HabitList } from "../habitList"
import useHabit from "../../contexts/hooks/useHabit";
import { Link } from "react-router-dom";

export const HabitPage = () => {
    const { habits } = useHabit();
    return (
        <Container>
            <Introduction>
                <Link to="/dashboard" className="prevPage">
                    <span className="material-symbols-outlined arrowBack">
                        arrow_back
                    </span>
                    <p>Voltar para menu</p>
                </Link>
                <IntroductionWrapper>
                    <div className="leftSide">
                        <h1 className="title">Gestão de Hábitos</h1>
                        <p className="description">Adicione, gerencie e acompanhe hábitos que você quer melhorar ou remover da sua vida de uma vez por todas.</p>
                    </div>
                    <div className="rightSide">
                        <ButtonCTA className="addQuest btn cta"><span className="material-symbols-outlined icon">add</span> <span className="removeResponsive">Novo hábito</span></ButtonCTA>
                    </div>
                </IntroductionWrapper>
            </Introduction>

            {habits ? (
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
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;

    .prevPage{
        width: fit-content;
        margin: 20px 0;
        padding: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.15s ease-out;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        &:hover{
            border-bottom: 1px solid var(--secondary);
        }
    }
    .prevPage span{
        font-size: 20px;
    }
    .description{
        margin: 5px 20px 0 0;
    }

    .rightSide{
        display: flex;
        align-items: center;
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

const IntroductionWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    margin-top: 30px;
`

const ButtonCTA = styled.button`
    background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 4px 14px rgba(0, 114, 255, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 114, 255, 0.5);
    cursor: pointer;
  }

  &:active {
    transform: scale(0.98);
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