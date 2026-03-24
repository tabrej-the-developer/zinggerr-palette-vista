import { motion } from 'framer-motion';
import { BookPlus, UserPlus, GraduationCap, Video } from 'lucide-react';

const actions = [
  { icon: BookPlus, label: 'Create Course' },
  { icon: UserPlus, label: 'Add Student' },
  { icon: GraduationCap, label: 'Add Trainer' },
  { icon: Video, label: 'Schedule Class' },
];

const QuickActions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35 }}
    className="p-6 rounded-2xl glass-surface backdrop-blur-xl"
  >
    <h3 className="text-lg font-bold text-main mb-4">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <motion.button
          key={action.label}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 cursor-pointer group"
          style={{
            background: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.08), rgba(var(--primary-rgb), 0.02))`,
            border: '1px solid var(--border)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(var(--primary-rgb), 0.2)';
            e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <div
            className="p-3 rounded-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: `rgba(var(--primary-rgb), 0.1)`, color: 'var(--primary)' }}
          >
            <action.icon size={22} />
          </div>
          <span className="text-xs font-semibold text-main">{action.label}</span>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default QuickActions;
