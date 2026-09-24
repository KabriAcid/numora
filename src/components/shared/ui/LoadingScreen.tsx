import React from "react";
import { Wallet } from "lucide-react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EFF9F0] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center animate-pulse">
            <Wallet className="w-10 h-10 text-[#13070C]" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-transparent border-t-[#13070C] rounded-2xl animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-[#13070C] mb-2">Numora</h2>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
