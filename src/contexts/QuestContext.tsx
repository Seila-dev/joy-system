import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { parseCookies } from 'nookies';

type User = {
    id: number
    email: string
    username: string
}

type QuestStatus = "NULO" | "ATIVO" | "INATIVO"; // exemplo de enum
type TimelineCategory = "DIÁRIA" | "SEMANA" | "MÊS"

type QuestTypeData = {
    id: number
    title: string
    description: string
    validation: string
    highlight: boolean
    status: QuestStatus
    timeline: TimelineCategory
    userId: string
    createdAt: string
    updatedAt: string
    user: User
}

type questContextType = {
    quests: QuestTypeData[] | null 
    loading: boolean
    error: string | null 
    addQuest: (newQuest: QuestTypeData) => Promise<void> 
    editQuest: (updatedQuest: QuestTypeData) => Promise<void>
    deleteQuest: (questId: number) => Promise<void>
}

export const QuestContext = createContext({} as questContextType)

export function QuestProvider({ children }: {children: React.ReactNode}) {
  const [quests, setQuests] = useState<QuestTypeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { 'joysystem.token': token } = parseCookies();

      useEffect(() => {
          if(token) {
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
  // Função para buscar as quests da API

  // Função para adicionar uma nova quest
  const addQuest = async (newQuest: QuestTypeData) => {
    setLoading(true)
    try {
      const response = await api.post('/quests', newQuest, {
        headers: {
          Authorization: `Bearer ${token}`, // Use o token aqui
        },
      });
      setQuests((prevQuests) => [...prevQuests, response.data]);
    } catch (err) {
      setError('Erro ao adicionar a quest');
    } finally {
        setLoading(false)
    }
  };

  // Função para editar uma quest
  const editQuest = async (updatedQuest: QuestTypeData) => {
    setLoading(true)
    try {
      const response = await api.put(`/quests/${updatedQuest.id}`, updatedQuest, {
        headers: {
          Authorization: `Bearer ${token}`, // Use o token aqui
        },
      });
      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === updatedQuest.id ? response.data : quest
        )
      );
    } catch (err) {
      setError('Erro ao editar a quest');
    } finally {
        setLoading(false)
    }
  };

  // Função para deletar uma quest
  const deleteQuest = async (questId: number) => {
    try {
      await api.delete(`/quests/${questId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use o token aqui
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
