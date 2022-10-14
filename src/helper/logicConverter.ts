const findOperator = (expression: string) => {

  for (const op of operators) {
    if (expression.includes(op)) {
      //console.log(op)
      return op;
    }
  }
  //console.log("No Operator found in " + expression + ", returning empty");
  return ' ';
};

const evaluateSymbol = (expression: string) => {
  //console.log(expression);
  let boolTest = false;
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
    case '⇒':
      return (!leftOperatorBoolean || rightOperatorBoolean);
  }

  return false;
};

const evaluateWholeExpression = (expression: string): string => {
  //console.log("In new function");
  //finding most inner parantheses
  let pos1 = -1;
  let pos2 = -1;
  for (let i = 0; i < expression.length; i++) {
    if (expression.charAt(i) === '(') {
      pos1 = i;
    } else if (expression.charAt(i) === ')') {
      pos2 = i;
      break;
    }
  }

  if (pos1 !== -1 && pos2 !== -1) {
    //console.log(" ");
    //console.log("Whole Expression: " + expression);
    const selectedPart = expression.substring(pos1 + 1, pos2);
    //console.log("Selected Substring: " + selectedPart);
    const selectedPartWithKlammern = "(" + selectedPart + ")";
    //console.log("Selected Part with Klammern: " + selectedPartWithKlammern);
    expression = expression.replace(selectedPartWithKlammern, evaluateSymbol(expression.substring(pos1 + 1, pos2)));
    //console.log("New Expression: " + expression);
    //console.log(" ");

  }

  const op = findOperator(expression);
  if (op !== ' ') {
    //console.log("Next Step -->>>");
    expression = evaluateWholeExpression(expression);
  }
  else {
    //console.log("---> End, resulting Expression: " + expression);
    return expression;
  }
  return expression;
};

const operators = ['∧', '↮', '∨', '⇔', '⇒', '⇐', '¬'];
export { evaluateSymbol, evaluateWholeExpression };
