import styled from "styled-components"
import { Introduction } from "../introduction"
import { TodoList } from "../todo-list"
import { Calendar } from "../calendar"
import { Toaster } from "sonner"
import { NoteItem } from "../notes"

export const Home = () => {
    return (
        <Main >
            <Toaster theme="dark"></Toaster>
            <Introduction />
            <Dashboard >
                <div className="leftContent">
                    <TodoList />
                    <div className="notesSection">
                        <h2>Notas Recentes</h2>
                        <NoteItem
                         selectedCategory={null}
                         filterStatus={null}
                         filterPriority={null}
                         searchQuery={null}
                        />
                    </div>
                </div>
                <div className="rightContent">
                    <Calendar />
                </div>
            </Dashboard>
        </Main>
    )
}

const Main = styled.main`
    overflow-x: hidden;
    transition: 0.25s ease-in-out;
    background: transparent;
`

const Dashboard = styled.section`
    gap: 30px;
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    margin: 0 auto;
    color: white;
    max-width: 1200px;
    width: 100%;
    .leftContent, .rightContent{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .leftContent{
        width: 100%;
        margin-bottom: 50px;
    }
    .leftContent .notesSection{
        display: flex;
        flex-direction: column;
    }
    .leftContent .notesSection h2{
        font-weight: 500;
        margin-bottom: 30px;
    }

    @media(max-width: 450px){
        padding: 20px;
    }
`