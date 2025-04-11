import React, { useState } from 'react';
import styled from 'styled-components';

const JoyStore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'digital', name: 'Digital' },
    { id: 'physical', name: 'Físico' },
    { id: 'experience', name: 'Experiências' }
  ];
  
  const rewards = [
    {
      title: "30 minutos de tempo livre",
      price: 50,
      category: 'experience'
    },
    {
      title: "Ler um novo livro",
      price: 200,
      category: 'physical'
    },
    {
      title: "Assistir minha série favorita",
      price: 100,
      category: 'digital'
    }
  ];

  return (
    <JoyStoreSection id="joystore">
      <JoyStoreContainer>
        <SectionTitle>
          <span>Joy</span> Store
        </SectionTitle>
        <SectionDescription>
          Troque suas moedas Joy por recompensas personalizadas que você mesmo define como motivação para completar suas quests.
        </SectionDescription>
        
        <StoreShowcase>
          <StoreDemo>
            <StoreHeader>
              <StoreCurrency>
                <CurrencyIcon>J</CurrencyIcon>
                350 Joys
              </StoreCurrency>
              <StoreCategories>
                {categories.map(category => (
                  <CategoryButton 
                    key={category.id}
                    $active={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </CategoryButton>
                ))}
              </StoreCategories>
            </StoreHeader>
            
            <RewardsGrid>
              {rewards.map((reward, index) => (
                <RewardCard key={index}>
                  <RewardTitle>{reward.title}</RewardTitle>
                  <RewardPrice>
                    <Price>
                      <CurrencyIcon>J</CurrencyIcon>
                      {reward.price}
                    </Price>
                    <RedeemButton>Resgatar</RedeemButton>
                  </RewardPrice>
                </RewardCard>
              ))}
            </RewardsGrid>
          </StoreDemo>
          
          <StoreExplanation>
            <ExplanationTitle>Como funciona a Joy Store?</ExplanationTitle>
            <ExplanationText>
              1. Complete quests para ganhar moedas Joy<br />
              2. Defina suas próprias recompensas na Joy Store<br />
              3. Troque suas moedas Joy pelas recompensas quando atingir o valor necessário<br />
              4. Aproveite sua recompensa e continue motivado em suas jornadas!
            </ExplanationText>
          </StoreExplanation>
        </StoreShowcase>
      </JoyStoreContainer>
    </JoyStoreSection>
  );
};

export default JoyStore;

const JoyStoreSection = styled.section`
  background-color: #00041a;
`;

const JoyStoreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const SectionDescription = styled.p`
  font-size: 16px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
  color: ${props => props.theme.colors.text};
`;

const StoreShowcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StoreDemo = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
`;

const StoreCurrency = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 18px;
  color: ${props => props.theme.colors.primary};
`;

const CurrencyIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-size: 16px;
`;

const StoreCategories = styled.div`
  display: flex;
  gap: 15px;

  @media(max-width: 768px){
    display: none;
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.primary};
  transition: all 0.3s easeblack;
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.primary + '20'};
  }
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const RewardCard = styled.div`
  background-color: #101320;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  color: ${props => props.theme.colors.gray};
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const RewardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const RewardPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const RedeemButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const StoreExplanation = styled.div`
  background-color: ${props => props.theme.colors.primary + '10'};
  border-left: 4px solid ${props => props.theme.colors.primary};
  padding: 20px;
  border-radius: 5px;
`;

const ExplanationTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.primary};
`;

const ExplanationText = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;