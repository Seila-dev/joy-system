export enum NoteCategory {
    PESSOAL = 'PESSOAL',
    TRABALHO = 'TRABALHO',
    IDEIAS = 'IDEIAS',
    LEMBRETES = 'LEMBRETES',
    METAS = 'METAS',
    OUTRO = 'OUTRO'
  }
  
  export enum NoteStatus {
    ATIVO = 'ATIVO',
    ARQUIVADO = 'ARQUIVADO',
    FIXADO = 'FIXADO'
  }
  
  export interface Note {
    id: number;
    title: string;
    content: string;
    category: NoteCategory;
    status: NoteStatus;
    priority: number;
    color?: string;
    userId: number;
    questId?: number | null;
    createdAt: string;
    updatedAt: string;
  }
  