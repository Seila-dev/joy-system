import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { JoysContext } from "../../contexts/JoysContext"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Transactions } from "../transactions"
import api from "../../services/api"
import { parseCookies } from "nookies"
import { PurchaseItem } from "../../types/joyData"
import { Loading } from "../loading"

export const UserPage = () => {
    const { user, isAuthenticated, signOut } = useContext(AuthContext)
    const { balance, loadingJoy } = useContext(JoysContext)
    const [userInfo, setUserInfo] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [userProducts, setUserProducts] = useState<PurchaseItem[]>([])

    const toggleWindow = () => {
        setUserInfo(!userInfo)
    }

    useEffect(() => {
        const loadProducts = async (userId: string | number) => {
            try {
                const { 'joysystem.token': token } = parseCookies();
                setLoading(true)
                const response = await api.get(`/users/${userId}/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUserProducts(response.data)
            } catch (error) {
                console.error('Failed to load products', error)
            } finally {
                setLoading(false)
            }
        }

        if(user?.id) {
            loadProducts(user.id)
        }

    }, [user])

    if(loading) return <Loading><h2>Carregando.. Verifique se você está logado ou com internet.</h2></Loading>

    return (
        <UserElement>
            <div className="headerActionButtons">
                <Link to="/dashboard" className="prevPage">
                    <span className="material-symbols-outlined arrowBack">
                        arrow_back
                    </span>
                    <p>Voltar para Home</p>
                </Link>
                <div className="controllers">
                    <button className={userInfo === false ? 'active' : ''} onClick={() => toggleWindow()}>Usuário</button>
                    <button className={userInfo === true ? 'active' : ''} onClick={() => toggleWindow()}>Transações</button>
                </div>
            </div>
            {userInfo === false ? (
                <div className="userContainer">
                    <nav>
                        <p className="description">Seu nome de usuário</p>
                        <h2>{user?.username}</h2>
                        <p className="description">Seu email</p>
                        <h2>{user?.email}</h2>

                        {isAuthenticated && user?.username ? (
                            <p className="userSetup">Seus joys: <span className="alignUserContent">
                                <span className="material-symbols-outlined icon">
                                    paid
                                </span>  {loadingJoy ? '0' : balance}
                            </span></p>
                        ) : (
                            <Link className="signIn" to="/login">Sign In</Link>
                        )}
                        <div className="purchaseHistory">
                            <h2 className="title">Seus itens</h2>
                            <p className="description">Itens que você comprou na Joy Store</p>
                            {userProducts && userProducts.map(product => (
                                <div key={product.id} className="purchaseItem">
                                    <h3>{product.product.name}</h3>
                                    <p className="description">{product.product.description}</p>
                                    <p>{product.isActive ? 'Produto ativo' : 'Produto já expirou.'}</p>
                                    <p>Data de compra: {new Date(product.purchasedAt).toLocaleString('pt-BR')}</p>
                                    <p>Expira em: {new Date(product.expiresAt).toLocaleString('pt-BR')}</p>
                                </div>
                            ))}
                        </div>
                    </nav>
                    <div className="logout"><button className="logout" onClick={() => signOut()}>Sair da conta</button></div>
                </div>
            ) : (
                <Transactions limit={50} />
            )}
        </UserElement >
    )
}

const UserElement = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    background: transparent;
    color: #fff;
    position: relative;
    width: 100%;
    padding: 30px;

    .headerActionButtons{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
    }
    .headerActionButtons .controllers button{
        padding: 8px 20px;
        background: none;
        border: none;
        width: fit-content;
        cursor: pointer;
        color: white;
    }
    .headerActionButtons .controllers button.active{
        border-bottom: 1px solid var(--secondary);
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
        color: #fff;
        &:hover{
            border-bottom: 1px solid var(--secondary);
        }
    }
    .prevPage span{
        font-size: 20px;
    }
    .userContainer{
        max-width: 800px;
        width: 100%;
        height: 100%;
        background: var(--primary);
        padding: 30px;
        margin-top: 10px;
        border-radius: 10px;
    }
    .userContainer h2{
        margin: 5px 0 20px 0;
    }
    .userContainer .userSetup{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .userContainer .logout{
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }
    .userContainer .logout button{
        border: none;
        border-radius: 5px;
        cursor: pointer;
        justify-content: center;
        background: red;
        color: white;
        padding: 10px 20px;
        max-width: 150px;
        width: 100%;
    }
    .alignUserContent{
        align-items: center;
        display: flex;
        gap: 5px;
        font-weight: 800;
    }

    .purchaseHistory{
        border: 1px solid #fff93d30;
        width: fit-content;
        padding: 20px;
        border-radius: 10px;
    }

    .purchaseHistory .title{
        margin: 0 0 5px 0;
    }

    .purchaseHistory .purchaseItem{
        border-radius: 5px;
        padding: 15px 20px;
        width: 100%;
        max-width: 350px;
        display: flex;
        flex-direction: column;
        margin: 15px 0;
        background: transparent;
        border: 1px solid #fff93d1c;
        gap: 5px;
    }

    .purchaseHistory .purchaseItem p.description{
        margin-bottom: 10px;
    }


    @media(max-width: 480px){
        .controllers{
            width: 100%;
        }
        .headerActionButtons{
            flex-direction: column;
        }
        .headerActionButtons .controllers button{
            width: 50%;
        }
        .prevPage{
            width: 100%;
        }
    }
`
