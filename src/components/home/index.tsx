import styled from "styled-components"
import { Introduction } from "../introduction"
import { TodoList } from "../todo-list"
import { Notes } from "../notes"
import { Calendar } from "../calendar"
import { Toaster } from "sonner"

export const Home = () => {
    return (
        <Main >
            <Toaster theme="dark"></Toaster>
            <Introduction />
            <Dashboard >
                <div className="leftContent">
                    <TodoList />
                    <Notes />
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
    background: linear-gradient(to bottom right, #000, #00041a)
`

const Dashboard = styled.section`
    gap: 30px;
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    width: 100%;
    .leftContent, .rightContent{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .leftContent{
        width: 100%;
    }

    @media(max-width: 450px){
        padding: 20px;
    }
`