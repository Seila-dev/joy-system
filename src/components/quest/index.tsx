import styled from "styled-components"
import { useContext, useState } from "react";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { Quest } from "../../types/questData";
import { QuestContext } from "../../contexts/QuestContext";

interface QuestItemProps {
    selectedTimeline: string | null;
    filterQuantity: number | null
    filterQuery: Quest[] | null
}

export const QuestItem = ({ selectedTimeline, filterQuantity, filterQuery }: QuestItemProps) => {

    const [activeMenuId, setActiveMenuId] = useState<number | null>(null)

    const updateMenu = (id: number) => {
        setActiveMenuId(activeMenuId === id ? null : id)
    }

    const filterByTimeline = selectedTimeline === null
        ? filterQuery?.slice(0, filterQuantity ?? filterQuery?.length)
        : filterQuery?.filter(quest => quest.timeline === selectedTimeline)


    const hasQuests = filterByTimeline && filterByTimeline.length > 0;
    const { theme } = useContext(ThemeContext)
    const { deleteQuest } = useContext(QuestContext)


    return (
        <CardsContainer common={themes[theme].common}>
            {hasQuests ? (filterByTimeline.map(quest => (
                <Card className="card" key={quest.id} filter={themes[theme].filter} common={themes[theme].common}>
                    <div className="header">
                        <div className={`category ${quest.timeline}`}>
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>{quest.timeline}</p>
                        </div>
                        <div className="options">
                            <span className="material-symbols-outlined icon" onClick={() => updateMenu(quest.id)}>
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div className="body">
                        <h3 className="title">{quest.title}</h3>
                        <p className="description">{quest.description}</p>
                        <div className="limit afterDescription">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Até: {quest.validation}</p>
                        </div>
                        <div className="afterDescription">
                            <span className="material-symbols-outlined joyLogo">
                                paid
                            </span>
                            <p className="joys">{quest.joys} Joys</p>
                        </div>
                    </div>
                    <div className={`footer ${quest.status}`}>
                        <div className="status" >
                            <span className="circleProgress"></span>
                            <p>{quest.status}</p>
                        </div>
                        <button className="setStatus"><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                    </div>

                    {activeMenuId === quest.id &&
                        <EditPopup>
                            <div onClick={() => deleteQuest(quest.id)}>

                                <button className="delete-btn btn">Deletar</button>
                            </div>
                            <div >
                                <button className="edit-btn btn">Editar</button>
                            </div>
                        </EditPopup>
                    }
                </Card>
            ))) : (
                <span className="warn">Não há quests para o filtro selecionado.</span>
            )}
        </CardsContainer>
    )
}

const CardsContainer = styled.section<{ common: string }>`
    display: grid;
    //background: orangered;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    height: 100%;
    width: 100%;

    .warn{
        color: ${({ common }) => common};
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
const Card = styled.div<{ filter: string, common: string }>`
    background: ${({ filter }) => filter};
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    padding: 25px;
    width: 100%;
    height: 300px;
    color: ${({ common }) => common};
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: relative;

    .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    color: ${({ common }) => common};
    width: 100%;
    user-select: none;
}

.header .category {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 30px;
}

.header .category .icon {
    font-size: 18px;
}

.header .options{
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    user-select: none;
}
.header .options:hover{
    background: #ccc2;

}

.body .description {
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${({ common }) => common};
}

.body .title {
    color: ${(props) => props.theme.paragraph};
}

.body .afterDescription {
    display: flex;
    font-size: 12px;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
}

.body .afterDescription.limit{
    opacity: 0.6;
}

.body .afterDescription .joys{
    color: var(--secondary);
    font-size: 15px;
    opacity: 1;
    
}
.body .afterDescription .joyLogo{
    color: var(--secondary);
}

.body .limit .icon {
    font-size: 18px;
}

.footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
}

.footer .status {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: gray;
    margin-bottom: 3px;
}

.footer .status .circleProgress {
    width: 10px;
    height: 10px;
    background: gray;
    display: flex;
    border-radius: 50%;
    margin-right: 5px;
}

.footer .setStatus {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid gray;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
}

.footer .setStatus .icon {
    font-size: 14px;
    margin-right: 5px;
}

.footer.COMPLETO .setStatus {
    color: green;
}

.footer.COMPLETO p {
    color: green;
}

.footer.COMPLETO .status .circleProgress{
    background: green;
}

.footer.PENDENTE .setStatus {
    color: #ffb752;
}

.footer.PENDENTE p {
    color: #ffb752;
}

.footer.PENDENTE .status .circleProgress{
    background: #ffb752;
}

.footer.INCOMPLETO .setStatus {
    color: red;
}

.footer.INCOMPLETO p {
    color: red;
}

.footer.INCOMPLETO .status .circleProgress{
    background: red;
}
`;

const EditPopup = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 60px;
    background: var(--background);
    border: 1px solid var(--tertiary);
    border-radius: 5px 0 5px 5px;
    padding: 5px 0;
    div{
        cursor: pointer;
        display: flex;
        padding: 10px 15px;
        &:hover{
            background: #ccf2;
        }       
    }

    div .btn{
        margin-left: 10px;
        border: none;
        cursor: pointer;
        color: white;
        background: none;
    }
`