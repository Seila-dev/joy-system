import styled from "styled-components"
import { ProgressRing } from "../ProgressRing"
import useHabit from "../../contexts/hooks/useHabit";
import { Habit } from "../../types/habitData";
import { passedDays } from "../../utils/dateUtils";

interface StatsProps {
    id: number;
    habit: Habit;
}

export const StatsAnalysis = ({ id, habit }: StatsProps) => {
    const {
        habitStats
    } = useHabit();

    const stats = habitStats[id ?? 0];

    return (
        <Element>
            <Title>Análise Geral</Title>
            {stats && (
                <StatsGridContainer>
                    <StatItem>
                        <ProgressRing
                            variant="circle"
                            progress={stats.completionRate}
                            size={100}
                            strokeWidth={8}
                            color={stats.completionRate > 50 ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)"}
                        >
                            <RingContent>
                                <RingValue>{Math.round(stats.completionRate)}%</RingValue>
                            </RingContent>
                        </ProgressRing>
                        <RingLabel>
                            Taxa de Vitórias
                        </RingLabel>
                    </StatItem>
                    <StatItem>
                        <RingValue>{stats.totalCompletions}</RingValue>
                        <RingLabel>
                            Total completado
                        </RingLabel>
                    </StatItem>
                    <StatItem>
                        <RingValue>{stats.currentStreak}</RingValue>
                        <RingLabel>
                            Sequência atual
                        </RingLabel>
                    </StatItem>
                    <StatItem>
                        <RingValue>{stats.longestStreak}</RingValue>
                        <RingLabel>
                            Melhor sequência
                        </RingLabel>
                    </StatItem>
                    {habit && 
                        <StatItem>
                            <RingValue>{passedDays(habit)} / {habit.duration}</RingValue>
                            <RingLabel>
                                Dias completados
                            </RingLabel>
                        </StatItem>
                    }


                </StatsGridContainer>
            )}

        </Element>
    )
}

const Element = styled.section`
    background: var(--background);
    min-width: 200px;
    max-width: 600px;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    display: grid;
    grid-area: StatsAnalysis;

    @media(max-width: 768px){
        *{
            font-size: 18px !important;
        }
        padding: 10px;
    }
`

const Title = styled.h2`
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 25px;

    @media(max-width: 768px){
        font-size: 12px !important;
    }
`

const StatsGridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`

const RingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //color: #1890ff;
  color: white;
  padding: 10px;
  font-size: 12px;
  text-align: center;
  position: absolute;
`;

const RingValue = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const RingLabel = styled.div`
  font-size: 15px;
  color: #f2f2f2;
  margin-top: 10px;
   @media(max-width: 768px){
        font-size: 10px !important;
    }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 12px;
`;