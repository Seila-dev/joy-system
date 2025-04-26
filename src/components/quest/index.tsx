import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { Difficulty, Quest, QuestStatus } from "../../types/questData";
import { QuestContext } from "../../contexts/QuestContext";
import { QuestForm } from "../questForm";
import { JoysContext } from "../../contexts/JoysContext";
import { DateTime } from "luxon";

interface QuestItemProps {
    selectedTimeline: string | null;
    filterDifficulty: Difficulty | null;
    filterStatus: QuestStatus | null;
    filterQuantity: number | null;
    filterQuery: Quest[] | null;
}

export const QuestItem = ({ selectedTimeline, filterDifficulty, filterStatus, filterQuantity, filterQuery }: QuestItemProps) => {

    const [activeMenuId, setActiveMenuId] = useState<number | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [editQuestData, setEditQuestData] = useState<Quest | null>(null)
    const [openStatus, setOpenStatus] = useState<number | null>(null)
    const { deleteQuest, loading, setStatus } = useContext(QuestContext)
    const { getBalance } = useContext(JoysContext)
    const [notifications, setNotifications] = useState<string[]>([])

    const createQuestForm = (questData: Quest) => {
        setEditQuestData(questData);
        setOpen(true);
    };

    const closeCreateForm = () => {
        setOpen(false)
    }

    const updateMenu = (id: number) => {
        if (activeMenuId === id) {
            setActiveMenuId(null);
        } else {
            setActiveMenuId(id);
            setOpenStatus(null);
        }
    }

    const updateStatusMenu = (id: number) => {
        if (openStatus === id) {
            setOpenStatus(null)
        } else {
            setOpenStatus(id)
            setActiveMenuId(null)
        }
    }

    const changeStatus = (questId: number, newStatus: QuestStatus) => {
        const quest = filterQuery?.find(q => q.id === questId);

        if (!quest) return;

        if (quest.status === newStatus || quest.status === 'COMPLETO' || quest.status === 'INCOMPLETO') return;

        if (newStatus === 'COMPLETO' || newStatus === 'INCOMPLETO') {
            const confirmed = window.confirm(`Você tem certeza que quer mudar o status para ${newStatus}? Você não poderá voltar atrás depois..`);
            if (!confirmed) return;
        }

        setStatus(questId, newStatus)
        getBalance()

        if (newStatus === 'COMPLETO' || newStatus === 'INCOMPLETO') {
            setNotifications([])
        } else {
            setTimeout(() => {
                const updatedQuests = filterQuery?.map(q =>
                    q.id === questId ? { ...q, status: newStatus } : q
                );
                const updatedFilteredQuests = getFilteredQuests(updatedQuests || []);
                const updatedNotifications = checkQuestsTimeLimit(updatedFilteredQuests || []);
                setNotifications(updatedNotifications);
            }, 100);
        }
    };
    const filterByTimeline = selectedTimeline === null
        ? filterQuery?.slice(0, filterQuantity ?? filterQuery?.length)
        : filterQuery?.filter(quest => quest.timeline === selectedTimeline)

    const filteredDIfficultyQuests = filterDifficulty
        ? filterByTimeline?.filter(quest => quest.difficulty === filterDifficulty)
        : filterByTimeline;

    const filteredQuests = filterStatus
        ? filteredDIfficultyQuests?.filter(quest => quest.status === filterStatus)
        : filteredDIfficultyQuests;

    const getFilteredQuests = (quests: Quest[]) => {
        const timelineFiltered = selectedTimeline === null
            ? quests?.slice(0, filterQuantity ?? quests?.length)
            : quests?.filter(quest => quest.timeline === selectedTimeline);

        const difficultyFiltered = filterDifficulty
            ? timelineFiltered?.filter(quest => quest.difficulty === filterDifficulty)
            : timelineFiltered;

        return filterStatus
            ? difficultyFiltered?.filter(quest => quest.status === filterStatus)
            : difficultyFiltered;
    };

    const hasQuests = filteredQuests && filteredQuests.length > 0;
    
    const transformDateToPtbr = (newDate: string | number): string => {
        const dt = DateTime.fromJSDate(new Date(newDate)).setLocale('pt-BR')

        return dt.toFormat('dd/MM/yyyy - HH:mm')
    }

    const checkQuestsTimeLimit = (quests: Quest[]) => {
        const newNotifications: string[] = [];

        quests?.forEach((quest) => {
            const questTimeLimit = DateTime.fromISO(quest.validation);

            if (quest.status === 'COMPLETO' || quest.status === 'INCOMPLETO') {
                return
            }

            if (questTimeLimit < DateTime.now()) {
                newNotifications.push(`A quest "${quest.title}" passou do tempo limite! Você concluiu?`);
            }
        });

        return newNotifications
    }

    useEffect(() => {
        if (filteredQuests && filteredQuests.length > 0) {
            const newNotifications = checkQuestsTimeLimit(filteredQuests);

            if (JSON.stringify(newNotifications) !== JSON.stringify(notifications)) {
                setNotifications(newNotifications);
            }
        }
    }, [filterDifficulty, filterStatus, filterQuery, selectedTimeline, filterQuantity])

    const truncateDescription = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    }

    if (loading) return <div>Loading..</div>


    return (
        <>
            {notifications.length > 0 && <Overlay />}
            {notifications.length > 0 && (
                <Notifications>
                    <div className="notificationHeader">
                        <h2 className="title">Notificações</h2>
                        <p className="description">Todas suas notificações estarão aqui!</p>
                    </div>
                    {notifications.map((notification, index) => (
                        <div key={index} className="notificationItem">
                            <div className="message">{notification}</div>
                            <div className="buttonContainer">
                                <button onClick={() => {
                                    filteredQuests?.forEach(quest => {
                                        if (quest.status !== 'COMPLETO' && quest.status !== 'INCOMPLETO') {
                                            changeStatus(quest.id, 'COMPLETO')
                                        }
                                    });
                                    setNotifications([])
                                }}
                                >
                                    Sim. Terminei.</button>
                                <button className="failed" onClick={() => {
                                    filteredQuests?.forEach(quest => {
                                        if (quest.status !== 'INCOMPLETO') {
                                            changeStatus(quest.id, 'INCOMPLETO');
                                        }
                                    });
                                    // setNotifications([])
                                }}
                                >Não consegui.</button>
                            </div>
                        </div>
                    ))}
                </Notifications>
            )}
            <CardsContainer>
                {hasQuests ? (filteredQuests?.map(quest => (
                    <Card className="card" key={quest.id}>
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
                            <p className="description">{truncateDescription(quest.description, 30)}</p>
                            <div className="limit afterDescription">
                                <span className="material-symbols-outlined icon">
                                    calendar_clock
                                </span>
                                <p>Até: {transformDateToPtbr(quest.validation)}</p>
                            </div>
                            <div className="joys afterDescription">
                                <div className="joysQuantity">
                                    <span className="material-symbols-outlined joyLogo">
                                        paid
                                    </span>
                                    <p className="joys">{quest.joys} Moedas</p>
                                </div>
                                <div className={`difficultyLevel ${quest.difficulty}`}>
                                    <p>{quest.difficulty}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`footer ${quest.status}`}>
                            <div className="status" >
                                <span className="circleProgress"></span>
                                <p>{quest.status}</p>
                            </div>
                            <button className="setStatus" onClick={() => updateStatusMenu(quest.id)}><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                        </div>


                        {activeMenuId === quest.id &&
                            <EditPopup>
                                <div onClick={() => deleteQuest(quest.id)}>
                                    <span className="material-symbols-outlined deleteIcon icon">
                                        delete
                                    </span>
                                    <button className="delete-btn btn">Deletar</button>
                                </div>
                                <div onClick={() => createQuestForm(quest)}>
                                    <span className="material-symbols-outlined editIcon icon">
                                        edit_square
                                    </span>
                                    <button className="edit-btn btn">Editar</button>
                                </div>
                            </EditPopup>
                        }
                        {open && <Overlay onClick={() => closeCreateForm()} />}
                        {open && activeMenuId === quest.id && (
                            <QuestForm
                                onClose={() => setOpen(false)}
                                mode="edit"
                                initialData={editQuestData}
                            />
                        )}
                        {openStatus === quest.id && (
                            <StatusPopup>
                                <div onClick={() => changeStatus(quest.id, 'NULO')}>
                                    <span className="material-symbols-outlined icon">
                                        radio_button_unchecked
                                    </span>
                                    <button className="incomplete-btn status-incomplete">Não começou</button>
                                </div>
                                <div onClick={() => changeStatus(quest.id, 'PENDENTE')}>
                                    <span className="material-symbols-outlined icon">
                                        schedule
                                    </span>
                                    <button className="pending-btn status-pending">Em andamento</button>
                                </div>
                                <div onClick={() => changeStatus(quest.id, 'COMPLETO')}>
                                    <span className="material-symbols-outlined icon">
                                        check_circle
                                    </span>
                                    <button className="complete-btn status-complete">Finalizado</button>
                                </div>
                                <div onClick={() => changeStatus(quest.id, 'INCOMPLETO')}>
                                    <span className="material-symbols-outlined icon">
                                        close
                                    </span>
                                    <button className="complete-btn status-complete">Desistir</button>
                                </div>
                            </StatusPopup>
                        )
                        }
                    </Card>
                ))) : (
                    <span className="warn">Não há tarefas para o filtro selecionado.</span>
                )
                }

            </CardsContainer >
        </>
    )
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 4; 
    pointer-events: all; 
`

const Notifications = styled.div`
    width: 100%;
    max-width: 700px;
    height: 100%;
    max-height: 80%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    user-select: none;
    background-color: var(--background);

    .notificationHeader{
        margin-bottom: 20px;
        color: white;
    }
    .notificationItem{
        background-color: var(--light-background);
        color: white;
        padding: 20px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 10px;
    }
    .notificationItem .buttonContainer{
        width: 100%;
        display: flex;
        margin-top: 20px;
    }
    .notificationItem .buttonContainer button{
        padding: 8px 12px;
        width: 100%;
        background: var(--tertiary);
        border-radius: 5px;
        color: white;
        font-weight: 700;
        margin-right: 10px;
        border: none;
        cursor: pointer;
        transition: 0.15s ease-out;
        &:hover{
            background: green;
        }
    }
    .notificationItem .buttonContainer button.failed{
        background: transparent;
        border: 1px solid var(--tertiary);
        &:hover{
            background: red;
            border: 1px solid transparent;
        }
    }
`

const CardsContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    height: 100%;
    width: 100%;

    .warn{
        color: white;
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
const Card = styled.div`
    background: #03061a;
    //box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    padding: 25px;
    border: 1px solid #00031a;
    width: 100%;
    min-height: 300px;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: relative;

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        color: white;
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
        color: white;
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
    .body .afterDescription.joys{
        justify-content: space-between;
    }
    .body .afterDescription .joysQuantity{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .body .afterDescription .difficultyLevel{
        padding: 5px 15px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 12px;
        border: none;
    }
    .body .afterDescription .joys{
        color: var(--secondary);
        font-size: 15px;
        opacity: 1;
        font-weight: 700;
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
        font-size: 12px;
        color: gray;
        margin-bottom: 3px;
        background: transparent;
        padding: 5px 15px;
        border-radius: 10px;
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

    // completo, pendente, incompleto

    .footer.COMPLETO .setStatus, .footer.COMPLETO p{
        color: var(--greenText);
        font-weight: 700;
    }

    .footer.COMPLETO .status .circleProgress{
        background: var(--greenText);
    }

    .footer.PENDENTE p, .footer.PENDENTE .setStatus  {
        color: #DAA520;
        font-weight: 700;
    }

    .footer.PENDENTE .status .circleProgress{
        background: #DAA520;
    }
    .footer.NULO .setStatus, .footer.NULO p{
        color: white;
        font-weight: 700;
    }

    .footer.INCOMPLETO .setStatus, .footer.INCOMPLETO p {
        color: red;
        font-weight: 700;
    }

    .footer.INCOMPLETO .status .circleProgress{
        background: red;
    }

    .body .difficultyLevel.FACIL{
        color: var(--greenText);
        background: var(--greenBg);
    }
    .body .difficultyLevel.MEDIO{
        color:var(--yellowText);
        background: var(--yellowBg);
    }
    .body .difficultyLevel.DIFICIL{
        color: orangered;
        background: black;
    }
    .body .difficultyLevel.MUITO_DIFICIL{
        background: black;
        color: red;
    }
`;

const EditPopup = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 60px;
    background: var(--primary);
    border: 1px solid var(--primary);
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
        background: none;
        color: white;
    }
    div .icon{
        font-size: 20px;
    }
`

const StatusPopup = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 40px;
    bottom: 60px;
    background: var(--primary);
    border: 1px solid var(--primary);
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
    div button{
        margin-left: 10px;
        border: none;
        cursor: pointer;
        background: none;
        color: white;
    }
    div .icon{
        font-size: 20px;
    }
`