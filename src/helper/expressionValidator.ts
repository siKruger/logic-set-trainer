import { prepareForEvaluation } from './expressionEvaluator';

/**
 * Runs a regex to check if there are any invalid characters
 * @param expression
 */
export const checkCorrectSymbols = (expression: string): boolean => {
  const validCharacters = /^(<=!=>|&&|\|\||!|<==>|=>|<=|\(|\)|[A-Z])+$/g;
  return expression.toUpperCase().replaceAll(/\s/g, '').match(validCharacters) !== null;
};

/**
 * Checks if the expression has the correct amount of parentheses and if those are placed correct
 * @param expression
 */
export const checkCorrectParenthesesAmount = (expression: string): boolean => {
  let openBrackets = 0;

  // Let's first check if those parentheses are at least the correct amount
  for (let x = 0; x < expression.length; x += 1) {
    const char = expression.charAt(x);

    if (char === '(') openBrackets += 1;
    if (char === ')') openBrackets -= 1;

    if (openBrackets < 0) break;
  }

  return openBrackets === 0;
};

/**
 * Checks for the correct syntax of the expression
 * @param expression
 */
export const checkCorrectSubexpressions = (expression: string): boolean => {
  const mutableExpression = prepareForEvaluation(expression);

  const letter = /[A-Z]/;
  const operators = /↮|∧|∨|⇔|⇒|⇐/;
  const negation = /¬/;
  const parenthesesOpen = /\(/;
  const parenthesesClose = /\)/;
  for (let x = 0; x < mutableExpression.length; x += 1) {
    const char = mutableExpression.charAt(x);

    // a operator needs [A-Z] or a (
    if (char.match(operators)) {
      if (!(mutableExpression.charAt(x + 1)
        .match(letter) || mutableExpression.charAt(x + 1)
        .match(parenthesesOpen) || mutableExpression.charAt(x + 1).match(negation))) {
        return false;
      }
    }

    // ( needs a ! or a [A-Z] following
    if (char.match(parenthesesOpen)) {
      if (!(mutableExpression.charAt(x + 1)
        .match(negation) || mutableExpression.charAt(x + 1)
        .match(letter))) {
        return false;
      }
    }

    // [A-Z] needs a operator following or empty
    if (char.match(letter)) {
      if (!(mutableExpression.charAt(x + 1)
        .match(operators) || mutableExpression.charAt(x + 1) === '' || mutableExpression.charAt(x + 1)
        .match(parenthesesClose))) {
        return false;
      }
    }

    //! needs a [A-Z] and ( OR operator following.
    if (char.match(negation)) {
      if (!(mutableExpression.charAt(x + 1)
        .match(letter) || mutableExpression.charAt(x + 1)
        .match(parenthesesOpen))) {
        return false;
      }
    }
  }
  return true;
};

export const checkCorrectSyntax = (expression: string) => checkCorrectSymbols(expression) && checkCorrectSubexpressions(expression) && checkCorrectSubexpressions(expression);
