import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle2, RefreshCw, Clock } from 'lucide-react';

export type Status = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: Status;
  priority: Priority;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete }) => {
  const isDone = task.status === 'DONE';

  const priorityColors = {
    LOW: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    MEDIUM: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    HIGH: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    URGENT: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  const statusIcons = {
    BACKLOG: <Clock size={12} className="text-slate-500" />,
    TODO: <div className="h-1 w-1 rounded-full bg-blue-500" />,
    IN_PROGRESS: <div className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />,
    DONE: <CheckCircle2 size={12} className="text-emerald-500" />,
  };

  const handleToggleDone = () => {
    const newStatus: Status = isDone ? 'TODO' : 'DONE';
    onStatusChange(task.id, newStatus);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl hover:border-white/20 transition-all duration-200 p-6 flex flex-col h-full relative overflow-hidden group"
    >
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase text-slate-500 bg-white/5 border border-white/5">
            {statusIcons[task.status]}
            {task.status.replace('_', ' ')}
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="text-slate-600 hover:text-rose-500 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none rounded-md"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-2 mb-6 flex-1 relative z-10">
        <h3
          className={`text-lg font-bold tracking-tight ${
            isDone ? 'text-slate-500 line-through opacity-50' : 'text-white'
          }`}
        >
          {task.title}
        </h3>

        <p
          className={`text-sm leading-relaxed ${
            isDone ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-10">
        <button
          onClick={handleToggleDone}
          aria-label={isDone ? 'Reopen task' : 'Resolve task'}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none ${
            isDone
              ? 'bg-white/5 text-slate-400 hover:bg-white/10'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          {isDone ? <RefreshCw size={12} /> : <CheckCircle2 size={12} />}
          {isDone ? 'REOPEN' : 'RESOLVE'}
        </button>

        <span className="text-[10px] font-mono text-slate-600 uppercase">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </motion.article>
  );
};

export default TaskCard;