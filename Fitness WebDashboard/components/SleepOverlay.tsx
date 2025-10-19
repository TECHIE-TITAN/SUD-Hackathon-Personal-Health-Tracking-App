import React, { useState, useEffect } from 'react';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

interface SleepOverlayProps {
  sleepStartTime: Date | null;
  onWakeUp: () => void;
}

const SleepOverlay: React.FC<SleepOverlayProps> = ({ sleepStartTime, onWakeUp }) => {
  const [duration, setDuration] = useState('00:00:00');

  useEffect(() => {
    if (!sleepStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - sleepStartTime.getTime();
      
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
      
      setDuration(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepStartTime]);

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-50 flex flex-col items-center justify-center p-4 text-center text-white animate-pulse-slow">
      <MoonIcon className="w-24 h-24 text-indigo-400 opacity-50 mb-4" />
      <h2 className="text-4xl font-bold">Goodnight!</h2>
      <p className="text-slate-400 mt-2 text-lg">Rest well. See you in the morning.</p>
      
      <div className="my-8">
        <p className="text-slate-500 text-sm">Time Slept</p>
        <p className="text-6xl font-mono tracking-widest">{duration}</p>
      </div>

      <button 
        onClick={onWakeUp}
        className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 px-8 rounded-full text-xl transition-colors"
      >
        <SunIcon className="w-8 h-8"/>
        <span>Wake Up</span>
      </button>
    </div>
  );
};

export default SleepOverlay;
