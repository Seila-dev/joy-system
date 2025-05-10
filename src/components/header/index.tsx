import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { JoysContext } from "../../contexts/JoysContext";

interface HeaderProps {
    showMenuButton?: boolean;
    onMenuClick?: () => void;
}

export const Header = ({ showMenuButton, onMenuClick }: HeaderProps) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const { getBalance, balance, loadingJoy } = useContext(JoysContext);

    useEffect(() => {
        getBalance();
    }, [balance]);

    return (
        <HeaderElement>
            <div className="leftColumn">
                {showMenuButton && (
                    <MenuButton onClick={onMenuClick} aria-label="Toggle menu">
                        <span className="material-symbols-outlined">menu</span>
                    </MenuButton>
                )}
                <h1 className="headerTitle">JOY <span className="logo">System</span></h1>
            </div>
            <nav className="rightColumn">
                {isAuthenticated && user?.username ? (
                    <Link className="userSetup" to="user">
                        {loadingJoy ? '#' : balance}
                        <span className="material-symbols-outlined icon">paid</span> 
                        {user?.username}
                    </Link>
                ) : (
                    <Link className="signIn" to="/login">Sign In</Link>
                )}
                <Link to="user" className="settingsLink">
                    <span className="material-symbols-outlined icon userProfile">person</span>
                </Link>
            </nav>
        </HeaderElement>
    );
};

const MenuButton = styled.button`
    background: none;
    border: none;
    color: var(--secondary, #fff);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    &:active {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .material-symbols-outlined {
        font-size: 24px;
    }
`;

const HeaderElement = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    transition: 0.25s ease-in-out;
    background: #00041a;
    color: white;
    position: sticky;
    top: 0;
    z-index: 10;

    .headerTitle {
        font-size: 1.5rem;
        color: var(--secondary, #fff);
        margin: 0;
    }
    
    .logo {
        opacity: 0.5;
        font-size: 15px;
    }
    
    .leftColumn {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    
    .leftColumn .navBar {
        display: flex;
    }
    
    .leftColumn .navBar ul {
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 0;
        padding: 0;
    }
    
    .leftColumn .navBar ul li {
        cursor: pointer;
        opacity: 0.7;
        &:hover {
            opacity: 1;
        }
    }

    .leftColumn .navBar ul li.highlight {
        opacity: 1;
    }
    
    .rightColumn {
        align-items: center;
        display: flex;
        gap: 15px;
    }
    
    .rightColumn .icon {
        cursor: pointer;
        color: var(--secondary, #fff);
    }
    
    .rightColumn .userProfile {
        background: var(--secondary, #fff);
        border-radius: 50%;
        font-size: 18px;
        font-weight: 400;
        color: #00041a;
        transform: translateY(0);
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .rightColumn .signIn {
        background: black;
        color: white;
        padding: 10px 28px;
        font-size: 14px;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        &:hover {
            background-color: #222;
        }
    }
    
    .rightColumn .userSetup {
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
        text-decoration: none;
    }
    
    .rightColumn .settingsLink {
        text-decoration: none;
    }
    
    @media(max-width: 850px) {
        .leftColumn .navBar {
            display: none;
        }
    }
    
    @media(max-width: 768px) {
        padding: 15px 25px;
        
        .headerTitle {
            font-size: 18px;
        }
    }

    @media(max-width: 450px) {
        padding: 15px;

        .logo {
            font-size: 10px;
        }
        
        .userSetup {
            display: none !important;
        }
    }
`;