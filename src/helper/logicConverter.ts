const operators = ['∧', '↮', '∨', '⇔', '⇒', '⇐', '¬'];

/**
 * Searches for a operator in the expression
 * @param expression: string
 * @return string- empty if no operator found
 */
const findOperator = (expression: string): string => {
  // todo maybe a revisit with .map and .reduce
  for (let i = 0; i < operators.length; i += 1) {
    if (expression.includes(operators[i])) {
      return operators[i];
    }
  }
  return ' ';
};

/**
 * Evaluates two numbers (0,1) and a operator
 * @param operator: string
 * @param leftSide: string- left side boolean
 * @param rightSide: string- right side boolean
 */
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

/**
 * Determines wether the operator is a negation or else
 * @param expression: string
 * @return string
 */
const evaluateSymbol = (expression: string): string => {
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

/**
 * Evaluates a expression to a final 0 or 1
 * @param expression: string
 * @return string
 */
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

<<<<<<< HEAD
export { evaluateSymbol, evaluateWholeExpression };
=======
const getReplacedValue = (values: number[] | number, index: number) => {
  if (typeof (values) !== 'number') {
    return values[index];
  }
  return Number(values);
};

const replaceExpressionToBoolean = (expressionParam: string, variables: string[], values: number[]) => {
  let mutableExpression = expressionParam;
  for (let x = 0; x < mutableExpression.length; x += 1) {
    const currentChar = mutableExpression.charAt(x);

    const index = variables.indexOf(currentChar);

    // eslint-disable-next-line no-continue
    if (index === -1) continue;
    const replacedValue = getReplacedValue(values, index);

    mutableExpression = mutableExpression.replaceAll(currentChar, `${replacedValue}`);
  }

  return mutableExpression;
};

export { evaluateSymbol, evaluateWholeExpression, replaceExpressionToBoolean };
>>>>>>> 5f06dd40b3c9e8ad12efbcab6d019d782b3845ab
