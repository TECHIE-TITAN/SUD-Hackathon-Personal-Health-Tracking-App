import React from 'react';
import MoonIcon from './icons/MoonIcon';

interface SleepCardProps {
  onSleep: () => void;
}

const SleepCard: React.FC<SleepCardProps> = ({ onSleep }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-2xl shadow-lg flex flex-col justify-between text-center">
      <div className="flex items-center gap-2 mb-3 self-center">
        <MoonIcon className="w-6 h-6 text-indigo-400" />
        <h3 className="text-lg font-bold text-white">Ready for Bed?</h3>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        A good night's sleep is key. Enter sleep mode to lock the app and earn points for resting.
      </p>
      <button
        onClick={onSleep}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-200"
      >
        Go to Sleep
      </button>
    </div>
  );
};

export default SleepCard;
