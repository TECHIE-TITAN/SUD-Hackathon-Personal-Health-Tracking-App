import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
            <SparklesIcon className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-bold tracking-tight">Wellness Pet</h1>
        </div>
        <p className="text-slate-400 text-lg mb-8">
            Your journey to a healthier, wealthier life starts now.
        </p>
        <button
          onClick={onLogin}
          className="bg-indigo-600 text-white font-bold text-lg py-3 px-12 rounded-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </div>
       <footer className="absolute bottom-4 text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Wellness Pet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;