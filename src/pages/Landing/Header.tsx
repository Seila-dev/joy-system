import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #00041a;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 15px 0;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  
  span {
    color: ${props => props.theme.colors.primary};
    font-size: 15px;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a<{ active: boolean }>`
  font-weight: 500;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  transition: color 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const SignUpButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

interface HeaderProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, scrollToSection }) => {
  return (
    <HeaderContainer>
      <NavContainer>
        <Logo>JOY<span>System</span></Logo>
        <NavLinks>
          <NavLink 
            href="#features" 
            active={activeSection === 'features'} 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
          >
            Recursos
          </NavLink>
          <NavLink 
            href="#quests" 
            active={activeSection === 'quests'}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('quests');
            }}
          >
            Quests
          </NavLink>
          <NavLink 
            href="#joystore" 
            active={activeSection === 'joystore'}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('joystore');
            }}
          >
            Joy Store
          </NavLink>
          <NavLink 
            href="#ai-prompt" 
            active={activeSection === 'ai-prompt'}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('ai-prompt');
            }}
          >
            Sugestões IA
          </NavLink>
          <NavLink 
            href="#calendar" 
            active={activeSection === 'calendar'}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('calendar');
            }}
          >
            Calendário
          </NavLink>
        </NavLinks>
        <SignUpButton>Começar Agora</SignUpButton>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
