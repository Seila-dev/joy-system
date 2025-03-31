import { Link, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { QuestItem } from "../quest";
import { QuestContext } from "../../contexts/QuestContext";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { QuestForm } from "../questForm";
import { Quest } from "../../types/questData";
import { Toaster } from "sonner";


export const QuestSystem = () => {

    const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false)
    const [editQuestData, setEditQuestData] = useState<Quest | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const openCreateForm = () => {
        setEditQuestData(null); // Limpa qualquer dado anterior de edição
        setOpen(true); // Abre o formulário de criação
    };

    const closeCreateForm = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (editQuestData) {
            setLoading(false)
            setOpen(true)
        }
    }, [editQuestData])


    const handleTimelineChange = (timeline: string | null) => {
        setSelectedTimeline(timeline);
    }

    const [searchParams, setSearchParams] = useSearchParams({ q: '' })
    const q: string = searchParams.get('q') || ''

    const { quests } = useContext(QuestContext)
    const { theme } = useContext(ThemeContext)

    const filteredBySearch: Quest[] = quests?.filter(item => {
        return item?.title?.toLowerCase().includes(q.toLowerCase())
    }) || [];

    if (loading) return <p>Loading..</p>

    return (
        <QuestComponent $background={themes[theme].background} $black_to_white={themes[theme].black_to_white}>
            <Toaster theme="dark"></Toaster>
            <Link to="/" className="prevPage">
                <span className="material-symbols-outlined arrowBack">
                    arrow_back
                </span>
                <p>Back to Home</p>
            </Link>
            <Introduction $black_to_white={themes[theme].black_to_white} $background={themes[theme].background}>
                <div className="leftSide">
                    <h1 className="title">Quests</h1>
                    <p className="description">Gerencie e acompanhe suas tarefas em diferentes categorias.</p>
                </div>
                <div className="rightSide">
                    <Link to="/store" className="joysStore">
                        <span className="material-symbols-outlined">
                            shopping_bag
                        </span>
                    </Link>
                    <button className="addQuest btn cta" onClick={() => openCreateForm()}><span className="material-symbols-outlined icon">add</span> <span className="removeResponsive">New Quest</span></button>
                </div>
            </Introduction>
            <Filters $object={themes[theme].object} $background={themes[theme].background} $black_to_white={themes[theme].black_to_white}>
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
            <QuestItem selectedTimeline={selectedTimeline} filterQuantity={null} filterQuery={filteredBySearch} />
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

const QuestComponent = styled.main<{ $background: string, $black_to_white: string }>`
    padding: 10px 50px;
    min-height: 100vh;
    height: 100%;
    transition: 0.25s ease-in-out;
    background: ${({ $background }) => $background};
    color: ${({ $black_to_white }) => $black_to_white};
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
        color: ${({ $black_to_white }) => $black_to_white};
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

const Introduction = styled.header<{ $black_to_white: string, $background: string }>`
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
        color: black;
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

const Filters = styled.div<{ $object: string, $background: string, $black_to_white: string }>`
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
        color: ${({ $black_to_white }) => $black_to_white};
        background: ${({ $object }) => $object};
    }
    .filterItem.selected{
        border-bottom: 1px solid var(--secondary);
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
        background: ${({ $background }) => $background};
        color: ${({ $black_to_white }) => $black_to_white};
    }
`
