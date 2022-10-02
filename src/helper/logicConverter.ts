const evaluateSymbol = (expression: string) => {
  console.log(expression);

  const operator = expression.charAt(expression.length / 2);
  const boolTest = evaluateOperator(operator, expression.charAt(expression.length / 2 - 1), expression.charAt(expression.length / 2 + 1));

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
  }

  return false;
};

const operators = ['∧', '↮', '∨', '⇔', '⇒', '⇐'];
export default evaluateSymbol;
