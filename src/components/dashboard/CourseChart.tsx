import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { month: 'Jan', enrollments: 120, revenue: 4200 },
  { month: 'Feb', enrollments: 190, revenue: 5800 },
  { month: 'Mar', enrollments: 160, revenue: 5100 },
  { month: 'Apr', enrollments: 280, revenue: 8200 },
  { month: 'May', enrollments: 320, revenue: 9400 },
  { month: 'Jun', enrollments: 290, revenue: 8800 },
  { month: 'Jul', enrollments: 380, revenue: 11200 },
  { month: 'Aug', enrollments: 420, revenue: 12600 },
  { month: 'Sep', enrollments: 390, revenue: 11800 },
  { month: 'Oct', enrollments: 460, revenue: 14200 },
  { month: 'Nov', enrollments: 510, revenue: 15600 },
  { month: 'Dec', enrollments: 480, revenue: 14842 },
];

const CourseChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-6 rounded-2xl glass-surface backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-main">Course Analytics</h3>
          <p className="text-sm text-muted-custom">Enrollments & Revenue trends</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
            Enrollments
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--secondary)' }} />
            Revenue
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="secondaryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: 'var(--surface-solid)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(var(--shadow-rgb), 0.15)',
              color: 'var(--text-main)',
            }}
          />
          <Area type="monotone" dataKey="enrollments" stroke="var(--primary)" fill="url(#primaryGrad)" strokeWidth={2.5} />
          <Area type="monotone" dataKey="revenue" stroke="var(--secondary)" fill="url(#secondaryGrad)" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CourseChart;
