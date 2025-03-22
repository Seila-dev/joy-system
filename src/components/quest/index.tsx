import { useContext } from "react"
import styled from "styled-components"
import { QuestContext } from "../../contexts/QuestContext"
import { QuestTypeData } from "../../interfaces/QuestData"

interface QuestItemProps {
    selectedTimeline: string | null;
    filterQuantity: number | null
}

export const QuestItem = ({ selectedTimeline, filterQuantity }: QuestItemProps) => {
    const { quests } = useContext(QuestContext)

    const filteredQuests = selectedTimeline === null
    ? quests?.slice(0, filterQuantity ?? quests?.length) 
    : quests?.filter(quest => quest.timeline === selectedTimeline)
    



    const hasQuests = filteredQuests && filteredQuests.length > 0;

    return (
        <CardsContainer>
            {hasQuests ?  (filteredQuests.map(quest => (
                <div className="card" key={quest.id}>
                    <div className="header">
                        <div className={`category ${quest.timeline}`}>
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>{quest.timeline}</p>
                        </div>
                        <div className="options">
                            <span className="material-symbols-outlined icon">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div className="body">
                        <h3 className="title">{quest.title}</h3>
                        <p className="description">{quest.description}</p>
                        <div className="limit">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Até: {quest.validation}</p>
                        </div>
                    </div>
                    <div className={`footer ${quest.status}`}>
                        <div className="status" >
                            <span className="circleProgress"></span>
                            <p>{quest.status}</p>
                        </div>
                        <button className="setStatus"><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                    </div>
                </div>
            ))): (
                <span>Não há quests para o filtro selecionado.</span>
            )}
        </CardsContainer>
    )
}

const CardsContainer = styled.section`
    display: grid;
    //background: orangered;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    height: 100%;
    .card{
        background: white;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        padding: 25px;
        width: 100%;
        height: 300px;
        
        display: flex;
        flex-direction: column;
        border-radius: 10px;
    }
    .card .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        width: 100%;
    }
    .card .header .category{
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 30px;
    }
    .card .header .category .icon{
        font-size: 18px;
    }
    .card .header .options .icon{
        cursor: pointer;
    }
    .card .body .description{
        margin: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
    .card .body .limit{
        display: flex;
        font-size: 12px;
        align-items: center;
        gap: 5px;
        opacity: 0.6;
    }
    .card .body .limit .icon{
        font-size: 18px;
    }
    .card .footer{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 100%;
    }
    .card .footer .status{
        display: flex;
        align-items: center;
        font-size: 15px;
        color: gray;
        margin-bottom: 3px;
    }
    .card .footer .status .circleProgress{
        width: 10px;
        height: 10px;
        background: gray;
        display: flex;
        border-radius: 50%;
        margin-right: 5px;
    }
    .card .footer .setStatus{
        display: flex;
        align-items: center;
        padding: 5px 10px;
        border: 1px solid gray;
        border-radius: 10px;
        background: transparent;
        cursor: pointer;
    }
    .card .footer .setStatus .icon{
        font-size: 14px;
        margin-right: 5px;
    }

    //vars
    .card .footer.COMPLETO .setStatus{
        color: green;
    }
    .footer.COMPLETO p{
        color: green;
    }
    .card .footer.COMPLETO .circleProgress{
        background: green;
    }
    .card .footer.PENDENTE .setStatus{
        color: orangered;
    }
    .footer.PENDENTE p{
        color: orangered;
    }
    .card .footer.PENDENTE .circleProgress{
        background: orangered;
    }
    .card .footer.INCOMPLETO .setStatus{
        color: red;
    }
    .footer.INCOMPLETO p{
        color: red;
    }
    .card .footer.INCOMPLETO .circleProgress{
        background: red;
    }
    .category.DIARIO{
        background: lightblue;
        color: darkblue;
    }
    .category.SEMANAL{
        background: lightgreen;
        color: green;
    }
    .category.MENSAL{
        background: orange;
        color: red;
    }
    .category.ANUAL{
        background: purple;
        color: violet;
    }

    @media(max-width: 900px){
        grid-template-columns: 1fr 1fr;
        .card .footer .status{
            font-size: 12px;
            margin-bottom: 5px;
        }
        .card .footer .setStatus{
            padding: 5px;
        }
    }
    @media(max-width: 580px){
        grid-template-columns: 1fr;
    }
`