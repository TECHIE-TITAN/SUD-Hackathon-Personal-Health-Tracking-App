import React, { useState, useEffect } from 'react';
import WaterDropIcon from './icons/WaterDropIcon';
import { WATER_GOAL, WATER_COOLDOWN_HOURS } from '../constants';

interface WaterTrackerProps {
  count: number;
  onDrink: () => void;
  lastLogTime: Date | null;
}

const GlassIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <div className={`w-8 h-10 border-2 rounded-t-md rounded-b-lg flex items-end transition-colors duration-300 ${filled ? 'bg-cyan-500/50 border-cyan-400' : 'border-slate-600'}`}>
    {filled && <div className="w-full h-3/4 bg-cyan-500 rounded-b-md"></div>}
  </div>
);

const WaterTracker: React.FC<WaterTrackerProps> = ({ count, onDrink, lastLogTime }) => {
  const [cooldownTime, setCooldownTime] = useState('');
  const isGoalReached = count >= WATER_GOAL;
  
  const cooldownMs = WATER_COOLDOWN_HOURS * 60 * 60 * 1000;
  
  const isCoolingDown = lastLogTime && (new Date().getTime() - lastLogTime.getTime() < cooldownMs);

  useEffect(() => {
    if (!isCoolingDown) {
      setCooldownTime('');
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = lastLogTime!.getTime() + cooldownMs;
      const diff = endTime - now;

      if (diff <= 0) {
        setCooldownTime('');
        clearInterval(interval);
        return;
      }
      
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
      
      setCooldownTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastLogTime, isCoolingDown, cooldownMs]);
  

  return (
    <div className={`bg-slate-800 p-4 rounded-2xl shadow-lg flex flex-col justify-between border-2 ${isGoalReached ? 'border-cyan-400 shadow-cyan-500/20' : 'border-transparent'} transition-all`}>
        <div>
            <div className="flex items-center gap-2 mb-3">
                <WaterDropIcon className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Water Intake</h3>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: WATER_GOAL }).map((_, index) => (
                <GlassIcon key={index} filled={index < count} />
                ))}
            </div>
            <p className="text-center text-slate-400 text-sm mt-3">
                Goal: {count} / {WATER_GOAL} glasses {isGoalReached && "🎉"}
            </p>
        </div>
      <button
        onClick={onDrink}
        disabled={isGoalReached || isCoolingDown}
        className="w-full mt-4 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isGoalReached ? "Goal Reached!" : isCoolingDown ? `Next glass in ${cooldownTime}` : "+1 Glass"}
      </button>
    </div>
  );
};

export default WaterTracker;