import React from 'react';
import { Post } from '../types';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';
import ShareIcon from './icons/ShareIcon';

interface ShareModalProps {
  post: Post;
  onClose: () => void;
  onShared: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ post, onClose, onShared }) => {
  if (!post) return null;
  
  const handleShareClick = () => {
    onShared();
    onClose();
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
            <ShareIcon className="w-12 h-12 mx-auto text-cyan-400 mb-2" />
            <h3 className="text-2xl font-bold text-white mb-4">Share Post</h3>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-lg mb-6 border border-slate-700">
            <p className="text-slate-300 whitespace-pre-wrap">{post.content}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button
                onClick={handleShareClick}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors font-semibold"
            >
                <TwitterIcon className="w-5 h-5 text-white" />
                <span>Share to X</span>
            </button>
            <button
                onClick={handleShareClick}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors font-semibold"
            >
                <FacebookIcon className="w-5 h-5 text-white" />
                <span>Share to Facebook</span>
            </button>
        </div>
        <p className="text-xs text-slate-500 text-center mt-4">This is a simulation for demonstration.</p>
      </div>
    </div>
  );
};

export default ShareModal;