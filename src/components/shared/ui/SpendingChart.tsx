import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = [
  { label: "Data", amount: 15000, color: "#22c55e" },
  { label: "Bills payment", amount: 8000, color: "#f97316" },
  { label: "Airtime", amount: 10000, color: "#ef4444" },
];

const chartData = {
  labels: data.map((d) => d.label),
  datasets: [
    {
      data: data.map((d) => d.amount),
      backgroundColor: data.map((d) => d.color),
      borderWidth: 0,
    },
  ],
};

const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context: any) =>
          `${context.label}: ₦${context.parsed.toLocaleString()}`,
      },
    },
  },
};

const total = data.reduce((sum, item) => sum + item.amount, 0);

const SpendingChart: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Doughnut Chart */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-lg font-bold text-[#13070C]">
                ₦{total.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-[#13070C]">
                ₦{item.amount.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;
