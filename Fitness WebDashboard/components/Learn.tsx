import React from 'react';
import { Article, ArticleCategory, UserProfile } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import CheckIcon from './icons/CheckIcon';
import SparklesIcon from './icons/SparklesIcon';

interface LearnProps {
  articles: Article[];
  completedArticleIds: number[];
  onReadArticle: (article: Article) => void;
  userProfile: UserProfile;
  onGenerateQuiz: () => void;
  isGeneratingQuiz: boolean;
}

const categoryColors: { [key in ArticleCategory]: { bg: string; text: string; } } = {
  [ArticleCategory.Blog]: { bg: 'bg-purple-900/50', text: 'text-purple-300' },
  [ArticleCategory.News]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300' },
  [ArticleCategory.Article]: { bg: 'bg-sky-900/50', text: 'text-sky-300' },
};

const Learn: React.FC<LearnProps> = ({ articles, completedArticleIds, onReadArticle, userProfile, onGenerateQuiz, isGeneratingQuiz }) => {
  const totalPointsAvailable = (article: Article) =>
    article.quiz.questions.reduce((sum, q) => sum + q.points, 0);

  const canGeneratePersonalizedQuiz = !!userProfile.conditions;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <BookOpenIcon className="w-8 h-8 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Learn & Earn</h2>
      </div>
      <p className="text-slate-400 mb-6">
        Read an article, pass the quiz, and earn points to boost your wellness score.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personalized Quiz Card */}
        <li className="p-5 rounded-xl flex flex-col justify-between shadow-lg bg-slate-800 border-2 border-dashed border-cyan-500/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-6 h-6 text-cyan-400" />
              <h3 className="font-bold text-white text-lg">Your Personalized AI Quiz</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Get a custom quiz based on the health conditions you've added to your profile.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <button
              onClick={onGenerateQuiz}
              disabled={!canGeneratePersonalizedQuiz || isGeneratingQuiz}
              className="w-full font-semibold text-sm text-white bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              title={!canGeneratePersonalizedQuiz ? "Add health conditions to your profile to unlock" : ""}
            >
              {isGeneratingQuiz ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                "Generate My Quiz"
              )}
            </button>
          </div>
        </li>

        {articles.map((article) => {
          const isCompleted = completedArticleIds.includes(article.id);
          const colors = categoryColors[article.category];

          return (
            <li
              key={article.id}
              className={`p-5 rounded-xl flex flex-col justify-between shadow-lg transition-all duration-300 ${isCompleted ? 'bg-slate-800/50 opacity-60' : 'bg-slate-800 hover:bg-slate-700/80 cursor-pointer'}`}
              onClick={() => !isCompleted && onReadArticle(article)}
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-lg mb-2">{article.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>{article.category}</span>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {article.content}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                <p className="font-bold text-lg text-cyan-400">+{totalPointsAvailable(article)} pts</p>
                {isCompleted ? (
                  <span className="font-semibold text-green-400 flex items-center gap-2">
                    <CheckIcon className="w-5 h-5" />
                    Completed
                  </span>
                ) : (
                  <button className="font-semibold text-sm text-white">
                    Read & Quiz &rarr;
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Learn;