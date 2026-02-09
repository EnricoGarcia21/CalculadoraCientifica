import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative h-8 w-14 rounded-full px-1
        flex items-center cursor-pointer
        transition-colors duration-300
        border
        ${
          isDark
            ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
            : 'bg-slate-200 border-slate-300 hover:bg-slate-300'
        }
      `}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <motion.div
        animate={{ x: isDark ? 22 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`
          h-6 w-6 rounded-full
          flex items-center justify-center
          shadow-lg
          ${
            isDark
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
              : 'bg-gradient-to-br from-yellow-400 to-orange-500'
          }
        `}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-white" />
        )}
      </motion.div>
    </button>
  );
}