import React from 'react';
import DashboardIcon from './icons/DashboardIcon';
import TrophyIcon from './icons/TrophyIcon';
import CoinIcon from './icons/CoinIcon';
import DietIcon from './icons/DietIcon';
import BlogIcon from './icons/BlogIcon';
import CalendarIcon from './icons/CalendarIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import FriendsIcon from './icons/FriendsIcon';
import ProfileIcon from './icons/ProfileIcon';
import UsersIcon from './icons/UsersIcon';


export type ActiveTab = 'dashboard' | 'leaderboard' | 'rewards' | 'diet' | 'posts' | 'events' | 'learn' | 'friends' | 'community' | 'profile';

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  showNotification?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick, showNotification }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1 w-full py-2 px-1 text-xs sm:text-sm rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
      {showNotification && (
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
      )}
    </button>
  );
};

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  hasSpunToday: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, hasSpunToday }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; notification?: boolean }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: 'posts', label: 'Posts', icon: <BlogIcon className="w-6 h-6" /> },
    { id: 'friends', label: 'Friends', icon: <FriendsIcon className="w-6 h-6" /> },
    { id: 'community', label: 'Community', icon: <UsersIcon className="w-6 h-6" /> },
    { id: 'events', label: 'Events', icon: <CalendarIcon className="w-6 h-6" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpenIcon className="w-6 h-6" /> },
    { id: 'diet', label: 'Diet', icon: <DietIcon className="w-6 h-6" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <TrophyIcon className="w-6 h-6" /> },
    { id: 'rewards', label: 'Rewards', icon: <CoinIcon className="w-6 h-6" /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon className="w-6 h-6" />, notification: !hasSpunToday },
  ];

  return (
    <nav className="sticky top-[65px] z-10 bg-slate-800/80 backdrop-blur-sm p-2 mb-6 rounded-xl shadow-lg">
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
        {navItems.map(item => (
          <NavItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
            showNotification={item.notification}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;