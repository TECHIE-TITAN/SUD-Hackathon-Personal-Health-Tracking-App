import React from 'react';
import { Friend, Competition } from '../types';
import FriendsIcon from './icons/FriendsIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import TrashIcon from './icons/TrashIcon';

interface FriendsProps {
  friends: Friend[];
  competitions: Competition[];
  currentUserId: number;
  onOpenCreateCompetition: () => void;
  onEndCompetition: (competitionId: number) => void;
}

const Friends: React.FC<FriendsProps> = ({ friends, competitions, currentUserId, onOpenCreateCompetition, onEndCompetition }) => {

  const getRankColor = (index: number) => {
    if (index === 0) return 'border-yellow-400 text-yellow-400';
    if (index === 1) return 'border-slate-400 text-slate-400';
    if (index === 2) return 'border-yellow-600 text-yellow-600';
    return 'border-slate-600 text-slate-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <FriendsIcon className="w-8 h-8 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Friends & Competitions</h2>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
            <h3 className="text-xl font-semibold text-white">Active Competitions</h3>
            <button
                onClick={onOpenCreateCompetition}
                className="flex items-center gap-2 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white py-2 px-3 rounded-lg transition-colors"
            >
                <PlusCircleIcon className="w-5 h-5" />
                <span>Create New</span>
            </button>
        </div>
        {competitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitions.map(comp => (
                    <div key={comp.id} className="bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-white">{comp.title}</h4>
                                <span className="text-xs text-slate-400">Ends in {comp.endsIn}</span>
                            </div>
                            {comp.ownerId === currentUserId && (
                                <button
                                    onClick={() => onEndCompetition(comp.id)}
                                    className="text-slate-500 hover:text-red-400 transition-colors"
                                    title="End Competition"
                                >
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            )}
                        </div>
                        <ul className="space-y-2 flex-grow">
                        {[...comp.participants].sort((a, b) => b.points - a.points).map((p, index) => (
                            <li key={p.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-900/50">
                                <span className={`font-bold w-5 text-center ${getRankColor(index)}`}>{index+1}</span>
                                <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full"/>
                                <span className="font-semibold text-slate-300">{p.name}</span>
                                <span className="ml-auto font-bold text-indigo-300">{p.points}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                ))}
            </div>
        ) : (
             <div className="text-center py-10 bg-slate-800 rounded-xl">
                <p className="text-slate-400">No active competitions.</p>
                <p className="text-slate-500">Why not start one?</p>
            </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">Friend List</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map(friend => (
                <li key={friend.id} className="bg-slate-800 p-3 rounded-xl shadow-lg text-center">
                    <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full mx-auto mb-2"/>
                    <p className="font-semibold text-white">{friend.name}</p>
                    <p className="text-sm text-indigo-300">{friend.points.toLocaleString()} pts</p>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends;