import styled from "styled-components"

export const JoysStoreProducts = () => {


    return (
       <>
            <ProductElement>
                <div className="highlight">
                    <span className="highlightSpan">Em destaque</span>
                </div>
                <h3 className="title">Tema Dark Premium</h3>
                <p className="description">Desbloqueie o tema escuro premium para a interface</p>
                <div className="footer">
                    <div className="joys">
                        <span className="material-symbols-outlined icon">
                            paid
                        </span>
                        <p>25</p>
                    </div>
                    <p className="description">1 Disponível</p>
                </div>
                <button className="purchaseBtn">
                    <span className="material-symbols-outlined icon">
                        shopping_cart
                    </span>
                    <p>Comprar</p>
                </button>
            </ProductElement>
            <ProductElement>
                <div className="highlight">
                    <span className="highlightSpan">Em destaque</span>
                </div>
                <h3 className="title">Tema Dark Premium</h3>
                <p className="description">Desbloqueie o tema escuro premium para a interface</p>
                <div className="footer">
                    <div className="joys">
                        <span className="material-symbols-outlined icon">
                            paid
                        </span>
                        <p>25</p>
                    </div>
                    <p className="description">1 Disponível</p>
                </div>
                <button className="purchaseBtn">
                    <span className="material-symbols-outlined icon">
                        shopping_cart
                    </span>
                    <p>Comprar</p>
                </button>
            </ProductElement>
            <ProductElement>
                <div className="highlight">
                    <span className="highlightSpan">Em destaque</span>
                </div>
                <h3 className="title">Tema Dark Premium</h3>
                <p className="description">Desbloqueie o tema escuro premium para a interface</p>
                <div className="footer">
                    <div className="joys">
                        <span className="material-symbols-outlined icon">
                            paid
                        </span>
                        <p>25</p>
                    </div>
                    <p className="description">1 Disponível</p>
                </div>
                <button className="purchaseBtn">
                    <span className="material-symbols-outlined icon">
                        shopping_cart
                    </span>
                    <p>Comprar</p>
                </button>
            </ProductElement>
    </>
    )
    
}

const ProductElement = styled.div`
    background: transparent;
    border: 1px solid var(--secondary);
    border-radius: 5px;
    padding: 20px;
    .highlight{
        display: flex;
        margin-bottom: 10px;
    }
    .description{
        margin: 10px 0;
    }
    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
    }
    .footer .joys{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .purchaseBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        padding: 10px;
        background: var(--secondary);
        color: black;
        width: 100%;
        font-weight: 700;
        font-size: 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        gap: 10px;
    }
    .purchaseBtn .icon{
        font-size: 18px;
    }

`