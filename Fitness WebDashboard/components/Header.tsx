import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface HeaderProps {
  onNextDay: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNextDay }) => {
  return (
    <header className="h-[65px] px-4 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center border-b border-slate-700">
      <div className="flex items-center gap-2">
        <SparklesIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-2xl font-bold text-white tracking-tight">Wellness Pet</h1>
      </div>
      <button
        onClick={onNextDay}
        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors duration-200"
      >
        Next Day
      </button>
    </header>
  );
};

export default Header;
