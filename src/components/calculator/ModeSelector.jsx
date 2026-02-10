import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const modes = [
  { key: 'standard', label: 'Padrão' },
  { key: 'scientific', label: 'Científica' },
  { key: 'programmer', label: 'Programador' },
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 shadow-inner">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={cn(
            'relative flex-1 text-xs md:text-sm py-2 px-3 rounded-lg transition-colors cursor-pointer',
            'font-medium tracking-wide',
            mode === m.key ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          )}
        >
          {mode === m.key && (
            <motion.div
              layoutId="mode-indicator"
              className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{m.label}</span>
        </button>
      ))}
    </div>
  );
}