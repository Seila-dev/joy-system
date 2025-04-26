import React from 'react';
import styled from 'styled-components';

const Features: React.FC = () => {
  const features = [
    {
      icon: "stack",
      title: "Gestão de Tarefas",
      description: "Crie e organize tarefas para tornar seus objetivos mais divertidos e realizáveis."
    },
    {
      icon: "paid",
      title: "Moedas",
      description: "Ganhe recompensas por completar tarefas na forma de moedas do website que podem ser trocadas por prêmios."
    },
    {
      icon: "shopping_cart",
      title: "Loja",
      description: "Troque suas moedas por recompensas personalizadas que você mesmo define como motivação."
    },
    {
      icon: "edit",
      title: "Anotações",
      description: "Mantenha suas ideias organizadas com um sistema de anotações integrado às suas tarefas."
    },
    {
      icon: "switch_access",
      title: "Sugestões por IA",
      description: "Receba sugestões personalizadas de tarefas geradas por IA para ajudar a alcançar seus objetivos."
    },
    {
      icon: "calendar_today",
      title: "Calendário Integrado",
      description: "Visualize e planeje suas tarefas em um calendário para melhor organização do seu tempo."
    }
  ];

  return (
    <FeaturesSection id="features">
      <FeaturesContainer>
        <SectionTitle>
          Recursos do <span>JoySystem</span>
        </SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>
              <span className="material-symbols-outlined">{feature.icon}</span>
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </FeaturesSection>
  );
};

export default Features;

const FeaturesSection = styled.section`
  background-color: #00041a;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-bottom: 50px;
  color: ${props => props.theme.colors.text};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.primary + '20'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  img {
    width: 30px;
    height: 30px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.gray};
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.lightText};
  line-height: 1.6;
`;