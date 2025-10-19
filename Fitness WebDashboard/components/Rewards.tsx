import React from 'react';
import { Reward, UserStats } from '../types';
import CoinIcon from './icons/CoinIcon';
import CheckIcon from './icons/CheckIcon';

interface RewardsProps {
  rewards: Reward[];
  userStats: UserStats;
  claimedRewardIds: number[];
  onClaimReward: (reward: Reward) => void;
}

const Rewards: React.FC<RewardsProps> = ({ rewards, userStats, claimedRewardIds, onClaimReward }) => {
  const availableRewards = rewards.filter(r => !claimedRewardIds.includes(r.id));
  const claimedRewards = rewards.filter(r => claimedRewardIds.includes(r.id));

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <CoinIcon className="w-8 h-8 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Rewards Hub</h2>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">Available Rewards</h3>
        {availableRewards.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.map((reward) => {
              const canAfford = userStats.points >= reward.pointsRequired;
              return (
                <li key={reward.id} className="p-4 rounded-lg bg-slate-900/50 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white">{reward.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{reward.description}</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-right mb-3">
                      <p className="font-bold text-lg text-cyan-400">{reward.pointsRequired.toLocaleString()}
                        <span className="text-sm text-slate-500 ml-1">points</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => onClaimReward(reward)}
                      disabled={!canAfford} 
                      className="w-full text-sm font-semibold py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                    >
                      {canAfford ? 'Claim Reward' : 'Not enough points'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-slate-400">No new rewards available. Check back later!</p>
        )}
      </div>

      {claimedRewards.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">Claimed Rewards</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {claimedRewards.map((reward) => (
              <li key={reward.id} className="p-4 rounded-lg bg-slate-900/50 opacity-70">
                <h4 className="font-bold text-slate-300">{reward.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{reward.description}</p>
                <div className="mt-3 text-sm font-semibold text-green-400 flex items-center gap-2">
                    <CheckIcon className="w-5 h-5"/>
                    <span>Claimed!</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Rewards;
