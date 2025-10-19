import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onTaskAction: (action: Task['action']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onTaskAction }) => {
  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-full">
      <h3 className="text-xl font-bold mb-4 text-white">Today's Goals</h3>
      {incompleteTasks.length > 0 ? (
        <ul className="space-y-3">
          {incompleteTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={onToggleTask} onAction={onTaskAction} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
            <p className="text-slate-400">All goals for today are complete!</p>
            <p className="text-green-400 font-semibold text-lg mt-1">Amazing work!</p>
        </div>
      )}
      
      {completedTasks.length > 0 && (
          <div className="mt-8">
              <h4 className="text-lg font-bold mb-3 text-slate-400">Completed</h4>
               <ul className="space-y-3">
                    {completedTasks.map((task) => (
                        <TaskItem key={task.id} task={task} onToggle={onToggleTask} onAction={onTaskAction} />
                    ))}
                </ul>
          </div>
      )}
    </div>
  );
};

export default TaskList;