import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const StatCard = ({ title, value, prefix = '', icon: Icon, trend, delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative p-6 rounded-2xl glass-surface backdrop-blur-xl overflow-hidden cursor-default"
      style={{ transition: 'box-shadow 0.3s ease' }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 60px -10px rgba(var(--shadow-rgb), 0.25)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
    >
      <div className="flex justify-between items-start">
        <div
          className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `rgba(var(--primary-rgb), 0.1)`, color: 'var(--primary)' }}
        >
          <Icon size={24} />
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: trend > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: trend > 0 ? '#10B981' : '#EF4444',
          }}
        >
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <h3 className="mt-4 text-sm font-medium text-muted-custom">{title}</h3>
      <p className="text-3xl font-bold mt-1 font-mono-nums text-main">
        {prefix}{count.toLocaleString()}
      </p>

      {/* Decorative Blob */}
      <div
        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-5 group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: 'var(--primary)' }}
      />
    </motion.div>
  );
};

export default StatCard;
