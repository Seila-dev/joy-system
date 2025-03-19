import styled from "styled-components"

export const TodoList = () => {

    return (
        <TodoComponent>
            <div className="header">
                <h2>Quests</h2>

                <button className="btn editBtn">
                    <span className="material-symbols-outlined editIcon">
                        edit_square
                    </span>
                    <span className="editText">Edit</span>
                </button>
            </div>
            <div className="tasks">
                <div className="task">
                    <div className="flexContainer">
                        <h3>Assistir todo o módulo do meu curso DevQuest</h3>
                        <span className="limit">3d</span>
                    </div>
                    <div className="flexContainer bottom">
                        <span className="category">Programação</span>
                        <button className="finishTask">Finalizou?</button>
                    </div>
                </div>
                <div className="task">
                    <div className="flexContainer">
                        <h3>Assistir todo o módulo do meu curso DevQuest</h3>
                        <span className="limit">3d</span>
                    </div>
                    <div className="flexContainer bottom">
                        <span className="category">Programação</span>
                        <button className="finishTask">Finalizou?</button>
                    </div>
                </div>
                <div className="task">
                    <div className="flexContainer">
                        <h3>Assistir todo o módulo do meu curso DevQuest</h3>
                        <span className="limit">3d</span>
                    </div>
                    <div className="flexContainer bottom">
                        <span className="category">Programação</span>
                        <button className="finishTask">Finalizou?</button>
                    </div>
                </div>
                <div className="task">
                    <div className="flexContainer">
                        <h3>Assistir todo o módulo do meu curso DevQuest</h3>
                        <span className="limit">3d</span>
                    </div>
                    <div className="flexContainer bottom">
                        <span className="category">Programação</span>
                        <button className="finishTask">Finalizou?</button>
                    </div>
                </div>

            </div>
        </TodoComponent>
    )
}

const TodoComponent = styled.div`
    max-width: 800px;
    width: 100%;
    .btn{
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .header .editBtn{
        opacity: 0.7;
        gap: 5px;
        &:hover{
            opacity: 1;
        }
    }
    .header .editBtn .editIcon{
        font-size: 18px;
    }

    .flexContainer{
        display: flex;
        align-items: center;
    }
    .flexContainer .category{
        width: 70%;
    }
    .flexContainer .limit{
        width: 30%;
        display: flex;
        align-items: center;
        color: white;
        padding: 10px;
        border-radius: 30px;
        justify-content: center;
    }
    .flexContainer .finishTask{
        padding: 8px 12px;
        border-radius: 5px;
        border: none;
        background: white;
        cursor: pointer;
        transition: 0.2s ease-out;
        &:hover{
            background: white;
            font-weight: 600;
        }
    }
    .flexContainer.bottom{
        margin-top: 30px;
    }

    .tasks{
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 10px;
    }
    .tasks .task{
        border-radius: 10px;
        width: 40%;
        min-height: 100%;
        min-width: 250px;
        cursor: pointer;
        height: 100%;
        padding: 20px;
        margin-right: 10px;
        flex-shrink: 0;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }
    .tasks .task:nth-child(even){
        background: black;
        color: white;
    }
    .tasks .task:nth-child(odd){
        background: var(--secondary);
        color: black;
        .flexContainer .limit{
            color: black;
        }
    }
    .tasks .task h3, .tasks .task .limit, .tasks .task .category{
        font-size: 15px;
    }
    .tasks .task h3{
        width: 100%;
        margin-right: 10px;
    }

`

