import React from 'react';

const SpendingChart: React.FC = () => {
  const data = [
    { label: 'Data', amount: 15000, percentage: 45, color: '#22c55e' },
    { label: 'Bills payment', amount: 8000, percentage: 24, color: '#f97316' },
    { label: 'Airtime', amount: 10000, percentage: 31, color: '#ef4444' },
  ];

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Donut Chart */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#f3f4f6"
              strokeWidth="10"
              fill="none"
            />
            {data.map((item, index) => {
              const circumference = 2 * Math.PI * 50;
              const strokeDasharray = (item.percentage / 100) * circumference;
              const strokeDashoffset = data
                .slice(0, index)
                .reduce((acc, prev) => acc - (prev.percentage / 100) * circumference, circumference);

              return (
                <circle
                  key={index}
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={item.color}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${strokeDasharray} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
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
              <div className="text-xs text-gray-500">{item.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;