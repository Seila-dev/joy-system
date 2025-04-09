import React from 'react';
import styled from 'styled-components';
import heroImg from '../../assets/teste.png'

const HeroSection = styled.section`
  padding-top: 140px;
  padding-bottom: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary + '15'}, ${props => props.theme.colors.secondary + '15'});
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 550px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.gray};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  color: ${props => props.theme.colors.lightText};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 15px 30px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  padding: 15px 30px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  border: 2px solid ${props => props.theme.colors.primary};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }
`;

const HeroImage = styled.div`
  flex: 1;
  max-width: 500px;
  
  img {
    width: 100%;
    height: auto;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 400px;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroSection id="hero">
      <HeroContainer>
        <HeroContent>
          <HeroTitle>
            Transforme seus objetivos em <span>conquistas diárias</span>
          </HeroTitle>
          <HeroSubtitle>
            Crie quests, ganhe recompensas e alcance seus objetivos de forma divertida e motivadora com o QuestJoy.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton>Criar Conta</PrimaryButton>
            <SecondaryButton>Saber Mais</SecondaryButton>
          </HeroButtons>
        </HeroContent>
        <HeroImage>
          <img src={heroImg} alt="Hero illustration" />
        </HeroImage>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;