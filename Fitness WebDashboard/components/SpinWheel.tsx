import React, { useState } from 'react';
import { SPIN_WHEEL_PRIZES } from '../constants';

interface SpinWheelProps {
  onSpin: (prize: number) => void;
  hasSpun: boolean;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpin, hasSpun }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const segments = SPIN_WHEEL_PRIZES;
  const segmentAngle = 360 / segments.length;

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * segments.length);
    const prize = segments[randomIndex];
    
    // Calculate rotation: 5 full spins + stop on the prize segment
    const prizeAngle = randomIndex * segmentAngle;
    const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.8); // Add some variance
    const totalRotation = (360 * 5) + (360 - prizeAngle - segmentAngle / 2) + randomOffset;
    
    setRotation(prev => prev + totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpin(prize);
    }, 4000); // Must match the CSS animation duration
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-64 h-64 overflow-hidden">
        {/* Pointer */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-300 rounded-full z-20 transform -translate-x-1/2 -translate-y-1/2 border-2 border-slate-900"></div>
        <div className="absolute -top-1 left-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-yellow-300 z-20 transform -translate-x-1/2"></div>
        
        {/* Wheel */}
        <div
          className="w-full h-full rounded-full border-4 border-slate-700 transition-transform duration-[4000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((prize, i) => {
            const angle = i * segmentAngle;
            const bgColor = i % 2 === 0 ? 'bg-purple-600' : 'bg-indigo-600';
            return (
              <div
                key={i}
                className={`absolute w-1/2 h-1/2 origin-bottom-right ${bgColor}`}
                style={{
                  transform: `rotate(${angle}deg)`,
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 0)`, // Creates a triangle
                }}
              >
                <span 
                    className="absolute text-white font-bold text-lg"
                    style={{
                        transform: `
                            translateX(60px) 
                            translateY(25px) 
                            rotate(${segmentAngle / 2 + 90}deg)`
                    }}
                >
                    {prize}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleSpin}
        disabled={isSpinning || hasSpun}
        className="w-full max-w-xs bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {hasSpun ? 'Come back tomorrow!' : isSpinning ? 'Spinning...' : 'Spin for Points!'}
      </button>
    </div>
  );
};

export default SpinWheel;
