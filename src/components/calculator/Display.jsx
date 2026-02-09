import React, { useRef, useEffect } from 'react';
import { formatResult } from './MathParser';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Display({ expression, result, error }) {
  const exprRef = useRef(null);

  useEffect(() => {
    if (exprRef.current) {
      exprRef.current.scrollLeft = exprRef.current.scrollWidth;
    }
  }, [expression]);

  const displayResult = result !== null ? formatResult(result) : null;

  return (
    <div className="relative rounded-2xl p-5 mb-4 min-h-[120px] flex flex-col justify-end overflow-hidden
      bg-gradient-to-br from-slate-900 to-slate-800 dark:from-black dark:to-slate-900
      shadow-[inset_0_2px_20px_rgba(0,0,0,0.3)] border border-white/5">
      
      {/* Subtle glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
      
      {/* Expression line */}
      <div
        ref={exprRef}
        className="text-right overflow-x-auto whitespace-nowrap scrollbar-none pb-1
          text-slate-400 text-base md:text-lg font-light tracking-wide select-all"
        style={{ scrollbarWidth: 'none' }}
      >
        {expression || <span className="text-slate-600">0</span>}
      </div>

      {/* Result / Error */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-end gap-2 text-red-400 text-sm mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </motion.div>
        ) : displayResult !== null ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-right text-black text-3xl md:text-4xl font-semibold tracking-tight mt-1 select-all"
          >
            = {displayResult}
          </motion.div>
        ) : (
          <div className="h-10" />
        )}
      </AnimatePresence>
    </div>
  );
}