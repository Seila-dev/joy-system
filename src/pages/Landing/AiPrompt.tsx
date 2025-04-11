import React, { useState } from 'react';
import styled from 'styled-components';
import Ilustration from '../../assets/landingpage-3.png'

const AIPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  
  const questSuggestions = [
    {
      title: "Praticar meditação por 10 minutos",
      difficulty: "Fácil",
      joys: 2
    },
    {
      title: "Ler 30 páginas do livro sobre produtividade",
      difficulty: "Médio",
      joys: 4
    },
    {
      title: "Fazer exercícios físicos por 30 minutos",
      difficulty: "Médio",
      joys: 4
    }
  ];

  return (
    <AIPromptSection id="ai-prompt">
      <ContentContainer>
        <AIContent>
          <SectionTitle>
            Sugestões por <span>IA</span> (Em Breve)
          </SectionTitle>
          <AIDescription>
            Não sabe quais quests criar para alcançar seus objetivos? Nossa IA pode ajudar! Basta compartilhar seus objetivos e receber sugestões personalizadas de quests diárias que o ajudarão a progredir consistentemente.
          </AIDescription>
          <PromptDemo>
            <PromptInput>
              <TextInput 
                type="text" 
                placeholder="Ex: Quero melhorar minha saúde e bem-estar" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <SubmitButton>Gerar Quests</SubmitButton>
            </PromptInput>
            <PromptResult>
              <ResultTitle>Sugestões de Quests:</ResultTitle>
              {questSuggestions.map((quest, index) => (
                <QuestSuggestion key={index}>
                  <QuestTitle>{quest.title}</QuestTitle>
                  <QuestInfo>Dificuldade: {quest.difficulty} | Recompensa: {quest.joys} Joys</QuestInfo>
                </QuestSuggestion>
              ))}
            </PromptResult>
          </PromptDemo>
        </AIContent>
        <AIImageContainer>
          <img src={Ilustration} alt="AI Suggestions" />
        </AIImageContainer>
      </ContentContainer>
    </AIPromptSection>
  );
};

export default AIPrompt;

const AIPromptSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary + '15'}, ${props => props.theme.colors.secondary + '15'});
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 60px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
  }
`;

const AIContent = styled.div`
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

const AIDescription = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  color: ${props => props.theme.colors.lightText};
  line-height: 1.6;
`;

const PromptDemo = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const PromptInput = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  border-radius: 5px;
  font-size: 16px;
  font-family: inherit;
  color: ${props => props.theme.colors.white};
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }

  @media(max-width: 400px){
    width: 100%;
    height: 100%;
  }
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const PromptResult = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  padding: 15px;
`;

const ResultTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.primary};
`;

const QuestSuggestion = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const QuestTitle = styled.h5`
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.gray};
  
  &::before {
    content: '•';
    color: ${props => props.theme.colors.primary};
    font-size: 20px;
    margin-right: 8px;
  }
`;

const QuestInfo = styled.p`
  font-size: 13px;
  color: ${props => props.theme.colors.text};
  margin-left: 16px;
`;

const AIImageContainer = styled.div`
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