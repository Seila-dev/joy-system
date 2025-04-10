import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { JoysContext } from "../../contexts/JoysContext"
import { JoysStoreProducts } from "../joysStoreProducts"
import { Transactions } from "../transactions"
import { ProductForm } from "../ProductForm"
import { Loading } from "../loading"
import { ProductContext } from "../../contexts/ProductContext"

export const JoysStore = () => {
    const { balance } = useContext(JoysContext)
    const { loading } = useContext(ProductContext)
    const [open, setOpen] = useState<boolean>(false)

    const openCreateForm = () => {
        setOpen(true);
    };
    const closeForm = () => {
        setOpen(false)
    }

    if (loading) return <Loading>Carregando..</Loading>

    return (
        <JoysStoreComponent>
            <Link to="/dashboard" className="prevPage">
                <span className="material-symbols-outlined arrowBack">
                    arrow_back
                </span>
                <p>Voltar para Home</p>
            </Link>
            <div className="headerActionButtons">
                <div className="leftSide">
                    <h1 className="title">JoyStore</h1>
                    <p className="description">Gerencie e acompanhe suas tarefas em diferentes categorias para ganhar recompensas.</p>
                </div>
                <div className="rightColumn">
                    <span className="material-symbols-outlined icon">
                        paid
                    </span>
                    {balance}
                </div>
            </div>
            <section className="body">
                <div className="products">
                    <div className="productSectionHeader">
                        <h2>Produtos disponíveis</h2>
                        <button onClick={() => openCreateForm()}>                    <span className="material-symbols-outlined icon">
                            add
                        </span></button>
                    </div>
                    <div className="gridContainer">
                        <JoysStoreProducts active={true} />
                    </div>
                    <div>
                        <div className="productSectionHeader">
                            <h2>Produtos inativos</h2>
                        </div>
                        <div className="gridContainer">
                            <JoysStoreProducts active={false} />
                        </div>
                    </div>
                </div>


                <div className="joysHistory">
                    <h2>Histórico de Joys - Recentes</h2>
                    <div className="gridContainer history">
                        <Transactions limit={3} />
                    </div>
                </div>

            </section>
            {open && <Overlay onClick={() => closeForm()} />}
            {open && (
                <ProductForm
                    onClose={closeForm}
                    mode='create'
                />
            )}

        </JoysStoreComponent>
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

const JoysStoreComponent = styled.section`
    background: transparent;
    padding: 10px 50px;
    min-height: calc(100vh - 68px);
    height: 100%;
    color: #e0e4ff;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;

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
    .headerActionButtons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 30px 0;
        color: #e0e4ff;
    }
    .headerActionButtons .leftColumn{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .headerActionButtons .rightColumn{
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .body {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
    }
    .body h2{
        margin-bottom: 25px;
    }
    .productSectionHeader{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .productSectionHeader button{
        padding: 10px;
        cursor: pointer;
        background: var(--secondary);
        border: none;
        border-radius: 5px;
        font-weight: 700;
        font-size: 12px;
        width: fit-content;
        color: white;
        display: flex;
        align-items: center;
    }
    .productSectionHeader button .icon{
        font-size: 18px;
    }

    .gridContainer{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        width: 100%;
        margin-bottom: 30px;
    }    
    .gridContainer.history{
        grid-template-columns: 1fr;
    }

    @media(max-width: 1000px){
        .gridContainer{
            grid-template-columns: 1fr;
        }
    }
    @media(max-width: 768px){
        .body{
            display: flex;
            flex-direction: column-reverse;
            flex-wrap: wrap;
        }
        padding: 15px;

        .products{
            width: 100%;
        }
        .gridContainer{
            grid-template-columns: 1fr 1fr;
        }
    }

    @media(max-width: 550px){

        .gridContainer{
            grid-template-columns: 1fr;
        }
    }
`