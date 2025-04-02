import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ThemeContext, themes } from "../../contexts/ThemeContext"
import { JoysContext } from "../../contexts/JoysContext"
import { JoysStoreProducts } from "../joysStoreProducts"
import { Transactions } from "../transactions"
import { ProductForm } from "../ProductForm"
import { Loading } from "../loading"
import { ProductContext } from "../../contexts/ProductContext"

export const JoysStore = () => {
    const { theme } = useContext(ThemeContext)
    const { balance } = useContext(JoysContext)
    const { loading } = useContext(ProductContext)
    const [open, setOpen] = useState<boolean>(false)

    const openCreateForm = () => {
        setOpen(true); 
    };
    const closeForm = () => {
        setOpen(false)
    }

    if(loading) return <Loading>Carregando..</Loading>

    return (
        <JoysStoreComponent $background={themes[theme].background} $black_to_white={themes[theme].black_to_white}>
            <div className="headerActionButtons">
                <div className="leftColumn">
                    <Link to="/quests" className="prevPage">
                        <span className="material-symbols-outlined arrowBack">
                            arrow_back
                        </span>
                    </Link>
                    <div>
                        <h1>Joys Store</h1>
                        <p className="description">Use seus Joys para conseguir prêmios exclusivos.</p>
                    </div>
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
                    <JoysStoreProducts />
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
            { open && (
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

const JoysStoreComponent = styled.section<{ $background: string, $black_to_white: string }>`
    width: 100%;
    background: ${({ $background }) => $background};
    padding: 50px;
    min-height: calc(100vh - 68px);
    height: 100%;
    color: ${({ $black_to_white }) => $black_to_white};
    display: flex;
    flex-direction: column;
    .headerActionButtons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 50px;
        color: ${({ $black_to_white }) => $black_to_white}; 
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