import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    data: {
        categoria: string;
        total: number;
    }[];
}

export function PieChart({ data }: PieChartProps) {
    const chartData = {
        labels: data.map((d) => d.categoria),
        datasets: [
            {
                data: data.map((d) => d.total),
                backgroundColor: [
                    '#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6',
                    '#38bdf8', '#fb923c', '#4ade80', '#818cf8',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} options={{ responsive: true }} />;
}
