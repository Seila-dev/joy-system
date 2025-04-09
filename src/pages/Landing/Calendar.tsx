import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarSection = styled.section`
  background-color: ${props => props.theme.colors.white};
`;

const CalendarContainer = styled.div`
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
  color: ${props => props.theme.colors.lightText};
`;

const CalendarWrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const CalendarNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background-color: ${props => props.theme.colors.gray};
  color: ${props => props.theme.colors.text};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-bottom: 15px;
`;

const Weekday = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

const Day = styled.div<{ isToday?: boolean; hasEvents?: boolean }>`
  position: relative;
  aspect-ratio: 1;
  border-radius: 5px;
  background-color: ${props => props.isToday ? props.theme.colors.primary + '15' : props.theme.colors.white};
  border: 1px solid ${props => props.isToday ? props.theme.colors.primary : props.theme.colors.gray};
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary + '10'};
  }
  
  &::after {
    content: '';
    display: ${props => props.hasEvents ? 'block' : 'none'};
    position: absolute;
    top: 5px;
    right: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const DayNumber = styled.span<{ isToday?: boolean }>`
  font-size: 14px;
  font-weight: ${props => props.isToday ? '600' : '400'};
  color: ${props => props.isToday ? props.theme.colors.primary : props.theme.colors.text};
`;

const CalendarFeatures = styled.div`
  margin-top: 40px;
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

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.primary + '20'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  
  img {
    width: 20px;
    height: 20px;
  }
`;

const FeatureTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
`;

const FeatureText = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
  line-height: 1.5;
`;

const Calendar: React.FC = () => {
  const [currentMonth] = useState('Abril 2025');
  
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Simulated days for April 2025
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  
  // Days with quests (for demonstration)
  const daysWithEvents = [1, 3, 5, 8, 10, 15, 20, 25];
  
  // Today's date (for demonstration)
  const today = 9; // April 9th, 2025
  
  // Fill the first week with empty days (April 1st is a Tuesday in 2025)
  const emptyDays = [0, 0];
  
  const calendarFeatures = [
    {
      icon: "/api/placeholder/20/20",
      title: "Visualização Mensal",
      text: "Veja todas as suas quests programadas para o mês em um calendário organizado."
    },
    {
      icon: "/api/placeholder/20/20",
      title: "Planejamento de Quests",
      text: "Agende quests para datas específicas e nunca perca um prazo importante."
    },
    {
      icon: "/api/placeholder/20/20",
      title: "Sincronização",
      text: "Sincronize com seu calendário externo para manter tudo em um só lugar."
    }
  ];

  return (
    <CalendarSection id="calendar">
      <CalendarContainer>
        <SectionTitle>
          <span>Calendário</span> Integrado
        </SectionTitle>
        <SectionDescription>
          Visualize e planeje suas quests em um calendário completo, mantendo-se organizado e focado em seus objetivos diários.
        </SectionDescription>
      
        <CalendarWrapper>
          <CalendarNav>
            <NavButtons>
              <NavButton>←</NavButton>
            </NavButtons>
            <MonthTitle>{currentMonth}</MonthTitle>
            <NavButtons>
              <NavButton>→</NavButton>
            </NavButtons>
          </CalendarNav>
          
          <WeekdaysRow>
            {weekdays.map((day, index) => (
              <Weekday key={index}>{day}</Weekday>
            ))}
          </WeekdaysRow>
          
          <DaysGrid>
            {emptyDays.map((_, index) => (
              <Day key={`empty-${index}`} />
            ))}
            
            {days.map(day => (
              <Day 
                key={day} 
                isToday={day === today}
                hasEvents={daysWithEvents.includes(day)}
              >
                <DayNumber isToday={day === today}>{day}</DayNumber>
              </Day>
            ))}
          </DaysGrid>
        </CalendarWrapper>
        
        <CalendarFeatures>
          {calendarFeatures.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>
                <img src={feature.icon} alt={feature.title} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureText>{feature.text}</FeatureText>
            </FeatureCard>
          ))}
        </CalendarFeatures>
      </CalendarContainer>
    </CalendarSection>
  );
};

export default Calendar;