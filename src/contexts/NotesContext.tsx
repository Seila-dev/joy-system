import { createContext, useState, useEffect, ReactNode } from 'react'
import { Note, NoteCategory, NoteStatus } from '../types/NoteData'
import api from '../services/api'
import { parseCookies } from 'nookies';

interface NoteContextProps {
  notes: Note[];
  loading: boolean;
  filteredNotes: Note[] | null;
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (id: number, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  setStatus: (id: number, status: NoteStatus) => Promise<void>;
  filterNotes: (
    category: NoteCategory | null,
    status: NoteStatus | null,
    searchQuery: string | null,
    quantity: number | null
  ) => void;
}

export const NoteContext = createContext<NoteContextProps>({} as NoteContextProps);

interface NoteProviderProps {
  children: ReactNode;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);
  const { 'joysystem.token': token } = parseCookies();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const response = await api.post('/notes', note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setNotes((prevNotes) => [...prevNotes, response.data]);
      setFilteredNotes((prevFiltered) => 
        prevFiltered ? [...prevFiltered, response.data] : [response.data]
      );
    } catch (error) {
      console.error('Erro ao criar nota:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id: number, note: Partial<Note>) => {
    try {
      setLoading(true);
      const response = await api.put(`/notes/${id}`, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) =>
        prevNotes.map((item) => (item.id === id ? response.data : item))
      );
      setFilteredNotes((prevFiltered) =>
        prevFiltered
          ? prevFiltered.map((item) => (item.id === id ? response.data : item))
          : null
      );

      return response.data
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      setLoading(true);
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setFilteredNotes((prevFiltered) =>
        prevFiltered ? prevFiltered.filter((note) => note.id !== id) : null
      );
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (id: number, status: NoteStatus) => {
    try {
      await updateNote(id, { status });
    } catch (error) {
      console.error('Erro ao atualizar status da nota:', error);
    }
  };

  const filterNotes = (
    category: NoteCategory | null,
    status: NoteStatus | null,
    searchQuery: string | null,
    quantity: number | null
  ) => {
    let filtered = [...notes];

    if (category) {
      filtered = filtered.filter((note) => note.category === category);
    }

    if (status) {
      filtered = filtered.filter((note) => note.status === status);
    }

    if (quantity !== null) {
      filtered = filtered.slice(0, quantity);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(filtered);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        filteredNotes,
        createNote,
        updateNote,
        deleteNote,
        setStatus,
        filterNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
