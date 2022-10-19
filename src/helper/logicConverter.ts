const operators = ['∧', '↮', '∨', '⇔', '⇒', '⇐', '¬'];

const findOperator = (expression: string) => {
  // todo maybe a revisit with .map and .reduce
  for (let i = 0; i < operators.length; i += 1) {
    if (expression.includes(operators[i])) {
      return operators[i];
    }
  }
  return ' ';
};

const evaluateOperator = (operator: string, leftSide: string, rightSide: string): boolean => {
  const leftOperatorBoolean = leftSide === '1';
  const rightOperatorBoolean = rightSide === '1';

  switch (operator) {
    case '∧':
      return leftOperatorBoolean && rightOperatorBoolean;
    case '∨':
      return leftOperatorBoolean || rightOperatorBoolean;
    case '⇔':
      return leftOperatorBoolean === rightOperatorBoolean;
    case '↮':
      return leftOperatorBoolean !== rightOperatorBoolean;
    case '¬':
      return !rightOperatorBoolean;
    case '⇒':
      return (!leftOperatorBoolean || rightOperatorBoolean);
    default:
      return rightOperatorBoolean;
  }
};

const evaluateSymbol = (expression: string) => {
  let boolTest;
  const operator = findOperator(expression);

  // special treatment for expression with negations because no left side
  if (operator === '¬') {
    boolTest = evaluateOperator(operator, 'blankBecauseNoLeftSide', expression.charAt(expression.indexOf('¬') + 1));
  } else {
    boolTest = evaluateOperator(operator, expression.charAt(expression.length / 2 - 1), expression.charAt(expression.length / 2 + 1));
  }

  return boolTest ? '1' : '0';
};

const evaluateWholeExpression = (expression: string): string => {
  // finding most inner parentheses
  let returnedExpression = ' ';
  let pos1 = -1;
  let pos2 = -1;
  for (let i = 0; i < expression.length; i += 1) {
    if (expression.charAt(i) === '(') {
      pos1 = i;
    } else if (expression.charAt(i) === ')') {
      pos2 = i;
      break;
    }
  }

  if (pos1 !== -1 && pos2 !== -1) {
    const selectedPart = expression.substring(pos1 + 1, pos2);
    const selectedPartWithParentheses = `(${selectedPart})`;
    returnedExpression = expression.replace(selectedPartWithParentheses, evaluateSymbol(expression.substring(pos1 + 1, pos2)));
  }

  const op = findOperator(returnedExpression);
  if (op !== ' ') {
    returnedExpression = evaluateWholeExpression(returnedExpression);
  } else {
    return returnedExpression;
  }
  return returnedExpression;
};

export { evaluateSymbol, evaluateWholeExpression };
