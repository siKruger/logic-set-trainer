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
        mutableExpression = mutableExpression.replaceAll(mutableExpression.substring(position, position + subIndex + 1), `[${mutableExpression.substring(position, position + subIndex + 1)}]`);
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

/**
 * Operators have their precedence. We want to set all paranthesis in order to evaluate right
 */
const setOptionalParanthesis = (expression: string) => {
  let mutableExpression = expression;

  for (let x = 0; x < mutableExpression.length; x += 1) {
    const char = mutableExpression.charAt(x);

    // For negations
    if (char === '¬' && (mutableExpression.charAt(x - 1) !== '(' && mutableExpression.charAt(x + 1) !== ')')) {
      console.log(x);
      console.log(mutableExpression);

      mutableExpression = `${mutableExpression.slice(0, x)}(${mutableExpression.slice(x, x + 2)})${mutableExpression.slice(x + 2)}`;
    }
  }

  return mutableExpression;
};

/**
 * Evaluates a truthtable
 * @param expression to evaluate
 */
export const evaluateTruthtable = (expression: string): TruthtableEvaluation => {
  let uppercaseExpression = expression.toUpperCase().replaceAll(/\s/g, '');

  // Replace all with correct characters
  uppercaseExpression = uppercaseExpression.replaceAll(/<=!=>/g, '↮');
  uppercaseExpression = uppercaseExpression.replaceAll(/&&/g, '∧');
  uppercaseExpression = uppercaseExpression.replaceAll(/\|\|/g, '∨');
  uppercaseExpression = uppercaseExpression.replaceAll(/!/g, '¬');
  uppercaseExpression = uppercaseExpression.replaceAll(/<==>/g, '⇔');
  uppercaseExpression = uppercaseExpression.replaceAll(/=>/g, '⇒');

  uppercaseExpression = setOptionalParanthesis(uppercaseExpression);
  const variables = getAllVariables(uppercaseExpression);
  const binaries = variables.map(() => [0, 1]);
  const steps = splitByParentheses(uppercaseExpression);

  return { variables, steps, binaryOptions: cartesian(binaries) };
};

export default splitByParentheses;
