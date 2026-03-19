import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const initialTasks = [
  { id: 1, text: 'Review new course submissions', done: false },
  { id: 2, text: 'Update faculty onboarding guide', done: false },
  { id: 3, text: 'Prepare monthly analytics report', done: true },
  { id: 4, text: 'Schedule live class for React Basics', done: false },
  { id: 5, text: 'Send enrollment confirmation emails', done: false },
];

const TasksWidget = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id: number) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="p-6 rounded-2xl glass-surface backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-main">To-Do List</h3>
        <span className="text-xs font-semibold text-muted-custom">
          {tasks.filter((t) => t.done).length}/{tasks.length}
        </span>
      </div>
      <div className="space-y-2">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(var(--primary-rgb),0.05)] transition-colors cursor-pointer"
              onClick={() => toggle(task.id)}
            >
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-200"
                style={{
                  backgroundColor: task.done ? 'var(--primary)' : 'transparent',
                  border: task.done ? 'none' : '2px solid var(--border)',
                }}
              >
                {task.done && <Check size={12} color="#FFF" strokeWidth={3} />}
              </div>
              <span
                className={`text-sm transition-all duration-200 ${
                  task.done ? 'line-through text-muted-custom' : 'text-main'
                }`}
              >
                {task.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TasksWidget;
