import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = [
  { day: "Mon", amount: 5000 },
  { day: "Tue", amount: 7500 },
  { day: "Wed", amount: 3000 },
  { day: "Thu", amount: 8200 },
  { day: "Fri", amount: 6000 },
  { day: "Sat", amount: 4500 },
  { day: "Sun", amount: 5800 },
];

const chartData = {
  labels: data.map((d) => d.day),
  datasets: [
    {
      label: "Amount",
      data: data.map((d) => d.amount),
      backgroundColor: "#13070C",
      borderRadius: 8,
      maxBarThickness: 32,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: (context: any) => `₦${context.parsed.y.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      grid: { display: false },
      ticks: {
        callback: (
          tickValue: string | number,
          _index: number,
          _ticks: any[]
        ) => {
          if (typeof tickValue === "number") {
            return `₦${tickValue.toLocaleString()}`;
          }
          return tickValue;
        },
      },
    },
  },
};

const TransactionChart: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>This Week</span>
        <span>
          ₦{data.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
        </span>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TransactionChart;
