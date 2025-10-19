import React, { useState } from 'react';
import { Post } from '../types';
import { DAILY_POST_LIMIT, POST_REWARD_POINTS } from '../constants';
import BlogIcon from './icons/BlogIcon';
import ShareIcon from './icons/ShareIcon';

interface PostsProps {
  posts: Post[];
  postsToday: number;
  onCreatePost: (content: string) => void;
  onSharePost: (post: Post) => void;
}

const Posts: React.FC<PostsProps> = ({ posts, postsToday, onCreatePost, onSharePost }) => {
  const [content, setContent] = useState('');
  const canPost = postsToday < DAILY_POST_LIMIT;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && canPost) {
      onCreatePost(content);
      setContent('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-4">
            <BlogIcon className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Share Your Progress</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share an achievement or a goal..."
            className="w-full h-28 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            disabled={!canPost}
          />
          <div className="flex justify-between items-center">
             <p className="text-sm text-slate-400">
                Post to earn <span className="font-bold text-purple-300">{POST_REWARD_POINTS} points</span>.
                Daily limit: {postsToday}/{DAILY_POST_LIMIT}
             </p>
            <button
              type="submit"
              disabled={!canPost || !content.trim()}
              className="bg-purple-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-purple-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white px-2">Your Posts</h3>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="bg-slate-800 p-4 rounded-xl shadow-lg">
              <p className="text-slate-200 whitespace-pre-wrap">{post.content}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-slate-500">{post.timestamp}</p>
                 <button onClick={() => onSharePost(post)} className="text-slate-400 hover:text-white transition-colors">
                    <ShareIcon className="w-5 h-5"/>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-slate-800 rounded-xl">
            <p className="text-slate-400">You haven't posted anything yet.</p>
            <p className="text-slate-500">Share your first update to earn points!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;