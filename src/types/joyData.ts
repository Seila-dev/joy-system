export type JoyTransactionType = 'GANHO' | 'GASTO' | 'BONUS' | 'PENALIDADE' | 'COMPRA';

export interface JoyTransaction {
    id: number;
    userId: number;
    amount: number;
    type: JoyTransactionType;
    description: string;
    createdAt: string | number;
    questId?: number;
    joyId?: number;
  }

  export interface JoyStoreItem {
    id: number;
    name: string;
    description: string;
    price: number;
    featured: boolean;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

export interface Joy {
    id: number;
    userId: number;
    currentBalance: number;
    transactions?: JoyTransaction[];
  }