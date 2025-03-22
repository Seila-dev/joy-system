import styled from "styled-components"
import { Introduction } from "../introduction"
import { TodoList } from "../todo-list"
import { Notes } from "../notes"
import { Calendar } from "../calendar"
import { JoyPoints } from "../joy-points"


export const Home = () => {

    return (
        <Main>
            <Introduction />
            <Dashboard>
                <div className="leftContent">
                    <TodoList />
                    <Notes />
                </div>
                <div className="rightContent">
                    <Calendar />
                    <JoyPoints />
                </div>
            </Dashboard>
        </Main>
    )
}

const Main = styled.main`
    overflow-x: hidden;
`

const Dashboard = styled.section`
    gap: 30px;
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    

    width: 100%;
    //grid-template-columns: repeat(auto-fit, 400px);
    //grid-template-rows: 1fr 1fr;
    //grid-template-columns: 1fr 1fr; 
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