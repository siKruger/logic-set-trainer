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

/**
 * Operators have their precedence. We want to set all paranthesis in order to evaluate right
 */
const setOptionalParanthesis = (expression: string) => {
  let mutableExpression = expression;

  for (let x = 0; x < mutableExpression.length; x += 1) {
    const char = mutableExpression.charAt(x);

    // For negations
    if (char === '¬' && (mutableExpression.charAt(x - 1) !== '(' && mutableExpression.charAt(x + 1) !== ')')) {
      mutableExpression = `${mutableExpression.slice(0, x)}(${mutableExpression.slice(x, x + 2)})${mutableExpression.slice(x + 2)}`;
    }
  }

  for (let x = 0; x < mutableExpression.length; x += 1) {
    const char = mutableExpression.charAt(x);

    if (char === '∧' && (mutableExpression.charAt(x - 1) !== '(' && mutableExpression.charAt(x + 1) !== ')')) {
      let rightParanthesesPosition = -1;
      let leftParanthesesPosition = -1;

      // find first letter to the right
      for (let letterRight = x; letterRight < mutableExpression.length; letterRight += 1) {
        if (mutableExpression.charAt(letterRight)
          .match(/\w/)) {
          rightParanthesesPosition = letterRight;
          break;
        }
      }

      // find first letter to the left
      let openBrackets = 0;
      for (let letterLeft = x; letterLeft >= 0; letterLeft -= 1) {
        if (mutableExpression.charAt(letterLeft) === ')') {
          openBrackets += 1;
        }

        if (mutableExpression.charAt(letterLeft) === '(') {
          openBrackets -= 1;
        }

        if (openBrackets !== 0) continue;

        if (letterLeft === 0 || mutableExpression.charAt(letterLeft)
          .match(/\w/)) {
          if (mutableExpression.charAt(letterLeft - 1) === '¬') {
            leftParanthesesPosition = letterLeft - 1;
          } else {
            leftParanthesesPosition = letterLeft;
          }
          break;
        }
      }

      mutableExpression = `${mutableExpression.slice(0, leftParanthesesPosition)}(${mutableExpression.slice(leftParanthesesPosition, rightParanthesesPosition + 1)})${mutableExpression.slice(rightParanthesesPosition + 1)}`;
      x += 1;
      // console.log(`${mutableExpression.slice(0, leftParanthesesPosition)}(${mutableExpression.slice(leftParanthesesPosition, rightParanthesesPosition + 1)})${mutableExpression.slice(rightParanthesesPosition + 1)}`);
    }
  }

  for (let x = 0; x < mutableExpression.length; x += 1) {
    const char = mutableExpression.charAt(x);

    if (char === '∨' && (mutableExpression.charAt(x - 1) !== '(' && mutableExpression.charAt(x + 1) !== ')')) {
      let rightParanthesesPosition = -1;
      let leftParanthesesPosition = -1;

      // find first letter to the right CRASHES IF && TO THE RIGHT
      {
        let openBrackets = 0;
        for (let letterRight = x; letterRight < mutableExpression.length; letterRight += 1) {
          if (mutableExpression.charAt(letterRight) === '(') {
            openBrackets += 1;
          }

          if (mutableExpression.charAt(letterRight) === ')') {
            openBrackets -= 1;
          }

          if (openBrackets < 0) openBrackets = 0;

          if (openBrackets !== 0) continue;

          if (letterRight + 1 === mutableExpression.length || mutableExpression.charAt(letterRight)
            .match(/\w/)) {
            rightParanthesesPosition = letterRight;
            break;
          }
        }
      }

      // find first letter to the left
      let openBrackets = 0;
      for (let letterLeft = x; letterLeft >= 0; letterLeft -= 1) {
        if (mutableExpression.charAt(letterLeft) === ')') {
          openBrackets += 1;
        }

        if (mutableExpression.charAt(letterLeft) === '(') {
          openBrackets -= 1;
        }

        if (openBrackets < 0) openBrackets = 0;

        if (openBrackets !== 0) continue;

        if (letterLeft === 0 || mutableExpression.charAt(letterLeft)
          .match(/\w/)) {
          if (mutableExpression.charAt(letterLeft - 1) === '¬') {
            leftParanthesesPosition = letterLeft - 1;
          } else {
            leftParanthesesPosition = letterLeft;
          }
          break;
        }
      }

      mutableExpression = `${mutableExpression.slice(0, leftParanthesesPosition)}(${mutableExpression.slice(leftParanthesesPosition, rightParanthesesPosition + 1)})${mutableExpression.slice(rightParanthesesPosition + 1)}`;
      x += 2;
      // console.log(`${mutableExpression.slice(0, leftParanthesesPosition)}(${mutableExpression.slice(leftParanthesesPosition, rightParanthesesPosition + 1)})${mutableExpression.slice(rightParanthesesPosition + 1)}`);
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
  console.log(uppercaseExpression);
  const variables = getAllVariables(uppercaseExpression);
  const binaries = variables.map(() => [0, 1]);
  const steps = splitByParentheses(uppercaseExpression);

  return { variables, steps, binaryOptions: cartesian(binaries) };
};

export default splitByParentheses;
