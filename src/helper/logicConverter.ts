const findOperator = (expression: string) => {

  for (const op of operators) {
    if (expression.includes(op)) {
      //console.log(op)
      return op;
    }
  }
  console.log("No Operator found in " + expression + ", default is ∧");
  return '∧';
};

const evaluateSymbol = (expression: string) => {
  console.log(expression);
  var boolTest = false;
  const operator = findOperator(expression);

  //special treatment for expression with negations because no left side
  if (operator == '¬') {
    boolTest = evaluateOperator(operator, "blankBecauseNoLeftSide", expression.charAt(expression.indexOf('¬') + 1));
  }
  else {
    boolTest = evaluateOperator(operator, expression.charAt(expression.length / 2 - 1), expression.charAt(expression.length / 2 + 1));
  }

  return boolTest ? '1' : '0';
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
  }

  return false;
};

const operators = ['∧', '↮', '∨', '⇔', '⇒', '⇐', '¬'];
export default evaluateSymbol;
