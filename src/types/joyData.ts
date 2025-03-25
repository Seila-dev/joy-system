export type JoyTransactionType = 'GANHO' | 'GASTO' | 'BONUS' | 'PENALIDADE';

export interface JoyTransaction {
    id: number;
    userId: number;
    amount: number;
    type: JoyTransactionType;
    description: string;
    createdAt: Date;
    questId?: number;
    joyId?: number;
  }

  export interface JoyStoreItem {
    id: number;
    name: string;
    description: string;
    priceInJoys: number;
    quantity: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

export interface Joy {
    id: number;
    userId: number;
    currentBalance: number;
    transactions?: JoyTransaction[];
  }