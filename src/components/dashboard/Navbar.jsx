import { Search, Bell, ChevronDown } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  return (
    <header className="h-16 glass-navbar flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-solid text-main text-sm placeholder:text-muted-custom focus:outline-none focus:ring-2 transition-shadow"
            style={{ borderColor: 'var(--border)', focusRingColor: 'var(--primary)' }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <button className="relative p-2.5 rounded-xl glass-surface hover:shadow-glass transition-all">
          <Bell size={18} style={{ color: 'var(--text-muted)' }} />
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            3
          </span>
        </button>

        <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl glass-surface hover:shadow-glass transition-all">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            TU
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-main">Turgnina</p>
            <p className="text-[11px] text-muted-custom">SuperAdmin</p>
          </div>
          <ChevronDown size={14} className="text-muted-custom" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
