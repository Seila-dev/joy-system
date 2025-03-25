export type QuestCategory = 'DIARIO' | 'SEMANAL' | 'MENSAL' | 'ANUAL';

export type QuestStatus = 'COMPLETO' | 'PENDENTE' | 'INCOMPLETO' | 'NULO';

export type Difficulty = 'FACIL' | 'MEDIO' | 'DIFICIL' | 'MUITO_DIFICIL';

export interface Quest {
    id: number;
    title: string;
    description: string;
    validation: string; // This is the due date in your schema
    highlight: boolean;
    status: QuestStatus;
    timeline: QuestCategory;
    difficulty: Difficulty;
    joys: number; // Pontos ganhos por completar esta quest
    userId: number; // Referência ao usuário
    createdAt: Date;
    updatedAt: Date;
  }