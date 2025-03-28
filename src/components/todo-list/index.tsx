import { Link, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { QuestItem } from "../quest"
import { useContext, useState } from "react"
import { QuestContext } from "../../contexts/QuestContext"
import { ThemeContext, themes } from "../../contexts/ThemeContext"
import { Quest } from "../../types/questData"

export const TodoList = () => {
    const [selectedTimeline, _]  = useState<string | null>(null)
    const { theme } = useContext(ThemeContext)

    const [searchParams] = useSearchParams({ q: ''})
    const q: string = searchParams.get('q') || ''

    const { quests } = useContext(QuestContext)

    const filteredBySearch: Quest[] = quests?.filter(item => {
        return item?.title?.toLowerCase().includes(q.toLowerCase()) && item.highlight
    }) || [];

    return (
        <TodoComponent $black_to_white={themes[theme].black_to_white}>
            <div className="header">
                <h2>Quests em destaque</h2>

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
                <QuestItem selectedTimeline={selectedTimeline} filterQuantity={3} filterQuery={filteredBySearch} />
            </div>
        </TodoComponent>
    )
}

const TodoComponent = styled.div<{ $black_to_white: string }>`
    max-width: 100vw;
    width: 100%;
    max-height: 100%;
    margin-top: 20px;
    
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
    .header, .header .btn, .header .btn .icon{
        color: ${({ $black_to_white }) => $black_to_white}
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
        border-radius: 10px;
        gap: 10px;
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

