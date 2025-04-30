import styled from "styled-components"

export const HabitPage = () => {
    return (
        <Container>
            <Introduction>
                    <div className="leftSide">
                        <h1 className="title">Gestão de Hábitos</h1>
                        <p className="description">Adicione, gerencie e acompanhe hábitos que você quer melhorar ou remover da sua vida de uma vez por todas.</p>
                    </div>
                    <div className="rightSide">
                        <button className="addQuest btn cta"><span className="material-symbols-outlined icon">add</span> <span className="removeResponsive">Nova tarefa</span></button>
                    </div>
                </Introduction>
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
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    .description{
        margin-right: 20px;
    }

    .rightSide{
        display: flex;
        align-items: center;
        margin-top: 10px;
        gap: 15px;
    }
    .rightSide .joysStore{
        background: var(--secondary);
        padding: 8px;
        border-radius: 5px;
    }
    .btn{
        padding: 12px 16px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 130px;
        border-radius: 5px;
        background: var(--background);
        background: var(--secondary);
        color: white;
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