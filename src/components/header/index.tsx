import { useEffect, useState } from "react";
import styled from "styled-components"
import { MenuBurguer } from "../menuburguer";


export const Header = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openMenu]);

    return (
        <>
        {openMenu && <Overlay onClick={toggleMenu} />}
            <HeaderElement>
                <div className="leftColumn">
                    <div className="menuBtn" onClick={toggleMenu}>
                        <span className="material-symbols-outlined icon">
                            menu
                        </span>
                    </div>
                    <h1 className="headerTitle">JOY <span className="logo">System</span></h1>
                </div>
                <nav className="rightColumn">
                    <span className="material-symbols-outlined icon">
                        settings
                    </span>
                    <button className="signIn">Sign In</button>
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
        padding: 10px 30px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }
`