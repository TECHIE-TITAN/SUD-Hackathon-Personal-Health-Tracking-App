import React, { useState } from 'react';
import { Friend } from '../types';
import SwordIcon from './icons/SwordIcon';

interface ChallengeFriendModalProps {
  friends: Friend[];
  onClose: () => void;
  onChallenge: () => void;
}

const ChallengeFriendModal: React.FC<ChallengeFriendModalProps> = ({ friends, onClose, onChallenge }) => {
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

  const handleChallengeClick = () => {
    if (selectedFriendId) {
      onChallenge();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-slate-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>

        <div className="text-center">
            <SwordIcon className="w-12 h-12 mx-auto text-purple-400 mb-2" />
            <h3 className="text-2xl font-bold text-white mb-2">Challenge a Friend</h3>
            <p className="text-slate-400 mb-6">Select a friend to challenge to a step count contest!</p>
        </div>
        
        <ul className="space-y-2 max-h-60 overflow-y-auto mb-6 pr-2">
            {friends.map(friend => (
                <li key={friend.id}>
                    <button
                        onClick={() => setSelectedFriendId(friend.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 border-2 ${selectedFriendId === friend.id ? 'bg-slate-700 border-purple-500' : 'bg-slate-900/50 border-transparent hover:border-slate-600'}`}
                    >
                        <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                        <span className="font-semibold text-white">{friend.name}</span>
                    </button>
                </li>
            ))}
        </ul>

        <button
          onClick={handleChallengeClick}
          disabled={!selectedFriendId}
          className="w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          <SwordIcon className="w-5 h-5" />
          <span>Send Challenge</span>
        </button>
      </div>
    </div>
  );
};

export default ChallengeFriendModal;