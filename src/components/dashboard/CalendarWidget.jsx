import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 19)); // March 2026
  const today = new Date(2026, 2, 19);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isToday = (d) =>
    d !== null && d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-6 rounded-2xl glass-surface backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-main">{monthName}</h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-[rgba(var(--primary-rgb),0.1)] transition-colors">
            <ChevronLeft size={16} style={{ color: 'var(--text-muted)' }} />
          </button>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-[rgba(var(--primary-rgb),0.1)] transition-colors">
            <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {daysOfWeek.map((d) => (
          <div key={d} className="text-[11px] font-semibold text-muted-custom py-2">{d}</div>
        ))}
        {days.map((d, i) => (
          <div
            key={i}
            className={`relative py-2 text-sm rounded-lg transition-all cursor-default ${
              d === null ? '' : 'hover:bg-[rgba(var(--primary-rgb),0.08)]'
            }`}
            style={isToday(d) ? {
              backgroundColor: 'var(--primary)',
              color: '#FFF',
              fontWeight: 700,
              borderRadius: 8,
            } : { color: d ? 'var(--text-main)' : 'transparent' }}
          >
            {d}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CalendarWidget;
