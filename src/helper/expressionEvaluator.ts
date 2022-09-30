const operatorPrecedence = [
  ['(', ')'],
  ['!'],
  ['&&'],
  ['<=!=>'],
  ['||'],
  ['<===>'],
  ['=>', '<='],
  ['<=>'],
];
export type TruthtableEvaluation = {
  variables: string[],
  steps: string[],
  binaryOptions: number[][]
};

/**
 * Gets all parameters in a expression
 * @param expression
 */
export const getAllVariables = (expression: string): string[] => [...expression.matchAll(/\w/g)].flat();

/**
 * Splits a string up into its parentheses parts. The higher the order in the array the earlier it needs to be
 * evaluated
 * @param expression Expression to evalute.
 */
export const splitByParentheses = (expression: string): string[] => {
  let mutableExpression = expression;

  const openParentheses = [...mutableExpression].filter((val) => val === '(');
  const closedParentheses = [...mutableExpression].filter((val) => val === ')');

  // Check if parentheses are correct
  if (openParentheses.length !== closedParentheses.length) throw Error();

  // No parentheses
  if (openParentheses.length === 0) return [mutableExpression];

  // We have some work to do.. :(
  const openParenthesesPosition: number[] = [];
  [...mutableExpression].forEach((char, index) => {
    if (char === '(') openParenthesesPosition.push(index);
  });

  const outputBuffer: string[] = [];
  let previousReplaced = '';

  // todo re-do to allow previous expression
  for (let x = openParenthesesPosition.length - 1; x >= 0; x -= 1) {
    const position = openParenthesesPosition[x];
    const parenthesesPart = mutableExpression.slice(position);

    for (let subIndex = 0; subIndex < parenthesesPart.length; subIndex += 1) {
      const skippableParentheses: number[] = [];

      const subPart = parenthesesPart[subIndex];
      if (subPart === ')' && !skippableParentheses.includes(position + subIndex + 1)) {
        skippableParentheses.push(position + subIndex + 1);
        openParenthesesPosition.pop();
        outputBuffer.push(mutableExpression.substring(position, position + subIndex + 1));
        // mutableExpression = mutableExpression.replaceAll(mutableExpression.substring(position, position + subIndex + 1), `*start*${mutableExpression.substring(position, position + subIndex + 1)}*ende*`);
        previousReplaced = mutableExpression.substring(position, position + subIndex + 1);
        mutableExpression = mutableExpression.replaceAll(mutableExpression.substring(position, position + subIndex + 1), `*previous step ${x}*`);

        break;
      }
    }
  }

  outputBuffer.push(mutableExpression);
  return outputBuffer;
};

// todo ts ignore is bad
// @ts-ignore
const cartesian = (a) => a.reduce((f, b) => f.flatMap((d) => b.map((e) => [d, e].flat())));

function findRightPlacement(x: number, mutableExpression: string) {
  let openBracketCount = 0;
  let placeRight = -1;
  for (let letterRight = x + 1; letterRight < mutableExpression.length; letterRight += 1) {
    const rightSideLetter = mutableExpression.charAt(letterRight);

    if (rightSideLetter === '(') openBracketCount += 1;
    if (rightSideLetter === ')') openBracketCount -= 1;

    if (letterRight === mutableExpression.length - 1 || (openBracketCount === 0 && rightSideLetter.match(/\w/))) {
      placeRight = letterRight + 1;
      break;
    }
  }
  return placeRight;
}

function findLeftPlacement(x: number, mutableExpression: string) {
  let openBracketCount = 0;
  let placeLeft = -1;
  for (let letterLeft = x - 1; letterLeft >= 0; letterLeft -= 1) {
    const leftSideLetter = mutableExpression.charAt(letterLeft);

    if (leftSideLetter === ')') openBracketCount += 1;
    if (leftSideLetter === '(') openBracketCount -= 1;

    // Save to place
    if (openBracketCount === 0 && leftSideLetter.match(/\w/)) {
      placeLeft = letterLeft;
      break;
    }
  }
  return placeLeft;
}

const setOptionalParenthesisForOperator = (expression: string, operator: string) => {
  let mutableExpression = expression;
  for (let x = 0; x < mutableExpression.length; x += 1) {
    const currentChar = mutableExpression.charAt(x);

    // Work to do
    if (currentChar === operator) {
      const placeLeft = findLeftPlacement(x, mutableExpression);
      const placeRight = findRightPlacement(x, mutableExpression);

      // Now modify the string accordingly
      mutableExpression = `${mutableExpression.substring(0, placeLeft)}(${mutableExpression.substring(placeLeft, placeRight)})${mutableExpression.substring(placeRight)}`;
      x += 1;
    }
  }
  return mutableExpression;
};

/**
 * Operators have their precedence. We want to set all paranthesis in order to evaluate right
 */
export const setOptionalParenthesis = (expression: string) => {
  let mutableExpression = expression;

  for (let x = 0; x < mutableExpression.length; x += 1) {
    const char = mutableExpression.charAt(x);

    // For negations
    if (char === '¬') {
      // Search the right side
      // Right Search
      const placeRight = findRightPlacement(x, mutableExpression);

      mutableExpression = `${mutableExpression.slice(0, x)}(${mutableExpression.slice(x, placeRight)})${mutableExpression.slice(placeRight)}`;
      x += 1;
    }
  }

  mutableExpression = setOptionalParenthesisForOperator(mutableExpression, '∧');
  mutableExpression = setOptionalParenthesisForOperator(mutableExpression, '↮');

  return mutableExpression;
};

export const prepareForEvaluation = (expression: string): string => {
  let uppercaseExpression = expression.toUpperCase().replaceAll(/\s/g, '');

  // Replace all with correct characters
  uppercaseExpression = uppercaseExpression.replaceAll(/<=!=>/g, '↮');
  uppercaseExpression = uppercaseExpression.replaceAll(/&&/g, '∧');
  uppercaseExpression = uppercaseExpression.replaceAll(/\|\|/g, '∨');
  uppercaseExpression = uppercaseExpression.replaceAll(/!/g, '¬');
  uppercaseExpression = uppercaseExpression.replaceAll(/<==>/g, '⇔');
  uppercaseExpression = uppercaseExpression.replaceAll(/=>/g, '⇒');

  return uppercaseExpression;
};

/**
 * Evaluates a truthtable
 * @param expression to evaluate
 */
export const evaluateTruthtable = (expression: string): TruthtableEvaluation => {
  let uppercaseExpression = prepareForEvaluation(expression);
  uppercaseExpression = setOptionalParenthesis(uppercaseExpression);
  console.log(uppercaseExpression);
  const variables = getAllVariables(uppercaseExpression);
  const binaries = variables.map(() => [0, 1]);
  const steps = splitByParentheses(uppercaseExpression);

  return { variables, steps, binaryOptions: cartesian(binaries) };
};
