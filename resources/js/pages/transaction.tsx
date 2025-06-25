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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams } from '@/utils/useParams';

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
    const [params, setParams] = useParams()
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
                    <div className={'flex gap-3'}>
                        <Select
                            value={params.category}
                            onValueChange={(value) => setParams({ category: value})}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filtrar por categoria" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="0">Todos</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={params.account}
                            onValueChange={(value) => setParams({ account: value})}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filtrar por conta" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="0">Todos</SelectItem>
                                {accounts.map((account) => (
                                    <SelectItem key={account.id} value={String(account.id)}>
                                        {account.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <TransactionCreate accounts={accounts} categories={categories}/>
                </div>
                <Table columns={columns} />
                <Pagination />
            </div>
        </AppLayout>
    )
}
