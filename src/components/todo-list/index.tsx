import { Link } from "react-router-dom"
import styled from "styled-components"
import { QuestItem } from "../quest"
import { useContext, useState } from "react"
import { QuestContext } from "../../contexts/QuestContext"

export const TodoList = () => {
    const [selectedTimeline, setSelectedTimeline]  = useState<string | null>(null)
    const { quests } = useContext(QuestContext)


    return (
        <TodoComponent>
            <div className="header">
                <h2>Quests Recentes</h2>

                <div className="flexContainer">
                    <Link to="/quests" className="btn viewAllBtn">
                            <span className="material-symbols-outlined viewAllIcon icon">
                                stack
                            </span>
                            <span className="text viewAllText">View all</span>
                    </Link>
                    <Link to="/quests" className="btn editBtn">
                            <span className="material-symbols-outlined editIcon icon">
                                edit_square
                            </span>
                            <span className="text editText">Edit</span>
                    </Link>
                </div>
            </div>
            <div className="tasks">
                <QuestItem selectedTimeline={selectedTimeline} filterQuantity={3} />
            </div>
        </TodoComponent>
    )
}

const TodoComponent = styled.div`
    max-width: 100vw;
    width: 100%;
    max-height: 100%;
    
    .btn{
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .header .btn{
        opacity: 0.7;
        gap: 5px;
        margin-left: 10px;
        &:hover{
            opacity: 1;
        }
    }
    .header .btn .icon{
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
        padding: 20px 0;
        //border: 2px solid #ccc;
        border-radius: 10px;
        gap: 10px;
    }
    .tasks .task{
        // border-radius: 10px;
        // width: 40%;
        // min-height: 100%;
        // min-width: 250px;
        // max-width: 250px;
        // cursor: pointer;
        // height: 100%;
        // padding: 20px;
        // margin-right: 10px;
        // flex-shrink: 0;
        // box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
                background: white;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        padding: 25px;
        border: 1px solid var(--tertiary);
        min-width: 200px;
        flex-shrink: 0;
        height: 300px;
        color: black;
        display: flex;
        flex-direction: column;
        border-radius: 10px;

    }
    .tasks .task:nth-child(even){
       

    }
    .tasks .task:nth-child(odd){
       

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

    @media(max-width: 450px){
        .header .btn{
            font-size: 10px;
        }
        .header .btn .text{
            display: none;
        }
    }

`

