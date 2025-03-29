import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { JoysContext } from "../../contexts/JoysContext"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ThemeContext, themes } from "../../contexts/ThemeContext"
import { Transactions } from "../transactions"

export const UserPage = () => {
    const { user, isAuthenticated, signOut } = useContext(AuthContext)
    const { balance, loadingJoy } = useContext(JoysContext)
    const { theme } = useContext(ThemeContext)
    const [userInfo, setUserInfo] = useState<boolean>(false)

    const toggleWindow = () => {
        setUserInfo(!userInfo)
    }

    return (
        <UserElement $black_to_white={themes[theme].black_to_white} $background={themes[theme].background} $object={themes[theme].object}>
            <div className="headerActionButtons">
                <Link to="/" className="prevPage">
                    <span className="material-symbols-outlined arrowBack">
                        arrow_back
                    </span>
                    <p>Back to Home</p>
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
                    </nav>
                    <div className="logout"><button className="logout" onClick={() => signOut()}>Sair da conta</button></div>
                </div>
            ) : (
                <Transactions limit={50} />
            )}
        </UserElement >
    )
}

const UserElement = styled.main<{ $black_to_white: string, $background: string, $object: string }>`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    background: ${({ $background }) => $background};
    color: ${({ $black_to_white }) => $black_to_white};
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
        color: ${({ $black_to_white }) => $black_to_white};
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
        color: ${({ $black_to_white }) => $black_to_white};
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
        background: ${({ $object }) => $object};
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
