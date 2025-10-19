
import React from 'react';
import { PetState, PetMood } from '../types';

interface PetProps {
  petState: PetState;
}

const PetVisual: React.FC<{ mood: PetMood }> = ({ mood }) => {
  const baseClasses = "w-48 h-48 transition-all duration-500";
  const animationClass = mood === PetMood.Happy ? 'animate-float' : '';
  
  switch (mood) {
    case PetMood.Happy:
      return (
        <div className={`${baseClasses} ${animationClass}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#4ade80" />
            <circle cx="35" cy="40" r="5" fill="black" />
            <circle cx="65" cy="40" r="5" fill="black" />
            <path d="M 30 65 Q 50 85 70 65" stroke="black" fill="transparent" strokeWidth="3" />
            <text x="50" y="20" fontSize="10" textAnchor="middle" fill="#f0fdf4">^-^</text>
          </svg>
        </div>
      );
    case PetMood.Sad:
      return (
        <div className={`${baseClasses} opacity-70`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#64748b" />
            <circle cx="35" cy="40" r="5" fill="black" />
            <circle cx="65" cy="40" r="5" fill="black" />
            <path d="M 30 75 Q 50 55 70 75" stroke="black" fill="transparent" strokeWidth="3" />
             <text x="35" y="55" fontSize="12" fill="#0c4a6e" className="animate-pulse-slow">💧</text>
          </svg>
        </div>
      );
    case PetMood.Neutral:
    default:
      return (
        <div className={`${baseClasses}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#facc15" />
            <circle cx="35" cy="40" r="5" fill="black" />
            <circle cx="65" cy="40" r="5" fill="black" />
            <line x1="30" y1="65" x2="70" y2="65" stroke="black" strokeWidth="3" />
          </svg>
        </div>
      );
  }
};

const Pet: React.FC<PetProps> = ({ petState }) => {
  const happinessColor = petState.happiness > 70 ? 'bg-green-500' : petState.happiness > 30 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-slate-800 p-6 rounded-2xl flex flex-col items-center gap-4 shadow-2xl">
      <h2 className="text-2xl font-bold text-center text-white">{petState.name}</h2>
      <PetVisual mood={petState.mood} />
      <div className="w-full">
        <div className="flex justify-between mb-1 text-sm text-slate-300">
          <span>Happiness</span>
          <span>{petState.happiness}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${happinessColor}`}
            style={{ width: `${petState.happiness}%` }}
          ></div>
        </div>
      </div>
      <p className="text-center text-slate-400 mt-2">Complete tasks to keep {petState.name} happy!</p>
    </div>
  );
};

export default Pet;
