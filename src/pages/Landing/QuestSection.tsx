import React from 'react';
import styled from 'styled-components';

const QuestSectionContainer = styled.section`
  background-color: ${props => props.theme.colors.background};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 60px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const QuestImage = styled.div`
  flex: 1;
  max-width: 500px;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 400px;
  }
`;

const QuestContent = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.gray};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const QuestDescription = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  color: ${props => props.theme.colors.lightText};
  line-height: 1.6;
`;

const QuestFeatures = styled.div`
  margin-bottom: 30px;
`;

const QuestFeature = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const FeatureIcon = styled.div`
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: ${props => props.theme.colors.white};
  font-size: 14px;
`;

const FeatureText = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.gray};
`;

const QuestButton = styled.button`
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

const QuestSection: React.FC = () => {
  return (
    <QuestSectionContainer id="quests">
      <ContentContainer>
        <QuestImage>
          <img src="/api/placeholder/500/400" alt="Quest System" />
        </QuestImage>
        <QuestContent>
          <SectionTitle>
            Sistema de <span>Quests</span>
          </SectionTitle>
          <QuestDescription>
            Transforme suas tarefas em aventuras diárias! Crie quests personalizadas, defina dificuldades, prazos e recompensas. A cada quest completada, você ganha moedas Joy que podem ser trocadas por recompensas na Joy Store.
          </QuestDescription>
          <QuestFeatures>
            <QuestFeature>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Crie quests com níveis de dificuldade e prioridade</FeatureText>
            </QuestFeature>
            <QuestFeature>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Ganhe moedas Joy baseadas no desafio completado</FeatureText>
            </QuestFeature>
            <QuestFeature>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Acompanhe seu progresso e veja estatísticas</FeatureText>
            </QuestFeature>
            <QuestFeature>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Organize quests por categorias e projetos</FeatureText>
            </QuestFeature>
          </QuestFeatures>
          <QuestButton>Criar Minha Primeira Quest</QuestButton>
        </QuestContent>
      </ContentContainer>
    </QuestSectionContainer>
  );
};

export default QuestSection;