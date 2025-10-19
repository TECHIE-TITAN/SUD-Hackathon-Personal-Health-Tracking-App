import React from 'react';
import { CommunityGoal } from '../types';
import UsersIcon from './icons/UsersIcon';
import CheckIcon from './icons/CheckIcon';

interface CommunityProps {
  communityGoals: CommunityGoal[];
}

const Community: React.FC<CommunityProps> = ({ communityGoals }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <UsersIcon className="w-8 h-8 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Community Goals</h2>
      </div>
      <p className="text-slate-400 mb-6">
        Work together with the entire community to achieve these goals. Every point you earn from tasks contributes to the progress!
      </p>

      <div className="space-y-6">
        {communityGoals.map((goal) => {
          const progress = Math.min(100, (goal.currentPoints / goal.targetPoints) * 100);
          return (
            <div key={goal.id} className={`p-6 rounded-2xl shadow-lg transition-all ${goal.completed ? 'bg-slate-800/70 border-2 border-green-500/50' : 'bg-slate-800'}`}>
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-3">
                <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                {goal.completed ? (
                  <span className="font-semibold text-green-400 flex items-center gap-2 mt-2 md:mt-0">
                    <CheckIcon className="w-6 h-6"/>
                    Goal Completed!
                  </span>
                ) : (
                  <p className="font-bold text-lg text-purple-300 mt-2 md:mt-0">
                    Bonus: +{goal.pointBonus} pts
                  </p>
                )}
              </div>
              <p className="text-sm text-slate-400 mb-4">{goal.description}</p>
              
              <div className="w-full bg-slate-700 rounded-full h-6 mb-2 p-1">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-500 text-xs text-white flex items-center justify-center"
                  style={{ width: `${progress}%` }}
                >
                  {progress.toFixed(0)}%
                </div>
              </div>
              <div className="flex justify-between text-sm font-semibold text-slate-500">
                <span>{goal.currentPoints.toLocaleString()}</span>
                <span>{goal.targetPoints.toLocaleString()}</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                <p className="text-slate-400 text-sm">
                  Upon completion, <span className="font-semibold text-slate-300">{goal.charityAction}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;