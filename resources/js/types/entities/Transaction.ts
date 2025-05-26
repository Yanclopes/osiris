import type { Category } from '@/types/entities/Category';

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

export interface Transaction {
        id: number;
    type: TransactionType;
    value: string;
    description: string;
    account_id: number;
    category_id: number;
    created_at: string;
    updated_at: string;
    category?: Category;
}
