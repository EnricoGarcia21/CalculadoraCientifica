

const CONSTANTS = {
  'π': Math.PI,
  'e': Math.E,
};

const FUNCTIONS = {
  'sin': (x) => Math.sin(x * Math.PI / 180), // degrees
  'cos': (x) => Math.cos(x * Math.PI / 180),
  'tan': (x) => {
    const normalized = ((x % 360) + 360) % 360;
    if (normalized === 90 || normalized === 270) {
      throw new Error('Tangente indefinida para este ângulo');
    }
    return Math.tan(x * Math.PI / 180);
  },
  'sqrt': (x) => {
    if (x < 0) throw new Error('Raiz quadrada de número negativo');
    return Math.sqrt(x);
  },
  'log': (x) => {
    if (x <= 0) throw new Error('Logaritmo de número não positivo');
    return Math.log10(x);
  },
  'ln': (x) => {
    if (x <= 0) throw new Error('Logaritmo natural de número não positivo');
    return Math.log(x);
  },
  'abs': (x) => Math.abs(x),
  'fact': (x) => {
    if (x < 0 || !Number.isInteger(x)) throw new Error('Fatorial requer inteiro não negativo');
    if (x > 170) throw new Error('Fatorial muito grande');
    let result = 1;
    for (let i = 2; i <= x; i++) result *= i;
    return result;
  },
};

const OPERATORS = {
  '+': { precedence: 2, associativity: 'left', fn: (a, b) => a + b },
  '-': { precedence: 2, associativity: 'left', fn: (a, b) => a - b },
  '×': { precedence: 3, associativity: 'left', fn: (a, b) => a * b },
  '÷': { precedence: 3, associativity: 'left', fn: (a, b) => {
    if (b === 0) throw new Error('Divisão por zero');
    return a / b;
  }},
  '^': { precedence: 4, associativity: 'right', fn: (a, b) => Math.pow(a, b) },
  '%': { precedence: 3, associativity: 'left', fn: (a, b) => (a / 100) * b },
};

// Unary minus sentinel
const UNARY_MINUS = 'NEG';

/**
 * Tokenize the expression string into an array of tokens
 */
function tokenize(expression) {
  const tokens = [];
  let i = 0;
  const expr = expression.replace(/\s+/g, '');

  while (i < expr.length) {
    const ch = expr[i];

    // Check for constants
    if (ch === 'π' || (ch === 'e' && (i + 1 >= expr.length || !isAlpha(expr[i + 1])))) {
      if (ch === 'e' && i + 1 < expr.length && isAlpha(expr[i + 1])) {
        // part of a function name
      } else {
        // Insert implicit multiplication if needed
        if (tokens.length > 0) {
          const last = tokens[tokens.length - 1];
          if (last.type === 'number' || last.type === 'constant' || last.value === ')') {
            tokens.push({ type: 'operator', value: '×' });
          }
        }
        tokens.push({ type: 'constant', value: ch });
        i++;
        continue;
      }
    }

    // Numbers (including decimals)
    if (isDigit(ch) || (ch === '.' && i + 1 < expr.length && isDigit(expr[i + 1]))) {
      let num = '';
      while (i < expr.length && (isDigit(expr[i]) || expr[i] === '.')) {
        num += expr[i];
        i++;
      }
      // Insert implicit multiplication: 2π, 2sin, 2(
      if (tokens.length > 0) {
        const last = tokens[tokens.length - 1];
        if (last.type === 'constant' || last.value === ')') {
          tokens.push({ type: 'operator', value: '×' });
        }
      }
      tokens.push({ type: 'number', value: parseFloat(num) });
      continue;
    }

    // Functions
    if (isAlpha(ch)) {
      let func = '';
      while (i < expr.length && isAlpha(expr[i])) {
        func += expr[i];
        i++;
      }
      if (FUNCTIONS[func]) {
        // Insert implicit multiplication if needed
        if (tokens.length > 0) {
          const last = tokens[tokens.length - 1];
          if (last.type === 'number' || last.type === 'constant' || last.value === ')') {
            tokens.push({ type: 'operator', value: '×' });
          }
        }
        tokens.push({ type: 'function', value: func });
      } else {
        throw new Error(`Função desconhecida: ${func}`);
      }
      continue;
    }

    // Operators
    if (OPERATORS[ch]) {
      // Detect unary minus
      if (ch === '-') {
        if (tokens.length === 0 || tokens[tokens.length - 1].value === '(' || 
            (tokens[tokens.length - 1].type === 'operator')) {
          tokens.push({ type: 'unary', value: UNARY_MINUS });
          i++;
          continue;
        }
      }
      tokens.push({ type: 'operator', value: ch });
      i++;
      continue;
    }

    // Parentheses
    if (ch === '(') {
      // Insert implicit multiplication: 2(, )(, π(
      if (tokens.length > 0) {
        const last = tokens[tokens.length - 1];
        if (last.type === 'number' || last.type === 'constant' || last.value === ')') {
          tokens.push({ type: 'operator', value: '×' });
        }
      }
      tokens.push({ type: 'paren', value: '(' });
      i++;
      continue;
    }

    if (ch === ')') {
      tokens.push({ type: 'paren', value: ')' });
      i++;
      continue;
    }

    throw new Error(`Caractere inválido: ${ch}`);
  }

  return tokens;
}

/**
 * Shunting Yard Algorithm - Convert infix tokens to postfix (RPN)
 */
function shuntingYard(tokens) {
  const output = [];
  const operatorStack = [];

  for (const token of tokens) {
    if (token.type === 'number' || token.type === 'constant') {
      output.push(token);
    } else if (token.type === 'function') {
      operatorStack.push(token);
    } else if (token.type === 'unary') {
      operatorStack.push(token);
    } else if (token.type === 'operator') {
      const o1 = token;
      const o1Info = OPERATORS[o1.value];
      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (top.value === '(') break;
        if (top.type === 'unary') {
          output.push(operatorStack.pop());
          continue;
        }
        if (top.type === 'function') {
          output.push(operatorStack.pop());
          continue;
        }
        const topInfo = OPERATORS[top.value];
        if (!topInfo) break;
        if ((o1Info.associativity === 'left' && o1Info.precedence <= topInfo.precedence) ||
            (o1Info.associativity === 'right' && o1Info.precedence < topInfo.precedence)) {
          output.push(operatorStack.pop());
        } else {
          break;
        }
      }
      operatorStack.push(o1);
    } else if (token.value === '(') {
      operatorStack.push(token);
    } else if (token.value === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].value !== '(') {
        output.push(operatorStack.pop());
      }
      if (operatorStack.length === 0) {
        throw new Error('Parênteses desbalanceados');
      }
      operatorStack.pop(); // Remove '('
      // If there's a function on top, pop it to output
      if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type === 'function') {
        output.push(operatorStack.pop());
      }
    }
  }

  while (operatorStack.length > 0) {
    const top = operatorStack.pop();
    if (top.value === '(' || top.value === ')') {
      throw new Error('Parênteses desbalanceados');
    }
    output.push(top);
  }

  return output;
}

/**
 * Evaluate postfix (RPN) expression
 */
function evaluateRPN(rpn) {
  const stack = [];

  for (const token of rpn) {
    if (token.type === 'number') {
      stack.push(token.value);
    } else if (token.type === 'constant') {
      stack.push(CONSTANTS[token.value]);
    } else if (token.type === 'unary' && token.value === UNARY_MINUS) {
      if (stack.length < 1) throw new Error('Expressão inválida');
      stack.push(-stack.pop());
    } else if (token.type === 'function') {
      if (stack.length < 1) throw new Error('Expressão inválida');
      const arg = stack.pop();
      stack.push(FUNCTIONS[token.value](arg));
    } else if (token.type === 'operator') {
      if (stack.length < 2) throw new Error('Expressão inválida');
      const b = stack.pop();
      const a = stack.pop();
      stack.push(OPERATORS[token.value].fn(a, b));
    }
  }

  if (stack.length !== 1) {
    throw new Error('Expressão inválida');
  }

  const result = stack[0];
  if (!isFinite(result)) {
    throw new Error('Resultado infinito ou indefinido');
  }
  return result;
}

function isDigit(ch) {
  return ch >= '0' && ch <= '9';
}

function isAlpha(ch) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

/**
 * Main evaluate function
 */
export function evaluate(expression) {
  if (!expression || expression.trim() === '') {
    throw new Error('Expressão vazia');
  }
  const tokens = tokenize(expression);
  const rpn = shuntingYard(tokens);
  const result = evaluateRPN(rpn);
  return result;
}

/**
 * Format result for display
 */
export function formatResult(value) {
  if (Number.isInteger(value) && Math.abs(value) < 1e15) {
    return value.toString();
  }
  // Check if it's very close to an integer
  if (Math.abs(value - Math.round(value)) < 1e-10) {
    return Math.round(value).toString();
  }
  // For very large or very small numbers, use scientific notation
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-10 && value !== 0)) {
    return value.toExponential(8);
  }
  // Otherwise, show up to 10 decimal places
  return parseFloat(value.toPrecision(12)).toString();
}

/**
 * Convert between number bases (for programmer mode)
 */
export function convertBase(value, toBase) {
  const intVal = Math.floor(Math.abs(value));
  const prefix = value < 0 ? '-' : '';
  switch (toBase) {
    case 2: return prefix + '0b' + intVal.toString(2);
    case 8: return prefix + '0o' + intVal.toString(8);
    case 16: return prefix + '0x' + intVal.toString(16).toUpperCase();
    case 10: 
    default: return formatResult(value);
  }
}