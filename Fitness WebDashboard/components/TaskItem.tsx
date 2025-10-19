import React from 'react';
import { Task, TaskCategory } from '../types';
import CheckIcon from './icons/CheckIcon';
import SwordIcon from './icons/SwordIcon';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onAction: (action: Task['action']) => void;
}

const categoryColors: { [key in TaskCategory]: { bg: string; text: string; ring: string } } = {
  [TaskCategory.Health]: { bg: 'bg-green-900/50', text: 'text-green-300', ring: 'ring-green-400' },
  [TaskCategory.Financial]: { bg: 'bg-blue-900/50', text: 'text-blue-300', ring: 'ring-blue-400' },
  [TaskCategory.Social]: { bg: 'bg-purple-900/50', text: 'text-purple-300', ring: 'ring-purple-400' },
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onAction }) => {
  const colors = categoryColors[task.category];

  const renderActionButton = () => {
    if (task.completed) {
      return (
        <button
          onClick={() => onToggle(task.id)}
          className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-green-500 border-2 border-green-500"
        >
          <CheckIcon className="w-5 h-5 text-white" />
        </button>
      );
    }
    
    if (task.action) {
        return (
            <button 
                onClick={() => onAction(task.action)}
                className={`w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${colors.ring} border-opacity-50 hover:bg-purple-500/20`}
            >
                <SwordIcon className={`w-5 h-5 ${colors.text}`} />
            </button>
        );
    }

    return (
        <button
          onClick={() => onToggle(task.id)}
          className="w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 border-slate-500 hover:border-white"
        >
        </button>
    );
  };

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
        task.completed ? 'bg-slate-800 opacity-60' : `${colors.bg} hover:bg-slate-700/80`
      }`}
    >
      <div className="flex items-center gap-4">
        {renderActionButton()}
        <div>
          <p className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
            {task.title}
          </p>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {task.category}
          </span>
        </div>
      </div>
       <div className={`font-bold text-lg ${colors.text}`}>
        +{task.points}
      </div>
    </li>
  );
};

export default TaskItem;