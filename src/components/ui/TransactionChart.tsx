import React from 'react';

const TransactionChart: React.FC = () => {
  // Mock data for daily transactions
  const data = [
    { day: 'Mon', amount: 5000 },
    { day: 'Tue', amount: 7500 },
    { day: 'Wed', amount: 3000 },
    { day: 'Thu', amount: 8200 },
    { day: 'Fri', amount: 6000 },
    { day: 'Sat', amount: 4500 },
    { day: 'Sun', amount: 5800 },
  ];

  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>This Week</span>
        <span>₦{data.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</span>
      </div>
      
      <div className="flex items-end justify-between h-32 space-x-2">
        {data.map((item, index) => {
          const height = (item.amount / maxAmount) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full relative group">
                <div
                  className="bg-[#13070C] rounded-t-lg transition-all duration-300 hover:bg-opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₦{item.amount.toLocaleString()}
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionChart;