import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const variants = {
  number: 'bg-white/[0.07] hover:bg-white/[0.13] text-white border-white/[0.06]',
  operator: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/10',
  function: 'bg-violet-500/15 hover:bg-violet-500/25 text-violet-300 border-violet-500/10',
  action: 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border-orange-500/10',
  equals: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25 border-blue-400/20',
  danger: 'bg-red-500/15 hover:bg-red-500/25 text-red-300 border-red-500/10',
};

export default function CalcButton({ label, onClick, variant = 'number', span = 1, className }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onClick={onClick}
      className={cn(
        'relative rounded-xl font-medium text-base md:text-lg py-3.5 px-2',
        'border backdrop-blur-sm transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/40',
        'active:shadow-inner select-none cursor-pointer',
        variants[variant] || variants.number,
        span === 2 && 'col-span-2',
        className
      )}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}