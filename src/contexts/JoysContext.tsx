import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { parseCookies } from 'nookies';
import { Joy } from '../types/joyData';


type joysContextType = {
  joys: Joy[] | null
  loadingJoy: boolean
  error: string | null
  getBalance: () => Promise<void>
  balance?: number
}

export const JoysContext = createContext({} as joysContextType)

export function JoysProvider({ children }: { children: React.ReactNode }) {

const [joys, setJoys] = useState<Joy[]>([]);
const [balance, setBalance] = useState<number>(0);
const [loadingJoy, setLoadingJoy] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const { 'joysystem.token': token } = parseCookies();

  useEffect(() => {
    if (token) {
      setLoadingJoy(true)
      fetch('http://localhost:3000/quests', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
      }).then((response) => response.json())
        .then((data) => {
          setJoys(data)
        })
        .catch((error) => {
          console.error('Error on searching quests', error)
          setError('error on searching quests')
        })
        .finally(() => setLoadingJoy(false))
    }
  }, [token])

  const getBalance = async () => {
    setLoadingJoy(true)
    try {
        const response = await api.get('/balance', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        setBalance(response.data.balance)
    } catch (error) {
        console.error('Detailed error on getting balance:', error)
        setError('Erro retrieving balance');
    } finally {
        setLoadingJoy(false)
    }
  }

    return (
      <JoysContext.Provider value={{ joys, loadingJoy, error, getBalance, balance }}>
        {children}
      </JoysContext.Provider>
    );
}