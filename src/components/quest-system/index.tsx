import { Link } from "react-router-dom"
import styled from "styled-components"

export const QuestSystem = () => {

    return (
        <QuestComponent>
            <Link to="/" className="prevPage">
                <span className="material-symbols-outlined arrowBack">
                    arrow_back
                </span>
                <p>Back to Home</p>
            </Link>
            <Introduction>
                <div className="leftSide">
                    <h1 className="title">Quests</h1>
                    <p className="description">Gerencie e acompanhe suas tarefas em diferentes categorias.</p>
                </div>
                <div className="rightSide">
                    <button className="addQuest btn cta"><span className="material-symbols-outlined icon">add</span> <span className="removeResponsive">New Quest</span></button>
                </div>
            </Introduction>
            <Filters>
                <div className="filterByDate">
                    <button className="filterItem selected">Todas</button>
                    <button className="filterItem">Diária</button>
                    <button className="filterItem">Semanal</button>
                    <button className="filterItem">Mensal</button>
                    <button className="filterItem">Anual</button>
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
                    />
                </div>
            </Filters>
            <CardsContainer>
                <div className="card">
                    <div className="header">
                        <div className="category daily">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Daily</p>
                        </div>
                        <div className="options">
                            <span className="material-symbols-outlined icon">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div className="body">
                        <h3 className="title">Completar o treino da academia</h3>
                        <p className="description">30 minutos de exercicios matinais para continuar saúdavel e energizado para o dia todo.</p>
                        <div className="limit">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Até: Março 20, 2025</p>
                        </div>
                    </div>
                    <div className="footer completed">
                        <div className="status" >
                            <span className="circleProgress"></span>
                            <p >Completed</p>
                        </div>
                        <button className="setStatus"><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                    </div>
                </div>
                <div className="card">
                    <div className="header">
                        <div className="category weekly">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Weekly</p>
                        </div>
                        <div className="options">
                            <span className="material-symbols-outlined icon">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div className="body">
                        <h3 className="title">Aplicar para o total de 70 vagas</h3>
                        <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, deleniti. Id, totam aspernatur numquam ratione voluptatum molestiae ut consequatur reiciendis iure, ullam possimus, delectus tenetur ducimus repudiandae iusto deleniti at!</p>
                        <div className="limit">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Até: Março 27, 2025</p>
                        </div>
                    </div>
                    <div className="footer pending">
                        <div className="status" >
                            <span className="circleProgress"></span>
                            <p>Pending</p>
                        </div>
                        <button className="setStatus"><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                    </div>
                </div>
                <div className="card">
                    <div className="header">
                        <div className="category yearly">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Yearly</p>
                        </div>
                        <div className="options">
                            <span className="material-symbols-outlined icon">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div className="body">
                        <h3 className="title">Passar de ano</h3>
                        <p className="description">Estudar o suficiente para a escola e conseguir passar de ano para obter meu diploma.</p>
                        <div className="limit">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Até: Dezembro 25, 2025</p>
                        </div>
                    </div>
                    <div className="footer pending">
                        <div className="status" >
                            <span className="circleProgress"></span>
                            <p>Pending</p>
                        </div>
                        <button className="setStatus"><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                    </div>
                </div>
                <div className="card">
                    <div className="header">
                        <div className="category monthly">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Monthly</p>
                        </div>
                        <div className="options">
                            <span className="material-symbols-outlined icon">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div className="body">
                        <h3 className="title">Comprar whey protein e colocar o treino 3X2 em prática</h3>
                        <p className="description">30 minutos de exercicios matinais para continuar saúdavel e energizado para o dia todo.</p>
                        <div className="limit">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Até: Abril 12, 2025</p>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="status" >
                            <span className="circleProgress"></span>
                            <p >Not working</p>
                        </div>
                        <button className="setStatus"><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                    </div>
                </div>
                <div className="card">
                    <div className="header">
                        <div className="category daily">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Daily</p>
                        </div>
                        <div className="options">
                            <span className="material-symbols-outlined icon">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div className="body">
                        <h3 className="title">Completar o treino da academia</h3>
                        <p className="description">30 minutos de exercicios matinais para continuar saúdavel e energizado para o dia todo.</p>
                        <div className="limit">
                            <span className="material-symbols-outlined icon">
                                calendar_clock
                            </span>
                            <p>Até: Março 20, 2025</p>
                        </div>
                    </div>
                    <div className="footer completed">
                        <div className="status" >
                            <span className="circleProgress"></span>
                            <p >Completed</p>
                        </div>
                        <button className="setStatus"><span className="material-symbols-outlined icon">check_circle</span>Status</button>
                    </div>
                </div>
                
            </CardsContainer>
        </QuestComponent>
    )
}

const QuestComponent = styled.main`
    padding: 10px 50px;
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
        &:hover{
            border-bottom: 1px solid var(--tertiary);
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
    .btn{
        padding: 12px 16px;
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 130px;
        border-radius: 5px;
        background: var(--background);
        margin-top: 10px;
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
        // .btn .removeResponsive{
        //     display: none;
        // }
        .btn{
            width: fit-content;
        }
        .rightSide{
            margin-top: 10px;
            width: 100%;
        }
        // .btn .icon{
        //     margin: 0;
        // }
    }
`

const Filters = styled.div`
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
        border-radius: 5px;
        background: whitesmoke;
    }
    .filterItem.selected{
        border-bottom: 1px solid var(--tertiary);
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
    }
`

const CardsContainer = styled.section`
    display: grid;
    //background: orangered;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    height: 100%;
    .card{
        background: white;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        padding: 25px;
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
    }
    .card .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        width: 100%;
    }
    .card .header .category{
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 30px;
    }
    .card .header .category .icon{
        font-size: 18px;
    }
    .card .header .options .icon{
        cursor: pointer;
    }
    .card .body .description{
        margin: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
                line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
    .card .body .limit{
        display: flex;
        font-size: 12px;
        align-items: center;
        gap: 5px;
        opacity: 0.6;
    }
    .card .body .limit .icon{
        font-size: 18px;
    }
    .card .footer{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 100%;
    }
    .card .footer .status{
        display: flex;
        align-items: center;
        font-size: 15px;
        color: gray;
        margin-bottom: 3px;
    }
    .card .footer .status .circleProgress{
        width: 10px;
        height: 10px;
        background: gray;
        display: flex;
        border-radius: 50%;
        margin-right: 5px;
    }
    .card .footer .setStatus{
        display: flex;
        align-items: center;
        padding: 5px 10px;
        border: 1px solid gray;
        border-radius: 10px;
        background: transparent;
        cursor: pointer;
    }
    .card .footer .setStatus .icon{
        font-size: 14px;
        margin-right: 5px;
    }

    //vars
    .card .footer.completed .setStatus{
        color: green;
    }
    .footer.completed p{
        color: green;
    }
    .card .footer.completed .circleProgress{
        background: green;
    }
    .card .footer.pending .setStatus{
        color: orangered;
    }
    .footer.pending p{
        color: orangered;
    }
    .card .footer.pending .circleProgress{
        background: orangered;
    }
    .card .footer.incomplete .setStatus{
        color: red;
    }
    .footer.incomplete p{
        color: red;
    }
    .card .footer.incomplete .circleProgress{
        background: red;
    }
    .category.daily{
        background: lightblue;
        color: darkblue;
    }
    .category.weekly{
        background: lightgreen;
        color: green;
    }
    .category.monthly{
        background: orange;
        color: red;
    }
    .category.yearly{
        background: purple;
        color: violet;
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
    @media(max-width: 530px){
        grid-template-columns: 1fr;
    }
`