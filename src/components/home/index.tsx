import styled from "styled-components"
import { Introduction } from "../introduction"
import { TodoList } from "../todo-list"
import { Notes } from "../notes"
import { Calendar } from "../calendar"


export const Home = () => {

    return (
        <Main>
            <Introduction />
            <Dashboard>
                <div className="leftContent">
                    <TodoList />
                    <Notes />
                </div>
                <Calendar />
                
            </Dashboard>
        </Main>
    )
}

const Main = styled.main`
    padding: 20px 50px;

    @media(max-width: 450px){
        padding: 15px;
    }
`

const Dashboard = styled.section`
    gap: 30px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    //grid-template-columns: repeat(auto-fit, 400px);
    //grid-template-rows: 1fr 1fr;
    //grid-template-columns: 1fr 1fr; 
    .leftContent{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }


`