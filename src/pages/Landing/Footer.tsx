import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterContent>
          <FooterColumn>
            <FooterLogo>JOY<span>System</span></FooterLogo>
            <FooterDescription>
              Transforme seus objetivos em conquistas diárias com o JoySystem. Nossa plataforma gamificada torna o cumprimento de tarefas mais divertido e motivador.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com/in/erickrodrigues-dev/" aria-label="LinkedIn" target='BLANK'>in</SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>JoySystem</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink href="https://www.linkedin.com/in/erickrodrigues-dev/" target='BLANK'>Sobre Nós</FooterLink></LinkItem>
              <LinkItem><FooterLink href="https://www.linkedin.com/in/erickrodrigues-dev/" target='BLANK'>Blog</FooterLink></LinkItem>
              <LinkItem><FooterLink href="https://www.linkedin.com/in/erickrodrigues-dev/" target='BLANK'>Carreiras</FooterLink></LinkItem>
              <LinkItem><FooterLink href="https://www.linkedin.com/in/erickrodrigues-dev/" target='BLANK'>Contato</FooterLink></LinkItem>
            </LinksList>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Recursos</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink href="#quests">Tarefas</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#joystore">Loja</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#ai-prompt">Sugestões IA</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#calendar">Calendário</FooterLink></LinkItem>
            </LinksList>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Suporte</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink href="#">FAQs</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Tutoriais</FooterLink></LinkItem>
              <LinkItem><FooterLink href="https://www.linkedin.com/in/erickrodrigues-dev/" target='BLANK'>Central de Ajuda</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Comunidade</FooterLink></LinkItem>
            </LinksList>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>© 2025 JoySystem. Todos os direitos reservados.</Copyright>
          <BottomLinks>
            <BottomLink href="#">Termos de Uso</BottomLink>
            <BottomLink href="#">Política de Privacidade</BottomLink>
          </BottomLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  background-color: ${props => props.theme.colors.primary + '10'};
  padding: 60px 0 30px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
  
  span {
    color: ${props => props.theme.colors.secondary};
    font-size: 18px;
  }
`;

const FooterDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
  margin-bottom: 20px;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.gray};
`;

const LinksList = styled.ul`
  list-style: none;
`;

const LinkItem = styled.li`
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.colors.gray};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const BottomLink = styled.a`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;