import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import api from "../../services/api"
import { JoyStoreItem } from "../../types/joyData"
import { AuthContext } from "../../contexts/AuthContext"
import { JoysContext } from "../../contexts/JoysContext"
import { toast, Toaster } from "sonner"
import { parseCookies } from "nookies"

export const JoysStoreProducts = () => {
    const [products, setProducts] = useState<JoyStoreItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { user } = useContext(AuthContext)
    const { balance, getBalance } = useContext(JoysContext)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true)
                const response = await api.get('/store/products')
                setProducts(response.data)
                console.log(balance)
                getBalance()
            } catch (error) {
                console.error('Failed to load products', error)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
        console.log(balance)

    }, [])

    const handlePurchase = async (product: JoyStoreItem) => {
        try {
          if (!user) {
            toast.error('Please login to purchase items');
            return;
          }
    
          if ((balance ? balance : 0) < product.price) {
            toast.error(`Not enough Joy! You need ${product.price} Joy for this item.`);
            return;
          }
    
          const confirmed = window.confirm(
            `Do you want to purchase ${product.name} for ${product.price} Joy?`
          );
    
          if (confirmed) {
            const { 'joysystem.token': token } = parseCookies();
            await api.post('/store/purchase', { userId: user.id, productId: product.id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(`Successfully purchased ${product.name}!`);
          }
        } catch (error: any) {
          console.error('Purchase failed:', error);
          toast.error(error.response?.data?.error || 'Failed to complete purchase');
        }
      };
    

    if (loading) return <p>Carregando</p>



    return (
        <>
        
            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                products.map((product) => (
                    
                    <ProductElement key={product.id}>
                        <Toaster></Toaster>
                        <div className="highlight">
                            <span className={product.featured ? 'highlightSpan' : ''}>{product.featured ? 'Em destaque' : ''}</span>
                        </div>
                        <h3 className="title">{product.name}</h3>
                        <p className="description">{product.description}</p>
                        <div className="footer">
                            <div className="joys">
                                <span className="material-symbols-outlined icon">
                                    paid
                                </span>
                                <p>{product.price}</p>
                            </div>
                            <p className="description">1 Disponível (...)</p>
                        </div>
                        <button 
                            className={!user ? 'purchaseBtn stopActions' : (balance ? balance : 0) < product.price ? 'purchaseBtn stopActions' : 'purchaseBtn'} onClick={() => {handlePurchase(product); console.log(product.id)}} 
                            disabled={!user || (balance ? balance: 0) < product.price} 
                        >
                            <span className="material-symbols-outlined icon">
                                shopping_cart
                            </span>
                            <p > {!user ? 'Login to Buy' : (balance ? balance : 0) < product.price ? 'Saldo Joy Insuficiente' : 'Purchase'}</p>
                        </button>
                    </ProductElement>
                ))
            )}

        </>
    )

}

const ProductElement = styled.div`
    background: transparent;
    border: 1px solid var(--secondary);
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    .purchaseBtn.stopActions{
        opacity: 0.2;
        user-select: none;
        pointer-events: none;
        cursor: inherit;
    }

`