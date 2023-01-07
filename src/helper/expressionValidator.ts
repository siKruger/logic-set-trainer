import { prepareForEvaluation } from './expressionEvaluator';

/**
 * Runs a regex to check if there are any invalid characters
 * @param expression: string
 * @return string
 */
export const checkCorrectSymbols = (expression: string): string => {
  let validCharacters = /^(<=!=>|&&|\|\||!|<==>|=>|<=|\(|\)|[A-Z]|\s)+$/g;
  if (expression.match(/{|}/)) {
    validCharacters = /^(&&|\|\||!|=>|{|}|,|\(|\)|[0-9]|\s)+$/g;
  }
  const expression2 = expression.toUpperCase();

  for (let x = 0; x < expression2.length; x += 1) {
    if (expression2.charAt(x).match(validCharacters) == null) {
      if ((expression2.charAt(x) + expression2.charAt(x + 1)).match(validCharacters) == null) {
        return `Ungültiges Symbol an Stelle: ${x}`;
      }
      x += 1;
    }
  }
  return '';
};

/**
 * Checks if the expression has the correct amount of parentheses and if those are placed correct
 * @param expression: string
 * @return string
 */
export const checkCorrectParenthesesAmount = (expression: string): string => {
  let openBrackets = 0;
  const brackets = [];

  // Let's first check if those parentheses are at least the correct amount
  for (let x = 0; x < expression.length; x += 1) {
    const char = expression.charAt(x);

    if (char === '(') {
      openBrackets += 1;
      brackets.push(x);
    }
    if (char === ')') {
      openBrackets -= 1;
      brackets.pop();
    }

    if (openBrackets < 0) {
      return `A bracket was not opened! In place of: ${x}`;
    }
  }
  if (openBrackets > 0) {
    return `A bracket was not closed! In place of: ${brackets.pop()}`;
  }
  return '';
};

/**
 * Checks for the correct syntax of the expression
 * @param expression: string
 * @return boolean
 */
export const checkCorrectSubexpressions = (expression: string): string => {
  const mutableExpression = prepareForEvaluation(expression);

  const letter = /[A-Z]/;
  const operators = /↮|∧|∨|⇔|⇒|⇐/;
  const negation = /¬/;
  const parenthesesOpen = /\(/;
  const parenthesesClose = /\)/;
  const number = /[0-9]/;
  const curlyBracketOpen = /{/;
  const curlyBracketClose = /}/;
  const comma = /,/;

  if (expression.match(/{|}/)) {
    for (let x = 0; x < mutableExpression.length; x += 1) {
      const char = mutableExpression.charAt(x);
      const nextChar = mutableExpression.charAt(x + 1);

      // an operator needs a ( or a { or a !
      if (char.match(operators)) {
        if (!(nextChar.match(curlyBracketOpen) || nextChar.match(parenthesesOpen) || nextChar.match(negation))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      // ( needs a ! or a { or a ( following
      if (char.match(parenthesesOpen)) {
        if (!(nextChar.match(negation) || nextChar.match(parenthesesOpen)
          || nextChar.match(curlyBracketOpen))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      // [0-9] needs a } or another number or a comma following
      if (char.match(number)) {
        if (!((nextChar.match(number) || nextChar.match(parenthesesClose) || nextChar.match(comma)) || nextChar.match(curlyBracketClose))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      // ! needs a { or ( or another ! following.
      if (char.match(negation)) {
        if (x === mutableExpression.length - 1 || !(nextChar.match(curlyBracketOpen) || nextChar.match(parenthesesOpen) || nextChar.match(negation))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      // { needs a number following
      if (char.match(curlyBracketOpen)) {
        if (!(nextChar.match(number))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      // comma needs a number following
      if (char.match(comma)) {
        if (!(nextChar.match(number))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }
    }
  } else {
    for (let x = 0; x < mutableExpression.length; x += 1) {
      const char = mutableExpression.charAt(x);

      // a operator needs [A-Z] or a (
      if (char.match(operators)) {
        if (!(mutableExpression.charAt(x + 1)
          .match(letter) || mutableExpression.charAt(x + 1)
          .match(parenthesesOpen) || mutableExpression.charAt(x + 1).match(negation))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      // ( needs a ! or a [A-Z] or a ( following
      if (char.match(parenthesesOpen)) {
        if (!(mutableExpression.charAt(x + 1)
          .match(negation) || mutableExpression.charAt(x + 1)
          .match(parenthesesOpen) || mutableExpression.charAt(x + 1)
          .match(letter))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      // [A-Z] needs a operator following or empty
      if (char.match(letter)) {
        if (!(mutableExpression.charAt(x + 1)
          .match(operators) || mutableExpression.charAt(x + 1) === '' || mutableExpression.charAt(x + 1)
          .match(parenthesesClose))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }

      //! needs a [A-Z] and ( OR operator following.
      if (char.match(negation)) {
        if (x === mutableExpression.length - 1 || !(mutableExpression.charAt(x + 1)
          .match(letter) || mutableExpression.match(negation) || mutableExpression.charAt(x + 1)
          .match(parenthesesOpen))) {
          return `Invalid syntax! In place of: ${x + 1}`;
        }
      }
    }
  }
  return '';
};

/** Checks if an expression follows the rules to be a valid one. Returns an error message if it doesn't
 * @param expression: string.
 * @return string
 */
export const checkCorrectSyntax = (expression: string): string => {
  const sym = checkCorrectSymbols(expression);
  const par = checkCorrectParenthesesAmount(expression);
  const sub = checkCorrectSubexpressions(expression);

  if (sym !== '') {
    return sym;
  }
  if (par !== '') {
    return par;
  }
  if (sub !== '') {
    return sub;
  }
  return '';
};
