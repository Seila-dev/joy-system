import { Link, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { QuestItem } from "../quest";
import { QuestContext } from "../../contexts/QuestContext";
import { QuestForm } from "../questForm";
import { Difficulty, Quest, QuestStatus } from "../../types/questData";
import { Toaster } from "sonner";


export const QuestSystem = () => {

    const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<QuestStatus | null>(null);
    const [open, setOpen] = useState<boolean>(false)
    const [editQuestData, setEditQuestData] = useState<Quest | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [filterState, setFilterState] = useState<boolean>(false)

    const openCreateForm = () => {
        setEditQuestData(null)
        setOpen(true)
    };

    const closeCreateForm = () => {
        setOpen(false)
    }

    const toggleFilter = () => {
        setFilterState(!filterState)
    }

    
    // useEffect(() => {
    //     const savedTimeline = localStorage.getItem('selectedTimeline');
    //     const savedDifficulty = localStorage.getItem('selectedDifficulty');
    //     const savedStatus = localStorage.getItem('selectedStatus');

    //     if (savedTimeline !== null) {
    //         try {
    //             const parsed = JSON.parse(savedTimeline);
    //             setSelectedTimeline(parsed);
    //         } catch (e) {}
    //     }

    //     if (savedDifficulty !== null) {
    //         try {
    //             const parsed = JSON.parse(savedDifficulty);
    //             setSelectedDifficulty(parsed);
    //         } catch (e) {}
    //     }

    //     if (savedStatus !== null) {
    //         try {
    //             const parsed = JSON.parse(savedStatus);
    //             setSelectedStatus(parsed);
    //         } catch (e) {}
    //     } 
    // }, []);

    // useEffect(() => {
    //     if (selectedTimeline !== null) {
    //         localStorage.setItem('selectedTimeline', JSON.stringify(selectedTimeline));
    //     } else {
    //         localStorage.removeItem('selectedTimeline');
    //     }

    //     if (selectedDifficulty !== null) {
    //         localStorage.setItem('selectedDifficulty', JSON.stringify(selectedDifficulty));
    //     } else {
    //         localStorage.removeItem('selectedDifficulty');
    //     }

    //     if (selectedStatus !== null) {
    //         localStorage.setItem('selectedStatus', JSON.stringify(selectedStatus));
    //     } else {
    //         localStorage.removeItem('selectedStatus');
    //     }
    // }, [selectedTimeline, selectedDifficulty, selectedStatus]);

    useEffect(() => {
        if (editQuestData) {
            setLoading(false)
            setOpen(true)
        }
    }, [editQuestData])


    const handleTimelineChange = (timeline: string | null) => {
        setSelectedTimeline(timeline)
    }

    const handleDifficultyChange = (difficulty: Difficulty | null) => {
        setSelectedDifficulty(difficulty)
    }

    const handleStatusChange = (status: QuestStatus | null) => {
        setSelectedStatus(status)
    }

    const [searchParams, setSearchParams] = useSearchParams({ q: '' })
    const q: string = searchParams.get('q') || ''

    const { quests } = useContext(QuestContext)

    const filteredBySearch: Quest[] = quests?.filter(item => {
        return item?.title?.toLowerCase().includes(q.toLowerCase())
    }) || [];

    if (loading) return <p>Loading..</p>

    return (
        <QuestComponent>
            <Toaster theme="dark"></Toaster>
            <Link to="/dashboard" className="prevPage">
                <span className="material-symbols-outlined arrowBack">
                    arrow_back
                </span>
                <p>Voltar para menu</p>
            </Link>
            <Introduction>
                <div className="leftSide">
                    <h1 className="title">Painel de tarefas</h1>
                    <p className="description">Gerencie e acompanhe suas tarefas em diferentes categorias para ganhar recompensas.</p>
                </div>
                <div className="rightSide">
                    <Link to="/dashboard/store" className="joysStore">
                        <span className="material-symbols-outlined">
                            shopping_bag
                        </span>
                    </Link>
                    <button className="addQuest btn cta" onClick={() => openCreateForm()}><span className="material-symbols-outlined icon">add</span> <span className="removeResponsive">Nova tarefa</span></button>
                </div>
            </Introduction>
            <Filters>
                <div className="filterBtnDiv">
                    <button className="filterBtn btn" onClick={() => toggleFilter()}><span className="material-symbols-outlined">
                        tune
                    </span>Filtros</button>
                </div>
                {filterState && <Overlay onClick={() => toggleFilter()} />}
                {filterState && (
                    <div className="filtersByDate">
                        <div className="filtersHeader">
                            <h3>Filtros de pesquisa</h3>
                            <span className="material-symbols-outlined icon" onClick={() => toggleFilter()}>
                                close
                            </span>
                        </div>
                        <div className="filterContainer">
                            <div className="filterByDate">
                                <h4>Data</h4>
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
                            <div className="filterByDate">
                                <h4>Dificuldade</h4>
                                <button
                                    className={`filterItem ${selectedDifficulty === null ? "selected" : ""}`}
                                    onClick={() => handleDifficultyChange(null)}
                                >
                                    Todas
                                </button>
                                <button
                                    className={`filterItem ${selectedDifficulty === "FACIL" ? "selected" : ""}`}
                                    onClick={() => handleDifficultyChange("FACIL")}
                                >
                                    Fácil
                                </button>
                                <button
                                    className={`filterItem ${selectedDifficulty === "MEDIO" ? "selected" : ""}`}
                                    onClick={() => handleDifficultyChange("MEDIO")}
                                >
                                    Médio
                                </button>
                                <button
                                    className={`filterItem ${selectedDifficulty === "DIFICIL" ? "selected" : ""}`}
                                    onClick={() => handleDifficultyChange("DIFICIL")}
                                >
                                    Difícil
                                </button>
                                <button
                                    className={`filterItem ${selectedDifficulty === "MUITO_DIFICIL" ? "selected" : ""}`}
                                    onClick={() => handleDifficultyChange("MUITO_DIFICIL")}
                                >
                                    Muito Difícil
                                </button>
                            </div>
                            <div className="filterByDate">
                                <h4>Status</h4>
                                <button
                                    className={`filterItem ${selectedStatus === null ? "selected" : ""}`}
                                    onClick={() => handleStatusChange(null)}
                                >
                                    Todos
                                </button>
                                <button
                                    className={`filterItem ${selectedStatus === "PENDENTE" ? "selected" : ""}`}
                                    onClick={() => handleStatusChange("PENDENTE")}
                                >
                                    Em andamento
                                </button>
                                <button
                                    className={`filterItem ${selectedStatus === "COMPLETO" ? "selected" : ""}`}
                                    onClick={() => handleStatusChange("COMPLETO")}
                                >
                                    Conquistas
                                </button>
                                <button
                                    className={`filterItem ${selectedStatus === "INCOMPLETO" ? "selected" : ""}`}
                                    onClick={() => handleStatusChange("INCOMPLETO")}
                                >
                                    Falhas
                                </button>
                               
                            </div>
                        </div>
                    </div>
                )}
                <div className="searchFilter">
                    <span className="material-symbols-outlined icon">
                        search
                    </span>
                    <input
                        type="text"
                        id="searchQuery"
                        placeholder="Pesquisar tarefas.."
                        accept="abnt"
                        name="search"
                        value={q}
                        onChange={e => setSearchParams(prev => {
                            prev.set('q', e.target.value)
                            return prev
                        }, { replace: true })}
                    />
                </div>
            </Filters>
            {open && <Overlay onClick={() => closeCreateForm()} />}
            {open && (
                <QuestForm
                    onClose={() => setOpen(false)}
                    initialData={editQuestData}
                />
            )}
            <QuestItem selectedTimeline={selectedTimeline} filterQuantity={null} filterQuery={filteredBySearch} filterDifficulty={selectedDifficulty} filterStatus={selectedStatus} />
        </QuestComponent>
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

const QuestComponent = styled.main`
    padding: 10px 50px;
    min-height: 100vh;
    height: 100%;
    transition: 0.25s ease-in-out;
    background: transparent;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    color: #e0e4ff;
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

    @media(max-width: 768px){
        padding: 5px 50px;
    }
    @media(max-width: 450px){
        padding: 5px 10px;
        padding-bottom: 30px;
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

const Filters = styled.div`
    width: 100%;


    .filterBtnDiv{
        margin: 20px 0;
    }

    .filterBtn{
        padding: 10px 25px;
        font-size: 16px;
        border-radius: 30px;
        background: transparent;
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        &:hover{
            background: #4a4a4a;
        }
    }

    .filtersByDate{
        height: 80%;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        max-width: 600px;
        width: 100%;
        border-radius: 10px;
        position: fixed;
        left: 50%;
        top: 50%;
        padding: 20px;
        background: var(--primary);
        color: white;
        transform: translate(-50%, -50%);
    }
    .filtersByDate .filtersHeader{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        color: white;
    }
    .filtersByDate .filtersHeader .icon{
        cursor: pointer;
    }
    .filtersByDate .filterByDate{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        height: 100%;
        user-select: none;
    }
    .filtersByDate .filterContainer{
        display: flex;
        gap: 10px;
    }
    .filtersByDate .filterByDate h4{
        padding-bottom: 20px;
        width: 100%;
        border-bottom: 1px solid #6e6e6e;
        font-size: 12px;
        text-transform: uppercase;
    }
    .filtersByDate .filterByDate .filterItem{
        width: fit-content;
        text-align: start;
        background: transparent;
        border: none;
        color: white;
        margin-top: 20px;
        opacity: 0.5;
        cursor: pointer;
    }
    
    .filtersByDate .filterByDate .filterItem.selected{
        opacity: 1;
    }

    .searchFilter{
        border: 1px solid #ccc;
        border-radius: 5px;
        display: flex;
        padding: 10px;
        margin: 30px 0;
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
        background: transparent;;
        color: white;
    }
`