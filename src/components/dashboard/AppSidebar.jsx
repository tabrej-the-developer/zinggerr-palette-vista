import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, GraduationCap, Users, BookOpen, ClipboardList,
  CalendarDays, ListTodo, Video, Bell, Shield, Settings, LogOut,
  ChevronLeft, ChevronRight, ChevronDown, UserPlus, List, UserCog, GraduationCap as StudentIcon
} from 'lucide-react';

const usersSubItems = [
  { label: 'Create', path: '/users/create', icon: UserPlus },
  { label: 'List', path: '/users/list', icon: List },
  { label: 'Faculty', path: '/users/faculty', icon: UserCog },
  { label: 'Student', path: '/users/student', icon: GraduationCap },
];

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users', hasDropdown: true },
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
  const [usersOpen, setUsersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item) => {
    if (item.path) return location.pathname === item.path;
    if (item.hasDropdown) return location.pathname.startsWith('/users');
    return false;
  };

  const isSubActive = (path) => location.pathname === path;

  const handleClick = (item) => {
    if (item.hasDropdown) {
      setUsersOpen(!usersOpen);
    } else if (item.path) {
      navigate(item.path);
    }
  };

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
          const active = isActive(item);
          return (
            <div key={item.label}>
              <motion.button
                onClick={() => handleClick(item)}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${
                  active
                    ? 'bg-white/25 shadow-lg shadow-black/10'
                    : 'hover:bg-white/10'
                }`}
              >
                <item.icon
                  size={20}
                  className={`shrink-0 ${active ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-sm font-medium whitespace-nowrap flex-1 text-left ${
                        active ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.hasDropdown && !collapsed && (
                  <motion.div
                    animate={{ rotate: usersOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-white/50" />
                  </motion.div>
                )}
                {active && !item.hasDropdown && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-8 rounded-r-full bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>

              {/* Users submenu */}
              {item.hasDropdown && (
                <AnimatePresence>
                  {usersOpen && !collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="ml-5 mt-1 space-y-0.5 border-l border-white/20 pl-3">
                        {usersSubItems.map((sub) => {
                          const subActive = isSubActive(sub.path);
                          return (
                            <motion.button
                              key={sub.path}
                              onClick={() => navigate(sub.path)}
                              whileHover={{ x: 3 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm ${
                                subActive
                                  ? 'bg-white/20 text-white font-medium shadow-sm'
                                  : 'text-white/60 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <sub.icon size={16} className="shrink-0" />
                              <span className="whitespace-nowrap">{sub.label}</span>
                              {subActive && (
                                <motion.div
                                  layoutId="sidebar-sub-active"
                                  className="absolute left-0 w-1 h-6 rounded-r-full bg-white"
                                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
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
