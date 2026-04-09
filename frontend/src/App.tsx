import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskCard from './components/TaskCard';
import NewTaskModal from './components/NewTaskModal';
import { Plus, RefreshCw, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { tasks, loading, error, createTask, updateTaskStatus, deleteTask, refresh } = useTasks();
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative">
          <div className="relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-full blur-sm" />
            <h1 className="text-6xl font-black tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Task</span>Flow
            </h1>
            <p className="text-slate-400 mt-2 font-medium tracking-wide">
              Intelligent workspace for peak productivity
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={refresh}
              aria-label="Refresh tasks"
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 transition-all border border-white/5 active:scale-90"
            >
              <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={() => setShowNew(true)}
              aria-label="Create new task"
              className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-black shadow-2xl shadow-indigo-600/20 transition-all active:scale-95"
            >
              <Plus size={24} /> NEW TASK
            </button>
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-3xl flex gap-4 items-center"
          >
            <div className="p-2 bg-rose-500/20 rounded-xl text-rose-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="font-bold text-rose-400 uppercase text-xs tracking-widest">Connectivity Error</p>
              <p className="text-sm text-slate-400 font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* TASK GRID */}
        <main>
          {loading && tasks.length === 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-white/5 rounded-2xl animate-pulse border border-white/10" />
              ))}
            </div>
          ) : tasks.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 } 
                }
              }}
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={updateTaskStatus}
                    onDelete={deleteTask}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]"
            >
              <div className="p-6 bg-white/5 rounded-3xl mb-6 text-slate-600">
                <Plus size={48} strokeWidth={1} />
              </div>
              <p className="text-slate-400 font-bold text-lg tracking-tight">Your workspace is clear</p>
              <p className="text-slate-500 text-sm mt-1">Tap 'New Task' to get started</p>
            </motion.div>
          )}
        </main>
      </div>

      <NewTaskModal
        open={showNew}
        onClose={() => setShowNew(false)}
        onCreate={createTask}
      />
    </div>
  );
}

export default App;