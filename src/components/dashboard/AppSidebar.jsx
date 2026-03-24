import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, GraduationCap, Users, BookOpen, ClipboardList,
  CalendarDays, ListTodo, Video, Bell, Shield, Settings, LogOut,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: GraduationCap, label: 'Students' },
  { icon: Users, label: 'Faculty' },
  { icon: BookOpen, label: 'Courses' },
  { icon: ClipboardList, label: 'Enrollments' },
  { icon: CalendarDays, label: 'Events' },
  { icon: ListTodo, label: 'Tasks' },
  { icon: Video, label: 'Live Classes' },
  { icon: Bell, label: 'Notifications' },
  { icon: Shield, label: 'Roles & Permissions' },
  { icon: Settings, label: 'Settings' },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden z-30"
      style={{
        background: `linear-gradient(180deg, var(--sidebar-gradient-from), var(--sidebar-gradient-to))`,
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Logo */}
      <div className="relative flex items-center gap-3 px-4 h-16 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-white text-lg">
          Z
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="overflow-hidden"
            >
              <span className="font-bold text-white text-lg tracking-tight">Zinggerr</span>
              <span className="block text-[10px] text-white/60 -mt-0.5 tracking-wider uppercase">LMS</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu */}
      <nav className="relative flex-1 overflow-y-auto py-4 px-2 space-y-0.5 scrollbar-thin">
        {menuItems.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <motion.button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${
                isActive
                  ? 'bg-white/25 shadow-lg shadow-black/10'
                  : 'hover:bg-white/10'
              }`}
            >
              <item.icon
                size={20}
                className={`shrink-0 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`text-sm font-medium whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-8 rounded-r-full bg-white"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* User Card */}
      <div className="relative px-3 pb-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
            TU
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">Turgnina</p>
                <p className="text-[11px] text-white/50 truncate">SuperAdmin</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button className="text-white/50 hover:text-white transition-colors">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-5 -right-3 w-6 h-6 rounded-full bg-surface-solid shadow-glass flex items-center justify-center z-50 hover:scale-110 transition-transform"
        style={{ color: 'var(--text-muted)' }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
};

export default AppSidebar;
