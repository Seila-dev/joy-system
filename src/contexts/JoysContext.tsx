import { createContext, useState, useEffect} from 'react';
import api from '../services/api';
import { parseCookies } from 'nookies';
import { Joy, JoyTransaction } from '../types/joyData';


type joysContextType = {
  joys: Joy[] | null
  loadingJoy: boolean
  error: string | null
  getBalance: () => Promise<void>
  getTransactions: (limit: number) => Promise<void>
  joyTransactions: JoyTransaction[] | null
  balance?: number
}

export const JoysContext = createContext({} as joysContextType)

export function JoysProvider({ children }: { children: React.ReactNode }) {

const [joys, setJoys] = useState<Joy[]>([]);
const [balance, setBalance] = useState<number>(0);
const [joyTransactions, setJoyTransactions] = useState<JoyTransaction[]>([])
const [loadingJoy, setLoadingJoy] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const { 'joysystem.token': token } = parseCookies();

//REPETIÇÃO DE CÓDIGO DETECTADA
  useEffect(() => {
    if (token) {
      setLoadingJoy(true)
      fetch('https://joy-system-server-production.up.railway.app/balance', {
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



  const getTransactions = async (limit: number) => {
    setLoadingJoy(true)
    try {
      const response = await api.get(`/transactions?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setJoyTransactions(response.data.transactions)
    } catch (error) {
      console.error('Detailed error on getting transactions:', error)
      setError('Erro getting transactions history');
    } finally {
      setLoadingJoy(false)
    }
  }

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
      <JoysContext.Provider value={{ joys, loadingJoy, error, getBalance, balance, getTransactions, joyTransactions }}>
        {children}
      </JoysContext.Provider>
    );
}