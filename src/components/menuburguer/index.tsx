import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface MenuBurguerProps {
    active: boolean;
    collapsed: boolean;
    toggleCollapse: () => void;
}

export const MenuBurguer = ({ active, collapsed, toggleCollapse }: MenuBurguerProps) => {
    return (
        <MenuContainer $active={active} $collapsed={collapsed}>
            <div className="menu-header">
                {!collapsed && (
                    <p className="headerTitle">JOY <span className="logo">System</span></p>
                )}
                {/* <span className="material-symbols-outlined close-icon" onClick={toggleMenu}>
                    close
                </span> */}
            </div>

            <CollapseToggle onClick={toggleCollapse}>
                <span className="material-symbols-outlined">
                    {collapsed ? "chevron_right" : "chevron_left"}
                </span>
            </CollapseToggle>

            {active && (
                <ul className="menu-nav">
                    <NavItem to="/dashboard" collapsed={collapsed} label="Home" icon="home" />
                    <NavItem to="quests" collapsed={collapsed} label="Tarefas" icon="stack"  />
                    <NavItem to="store" collapsed={collapsed} label="Loja" icon="shopping_cart"  />
                    <NavItem to="notes" collapsed={collapsed} label="Anotações" icon="edit"/>
                    <NavItem to="habits" collapsed={collapsed} label="Hábitos" icon="switch_access"  />
                    <NavItem to="calendar" collapsed={collapsed} label="Calendário" icon="calendar_today"  />
                    <NavItem to="user" collapsed={collapsed} label="Perfil" icon="person"  />
                </ul>
            )}
        </MenuContainer>
    );
};

const NavItem = ({ to, icon, label, collapsed }: any) => {
    const location = useLocation();
    const isActive = location.pathname.endsWith(to);

    return (
        <StyledLink to={to} $active={isActive} $collapsed={collapsed}>
            <span className="material-symbols-outlined">{icon}</span>
            {!collapsed && <li>{label}</li>}
        </StyledLink>
    );
};

const StyledLink = styled(Link)<{ $active: boolean; $collapsed: boolean }>`
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 5px;
    gap: ${props => (props.$collapsed ? '0' : '10px')};
    justify-content: ${props => (props.$collapsed ? 'center' : 'flex-start')};
    transition: 0.2s ease-in;
    color: white;
    text-decoration: none;
    background: ${props => (props.$active ? '#2f2f4f' : 'transparent')};

    &:hover {
        background: black;
        color: white;
    }
`;

const MenuContainer = styled.div<{ $active: boolean; $collapsed: boolean }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--primary, #1e1e2f);
    color: white;
    width: ${props => (props.$collapsed ? '80px' : '300px')};
    transition: width 0.3s ease;
    overflow: hidden;

    .menu-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid #333;

        .headerTitle {
            font-size: 1.5rem;
            font-weight: 700;
        }

        .logo {
            opacity: 0.5;
            font-size: 0.9rem;
        }

        .close-icon {
            cursor: pointer;
        }
    }

    .menu-nav {
        padding: 20px 10px;
        display: flex;
        flex-direction: column;
        gap: 5px;

        a {
            display: flex;
            align-items: center;
            padding: 15px 10px;
            border-radius: 6px;
            color: white;
            gap: ${props => (props.$collapsed ? '0' : '10px')};
            justify-content: ${props => (props.$collapsed ? 'center' : 'flex-start')};
            transition: background 0.2s ease;

            &:hover {
                background: #333;
            }

            li {
                list-style: none;
                display: ${props => (props.$collapsed ? 'none' : 'block')};
            }
        }
    }

    @media(max-width: 370px) {
        z-index: 9999;
    }
`;

const CollapseToggle = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    padding: 10px;
    cursor: pointer;
    align-self: flex-end;
`;