import styled from "styled-components"
import { Introduction } from "../introduction"
import { TodoList } from "../todo-list"
import { Toaster } from "sonner"
import { NoteItem } from "../notes"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <Main >
            <Toaster theme="dark"></Toaster>
            <Introduction />
            <Dashboard >
                <div className="leftContent">
                    <TodoList />
                    <div className="notesSection">
                        <Header>
                            <div>
                                <h2>Notas recentes</h2>
                                <p className="description">Suas anotações mais <strong>recentes</strong></p>
                            </div>


                            <div className="flexContainer">
                                <Link to="notes" className="btn viewAllBtn">
                                    <span className="material-symbols-outlined viewAllIcon icon">
                                        stack
                                    </span>
                                    <span className="text viewAllText">Ver tudo</span>
                                </Link>
                                <Link to="notes" className="btn editBtn">
                                    <span className="material-symbols-outlined editIcon icon">
                                        edit_square
                                    </span>
                                    <span className="text editText">Editar</span>
                                </Link>
                            </div>
                        </Header>
                        <NoteItem
                            selectedCategory={null}
                            filterStatus={null}
                            filterPriority={null}
                            searchQuery={null}
                            filterQuantity={2}
                        />
                    </div>
                </div>
                <div className="rightContent">
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
        color: #e0e4ff;
    }
    .leftContent .notesSection p.description{
        margin: 10px 0 30px 0;
    }

    @media(max-width: 450px){
        padding: 20px;
    }
`

const Header = styled.header`
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 10px;
    color: #e0e4ff;
    .flexContainer{
        display: flex;
    }
    .btn, .icon{
        color: #e0e4ff;
    }
    .btn{
        opacity: 0.7;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        width: fit-content;
        align-items: center;
        font-size: 12px;
        margin-left: 10px;
        &:hover{
            opacity: 1;
        }
    }
    .btn .icon{
        font-size: 18px;
    }

    p.description{
        margin-top: 10px;
    }
`