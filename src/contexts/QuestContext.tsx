import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { parseCookies } from 'nookies';
import { Quest } from '../types/questData';


type questContextType = {
  quests: Quest[] | null
  loading: boolean
  error: string | null
  addQuest: (newQuest: Quest) => Promise<void>
  editQuest: (updatedQuest: Quest) => Promise<void>
  deleteQuest: (questId: number) => Promise<void>
}

export const QuestContext = createContext({} as questContextType)

export function QuestProvider({ children }: { children: React.ReactNode }) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { 'joysystem.token': token } = parseCookies();

  useEffect(() => {
    if (token) {
      setLoading(true)
      fetch('http://localhost:3000/quests', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
      }).then((response) => response.json())
        .then((data) => {
          setQuests(data)
        })
        .catch((error) => {
          console.error('Error on searching quests', error)
          setError('error on searching quests')
        })
        .finally(() => setLoading(false))
    }
  }, [token])

  const addQuest = async (newQuest: Quest) => {
    setLoading(true)
    try {
      const response = await api.post('/quests', newQuest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuests((prevQuests) => [...prevQuests, response.data]);
    } catch (err) {
      setError('Erro ao adicionar a quest');
    } finally {
      setLoading(false)
    }
  };

  const editQuest = async (updatedQuest: Quest) => {
    setLoading(true)
    try {
      await api.put(`/quests/${updatedQuest.id}`, updatedQuest, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const response = await api.get('/quests', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setQuests(response.data);
    } catch (err) {
      console.error('Detailed error on editing quest:', err)
      setError('Erro ao editar a quest');
    } finally {
      setLoading(false);
    }
  }


  const deleteQuest = async (questId: number) => {
    try {
      await api.delete(`/quests/${questId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuests((prevQuests) => prevQuests.filter((quest) => quest.id !== questId));
    } catch (err) {
      setError('Erro ao deletar a quest');
    } finally {
      setLoading(false)
    }
  };

  return (
    <QuestContext.Provider value={{ quests, loading, error, addQuest, editQuest, deleteQuest }}>
      {children}
    </QuestContext.Provider>
  );
}
