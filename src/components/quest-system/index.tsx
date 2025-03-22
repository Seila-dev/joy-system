import { Link } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react"
import { QuestItem } from "../quest";

export const QuestSystem = () => {

    const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);

    const handleTimelineChange = (timeline: string | null) => {
        setSelectedTimeline(timeline);
    }

    return (
        <QuestComponent>
            <Link to="/" className="prevPage">
                <span className="material-symbols-outlined arrowBack">
                    arrow_back
                </span>
                <p>Back to Home</p>
            </Link>
            <Introduction>
                <div className="leftSide">
                    <h1 className="title">Quests</h1>
                    <p className="description">Gerencie e acompanhe suas tarefas em diferentes categorias.</p>
                </div>
                <div className="rightSide">
                    <button className="addQuest btn cta"><span className="material-symbols-outlined icon">add</span> <span className="removeResponsive">New Quest</span></button>
                </div>
            </Introduction>
            <Filters>
                <div className="filterByDate">
                    <button
                        className={`filterItem ${selectedTimeline === null ? "selected" : ""}`}
                        onClick={() => handleTimelineChange(null)}
                    >
                        Todas
                    </button>
                    <button 
                        className={`filterItem ${selectedTimeline === "DIARIO" ? "selected" : ""}`} 
                        onClick={() => handleTimelineChange("DIARIO")}
                    >
                        Diária
                    </button>
                    <button 
                        className={`filterItem ${selectedTimeline === "SEMANAL" ? "selected" : ""}`} 
                        onClick={() => handleTimelineChange("SEMANAL")}
                    >
                        Semanal
                    </button>
                    <button 
                        className={`filterItem ${selectedTimeline === "MENSAL" ? "selected" : ""}`} 
                        onClick={() => handleTimelineChange("MENSAL")}
                    >
                        Mensal
                    </button>
                    <button 
                        className={`filterItem ${selectedTimeline === "ANUAL" ? "selected" : ""}`} 
                        onClick={() => handleTimelineChange("ANUAL")}
                    >
                        Anual
                    </button>
                </div>
                <div className="searchFilter">
                    <span className="material-symbols-outlined icon">
                        search
                    </span>
                    <input
                        type="text"
                        id="searchQuery"
                        placeholder="Pesquisar Quests.."
                        accept="abnt"
                        name="search"
                    />
                </div>
            </Filters>
            <QuestItem selectedTimeline={selectedTimeline} filterQuantity={null} />
        </QuestComponent>
    )
}

const QuestComponent = styled.main`
    padding: 10px 50px;
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
        &:hover{
            border-bottom: 1px solid var(--tertiary);
        }
    }
    .prevPage span{
        font-size: 20px;
    }

    @media(max-width: 768px){
        padding: 5px 50px;
    }
    @media(max-width: 450px){
        padding: 5px 10px;
    }

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
    .btn{
        padding: 12px 16px;
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 130px;
        border-radius: 5px;
        background: var(--background);
        margin-top: 10px;
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
        // .btn .removeResponsive{
        //     display: none;
        // }
        .btn{
            width: fit-content;
        }
        .rightSide{
            margin-top: 10px;
            width: 100%;
        }
        // .btn .icon{
        //     margin: 0;
        // }
    }
`

const Filters = styled.div`
    width: 100%;
    
    .filterByDate{
        margin: 30px 0;
        display: grid;
        grid-template-columns: repeat(5, auto);
    }
    .filterItem{
        padding: 10px 0;
        width: 100%;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background: whitesmoke;
    }
    .filterItem.selected{
        border-bottom: 1px solid var(--tertiary);
    }

    .searchFilter{
        border: 1px solid #ccc;
        border-radius: 5px;
        display: flex;
        padding: 10px;
        margin-bottom: 20px;
    }
    .searchFilter .icon{
        font-size: 20px;
        opacity: 0.6;
        margin-right: 10px;
    }
    .searchFilter #searchQuery{
        border: none;
        width: 100%;
        outline: none;
    }
`

