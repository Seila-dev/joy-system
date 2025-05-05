import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHabit } from '../../contexts/hooks/useHabit';
import { HabitMethod, HabitFrequency, HabitType, Habit } from '../../types/habitData';
import { RecordProgress } from '../../types/habitData';
import { formatDate } from '../../utils/dateUtils';
import { useNavigate, useParams } from 'react-router-dom';

export const HabitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const habitId = parseInt(id || '0', 10);
  const navigate = useNavigate();

  const {
    habits,
    //selectedHabit,  
    habitProgress,
    habitStats,
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

  const [loading, setLoading] = useState(false);
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

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProgressForm(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) : value
    }));
  };

  const handleSuccessChange = (isSuccess: boolean) => {
    setProgressForm(prev => ({
      ...prev,
      isSuccess
    }));
  };

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

      // Refresh progress and stats
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

  const getMethodLabel = (method: HabitMethod | undefined) => {
    switch (method) {
      case HabitMethod.QUANTIDADE: return 'Contagem';
      case HabitMethod.INSTANTANEO: return 'Sim/Não';
      default: return 'Não especificado';
    }
  };

  const getFrequencyLabel = (frequency: HabitFrequency | undefined) => {
    switch (frequency) {
      case HabitFrequency.DIARIAMENTE: return 'Diáriamente';
      case HabitFrequency.SEMANALMENTE: return 'Semanalmente';
      case HabitFrequency.MENSALMENTE: return 'Mensalmente';
      default: return 'Não especificado';
    }
  };

  const progress = habitProgress[habitId] || [];
  const stats = habitStats[habitId];

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
        <BackButton onClick={() => navigate('/dashboard/habits')}>
          Voltar
        </BackButton>

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
        <MetaGrid>
          <MetaItem>
            <MetaLabel>Tipo</MetaLabel>
            <MetaValue>
              {currentHabit.type === HabitType.BOM ? 'Bom Hábito' : 'Mau Hábito'}
            </MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Método</MetaLabel>
            <MetaValue>{getMethodLabel(currentHabit.method)}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Frequência</MetaLabel>
            <MetaValue>{getFrequencyLabel(currentHabit.frequency)}</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Meta</MetaLabel>
            <MetaValue>
              {currentHabit.title || 'Não especificado'}
              {currentHabit.method === HabitMethod.QUANTIDADE ? ' minutos' : ''}
            </MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Pontos</MetaLabel>
            <MetaValue>
              +{currentHabit.successPoints} / -{currentHabit.failurePoints}
            </MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Criado em</MetaLabel>
            <MetaValue>{formatDate(currentHabit.createdAt)}</MetaValue>
          </MetaItem>
        </MetaGrid>
      </InfoSection>

      {stats && (
        <StatsSection>
          <SectionTitle>Estatísticas</SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatValue>{stats.currentStreak}</StatValue>
              <StatLabel>Sequência Atual</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.longestStreak}</StatValue>
              <StatLabel>Melhor Sequência</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{`${Math.round(stats.completionRate)}%`}</StatValue>
              <StatLabel>Taxa de Conclusão</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.totalCompletions}</StatValue>
              <StatLabel>Total Completado</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsSection>
      )}

      <ProgressSection>
        <SectionTitle>Registrar Progresso</SectionTitle>
        <ProgressForm onSubmit={handleProgressSubmit}>
          <FormGroup>
            <Label htmlFor="date">Data</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={progressForm.date}
              onChange={handleProgressChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="value">
              {currentHabit.method === HabitMethod.INSTANTANEO
                ? 'Completado'
                : currentHabit.method === HabitMethod.QUANTIDADE
                  ? 'Duração (minutos)'
                  : 'Quantidade'}
            </Label>
            {currentHabit.method === HabitMethod.INSTANTANEO ? (
              <ButtonGroup>
                <Button
                  type="button"
                  variant={progressForm.value === 1 ? 'success' : 'default'}
                  onClick={() => setProgressForm(prev => ({ ...prev, value: 1 }))}
                >
                  Sim
                </Button>
                <Button
                  type="button"
                  variant={progressForm.value === 0 ? 'danger' : 'default'}
                  onClick={() => setProgressForm(prev => ({ ...prev, value: 0 }))}
                >
                  Não
                </Button>
              </ButtonGroup>
            ) : (
              <Input
                type="number"
                id="value"
                name="value"
                min={0}
                step={currentHabit.method === HabitMethod.QUANTIDADE ? 1 : 1}
                value={progressForm.value}
                onChange={handleProgressChange}
                required
              />
            )}
          </FormGroup>

          <FormGroup>
            <Label>Resultado</Label>
            <ButtonGroup>
              <Button
                type="button"
                variant={progressForm.isSuccess ? 'success' : 'default'}
                onClick={() => handleSuccessChange(true)}
              >
                Sucesso (+{currentHabit.successPoints} pontos)
              </Button>
              <Button
                type="button"
                variant={!progressForm.isSuccess ? 'danger' : 'default'}
                onClick={() => handleSuccessChange(false)}
              >
                Falha (-{currentHabit.failurePoints} pontos)
              </Button>
            </ButtonGroup>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="notes">Observações</Label>
            <TextArea
              id="notes"
              name="notes"
              value={progressForm.notes}
              onChange={handleProgressChange}
              placeholder="Adicione observações (opcional)"
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Progresso'}
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleDeleteHabit}
            >
              Excluir Hábito
            </Button>
          </ButtonGroup>
        </ProgressForm>

        <ProgressList>
          <SectionTitle>Histórico de Progresso</SectionTitle>
          {progress.length > 0 ? (
            progress.map((item, index) => (
              <ProgressItem key={index} $isSuccess={item.isSuccess}>
                <div>
                  <ProgressDate>{formatDate(item.date)}</ProgressDate>
                  {item.habitId && <ProgressNotes></ProgressNotes>}
                </div>
                <ProgressValue>
                  {currentHabit.method === HabitMethod.INSTANTANEO
                    ? item.value === 1 ? 'Sim' : 'Não'
                    : `${item.value}${currentHabit.method === HabitMethod.QUANTIDADE
                      ? ' min'
                      : ''
                    }`}
                  <StatusBadge $isSuccess={item.isSuccess}>
                    {item.isSuccess ? 'Sucesso' : 'Falha'}
                  </StatusBadge>
                </ProgressValue>
              </ProgressItem>
            ))
          ) : (
            <NoData>Nenhum progresso registrado ainda.</NoData>
          )}
        </ProgressList>
      </ProgressSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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
  background-color: var(--background);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

const Title = styled.h1<{ habitType: HabitType | undefined }>`
  font-size: 20px;
  margin-bottom: 20px;
  color: ${props => props.habitType === HabitType.BOM ? '#328E6E' : '#f5222d'};
`;

const Description = styled.p`
  font-size: 16px;
  color: #f2f2f2;
  margin: 10px 0 20px;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
`;

const MetaItem = styled.div`
  background-color: var(--primary);
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const MetaLabel = styled.div`
  font-size: 12px;
  //color: #888;
  color: white;
  margin-bottom: 4px;
`;

const MetaValue = styled.div`
  font-size: 16px;
  color: #f9f9f9;
  opacity: 0.8;
  //color: #333;
  font-weight: 500;
`;

const StatsSection = styled.div`
  background-color: var(--background);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 12px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const ProgressSection = styled.div`
  background-color: var(--background);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: white;
  margin-bottom: 16px;
`;

const ProgressForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  color: white;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 16px;
  background: var(--background);
  color: white;
  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  
  @media(max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'success' | 'danger' | 'default' }>`
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  background-color: ${props => {
    switch (props.variant) {
      case 'success': return '#52c41a';
      case 'danger': return '#f5222d';
      default: return '#1890ff';
    }
  }};
  color: white;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 16px;
  min-height: 80px;
  background: var(--background);
  resize: vertical;
  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const ProgressList = styled.div`
  margin-top: 24px;
`;

const ProgressItem = styled.div<{ $isSuccess: boolean }>`
  padding: 16px;
  border-left: 4px solid ${props => props.$isSuccess ? '#52c41a' : '#f5222d'};
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.$isSuccess ? 'rgba(82, 196, 26, 0.05)' : 'rgba(245, 34, 45, 0.05)'};
`;

const ProgressDate = styled.div`
  font-size: 14px;
  color: #f2f2f2;
`;

const ProgressValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusBadge = styled.span<{ $isSuccess: boolean }>`
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 12px;
  background-color: ${props => props.$isSuccess ? '#52c41a' : '#f5222d'};
  color: white;
`;

const ProgressNotes = styled.div`
  font-size: 14px;
  color: white;
  margin-top: 4px;
`;

const NoData = styled.div`
  text-align: center;
  padding: 24px;
  color: #999;
  font-style: italic;
`;