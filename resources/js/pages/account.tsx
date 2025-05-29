'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Table } from '@/components/table';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Pagination } from '@/components/pagination';
import { AccountCreate } from '@/components/Form/Account/AccountCreate';

type Account = {
    id: number;
    name: string;
    description?: string;
    created_at: string;
};

export const columns: ColumnDef<Account>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: info => info.getValue() || '-',
    },
    {
        accessorKey: 'balance',
        header: 'Balance',
        cell: info => `R$ ${info.getValue()}`
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
    },
];

interface AccountProps {
    accountTypes: [number, string][]
}

export default function Account({ accountTypes }: AccountProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Account',
            href: '/account',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Account" />
            <div className="space-y-4">
                <div className={'flex justify-between py-3'}>
                    <div></div>
                    <AccountCreate accountTypes={accountTypes}/>
                </div>
                <Table columns={columns} />
                <Pagination />
            </div>
        </AppLayout>
    )
}
