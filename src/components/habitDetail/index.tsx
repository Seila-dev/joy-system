import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHabit } from '../../contexts/hooks/useHabit';
import { HabitType, Habit } from '../../types/habitData';
import { RecordProgress } from '../../types/habitData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RecordProgressComponent } from '../RecordProgressComponent';
import { HabitInfoModal } from '../HabitInfoModal';
import { StatsAnalysis } from '../StatsAnalysis';
import { ProgressHistory } from '../ProgressHistory';

export const HabitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const habitId = parseInt(id || '0', 10);
  const navigate = useNavigate();

  const [habitInfo, setHabitInfo] = useState<boolean>(false)


  const {
    habits,
    fetchHabitProgress,
    fetchHabitStats,
    recordProgress,
    deleteHabit,
    error,
    //loading: contextLoading
  } = useHabit();

  const [progressForm, setProgressForm] = useState<RecordProgress>({
    date: new Date().toISOString().split('T')[0],
    value: 0,
    isSuccess: true,
    notes: ''
  });

  const [_, setLoading] = useState(false);
  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null);

  useEffect(() => {
    if (habitId) {
      const habit = habits?.find(habit => habit.id === habitId);

      if (habit) {
        setCurrentHabit(habit);
      }

      fetchHabitProgress(habitId);
      fetchHabitStats(habitId);
    }
  }, [habitId, habits, fetchHabitProgress, fetchHabitStats]);

  const handleProgressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitId) return;

    setLoading(true);
    try {
      await recordProgress(habitId, progressForm);
      // Reset form
      setProgressForm({
        date: new Date().toISOString().split('T')[0],
        value: 0,
        isSuccess: true,
        notes: ''
      });

      fetchHabitProgress(habitId);
      fetchHabitStats(habitId);
    } catch (err) {
      console.error('Failed to record progress', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHabit = async () => {
    if (!habitId || !window.confirm('Tem certeza que deseja excluir este hábito?')) return;

    try {
      await deleteHabit(habitId);
      navigate('/dashboard/habits');
    } catch (err) {
      console.error('Failed to delete habit', err);
    }
  };

  if (!currentHabit) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/dashboard/habits')}>
            Voltar
          </BackButton>
        </Header>
        {error ? (
          <NoData>Erro ao carregar hábito: {error}</NoData>
        ) : (
          <NoData>Carregando...</NoData>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Link to="/dashboard/habits" className="prevPage">
          <span className="material-symbols-outlined arrowBack">
            arrow_back
          </span>
          <p>Voltar para o menu</p>
        </Link>
      </Header>
      <InfoSection>
        {currentHabit.title && (
          <Title habitType={currentHabit.type}>
            {currentHabit.title}
          </Title>
        )}
        {currentHabit.description && (
          <Description>{currentHabit.description}</Description>
        )}
        <FilterNavigation>
          <NavItem className={!habitInfo ? 'active' : ''} onClick={() => setHabitInfo(false)}>
            Registrar progresso
          </NavItem>
          <NavItem className={habitInfo ? 'active' : ''} onClick={() => setHabitInfo(true)}>
            Histórico
          </NavItem>
        </FilterNavigation>
      </InfoSection>
      <GridDetailedContainer>
        {habitInfo ? (
          <ProgressHistory currentHabit={currentHabit} />
        ) : (
          <RecordProgressComponent habit={currentHabit} deleteFunction={handleDeleteHabit} saveFunction={handleProgressSubmit} progressForm={progressForm} setProgressForm={setProgressForm} mode='create' />
        )}
        <HabitInfoModal habit={currentHabit} />
        <StatsAnalysis id={habitId} habit={currentHabit} />
      </GridDetailedContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 50px;
  padding: 10px 50px;
  color: #e0e4ff;

  @media(max-width: 768px){
    padding: 15px;
  }
`;

const Header = styled.div`
  margin-bottom: 50px;
  .prevPage{
        width: fit-content;
        margin: 20px 0;
        padding: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.15s ease-out;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        &:hover{
            border-bottom: 1px solid var(--secondary);
        }
    }
    .prevPage span{
        font-size: 20px;
    }
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;

const InfoSection = styled.div`
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Title = styled.h1<{ habitType: HabitType | undefined }>`
  font-size: 25px;
  margin-bottom: 20px;
  color: white;

  @media(max-width: 768px){
    font-size: 20px;
  }

  @media(max-width: 550px){
    font-size: 16px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #999;
  margin: 10px 0 20px;
`;

const FilterNavigation = styled.ul`
  display: flex;
  background: var(--background);
  border-radius: 10px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media(max-width: 768px){
    font-size: 10px;
    text-align: center;
  }
`

const NavItem = styled.li`
  margin: 12px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  transition: 0.15s ease-out;
  &.active{
    background: #333;
  }
`

const GridDetailedContainer = styled.main`
  display: grid;
  grid-template-areas: 
  "RecordProgressComponent HabitInfoModal"
  "RecordProgressComponent StatsAnalysis"
  ;
  gap: 10px;
  width: 100%;

  @media(max-width: 550px){
    grid-template-areas: 
    "RecordProgressComponent"
    "HabitInfoModal"
    "StatsAnalysis"
    ;
  }
`

const NoData = styled.div`
  text-align: center;
  padding: 24px;
  color: #999;
  font-style: italic;
`;
