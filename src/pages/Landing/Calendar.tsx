import React, { useState } from 'react';
import styled from 'styled-components';

const Calendar: React.FC = () => {
  const [currentMonth] = useState('Abril 2025');
  
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  
  const daysWithEvents = [1, 3, 5, 8, 10, 15, 20, 25];
  
  const today = 9;

  const emptyDays = [0, 0];
  
  const calendarFeatures = [
    {
      icon: "schedule",
      title: "Visualização Mensal",
      text: "Veja todas as suas tarefas programadas para o mês em um calendário organizado."
    },
    {
      icon: "calendar_month",
      title: "Planejamento de Tarefas",
      text: "Agende tarefas para datas específicas e nunca perca um prazo importante."
    },
    {
      icon: "switch_access",
      title: "Sincronização",
      text: "Sincronize com seu calendário externo para manter tudo em um só lugar. (Em breve)"
    }
  ];

  return (
    <CalendarSection id="calendar">
      <CalendarContainer>
        <SectionTitle>
          <span>Calendário</span> Integrado
        </SectionTitle>
        <SectionDescription>
          Visualize e planeje suas tarefas em um calendário completo, mantendo-se organizado e focado em seus objetivos diários.
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
                $isToday={day === today}
                $hasEvents={daysWithEvents.includes(day)}
              >
                <DayNumber $isToday={day === today}>{day}</DayNumber>
              </Day>
            ))}
          </DaysGrid>
        </CalendarWrapper>
        
        <CalendarFeatures>
          {calendarFeatures.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>
                <span className="material-symbols-outlined">{feature.icon}</span>
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

const CalendarSection = styled.section`
  background: linear-gradient(135deg, #00041a, #00043a);
`;

const CalendarContainer = styled.div`
  max-width: 700px;
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
  color: white;
  font-weight: 600;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
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

  @media(max-width: 500px){
    gap: 5px;
  }
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

  @media(max-width: 500px){
    gap: 5px;
  }
`;

const Day = styled.div<{ $isToday?: boolean; $hasEvents?: boolean }>`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.$isToday ? 'linear-gradient(135deg, #7742e6, #a57bff)' : '#4d54e8'};
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary + '10'};
  }
  
  &::after {
    content: '';
    display: ${props => props.$hasEvents ? 'block' : 'none'};
    position: absolute;
    top: 5px;
    right: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.accent};
  }

  @media(max-width: 500px) {
    &::after {
      width: 4px;
      height: 4px;
    }
  }
`;

const DayNumber = styled.span<{ $isToday?: boolean }>`
  font-size: 20px;
  font-weight: ${props => props.$isToday ? '700' : '400'};
  color: ${props => props.$isToday ? props.theme.colors.white : props.theme.colors.black};

  @media(max-width: 500px) {
    font-size: 12px;
  }
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
  background-color: ${props => props.theme.colors.background};
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
  color: #6C63FF;
`;

const FeatureText = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
  line-height: 1.5;
`;