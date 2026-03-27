import { motion } from 'framer-motion';
import { Bell, BookOpen, UserPlus, Calendar, Award } from 'lucide-react';

const notifications = [
  { icon: UserPlus, title: 'New student enrolled', desc: 'Aria Patel joined Advanced React', time: '2 min ago' },
  { icon: BookOpen, title: 'Course published', desc: 'Data Science 101 is now live', time: '1 hour ago' },
  { icon: Calendar, title: 'Upcoming event', desc: 'Webinar: AI in Education tomorrow at 3PM', time: '3 hours ago' },
  { icon: Award, title: 'Certificate issued', desc: 'Noah Kim completed Machine Learning', time: '5 hours ago' },
  { icon: Bell, title: 'System update', desc: 'Platform maintenance scheduled for Sunday', time: '1 day ago' },
];

const NotificationsPanel = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
className="p-6 rounded-2xl glass-surface backdrop-blur-xl"
  >
    <h3 className="text-lg font-bold text-main mb-4">Notifications</h3>
    <div className="space-y-3">
      {notifications.map((n, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(var(--primary-rgb),0.05)] transition-colors cursor-pointer"
        >
          <div
            className="p-2 rounded-lg shrink-0"
            style={{ backgroundColor: `rgba(var(--primary-rgb), 0.1)`, color: 'var(--primary)' }}
          >
            <n.icon size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-main">{n.title}</p>
            <p className="text-xs text-muted-custom truncate">{n.desc}</p>
          </div>
          <span className="text-[10px] text-muted-custom whitespace-nowrap mt-0.5">{n.time}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default NotificationsPanel;
