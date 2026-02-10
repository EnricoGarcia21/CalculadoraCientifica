import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import useCalculator from '@/components/calculator/useCalculator';
import Display from '@/components/calculator/Display';
import Keypad from '@/components/calculator/Keypad';
import Toolbar from '@/components/calculator/Toolbar';
import HistoryPanel from '@/components/calculator/HistoryPanel';
import ModeSelector from '@/components/calculator/ModeSelector';
import ProgrammerDisplay from '@/components/calculator/ProgrammerDisplay';

const MODE_KEY = 'calc_mode';

export default function Calculator() {
  const {
    expression, result, error, history,
    undoStack, redoStack,
    append, deleteLast, clear, calculate,
    undo, redo, loadFromHistory, clearHistory,
  } = useCalculator();

  const [mode, setMode] = useState(() => {
    return localStorage.getItem(MODE_KEY) || 'scientific';
  });

  const [showHistory, setShowHistory] = useState(false);

  // Persist mode
  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  // Keyboard support
  const handleKeyDown = useCallback((e) => {
    if (showHistory) {
      if (e.key === 'Escape') setShowHistory(false);
      return;
    }

    const key = e.key;
    
    // Prevent default for calculator keys
    if (/^[0-9.+\-*/^%()=]$/.test(key) || ['Enter', 'Backspace', 'Escape', 'Delete'].includes(key)) {
      e.preventDefault();
    }

    // Numbers and decimal
    if (/^[0-9.]$/.test(key)) {
      append(key);
      return;
    }

    // Operators
    const opMap = { '+': '+', '-': '-', '*': '×', '/': '÷', '^': '^', '%': '%' };
    if (opMap[key]) {
      append(opMap[key]);
      return;
    }

    // Parentheses
    if (key === '(' || key === ')') {
      append(key);
      return;
    }

    // Enter = calculate
    if (key === 'Enter' || key === '=') {
      calculate();
      return;
    }

    // Backspace = delete
    if (key === 'Backspace') {
      deleteLast();
      return;
    }

    // Escape or Delete = clear
    if (key === 'Escape' || key === 'Delete') {
      clear();
      return;
    }

    // Ctrl+Z = undo, Ctrl+Y = redo
    if (e.ctrlKey || e.metaKey) {
      if (key === 'z') { e.preventDefault(); undo(); return; }
      if (key === 'y') { e.preventDefault(); redo(); return; }
    }
  }, [append, calculate, deleteLast, clear, undo, redo, showHistory]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] bg-blue-300/20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-[100px] bg-violet-300/20" />
      </div>

      <div className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden
  bg-slate-900/90 border border-slate-800
  shadow-2xl shadow-black/50 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h1 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-500">
            Calculadora
          </h1>
        </div>

        {/* Mode Selector */}
        <div className="px-5 pb-3">
          <ModeSelector mode={mode} onChange={setMode} />
        </div>

        {/* Main Content */}
        <div className="px-5 pb-5 relative">
          {/* Display */}
          <Display expression={expression} result={result} error={error} />

          {/* Programmer base display */}
          {mode === 'programmer' && <ProgrammerDisplay result={result} />}

          {/* Toolbar */}
          <Toolbar
            onUndo={undo}
            onRedo={redo}
            onDelete={deleteLast}
            onHistoryToggle={() => setShowHistory(true)}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
          />

          {/* Keypad */}
          <Keypad
            onInput={append}
            onClear={clear}
            onDelete={deleteLast}
            onCalculate={calculate}
            mode={mode}
          />

          {/* Keyboard hint */}
          <p className="text-center text-[10px] mt-4 tracking-wide text-slate-400">
            ⌨ Teclado físico • Ctrl+Z desfazer • Ctrl+Y refazer
          </p>

          {/* History Panel Overlay */}
          <AnimatePresence>
            {showHistory && (
              <HistoryPanel
                history={history}
                onSelect={loadFromHistory}
                onClear={clearHistory}
                onClose={() => setShowHistory(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}