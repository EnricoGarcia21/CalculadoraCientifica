import React from 'react';
import CalcButton from './CalcButton';

export default function Keypad({ onInput, onClear, onDelete, onCalculate, mode }) {
  if (mode === 'programmer') {
    return <ProgrammerKeypad onInput={onInput} onClear={onClear} onDelete={onDelete} onCalculate={onCalculate} />;
  }

  if (mode === 'scientific') {
    return <ScientificKeypad onInput={onInput} onClear={onClear} onDelete={onDelete} onCalculate={onCalculate} />;
  }

  // Standard keypad
  return (
    <div className="grid grid-cols-4 gap-2">
      <CalcButton label="AC" onClick={onClear} variant="danger" />
      <CalcButton label="( )" onClick={() => onInput('(')} variant="function" />
      <CalcButton label="%" onClick={() => onInput('%')} variant="function" />
      <CalcButton label="÷" onClick={() => onInput('÷')} variant="operator" />

      <CalcButton label="7" onClick={() => onInput('7')} />
      <CalcButton label="8" onClick={() => onInput('8')} />
      <CalcButton label="9" onClick={() => onInput('9')} />
      <CalcButton label="×" onClick={() => onInput('×')} variant="operator" />

      <CalcButton label="4" onClick={() => onInput('4')} />
      <CalcButton label="5" onClick={() => onInput('5')} />
      <CalcButton label="6" onClick={() => onInput('6')} />
      <CalcButton label="-" onClick={() => onInput('-')} variant="operator" />

      <CalcButton label="1" onClick={() => onInput('1')} />
      <CalcButton label="2" onClick={() => onInput('2')} />
      <CalcButton label="3" onClick={() => onInput('3')} />
      <CalcButton label="+" onClick={() => onInput('+')} variant="operator" />

      <CalcButton label="0" onClick={() => onInput('0')} span={2} />
      <CalcButton label="." onClick={() => onInput('.')} />
      <CalcButton label="=" onClick={onCalculate} variant="equals" />
    </div>
  );
}

function ScientificKeypad({ onInput, onClear, onDelete, onCalculate }) {
  return (
    <div className="grid grid-cols-5 gap-1.5 md:gap-2">
      {/* Row 1 - Functions */}
      <CalcButton label="sin" onClick={() => onInput('sin(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="cos" onClick={() => onInput('cos(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="tan" onClick={() => onInput('tan(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="π" onClick={() => onInput('π')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="e" onClick={() => onInput('e')} variant="function" className="text-xs md:text-sm" />

      {/* Row 2 - More functions */}
      <CalcButton label="√" onClick={() => onInput('sqrt(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="x²" onClick={() => onInput('^2')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="x³" onClick={() => onInput('^3')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="xⁿ" onClick={() => onInput('^')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="n!" onClick={() => onInput('fact(')} variant="function" className="text-xs md:text-sm" />

      {/* Row 3 */}
      <CalcButton label="log" onClick={() => onInput('log(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="ln" onClick={() => onInput('ln(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="(" onClick={() => onInput('(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label=")" onClick={() => onInput(')')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="DEL" onClick={onDelete} variant="danger" className="text-xs md:text-sm" />

      {/* Row 4 */}
      <CalcButton label="AC" onClick={onClear} variant="danger" />
      <CalcButton label="7" onClick={() => onInput('7')} />
      <CalcButton label="8" onClick={() => onInput('8')} />
      <CalcButton label="9" onClick={() => onInput('9')} />
      <CalcButton label="÷" onClick={() => onInput('÷')} variant="operator" />

      {/* Row 5 */}
      <CalcButton label="%" onClick={() => onInput('%')} variant="function" />
      <CalcButton label="4" onClick={() => onInput('4')} />
      <CalcButton label="5" onClick={() => onInput('5')} />
      <CalcButton label="6" onClick={() => onInput('6')} />
      <CalcButton label="×" onClick={() => onInput('×')} variant="operator" />

      {/* Row 6 */}
      <CalcButton label="|x|" onClick={() => onInput('abs(')} variant="function" className="text-xs md:text-sm" />
      <CalcButton label="1" onClick={() => onInput('1')} />
      <CalcButton label="2" onClick={() => onInput('2')} />
      <CalcButton label="3" onClick={() => onInput('3')} />
      <CalcButton label="-" onClick={() => onInput('-')} variant="operator" />

      {/* Row 7 */}
      <CalcButton label="." onClick={() => onInput('.')} />
      <CalcButton label="0" onClick={() => onInput('0')} span={2} />
      <CalcButton label="+" onClick={() => onInput('+')} variant="operator" />
      <CalcButton label="=" onClick={onCalculate} variant="equals" />
    </div>
  );
}

function ProgrammerKeypad({ onInput, onClear, onDelete, onCalculate }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <CalcButton label="AC" onClick={onClear} variant="danger" />
      <CalcButton label="DEL" onClick={onDelete} variant="danger" />
      <CalcButton label="(" onClick={() => onInput('(')} variant="function" />
      <CalcButton label=")" onClick={() => onInput(')')} variant="function" />

      <CalcButton label="7" onClick={() => onInput('7')} />
      <CalcButton label="8" onClick={() => onInput('8')} />
      <CalcButton label="9" onClick={() => onInput('9')} />
      <CalcButton label="÷" onClick={() => onInput('÷')} variant="operator" />

      <CalcButton label="4" onClick={() => onInput('4')} />
      <CalcButton label="5" onClick={() => onInput('5')} />
      <CalcButton label="6" onClick={() => onInput('6')} />
      <CalcButton label="×" onClick={() => onInput('×')} variant="operator" />

      <CalcButton label="1" onClick={() => onInput('1')} />
      <CalcButton label="2" onClick={() => onInput('2')} />
      <CalcButton label="3" onClick={() => onInput('3')} />
      <CalcButton label="-" onClick={() => onInput('-')} variant="operator" />

      <CalcButton label="0" onClick={() => onInput('0')} span={2} />
      <CalcButton label="+" onClick={() => onInput('+')} variant="operator" />
      <CalcButton label="=" onClick={onCalculate} variant="equals" />
    </div>
  );
}