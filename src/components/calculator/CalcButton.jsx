import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const variants = {
  // Aumentamos a opacidade do fundo e garantimos texto escuro/forte
  number: 'bg-white/90 hover:bg-white text-slate-800 border-slate-200 shadow-sm',
  
  // Cores mais sólidas para operadores
  operator: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200 font-bold',
  
  // Violeta mais nítido
  function: 'bg-violet-100 hover:bg-violet-200 text-violet-700 border-violet-200',
  
  // Laranja com texto mais escuro para leitura
  action: 'bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-200',
  
  // O botão de igual já é forte, mas garantimos o gradiente vibrante
  equals: 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-md border-blue-500',
  
  // Vermelho de perigo (Clear/AC)
  danger: 'bg-red-100 hover:bg-red-200 text-red-700 border-red-200',
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