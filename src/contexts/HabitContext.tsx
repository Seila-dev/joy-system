import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { parseCookies } from 'nookies';
import { toast } from 'sonner';
import { Habit, HabitProgress, HabitStats, RecordProgress } from '../types/habitData';


type habitContextType = {
  habits: Habit[] | null
  selectedHabit: (habitId: number) => Promise<void>
  loading: boolean
  error: string | null
  habitProgress: Record<number, HabitProgress[]>
  habitStats: Record<number, HabitStats>
  addHabit: (newHabit: CreateHabitPayload) => Promise<void>
  editHabit: (updatedHabit: Habit) => Promise<void>
  deleteHabit: (habitId: number) => Promise<void>
  viewProgress: (habitId: number) => Promise<void>
  recordProgress: (habitId: number, progressData: RecordProgress) => Promise<void>
  fetchHabitProgress: (habitId: number, startDate?: string, endDate?: string) => Promise<void>
  fetchHabitStats: (habitId: number) => Promise<void>
}

type CreateHabitPayload = Omit<Habit, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const HabitContext = createContext({} as habitContextType)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitProgress, setHabitProgress] = useState<Record<number, HabitProgress[]>>({});
  const [habitStats, setHabitStats] = useState<Record<number, HabitStats>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { 'joysystem.token': token } = parseCookies();

  useEffect(() => {
    if (token) {
      setLoading(true)
      fetch('https://joy-system-server-production.up.railway.app/habits', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
      }).then((response) => response.json())
        .then((data) => {
          setHabits(data)
        })
        .catch((error) => {
          console.error('Error on searching habits', error)
          setError('error on searching habits')
        })
        .finally(() => setLoading(false))
    }
  }, [token])

  const selectedHabit = async (habitId: number) => {
    setLoading(true)
    try {
      await api.get(`/habits/${habitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log('detailed error on trying to select habit: ', error)
    } finally {
      setLoading(false)
    }
  }

  const addHabit = async (newHabit: CreateHabitPayload) => {
    setLoading(true)
    try {
      const response = await api.post('/habits', newHabit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Hábito criado com sucesso!");
      setHabits((prevHabits) => [...prevHabits, response.data]);
    } catch (err) {
      setError('Erro ao adicionar o hábito');
      toast.error("Hábito não criado. Verifique se você está logado ou com internet.")
      console.error('Detailed error on adding habit:', err)
    } finally {
      setLoading(false)
    }
  };

  const editHabit = async (updatedHabit: Habit) => {
    setLoading(true)
    try {
      await api.put(`/habits/${updatedHabit.id}`, updatedHabit, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const response = await api.get('/habits', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      toast.success("Hábito atualizado com sucesso!");
      setHabits(response.data);
    } catch (err) {
      console.error('Detailed error on editing habit:', err)
      setError('Erro ao editar o hábito');
      toast.error("Hábito não editado. Verifique se você está logado ou com internet.")
    } finally {
      setLoading(false);
    }
  }

  const deleteHabit = async (habitId: number) => {
    try {
      await api.delete(`/habits/${habitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Hábito deletado com sucesso!");
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId))
    } catch (err) {
      setError('Erro ao deletar o hábito');
      toast.error("Hábito não deletado. Verifique se você está logado ou com internet.")
    } finally {
      setLoading(false)
    }
  }

  const viewProgress = async (habitId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/habits/${habitId}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHabitProgress(prev => ({
        ...prev,
        [habitId]: response.data
      }));
    } catch (err) {
      console.error('Detailed error on trying to view progress', err);
      setError('Erro ao visualizar o progresso');
    } finally {
      setLoading(false);
    }
  };

  const recordProgress = async (habitId: number, progressData: RecordProgress) => {
    try {
      setLoading(true)
      await api.post(`/habits/${habitId}/progress`, progressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchHabitProgress(habitId);
      await fetchHabitStats(habitId);

      toast.success("Progresso registrado com sucesso!");
    } catch (error) {
      console.error('Erro ao registrar o progresso', error)
      toast.error('Erro ao atualizar o progresso')
    } finally {
      setLoading(false)
    }

  };

  const fetchHabitProgress = useCallback(async (habitId: number, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
  
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
  
    const url = `/habits/${habitId}/progress${params.toString() ? `?${params.toString()}` : ''}`;
  
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setHabitProgress(prev => ({
        ...prev,
        [habitId]: response.data
      }));
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar progresso do hábito:', error);
      throw error;
    }
  }, [token]);
  
  const fetchHabitStats = useCallback(async (habitId: number) => {
    try {
      const response = await api.get(`/habits/${habitId}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setHabitStats(prev => ({
        ...prev,
        [habitId]: response.data
      }));
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar status do hábito:', error);
      throw error;
    } 
  }, [token]);
  


  return (
    <HabitContext.Provider value={{ habits, selectedHabit, loading, error, habitProgress, habitStats, addHabit, editHabit, deleteHabit, viewProgress, recordProgress, fetchHabitProgress, fetchHabitStats }}>
      {children}
    </HabitContext.Provider>
  );
}
