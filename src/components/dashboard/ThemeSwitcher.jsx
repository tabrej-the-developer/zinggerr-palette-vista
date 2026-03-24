import { motion } from 'framer-motion';
import { themes, useTheme } from '@/contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-surface-solid glass-surface">
      {themes.map((t) => (
        <motion.button
          key={t.name}
          onClick={() => setTheme(t.name)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-full transition-all duration-300"
          style={{ width: theme === t.name ? 32 : 24, height: theme === t.name ? 32 : 24 }}
          title={t.label}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              boxShadow: theme === t.name ? `0 0 12px ${t.primary}60` : 'none',
            }}
          />
          {theme === t.name && (
            <motion.div
              layoutId="theme-ring"
              className="absolute inset-[-3px] rounded-full border-2"
              style={{ borderColor: t.primary }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
