import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { MenuBurguer } from "../menuburguer";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { JoysContext } from "../../contexts/JoysContext";

export const Header = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const location = useLocation()

    const { isAuthenticated, user } = useContext(AuthContext)
    const { getBalance, balance, loadingJoy } = useContext(JoysContext)

    useEffect(() => {
        getBalance()
    }, [balance])


    return (
        <>
            {openMenu && <Overlay onClick={toggleMenu} />}
            <HeaderElement >
                <div className="leftColumn">
                    <div className="menuBtn" onClick={toggleMenu}>
                        <span className="material-symbols-outlined icon">
                            menu
                        </span>
                    </div>
                    <h1 className="headerTitle">JOY <span className="logo">System</span></h1>
                    <nav className="navBar">
                        <ul>
                        <Link to="/">
                                <li
                                    className={location.pathname === '/' ? 'highlight' : ''}
                                >
                                    Home
                                </li>
                            </Link>
                            <Link to="/quests">
                                <li
                                    className={location.pathname === '/quests' ? 'highlight' : ''}
                                >
                                    Metas
                                </li>
                            </Link>
                            <Link to="/notes">
                                <li
                                    className={location.pathname === '/notes' ? 'highlight' : ''}
                                >
                                    Notas
                                </li>
                            </Link>
                            <Link to="/store">
                                <li
                                    className={location.pathname === '/store' ? 'highlight' : ''}
                                >
                                    JoyStore
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
                <nav className="rightColumn">
                    <Link to="/user" className="settingsLink">
                        <span className="material-symbols-outlined icon">
                            settings
                        </span>
                    </Link>
                    {isAuthenticated && user?.username ? (
                        <Link className="userSetup" to="/user">{user?.username} <span className="material-symbols-outlined icon">
                            paid
                        </span>  {loadingJoy ? '0' : balance}</Link>
                    ) : (
                        <Link className="signIn" to="/login">Sign In</Link>
                    )}
                </nav>

                <MenuBurguer active={openMenu} toggleMenu={toggleMenu} />
            </HeaderElement>
        </>
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

const HeaderElement = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    transition: 0.25s ease-in-out;
    background: #00041a;
    color: white;
    };

    .headerTitle{
        font-size: 1.5rem;
        color: var(--secondary);
    }
    .logo{
        opacity: 0.5;
        font-size: 15px;
    }
    .menuBtn{
        cursor: pointer;
        color: var(--secondary)
    }
    .leftColumn{
        display: flex;
        align-items: center;
        gap: 40px;
    }
    .leftColumn .navBar{
        display: flex;
    }
    .leftColumn .navBar ul{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .leftColumn .navBar ul li{
        cursor: pointer;
        opacity: 0.7;
        &:hover{
            opacity: 1;
        }
    }

    .leftColumn .navBar ul li.highlight{
        opacity: 1;
    }
    .rightColumn{
        align-items: center;
        display: flex;
        gap: 10px;
    }
    .rightColumn .icon{
        cursor: pointer;
        color: var(--secondary);
    }
    .rightColumn .settingsLink{
        height: 24px;
    }
    .rightColumn .signIn{
        background: black;
        color: white;
        padding: 10px 28px;
        font-size: 14px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }
    .rightColumn .userSetup{
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
    }
    
    @media(max-width: 768px){
        .headerTitle{
            display: none;
        }
    }

    @media(max-width: 450px){
        padding: 15px;

        .logo{
            font-size: 10px;
        }
        .userSetup{
            display: none !important;
        }
    }
`