import styled from 'styled-components';
import { useHabit } from '../../contexts/hooks/useHabit';
import { HabitType } from '../../types/habitData';
import { Link } from 'react-router-dom';
import { remainingDays } from '../../utils/dateUtils';

interface HabitListProps {
  onHabitClick?: (habitId: number) => void;
}

export const HabitList: React.FC<HabitListProps> = ({ onHabitClick }) => {
  const { habits, habitStats, loading, error } = useHabit();
  
  if (loading) {
    return <LoadingMessage>Carregando hábitos...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (habits?.length === 0) {
    return <EmptyState>Nenhum hábito encontrado. Comece criando seu primeiro hábito!</EmptyState>;
  }

  const handleHabitClick = (habitId: number) => {
    if (onHabitClick) {
      onHabitClick(habitId);
    }
  };

  function getCurrentStreak(habitId: number): number {
    if (!habitStats || !habitStats[habitId]) {
      return 0;
    }
    return habitStats[habitId].currentStreak || 0;
  }

  return (
    <Container>
      <HabitGrid>
        {habits?.map(habit => (
          <HabitCard
            key={habit.id}
            $habitType={habit.type}
            onClick={() => handleHabitClick(habit.id)}
          >
            <HabitHeaderType>
              <LeftHeader
                $habitType={habit.type}
              >
                <span className="material-symbols-outlined icon">
                  {habit.type === 'BOM' ? 'thumb_up' : 'thumb_down'}
                </span>
                {habit.type}
              </LeftHeader>
              <RightHeader>{habit.method}</RightHeader>
            </HabitHeaderType>
            <Link to={'/dashboard/habits/' + habit.id}>
              <HabitTitle>{habit.title}</HabitTitle>

            <HabitDesc>{habit.description || 'Sem descrição'}</HabitDesc>
            <HabitMeta>
              <Badge>
                <BadgeText>
                  <span className="material-symbols-outlined icon">
                    calendar_month
                  </span>
                  Frequência:
                </BadgeText>
                {habit.frequency}
              </Badge>
              <Badge>
                <BadgeText>
                  <span className="material-symbols-outlined icon">
                    schedule
                  </span>
                  Duração:
                </BadgeText>
                {habit.duration} {habit.duration === 1 ? 'dia' : 'dias'}
              </Badge>
              <Badge>
                <BadgeText>
                  <span className="material-symbols-outlined icon">
                    calendar_today
                  </span>
                  Dias restantes:
                </BadgeText>
                {remainingDays(habit)} {remainingDays(habit) === 1 ? 'dia' : 'dias'}
              </Badge>

              <Badge>
                <BadgeText>
                  <span className="material-symbols-outlined icon">
                    add_circle
                  </span>
                  Pontos:
                </BadgeText>
                + {habit.successPoints} / - {habit.failurePoints}
              </Badge>
              <Badge>
                <BadgeText>
                  <span className="material-symbols-outlined icon">
                    star
                  </span>
                  Sequência atual:
                </BadgeText>
                {getCurrentStreak(habit.id)}
              </Badge>
            </HabitMeta>
            </Link>
            <HabitButtons>

            </HabitButtons>
          </HabitCard>
        ))}
      </HabitGrid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HabitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: 100%;
  //grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media(max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const HabitCard = styled.div<{ $habitType: HabitType }>`
  background: linear-gradient(to right, ${props => props.$habitType === HabitType.BOM ? '#027148' : '#8b0000'},
  ${props => props.$habitType === HabitType.BOM ? '#013220' : '#200'}
);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const HabitHeaderType = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  .icon{
    display: flex;
    align-items: center;
    font-size: 16px;
  }
`

const LeftHeader = styled.div< { $habitType: HabitType }>`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
  background: ${props => props.$habitType === HabitType.BOM ? 'green' : 'red'};
  border-radius: 10px;
  padding: 3px 6px;
`

const RightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
  border-radius: 10px;
  border: 1px solid var(--tertiary);
  padding: 3px 6px;
`

const HabitTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const HabitDesc = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 16px;
`;

const HabitMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
  color: white;
`;

const Badge = styled.span`
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  font-size: 11px;
  align-items: center;
  font-weight: 500;
  width: 100%;

  .icon{
    font-size: 20px;
  }
`;

const BadgeText = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 5px;
  font-size: 12px;
  color: #ccc;
`

const LoadingMessage = styled.div`
  text-align: center;
  margin: 40px 0;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 12px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  color: #cf1322;
  margin-bottom: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #999;
`;

const HabitButtons = styled.div`

`