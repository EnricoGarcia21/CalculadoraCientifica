import React from 'react';
import { Undo2, Redo2, Clock, Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Toolbar({ onUndo, onRedo, onDelete, onHistoryToggle, canUndo, canRedo }) {
  const buttons = [
    { icon: Undo2, onClick: onUndo, disabled: !canUndo, label: 'Desfazer' },
    { icon: Redo2, onClick: onRedo, disabled: !canRedo, label: 'Refazer' },
    { icon: Delete, onClick: onDelete, label: 'Apagar' },
    { icon: Clock, onClick: onHistoryToggle, label: 'Histórico' },
  ];

  return (
    <div className="flex items-center justify-center gap-1 mb-2">
      {buttons.map(({ icon: Icon, onClick, disabled, label }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            'h-9 w-9 rounded-lg text-slate-500',
            'hover:text-white hover:bg-white/10',
            'disabled:opacity-20 disabled:cursor-not-allowed',
            'transition-all'
          )}
          aria-label={label}
        >
          <Icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
}