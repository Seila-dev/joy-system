import { JoyTransactionType } from "./joyData";

export enum HabitMethod {
    INSTANTANEO = 'INSTANTANEO',
    QUANTIDADE = 'QUANTIDADE'
  }
  
  export enum HabitFrequency {
    DIARIAMENTE = 'DIARIAMENTE',
    SEMANALMENTE = 'SEMANALMENTE',
    MENSALMENTE = 'MENSALMENTE'
  }
  
  export enum HabitType {
    BOM = 'BOM',
    RUIM = 'RUIM'
  }
  
  export interface Habit {
    id: number;
    title: string;
    description?: string;
    method: HabitMethod;
    frequency: HabitFrequency;
    type: HabitType;
    duration: number;
    successPoints: number;
    failurePoints: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }
  
  export interface HabitProgress {
    id: number;
    habitId: number;
    isSuccess: boolean;
    value: number;
    joyPoints: number;
    date: string;
    createdAt: string;
    joyTransactionId?: number;
    joyTransaction?: JoyTransactionType;
  }
  
  export interface HabitStats {
    totalCompletions: number;
    totalFailures: number;
    completionRate: number;
    currentStreak: number;
    longestStreak: number;
    totalJoyPoints: number;
  }
  
  export interface CreateHabit {
    title: string;
    description?: string;
    method: HabitMethod;
    frequency: HabitFrequency;
    type: HabitType;
    duration: number;
    successPoints: number;
    failurePoints: number;
  }
  
  export interface UpdateHabit {
    title?: string;
    description?: string;
    method?: HabitMethod;
    frequency?: HabitFrequency;
    type?: HabitType;
    duration?: number;
    successPoints?: number;
    failurePoints?: number;
  }
  
  export interface RecordProgress {
    isSuccess: boolean;
    value?: number;
    date?: string;
    notes?: string;
    joyPoints?: number;
  }
  
  export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Array<{ msg: string; param: string }>;
  }

