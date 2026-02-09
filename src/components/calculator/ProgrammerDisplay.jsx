import React from 'react';
import { convertBase } from './MathParser';

const bases = [
  { label: 'DEC', base: 10 },
  { label: 'BIN', base: 2 },
  { label: 'OCT', base: 8 },
  { label: 'HEX', base: 16 },
];

export default function ProgrammerDisplay({ result }) {
  if (result === null || result === undefined) return null;

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3 mb-3 space-y-1.5">
      {bases.map(({ label, base }) => (
        <div key={label} className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-mono text-slate-600 w-8 shrink-0">{label}</span>
          <span className="text-xs font-mono text-slate-400 truncate text-right">
            {convertBase(result, base)}
          </span>
        </div>
      ))}
    </div>
  );
}