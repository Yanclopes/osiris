'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Table } from '@/components/table';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Pagination } from '@/components/pagination';
import { Transaction as TransactionEntity, TransactionType } from '@/types/entities/Transaction';

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
];

export default function Transaction() {
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
                <Table columns={columns} />
                <Pagination/>
            </div>
        </AppLayout>
    )
}
