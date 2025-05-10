import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SideNav = () => {
    return (
        <NavContainer>
            <NavItem to="/">Início</NavItem>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/settings">Configurações</NavItem>
        </NavContainer>
    );
};

const NavContainer = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const NavItem = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-size: 1.1rem;

    &.active {
        font-weight: bold;
        text-decoration: underline;
    }

    &:hover {
        opacity: 0.8;
    }
`;
