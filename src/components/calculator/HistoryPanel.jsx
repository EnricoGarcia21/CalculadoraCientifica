import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HistoryPanel({ history, onSelect, onClear, onClose }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute inset-0 z-20 flex flex-col
          bg-slate-900 rounded-3xl overflow-hidden
          border border-slate-800 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4
  border-b border-slate-800 bg-slate-900/95">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-medium text-sm tracking-wide">Histórico</h3>
          <span className="text-[10px] bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">
            {history.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-slate-500 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600">
            <RotateCcw className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">Nenhum cálculo ainda</p>
          </div>
        ) : (
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.button
                key={entry.timestamp}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => {
                  onSelect(entry);
                  onClose();
                }}
                className="w-full text-right px-4 py-3 rounded-xl mb-1 transition-all
                  hover:bg-white/5 active:bg-white/10 group cursor-pointer"
              >
                <p className="text-slate-500 text-xs font-light truncate mb-0.5 
                  group-hover:text-slate-400 transition-colors">
                  {entry.expression}
                </p>
                <p className="text-white text-lg font-medium group-hover:text-blue-300 transition-colors">
                  = {entry.result}
                </p>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}