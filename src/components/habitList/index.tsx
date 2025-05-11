import styled from 'styled-components';
import { useHabit } from '../../contexts/hooks/useHabit';
import { HabitType } from '../../types/habitData';
import { Link } from 'react-router-dom';
import { remainingDays } from '../../utils/dateUtils';
import { ProgressRing } from '../ProgressRing';
import { useEffect, useRef } from 'react';
import { HabitListSkeleton } from '../../skeleton/habitListLoading';

interface HabitListProps {
  onHabitClick?: (habitId: number) => void;
}

export const HabitList: React.FC<HabitListProps> = ({ onHabitClick }) => {
  const { habits, habitStats, loading, error, fetchHabitStats, fetchHabitProgress } = useHabit();

  const fetchedHabitsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!habits) return;

    habits.forEach((habit) => {
      if (!fetchedHabitsRef.current.has(habit.id)) {
        fetchedHabitsRef.current.add(habit.id);
        fetchHabitStats(habit.id);
        fetchHabitProgress(habit.id);
      }
    });
  }, [habits]);

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

  if (loading) {
    return <HabitListSkeleton />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (habits?.length === 0) {
    return <EmptyState>Nenhum hábito encontrado. Comece criando seu primeiro hábito!</EmptyState>;
  }


  return (
    <Container>
      <HabitGrid>
        {habits?.map(habit => (
          <HabitCard
            key={habit.id}
            to={'/dashboard/habits/' + habit.id}
            $habitType={habit.type}
            onClick={() => handleHabitClick(habit.id)}
          >
            <HabitHeaderType>

              <HeaderGroup>
                <LeftHeader
                  $habitType={habit.type}
                >
                  <span className="material-symbols-outlined icon">
                    {habit.type === 'BOM' ? 'thumb_up' : 'thumb_down'}
                  </span>
                  {habit.type}
                </LeftHeader>
                <RightHeader>{habit.method}</RightHeader>
              </HeaderGroup>
              <Title>{habit.title}</Title>

              <Description className='description'>{habit.description || 'Sem descrição'}</Description>
            </HabitHeaderType>
            {habitStats[habit.id] && (
              <div>
                <ProgressRing
                  progress={habitStats[habit.id].completionRate}
                  size={100}
                  variant="bar"
                  strokeWidth={5}
                  color={habitStats[habit.id].completionRate > 50 ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)"}
                />
                <ExtendHabit>
                  <span className="material-symbols-outlined">
                    zoom_out_map
                  </span>
                  Clique para expandir
                </ExtendHabit>
              </div>
            )}

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
              {habitStats[habit.id] && (
                <>
                  <Divisor>
                    <div className="line b1"></div>
                    <span className="span-pin">Saúde do Hábito</span>
                    <div className="line b2"></div>
                  </Divisor>
                  <Badge>
                    { }
                    <ProgressRing
                      progress={habitStats[habit.id].completionRate}
                      size={100}
                      variant="bar"
                      strokeWidth={5}
                      color={habitStats[habit.id].completionRate > 50 ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)"}
                    />
                  </Badge>
                </>
              )}
            </HabitMeta>
          </HabitCard>
        ))}
      </HabitGrid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const HabitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr); // mantém 2 mesmo em celulares pequenos
    gap: 10px;
  }
`;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const Description = styled.p`
  opacity: 0.8;
  margin-bottom: 16px;

  @media(max-width: 500px) {
    display: none;
  }
`;

const HabitCard = styled(Link) <{ $habitType: HabitType }>`
  background: linear-gradient(to right, ${props => props.$habitType === HabitType.BOM ? '#027148' : '#8b0000'},
  ${props => props.$habitType === HabitType.BOM ? '#013220' : '#200'}
);
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &:hover {
    transform: translateY(-4px);
  }

  @media(max-width: 375px){
    padding: 15px 10px;
  }
`;

const HeaderGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  .icon{
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  @media(max-width: 550px){
    .icon{
      font-size: 10px;
    }
  }
`

const HabitHeaderType = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
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

  @media(max-width: 550px){
    font-size: 5px;
  }
`

// const HabitTitle = styled.h3`
//   font-size: 18px;
//   margin-bottom: 8px;

//   @media(max-width: 550px){
//     font-size: 12px;
//   }
// `;

// const HabitDesc = styled.p`
//   font-size: 14px;
//   opacity: 0.8;
//   margin-bottom: 16px;

//   @media(max-width: 550px){
//     font-size: 10px;
//   }
// `;

const HabitMeta = styled.div`
  display: none;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
  color: white;

  @media(max-width: 550px){
    font-size: 8px;
  }
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

  @media(max-width: 550px){
    font-size: 8px;
    .icon{
      font-size: 12px;
    }
  }
`;

const BadgeText = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 5px;
  font-size: 12px;
  color: #ccc;

  @media(max-width: 550px){
    font-size: 8px;
  }
`
const Divisor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;

  .line {
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, #aaa, transparent);
    animation: pulse 2s infinite ease-in-out;
  }
    `


// const WrapperLine = styled.div`
//   width: 100%;
//   background: #244;
//   color: white;
//   margin: 10px 0;
//   border-radius: 10px;
//   display: flex;
//   justify-content: center;

//   span{
//     display: flex;
//     width: 100%;
//   }

//   &::before {
//     content: '';
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     border: 1px solid #CCC;
//   }
//   &::after {
//     content: '';
//     width: 100%;
//     display: block;
//     border: 1px solid #CCC;
//   }
// `;

// const LoadingMessage = styled.div`
//   text-align: center;
//   margin: 40px 0;
//   color: #666;
// `;

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

const ExtendHabit = styled.div`
      padding: 20px 10px 10px 10px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      opacity: 0.8;
    `