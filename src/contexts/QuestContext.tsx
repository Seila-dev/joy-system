import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { parseCookies } from 'nookies';
import { Quest, QuestStatus } from '../types/questData';
import { toast } from 'sonner';


type questContextType = {
  quests: Quest[] | null
  loading: boolean
  error: string | null
  addQuest: (newQuest: Quest) => Promise<void>
  editQuest: (updatedQuest: Quest) => Promise<void>
  deleteQuest: (questId: number) => Promise<void>
  setStatus: (questId: number, status: QuestStatus) => void
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
      fetch('https://joy-system-server-production.up.railway.app/quests', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
      }).then((response) => response.json())
        .then((data) => {
          setQuests(data)
        })
        .catch((error) => {
          console.error('Error on searching tasks', error)
          setError('error on searching tasks')
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
      })

      toast.success("Tarefa criada com sucesso!");
      setQuests((prevQuests) => [...prevQuests, response.data]);
    } catch (err) {
      setError('Erro ao adicionar a tarefa');
      toast.error("Tarefa não criada. Verifique se você está logado ou com internet.")
      console.error('Detailed error on adding task:', err)
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

      toast.success("Tarefa atualizada com sucesso!");
      setQuests(response.data);
    } catch (err) {
      console.error('Detailed error on editing task:', err)
      setError('Erro ao editar a tarefa');
      toast.error("Tarefa não editada. Verifique se você está logado ou com internet.")
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
      toast.success("Tarefa deletada com sucesso!");
      setQuests((prevQuests) => prevQuests.filter((quest) => quest.id !== questId));
    } catch (err) {
      setError('Erro ao deletar a tarefa');
      toast.error("Tarefa não deletada. Verifique se você está logado ou com internet.")
    } finally {
      setLoading(false)
    }
  }

  const setStatus = async (questId: number, status: QuestStatus) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === questId ? { ...quest, status } : quest
      )
    )

    const questToUpdate = quests.find((quest) => quest.id === questId);

    if (questToUpdate) {
      try {
        if(status === 'COMPLETO'){
          await api.post(`/quests/${questId}/complete`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          toast.success('Tarefa concluida. Suas moedas foram adicionados a sua conta com sucesso.')
        }
        if(status === 'INCOMPLETO'){
          await api.post(`/quests/${questId}/fail`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          toast.error('Você falhou na tarefa. Algumas moedas foram removidos da sua conta.')
        }

        if(status === 'PENDENTE' && 'NULO'){
          toast.success('Status da quest atualizada com sucesso.')
        }

        await api.put(`/quests/${questId}`, { ...questToUpdate, status }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.error('Erro ao atualizar status no banco de dados:', error);
        toast.error('Erro ao atualizar status no banco de dados. Verifique se você está logado ou com internet.');
      }
    }
  };

  return (
    <QuestContext.Provider value={{ quests, loading, error, addQuest, editQuest, deleteQuest, setStatus }}>
      {children}
    </QuestContext.Provider>
  );
}
