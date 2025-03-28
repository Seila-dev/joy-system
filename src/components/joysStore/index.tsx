import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ThemeContext, themes } from "../../contexts/ThemeContext"
import { JoysContext } from "../../contexts/JoysContext"
import { JoysStoreProducts } from "../joysStoreProducts"
import { Transactions } from "../transactions"

export const JoysStore = () => {
    const { theme } = useContext(ThemeContext)
    const { getBalance, balance } = useContext(JoysContext)

    useEffect(() => {
        getBalance()
    }, [])

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
                        <button>                    <span className="material-symbols-outlined icon">
                        add
                    </span>Adicionar Produto</button>
                    </div>
                    <GridContainer>
                        <JoysStoreProducts />
                    </GridContainer>
                </div>
                <div className="joysHistory">
                    <h2>Histórico de Joys</h2>
                    <GridContainer>
                    <Transactions />
                    </GridContainer>
                </div>
            </section>

        </JoysStoreComponent>
    )
}

const JoysStoreComponent = styled.section<{ $background: string, $black_to_white: string }>`
    width: 100%;
    background: ${({ $background }) => $background};
    padding: 20px;
    min-height: calc(100vh - 77px);
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
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .body h2{
        margin-bottom: 15px;
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
        min-width: 100px;
        width: fit-content;
        display: flex;
        align-items: center;
    }
    .productSectionHeader button .icon{
        font-size: 18px;
    }
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;

    @media(max-width: 1000px){
        grid-template-columns: 1fr;
    }
`