import React, { useState } from 'react';
import { analyzeDiet } from '../services/geminiService';
import { DietAnalysisResult } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import DietIcon from './icons/DietIcon';

interface DietTrackerProps {
  onMealAnalyzed: (points: number) => void;
}

const DietTracker: React.FC<DietTrackerProps> = ({ onMealAnalyzed }) => {
  const [mealDescription, setMealDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DietAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!mealDescription.trim()) {
      setError('Please describe your meal.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysis = await analyzeDiet(mealDescription);
      setResult(analysis);
      onMealAnalyzed(analysis.points);
      setMealDescription(''); // Clear input after success
    } catch (err) {
      setError('Sorry, I couldn\'t analyze your meal. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <DietIcon className="w-8 h-8 text-green-400" />
        <h2 className="text-2xl font-bold text-white">AI Diet Tracker</h2>
      </div>
      <p className="text-slate-400 mb-4">
        Tell me what you ate for your last meal, and I'll give you points and feedback.
      </p>
      
      <div className="space-y-4">
        <textarea
          value={mealDescription}
          onChange={(e) => setMealDescription(e.target.value)}
          placeholder="e.g., Grilled chicken salad with avocado and a side of quinoa."
          className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          disabled={isLoading}
        />
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>Analyze My Meal</span>
            </>
          )}
        </button>
        {error && <p className="text-red-400 text-center">{error}</p>}
      </div>

      {result && (
        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700 animate-pulse-slow">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-white">Analysis Result</h3>
                <span className={`text-2xl font-bold ${result.points >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {result.points > 0 ? '+' : ''}{result.points} points
                </span>
            </div>
            <div className="space-y-3">
                <div>
                    <h4 className="font-semibold text-slate-300">Justification:</h4>
                    <p className="text-slate-400">{result.justification}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-300">Suggestion:</h4>
                    <p className="text-slate-400">{result.suggestion}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DietTracker;
