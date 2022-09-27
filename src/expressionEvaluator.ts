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
  steps: string[]
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
  let cleanedExpression = expression.replaceAll(/\s/g, '');

  const openParentheses = [...cleanedExpression].filter((val) => val === '(');
  const closedParentheses = [...cleanedExpression].filter((val) => val === ')');

  // Check if parentheses are correct
  if (openParentheses.length !== closedParentheses.length) throw Error();

  // No parentheses
  if (openParentheses.length === 0) return [cleanedExpression];

  // We have some work to do.. :(
  const openParenthesesPosition: number[] = [];
  [...cleanedExpression].forEach((char, index) => {
    if (char === '(') openParenthesesPosition.push(index);
  });

  const outputBuffer: string[] = [];

  for (let x = openParenthesesPosition.length - 1; x >= 0; x -= 1) {
    const position = openParenthesesPosition[x];
    const parenthesesPart = cleanedExpression.slice(position);

    for (let subIndex = 0; subIndex < parenthesesPart.length; subIndex += 1) {
      const skippableParentheses: number[] = [];

      const subPart = parenthesesPart[subIndex];
      if (subPart === ')' && !skippableParentheses.includes(position + subIndex + 1)) {
        skippableParentheses.push(position + subIndex + 1);
        openParenthesesPosition.pop();
        outputBuffer.push(cleanedExpression.substring(position, position + subIndex + 1));
        cleanedExpression = cleanedExpression.replaceAll(cleanedExpression.substring(position, position + subIndex + 1), `[${cleanedExpression.substring(position, position + subIndex + 1)}]`);
        break;
      }
    }
  }

  outputBuffer.push(cleanedExpression);
  console.log(outputBuffer);
  return outputBuffer;
};

export const evaluateTruthtable = (expression: string): TruthtableEvaluation => {
  let uppercaseExpression = expression.toUpperCase();

  // Replace all with correct characters
  uppercaseExpression = uppercaseExpression.replaceAll(/&&/g, '∧');
  uppercaseExpression = uppercaseExpression.replaceAll(/\|\|/g, '∨');
  uppercaseExpression = uppercaseExpression.replaceAll(/!/g, '¬');
  // todo not all are working
  uppercaseExpression = uppercaseExpression.replaceAll(/<=!=>/g, '↮');
  uppercaseExpression = uppercaseExpression.replaceAll(/<==>/g, '⇔');
  uppercaseExpression = uppercaseExpression.replaceAll(/=>/g, '⇒');

  return { variables: getAllVariables(uppercaseExpression), steps: splitByParentheses(uppercaseExpression) };
};

export default splitByParentheses;
