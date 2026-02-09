import { useState, useEffect, useCallback, useRef } from 'react';
import { evaluate, formatResult } from './MathParser';

const HISTORY_KEY = 'calc_history';
const MAX_HISTORY = 20;

function loadHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

export default function useCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(loadHistory);
  const [justEvaluated, setJustEvaluated] = useState(false);

  
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const skipUndoRef = useRef(false);

 
  const pushUndo = useCallback((prevExpr) => {
    if (skipUndoRef.current) {
      skipUndoRef.current = false;
      return;
    }
    setUndoStack(prev => [...prev.slice(-50), prevExpr]);
    setRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(s => s.slice(0, -1));
    setRedoStack(s => [...s, expression]);
    skipUndoRef.current = true;
    setExpression(prev);
    setResult(null);
    setError(null);
  }, [undoStack, expression]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(s => s.slice(0, -1));
    setUndoStack(s => [...s, expression]);
    skipUndoRef.current = true;
    setExpression(next);
    setResult(null);
    setError(null);
  }, [redoStack, expression]);

  
  const append = useCallback((value) => {
    setError(null);
    setExpression(prev => {
      pushUndo(prev);
      if (justEvaluated) {
        setJustEvaluated(false);
       
        const operators = ['+', '-', '×', '÷', '^', '%'];
        if (operators.includes(value)) {
          const resultStr = result !== null ? formatResult(result) : prev;
          return resultStr + value;
        }
      
        return value;
      }
      return prev + value;
    });
    setResult(null);
  }, [justEvaluated, result, pushUndo]);


  const deleteLast = useCallback(() => {
    setError(null);
    setExpression(prev => {
      pushUndo(prev);
      
      const funcNames = ['sin(', 'cos(', 'tan(', 'sqrt(', 'log(', 'ln(', 'abs(', 'fact('];
      for (const fn of funcNames) {
        if (prev.endsWith(fn)) {
          return prev.slice(0, -fn.length);
        }
      }
      return prev.slice(0, -1);
    });
    setResult(null);
    setJustEvaluated(false);
  }, [pushUndo]);

  
  const clear = useCallback(() => {
    pushUndo(expression);
    setExpression('');
    setResult(null);
    setError(null);
    setJustEvaluated(false);
  }, [expression, pushUndo]);

  
  const calculate = useCallback(() => {
    if (!expression.trim()) return;
    try {
      const res = evaluate(expression);
      const formatted = formatResult(res);
      setResult(res);
      setError(null);
      setJustEvaluated(true);

      
      const entry = {
        expression,
        result: formatted,
        timestamp: Date.now(),
      };
      setHistory(prev => {
        const updated = [entry, ...prev].slice(0, MAX_HISTORY);
        saveHistory(updated);
        return updated;
      });
    } catch (e) {
      setError(e.message || 'Expressão inválida');
      setResult(null);
    }
  }, [expression]);


  const loadFromHistory = useCallback((entry) => {
    pushUndo(expression);
    setExpression(entry.expression);
    setResult(parseFloat(entry.result));
    setError(null);
    setJustEvaluated(true);
  }, [expression, pushUndo]);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return {
    expression,
    result,
    error,
    history,
    undoStack,
    redoStack,
    append,
    deleteLast,
    clear,
    calculate,
    undo,
    redo,
    loadFromHistory,
    clearHistory,
  };
}