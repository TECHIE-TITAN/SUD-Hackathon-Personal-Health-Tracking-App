import React, { useState } from 'react';
import { Friend } from '../types';
import PlusCircleIcon from './icons/PlusCircleIcon';

interface CreateCompetitionModalProps {
  friends: Friend[];
  onClose: () => void;
  onCreateCompetition: (title: string, participantIds: number[]) => void;
}

const CreateCompetitionModal: React.FC<CreateCompetitionModalProps> = ({ friends, onClose, onCreateCompetition }) => {
  const [title, setTitle] = useState('');
  const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([]);

  const handleFriendToggle = (friendId: number) => {
    setSelectedFriendIds(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreate = () => {
    if (title.trim() && selectedFriendIds.length > 0) {
      onCreateCompetition(title.trim(), selectedFriendIds);
    }
  };

  const canCreate = title.trim() !== '' && selectedFriendIds.length > 0;

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>

        <div className="text-center">
            <PlusCircleIcon className="w-12 h-12 mx-auto text-purple-400 mb-2" />
            <h3 className="text-2xl font-bold text-white mb-2">Create a New Competition</h3>
            <p className="text-slate-400 mb-6">Give your competition a name and invite some friends!</p>
        </div>
        
        <div className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Competition Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., August Step Challenge"
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Invite Friends</label>
                <ul className="space-y-2 max-h-48 overflow-y-auto p-2 bg-slate-900/50 rounded-md border border-slate-700">
                    {friends.map(friend => (
                        <li key={friend.id}>
                            <label className="w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors duration-200 hover:bg-slate-700/50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedFriendIds.includes(friend.id)}
                                    onChange={() => handleFriendToggle(friend.id)}
                                    className="h-5 w-5 rounded bg-slate-600 border-slate-500 text-purple-500 focus:ring-purple-600"
                                />
                                <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full" />
                                <span className="font-semibold text-white">{friend.name}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={!canCreate}
          className="w-full mt-6 font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          <span>Start Competition</span>
        </button>
      </div>
    </div>
  );
};

export default CreateCompetitionModal;