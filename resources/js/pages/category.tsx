'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Table } from '@/components/table';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Pagination } from '@/components/pagination';
import { CategoryCreate } from '@/components/Form/Category/CategoryCreate';

type Category = {
    id: number;
    name: string;
    description?: string;
    created_at: string;
};

export const columns: ColumnDef<Category>[] = [
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
        accessorKey: 'description',
        header: 'Description',
        cell: info => info.getValue() || '-',
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
    },
];

interface CategoryPageProps {
    items: {
        data: Category[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Category({ items }: CategoryPageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Category',
            href: '/category',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className="space-y-4">
                <div className={'flex justify-between py-3'}>
                    <div></div>
                    <CategoryCreate />
                </div>
                <Table columns={columns} />
                <Pagination />
            </div>
        </AppLayout>
    )
}