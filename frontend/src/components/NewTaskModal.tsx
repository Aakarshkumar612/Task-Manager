import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Priority, Status } from './TaskCard';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (task: { title: string; description?: string; status: Status; priority: Priority }) => Promise<any>;
}

const NewTaskModal: React.FC<Props> = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [submitting, setSubmitting] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);

  if (!open) return null;

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => titleRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onCreate({
        title: title.trim(),
        description: description.trim() || undefined,
        status: 'TODO',
        priority,
      });

      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const priorityStyles = {
    LOW: priority === 'LOW'
      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-blue-600/10',

    MEDIUM: priority === 'MEDIUM'
      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-indigo-600/10',

    HIGH: priority === 'HIGH'
      ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/20'
      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-amber-600/10',

    URGENT: priority === 'URGENT'
      ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/20'
      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-rose-600/10',
  };

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <motion.form
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">New Task</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Capture your next big idea</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              Task Title
            </label>
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="What's on your mind?"
              className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all font-medium"
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details (optional)..."
              className="mt-2 w-full min-h-[120px] bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none transition-all font-medium"
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Priority Level
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {(['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${priorityStyles[p]}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-10 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-slate-300 font-bold active:scale-95"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-black shadow-xl shadow-indigo-600/20 disabled:opacity-50 active:scale-95"
          >
            {submitting ? (
              <RefreshCw className="animate-spin" size={20} />
            ) : (
              <Plus size={20} />
            )}
            {submitting ? 'CREATING...' : 'CREATE TASK'}
          </button>
        </div>
      </motion.form>
    </div>
  );

  return typeof document === 'undefined'
    ? content
    : createPortal(content, document.body);
};

export default NewTaskModal;