import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PieChart } from '@/components/Charts/PieChart';
import { LineChart } from '@/components/Charts/LineChart';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
    const {
        gastosPorCategoria,
        gastosPorMes,
        totalBalance,
        economiaComparativa,
    } = usePage().props as unknown as {
        gastosPorCategoria: { categoria: string; total: number }[];
        gastosPorMes: { labels: string[]; data: number[] };
        totalBalance: number;
        economiaComparativa: {
            mes_atual: number;
            mes_anterior: number;
            diferenca: number;
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 bg-white dark:bg-neutral-900">
                        <h2 className="text-lg font-semibold mb-2">Expenses by Month</h2>
                        <LineChart labels={gastosPorMes.labels} data={gastosPorMes.data} />
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 bg-white dark:bg-neutral-900">
                            <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
                        <div className={'mx-auto w-[250px] flex items-center'}>
                            <PieChart data={gastosPorCategoria} />
                        </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 bg-white dark:bg-neutral-900">
                        <h2 className="text-lg font-semibold mb-4">Total Balance</h2>
                        <p className={`text-6xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'} dark:text-green-400`}>
                            R$ {totalBalance.toFixed(2)}
                        </p>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 bg-white dark:bg-neutral-900">
                        <h2 className="text-lg font-semibold mb-2">Savings</h2>
                        <p className="text-3xl">
                            Current Month: <strong className="text-green-600">R$ {economiaComparativa.mes_atual.toFixed(2)}</strong>
                        </p>
                        <p className="text-3xl">
                            Previous Month: <strong className="text-blue-600">R$ {economiaComparativa.mes_anterior.toFixed(2)}</strong>
                        </p>
                        <p className="mt-2 text-3xl">
                            Difference:{' '}
                            <strong className={economiaComparativa.diferenca >= 0 ? 'text-green-500' : 'text-red-500'}>
                                R$ {economiaComparativa.diferenca.toFixed(2)}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
