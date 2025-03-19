import styled from "styled-components"
import { Introduction } from "../introduction"
import { TodoList } from "../todo-list"


export const Home = () => {

    return (
        <Main>
            <Introduction />
            <Dashboard>
                <TodoList />
            </Dashboard>
        </Main>
    )
}

const Main = styled.main`
    padding: 20px 50px;
`

const Dashboard = styled.section`

`