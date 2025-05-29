'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Table } from '@/components/table';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Pagination } from '@/components/pagination';
import { Transaction as TransactionEntity, TransactionType } from '@/types/entities/Transaction';
import { TransactionCreate } from '@/components/Form/Transaction/TransactionCreate';

import type { Category } from '@/types/entities/Category';
import type { Account } from '@/types/entities/Account';
import { Action } from '@/components/action';
import { TransactionEdit } from '@/components/Form/Transaction/TransactionEdit';

interface TransactionPageProps {
    items: { data: TransactionEntity[] };
    categories: Category[];
    accounts: Account[];
}

export const columns: ColumnDef<TransactionEntity>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: info => info.getValue(),
    },
    {
        header: 'Category',
        accessorFn: row => row.category?.name ?? '—',
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: info => {
            const value = info.getValue<TransactionType>();
            return value === TransactionType.INCOME ? 'Income' : 'Expense';
        },
    },
    {
        accessorKey: 'value',
        header: 'Value',
        cell: info => `R$ ${parseFloat(info.getValue() as string).toFixed(2)}`,
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: info =>
            <Action>
                <TransactionEdit transaction={info.row.original}/>
            </Action>,
    },
];

export default function Transaction({ categories, accounts }: TransactionPageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Transaction',
            href: '/transaction',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaction" />
            <div className="space-y-4">
                <div className={'flex justify-between py-3'}>
                    <div></div>
                    <TransactionCreate accounts={accounts} categories={categories}/>
                </div>
                <Table columns={columns} />
                <Pagination />
            </div>
        </AppLayout>
    )
}
