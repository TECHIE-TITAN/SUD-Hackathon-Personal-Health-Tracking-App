
import React, { useState } from 'react';
import { generatePersonalizedGoals } from '../services/geminiService';
import { Task } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface AIGoalGeneratorProps {
  currentTasks: Task[];
  addTasks: (newTasks: Omit<Task, 'id' | 'completed'>[]) => void;
}

const AIGoalGenerator: React.FC<AIGoalGeneratorProps> = ({ currentTasks, addTasks }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateGoals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const completedTasks = currentTasks.filter(t => t.completed);
      const incompleteTasks = currentTasks.filter(t => !t.completed);
      const newGoals = await generatePersonalizedGoals(completedTasks, incompleteTasks);
      addTasks(newGoals);
    } catch (err) {
      setError('Failed to generate goals. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg text-center">
      <SparklesIcon className="w-12 h-12 mx-auto text-purple-400 mb-2"/>
      <h3 className="text-xl font-bold text-white">Feeling Ambitious?</h3>
      <p className="text-slate-400 mb-4 mt-1">Let AI create new personalized goals for you!</p>
      <button
        onClick={handleGenerateGoals}
        disabled={isLoading}
        className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5"/>
            <span>Generate AI Goals</span>
          </>
        )}
      </button>
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default AIGoalGenerator;
