import React, { useState, useEffect } from 'react';
import { PetState, UserProfile } from '../types';
import { REFERRAL_POINTS } from '../constants';
import ProfileIcon from './icons/ProfileIcon';
import CheckIcon from './icons/CheckIcon';
import PersonalizationIcon from './icons/PersonalizationIcon';
import SparklesIcon from './icons/SparklesIcon';
import GiftIcon from './icons/GiftIcon';
import SpinWheel from './SpinWheel';

interface ProfileProps {
  petState: PetState;
  userProfile: UserProfile;
  hasSpunToday: boolean;
  onSaveProfile: (profile: UserProfile) => Promise<void>;
  onReferFriend: () => boolean;
  onLogout: () => void;
  onSpinWheel: (prize: number) => void;
}

const Profile: React.FC<ProfileProps> = ({ petState, userProfile, hasSpunToday, onSaveProfile, onReferFriend, onLogout, onSpinWheel }) => {
    const [referralMessage, setReferralMessage] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<UserProfile>(userProfile);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    useEffect(() => {
        setProfileData(userProfile);
    }, [userProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAndGenerate = async () => {
        setIsSaving(true);
        setSaveMessage(null);
        await onSaveProfile(profileData);
        setIsSaving(false);
        setSaveMessage("Profile saved! New personalized goals added to your dashboard.");
        setTimeout(() => setSaveMessage(null), 5000);
    };
    
    const handleReferClick = () => {
        const success = onReferFriend();
        if(success) {
            setReferralMessage(`Awesome! +${REFERRAL_POINTS} points have been added for your referral.`);
            setTimeout(() => setReferralMessage(null), 4000);
        }
    }

    const happinessColor = petState.happiness > 70 ? 'bg-green-500' : petState.happiness > 30 ? 'bg-yellow-500' : 'bg-red-500';

    return (
    <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
            <ProfileIcon className="w-8 h-8 text-slate-300" />
            <h2 className="text-2xl font-bold text-white">Your Profile</h2>
        </div>
        
        {/* Daily Reward Card */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
                <GiftIcon className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Daily Reward</h3>
            </div>
            <p className="text-slate-400 mb-4 text-sm">
                Spin the wheel once a day for a chance to win bonus points!
            </p>
            <SpinWheel onSpin={onSpinWheel} hasSpun={hasSpunToday} />
        </div>

        {/* Pet Details Card */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Pet Details</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Name:</span>
                    <span className="font-semibold text-white">{petState.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Current Mood:</span>
                    <span className="font-semibold text-white">{petState.mood}</span>
                </div>
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
            </div>
        </div>

        {/* Health Personalization Card */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
                <PersonalizationIcon className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Health Personalization</h3>
            </div>
            <p className="text-slate-400 mb-4 text-sm">
                Provide your details to get AI-generated health goals tailored just for you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-1">Age</label>
                    <input type="number" name="age" id="age" value={profileData.age} onChange={handleInputChange} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md" />
                </div>
                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-slate-300 mb-1">Height (cm)</label>
                    <input type="number" name="height" id="height" value={profileData.height} onChange={handleInputChange} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md" />
                </div>
                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-slate-300 mb-1">Weight (kg)</label>
                    <input type="number" name="weight" id="weight" value={profileData.weight} onChange={handleInputChange} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md" />
                </div>
            </div>
             <div>
                <label htmlFor="conditions" className="block text-sm font-medium text-slate-300 mb-1">Health Conditions or Goals</label>
                <textarea name="conditions" id="conditions" value={profileData.conditions} onChange={handleInputChange} placeholder="e.g., knee pain, high stress, want to build muscle" className="w-full h-20 p-2 bg-slate-700 border border-slate-600 rounded-md"></textarea>
            </div>
            <button
                onClick={handleSaveAndGenerate}
                disabled={isSaving}
                className="w-full mt-4 bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 disabled:bg-slate-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
                {isSaving ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        <SparklesIcon className="w-5 h-5"/>
                        <span>Save & Generate AI Goals</span>
                    </>
                )}
            </button>
            {saveMessage && (
                 <div className="mt-3 text-sm font-semibold text-green-400 flex items-center gap-2 justify-center">
                    <CheckIcon className="w-5 h-5"/>
                    <span>{saveMessage}</span>
                </div>
            )}
        </div>
        
        {/* Refer a Friend Card */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">Refer a Friend</h3>
            <p className="text-slate-400 mb-4 text-sm">
                Invite friends to join Wellness Pet! You and your friend will both get {REFERRAL_POINTS} points when they sign up.
            </p>
            <button
                onClick={handleReferClick}
                disabled={!!referralMessage}
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-500 disabled:bg-slate-600 transition-colors duration-200"
            >
                Refer a Friend
            </button>
            {referralMessage && (
                 <div className="mt-3 text-sm font-semibold text-green-400 flex items-center gap-2 justify-center">
                    <CheckIcon className="w-5 h-5"/>
                    <span>{referralMessage}</span>
                </div>
            )}
        </div>
        
        {/* Account Actions Card */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Account Actions</h3>
            <button
                 onClick={onLogout}
                 className="w-full bg-red-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
                Logout
            </button>
        </div>
    </div>
  );
};

export default Profile;