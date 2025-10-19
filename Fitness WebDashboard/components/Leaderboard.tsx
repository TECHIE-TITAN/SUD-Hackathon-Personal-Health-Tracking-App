
import React from 'react';
import { LeaderboardUser } from '../types';
import TrophyIcon from './icons/TrophyIcon';

interface LeaderboardProps {
  users: LeaderboardUser[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  
  const getRankColor = (index: number) => {
    if (index === 0) return 'border-yellow-400 text-yellow-400';
    if (index === 1) return 'border-slate-400 text-slate-400';
    if (index === 2) return 'border-yellow-600 text-yellow-600';
    return 'border-slate-600 text-slate-500';
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <TrophyIcon className="w-6 h-6 text-yellow-400"/>
        <h3 className="text-xl font-bold text-white">Leaderboard</h3>
      </div>
      <ul className="space-y-3">
        {sortedUsers.map((user, index) => (
          <li
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              user.isCurrentUser ? 'bg-indigo-900/50' : 'bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold text-lg w-8 text-center ${getRankColor(index)}`}>{index + 1}</span>
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <span className={`font-semibold ${user.isCurrentUser ? 'text-white' : 'text-slate-300'}`}>{user.name}</span>
            </div>
            <span className="font-bold text-indigo-300">{user.points.toLocaleString()} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
