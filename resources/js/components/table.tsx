import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    TableComponent,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { usePage } from '@inertiajs/react';
import { Pagination } from '@/types/pagination';

interface TableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    onRowClick?: (row: TData) => void;
    getColumnSize?: (column: string) => string | undefined;
}

export function Table<TData, TValue>({
                                         columns,
                                         onRowClick,
                                     }: TableProps<TData, TValue>) {
    const { props } = usePage<{ items: Pagination<TData> }>();

    const table = useReactTable({
        data: props.items.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: props.items.last_page,
    });

    return (
        <div className="rounded-md border">
            <TableComponent>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className={`hover:bg-secondary-50 ${
                                    onRowClick ? 'cursor-pointer' : ''
                                }`}
                                data-state={row.getIsSelected() && 'selected'}
                                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Sem resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TableComponent>
        </div>
    );
}
