import React, { useState } from 'react';
import { Article } from '../types';
import CheckIcon from './icons/CheckIcon';
import TrophyIcon from './icons/TrophyIcon';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onQuizComplete: (articleId: number, pointsEarned: number) => void;
}

type ModalView = 'reading' | 'quizzing' | 'results';

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onQuizComplete }) => {
  const [view, setView] = useState<ModalView>('reading');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  
  const currentQuestion = article.quiz.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setPointsEarned(prev => prev + currentQuestion.points);
    }
    setScore(prev => prev + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0));
    
    setSelectedAnswer(null);

    if (currentQuestionIndex < article.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setView('results');
    }
  };
  
  const handleFinishQuiz = () => {
    onQuizComplete(article.id, pointsEarned);
  };
  
  const renderContent = () => {
    switch(view) {
        case 'reading':
            return (
                <>
                    <h3 className="text-2xl font-bold text-white mb-4">{article.title}</h3>
                    <div className="max-h-[50vh] overflow-y-auto pr-2 text-slate-300 text-left mb-6">
                        <p className="whitespace-pre-wrap">{article.content}</p>
                    </div>
                    <button onClick={() => setView('quizzing')} className="w-full font-bold py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
                        Start Quiz
                    </button>
                </>
            );
        case 'quizzing':
            return (
                <div>
                    <div className="text-sm text-slate-400 mb-2">Question {currentQuestionIndex + 1} of {article.quiz.questions.length}</div>
                    <h4 className="text-xl font-semibold text-white mb-4">{currentQuestion.question}</h4>
                    <ul className="space-y-3 text-left">
                        {currentQuestion.options.map((option, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setSelectedAnswer(index)}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${selectedAnswer === index ? 'bg-sky-500 border-sky-400 text-white' : 'bg-slate-700 border-slate-600 hover:border-sky-500'}`}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="w-full mt-6 font-bold py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                        {currentQuestionIndex < article.quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </div>
            );
        case 'results':
            return (
                <div className="text-center">
                    <TrophyIcon className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
                    <h3 className="text-2xl font-bold text-white">Quiz Complete!</h3>
                    <p className="text-slate-300 mt-2">You scored {score} out of {article.quiz.questions.length}</p>
                    <p className="text-3xl font-bold text-cyan-400 my-4">+{pointsEarned} Points</p>
                    <button onClick={handleFinishQuiz} className="w-full font-bold py-3 px-4 rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
                        Awesome!
                    </button>
                </div>
            );
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default ArticleModal;