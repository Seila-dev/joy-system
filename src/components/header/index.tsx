import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { MenuBurguer } from "../menuburguer";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import Switch from 'react-switch'
import { JoysContext } from "../../contexts/JoysContext";


export const Header = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const { isAuthenticated, user } = useContext(AuthContext)
    const { getBalance, balance, loadingJoy } = useContext(JoysContext)

    useEffect(() => {
        getBalance()
    })

    const themeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const allTheme = themes[theme]

    return (
        <>
        {openMenu && <Overlay onClick={toggleMenu} />}
            <HeaderElement $background={allTheme.background} $black_to_white={allTheme.black_to_white} $emphasize_less={allTheme.emphasize_less} >
                <div className="leftColumn">
                    <div className="menuBtn" onClick={toggleMenu}>
                        <span className="material-symbols-outlined icon">
                            menu
                        </span>
                    </div>
                    <h1 className="headerTitle">JOY <span className="logo">System</span></h1>
                </div>
                <nav className="rightColumn">
                    <Switch 
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor={'#222'}
                        onChange={themeToggle}
                        checked={theme === 'dark'}
                        width={50}
                        height={20}
                    />
                    {/* <button className="toggleTheme" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Mudar tema</button> */}
                    <span className="material-symbols-outlined icon">
                        settings
                    </span>
                    {isAuthenticated && user?.username ? (
                        <p className="userSetup">{user?.username} <span className="material-symbols-outlined icon">
                        paid
                    </span>  {loadingJoy ? '0' : balance}</p>
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

const HeaderElement = styled.header<{ $background: string, $black_to_white: string, $emphasize_less: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    transition: 0.25s ease-in-out;
    background: ${({ $background }) => $background};
    color: ${({ $emphasize_less }) => $emphasize_less};

    .headerTitle{
        font-size: 1.5rem;
    }
    .logo{
        opacity: 0.5;
        font-size: 15px;
    }
    .menuBtn{
        cursor: pointer;
    }
    .leftColumn{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .rightColumn{
        align-items: center;
        display: flex;
        gap: 10px;
    }
    .rightColumn .icon{
        cursor: pointer;
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
    }

    @media(max-width: 450px){
        padding: 15px;

        .headerTitle{
            font-size: 20px;
        }
        .logo{
            font-size: 10px;
        }
    }
`