
import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, color }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-xl flex items-center gap-4 shadow-lg">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-slate-400 text-sm">{label}</div>
        <div className="text-white text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;
