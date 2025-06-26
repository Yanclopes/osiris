import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface LineChartProps {
    labels: string[];
    data: number[];
    color?: string;
}

export function LineChart({ labels, data, color = 'rgb(75, 192, 192)' }: LineChartProps) {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Valor',
                data,
                borderColor: color,
                backgroundColor: color,
                tension: 0.4,
                fill: false,
            },
        ],
    };

    return <Line data={chartData} options={{ responsive: true }} />;
}
