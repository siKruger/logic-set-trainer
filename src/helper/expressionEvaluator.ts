/**
 * Type for a evaluation
 * variables: all variables in the expression
 * steps: the expression split up into individual steps
 * binaryOptions: all possible mutations for the variables, e.g. 00, 01, 10, 11
 * parentheses: the expression with all parentheses set by program. Basically the product wich steps uses to evaluate
 */
export enum EvaluationType {
  VARIABLE,
  SET,
}

export type VariableEvaluation = {
  type: EvaluationType.VARIABLE
  variables: string[],
  steps: string[],
  binaryOptions: number[][],
  parentheses: string
};

export type SetEvaluation = {
  type: EvaluationType.SET
  sets: string[],
  steps: string[],
  parentheses: string,
};

/**
 * Gets all parameters in a expression. Only matches A-Z
 * @param expression: string
 * @return string[]
 */
export const getAllVariables = (expression: string): string[] => [...new Set([...expression.matchAll(/\w/g)].flat())];

export const getAllSets = (expression: string): string[] => [...new Set([...expression.matchAll(/\{[0-9,]*\}/g)].flat())];

/**
 * Splits a string up into its parentheses parts. The higher the order in the array the earlier it needs to be
 * evaluated
 * @param expression:string Expression to evalute.#
 * @return string[]
 */
export const splitByParentheses = (expression: string): string[] => {
  // Check if our expression is only 1 char long (so its just a letter)
  if (expression.length === 1) {
    return [expression];
  }
  const mutableExpression = expression;

  const openParentheses = [...mutableExpression].filter((val) => val === '(');
  const closedParentheses = [...mutableExpression].filter((val) => val === ')');

  // Check if parentheses are correct
  if (openParentheses.length !== closedParentheses.length) throw new Error();

  // We have some work to do.. :(
  const outputBuffer: string[] = [];

  const openParenthesesPosition: number[] = [];
  [...mutableExpression].forEach((char, index) => {
    if (char === '(') openParenthesesPosition.push(index);
  });
  openParenthesesPosition.reverse();

  openParenthesesPosition.forEach((position) => {
    const openSubstring = mutableExpression.substring(position);

    let openBracket = 0;
    let closingPosition = -1;

    for (let x = 0; x < openSubstring.length; x += 1) {
      const char = openSubstring.charAt(x);

      if (char === '(') openBracket += 1;
      if (char === ')') openBracket -= 1;

      if (openBracket === 0) {
        closingPosition = x + 1;
        break;
      }
    }

    outputBuffer.push(openSubstring.substring(0, closingPosition));
  });

  return outputBuffer;
};

// todo ts ignore is bad
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const cartesian = (a) => a.reduce((f, b) => f.flatMap((d) => b.map((e) => [d, e].flat())));

/**
 * Finds the position where to place the closing-bracket
 * @param x: index from where to start the search (going right)
 * @param mutableExpression: string
 * @return number -1 if no position found
 */
function findRightPlacement(x: number, mutableExpression: string): number {
  let openBracketCount = 0;
  let placeRight = -1;
  for (let letterRight = x + 1; letterRight < mutableExpression.length; letterRight += 1) {
    const rightSideLetter = mutableExpression.charAt(letterRight);

    if (rightSideLetter === '(') openBracketCount += 1;
    if (rightSideLetter === ')') openBracketCount -= 1;

    if (letterRight === mutableExpression.length - 1 || openBracketCount === 0) {
      if (openBracketCount === 0) {
        if (rightSideLetter.match(/\w/)) {
          placeRight = letterRight + 1;
          break;
        } else {
          placeRight = letterRight;
          break;
        }
      } else {
        placeRight = letterRight + 1;
        break;
      }
    }
  }

  return placeRight;
}

/**
 * Finds the position where to place the opening-bracket
 * @param x: index from where to start the search (going left)
 * @param mutableExpression: string
 * @return number -1 if no position found
 */
function findLeftPlacement(x: number, mutableExpression: string) {
  let openBracketCount = 0;
  let placeLeft = -1;
  for (let letterLeft = x - 1; letterLeft >= 0; letterLeft -= 1) {
    const leftSideLetter = mutableExpression.charAt(letterLeft);

    if (leftSideLetter === ')') openBracketCount += 1;
    if (leftSideLetter === '(') openBracketCount -= 1;

    // Save to place
    if (openBracketCount === 0) {
      if (leftSideLetter.match(/\w/) || mutableExpression.charAt(letterLeft + 1) === '¬') {
        placeLeft = letterLeft;
        break;
      } else {
        placeLeft = letterLeft + 1;
        break;
      }
    }
  }
  return placeLeft;
}

/**
 * Operators have their precedence. We do not want to hardcode them but instead set the parentheses in the right way. Thus we set the parentheses for each operator
 * @param expression: string
 * @param operator: string- operator to enclose
 * @return string
 */
const setOptionalParenthesesForOperator = (expression: string, operator: string): string => {
  let mutableExpression = expression;
  for (let x = 0; x < mutableExpression.length; x += 1) {
    const currentChar = mutableExpression.charAt(x);

    // Work to do
    if (currentChar === operator) {
      const placeLeft = findLeftPlacement(x, mutableExpression);
      const placeRight = findRightPlacement(x, mutableExpression);

      // We already have a parentheses for this placement
      // Now modify the string accordingly
      mutableExpression = `${mutableExpression.slice(0, placeLeft)}(${mutableExpression.slice(placeLeft, placeRight)})${mutableExpression.slice(placeRight)}`;
      x += 1;
    }
  }
  return mutableExpression;
};

/**
 * Finds the position where the double parentheses occur (returns the closing position)
 * @param expression: string
 * @return number
 */
const findDoubleParenthesesPosition = (expression: string): number => {
  const stack: string[] = [];

  for (let x = 0; x < expression.length; x += 1) {
    const currentChar = expression.charAt(x);
    if (currentChar === ')') {
      let top = stack.pop();
      let elemInside = 0;
      while (top !== '(') {
        elemInside += 1;
        top = stack.pop();
      }
      if (elemInside < 1) {
        return x;
      }
    } else {
      stack.push(currentChar);
    }
  }

  return -1;
};

/**
 * Removes the double parantheses from the expression
 * @param expression: string
 * @param doublePosition: number- The Position where the unnecessary parentheses close
 * @return string
 */
const extractSubstringFooBar = (expression: string, doublePosition: number): string => {
  const searching = expression.slice(0, doublePosition);
  let openBrackets = 0;
  for (let bar = searching.length - 1; bar > 0; bar -= 1) {
    const char = searching[bar];

    if (char === '(') openBrackets += 1;
    if (char === ')') openBrackets -= 1;

    if (openBrackets === 0) {
      const front = expression.slice(0, bar - 1);
      const middle = expression.slice(bar, doublePosition);
      const back = expression.slice(doublePosition + 1);

      return front + middle + back;
    }
  }
  return expression;
};

/**
 * Sometimes we can get (( XXX )). We want to remove them
 * @param expression: string
 * @return string
 */
const removeDoubleParentheses = (expression: string): string => {
  let doublePosition = findDoubleParenthesesPosition(expression);

  // Nothing to do here
  if (doublePosition === -1) return expression;
  let mutableExpression = expression;

  while (doublePosition !== -1) {
    mutableExpression = extractSubstringFooBar(mutableExpression, doublePosition);
    doublePosition = findDoubleParenthesesPosition(mutableExpression);
  }

  return mutableExpression;
};

/**
 * Operators have their precedence. We want to set all parentheses in order to evaluate correct
 * @param expression: string
 * @return string
 */
export const setOptionalParenthesis = (expression: string): string => {
  let mutableExpression = expression;

  for (let x = mutableExpression.length; x >= 0; x -= 1) {
    const char = mutableExpression.charAt(x);

    // For negations
    if (char === '¬') {
      // Search the right side
      // Right Search
      const placeRight = findRightPlacement(x, mutableExpression);
      mutableExpression = `${mutableExpression.slice(0, x)}(${mutableExpression.slice(x, placeRight)})${mutableExpression.slice(placeRight)}`;
    }
  }

  mutableExpression = setOptionalParenthesesForOperator(mutableExpression, '∧');
  mutableExpression = setOptionalParenthesesForOperator(mutableExpression, '↮');
  mutableExpression = setOptionalParenthesesForOperator(mutableExpression, '∨');
  mutableExpression = setOptionalParenthesesForOperator(mutableExpression, '⇔');
  mutableExpression = setOptionalParenthesesForOperator(mutableExpression, '⇒');
  mutableExpression = setOptionalParenthesesForOperator(mutableExpression, '⇐');

  mutableExpression = removeDoubleParentheses(mutableExpression);
  return mutableExpression;
};

/**
 * Prepares a statement for evaluation. Uppercase + Replace symbols
 * @param expression: string expression
 * @return string
 */
export const prepareForEvaluation = (expression: string): string => {
  let uppercaseExpression = expression.toUpperCase().replaceAll(/\s/g, '');

  // Replace all with correct characters
  uppercaseExpression = uppercaseExpression.replaceAll(/<=!=>/g, '↮');
  uppercaseExpression = uppercaseExpression.replaceAll(/&&/g, '∧');
  uppercaseExpression = uppercaseExpression.replaceAll(/\|\|/g, '∨');
  uppercaseExpression = uppercaseExpression.replaceAll(/!/g, '¬');
  uppercaseExpression = uppercaseExpression.replaceAll(/<==>/g, '⇔');
  uppercaseExpression = uppercaseExpression.replaceAll(/=>/g, '⇒');
  uppercaseExpression = uppercaseExpression.replaceAll(/<=/g, '⇐');

  return uppercaseExpression;
};

function nextChar(c: string) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const replaceSets = (expression: string) => {
  let mutableExpression = expression;
  let replaceChar = 'A';
  const dictionary = {};
  const foundSets = expression.match(/{[0-9,]*}/g);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  foundSets.forEach((set) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dictionary[replaceChar] = set;

    const matchRegex = new RegExp(escapeRegExp(set), 'g');
    mutableExpression = mutableExpression.replaceAll(matchRegex, replaceChar);

    replaceChar = nextChar(replaceChar);
  });

  return { mutableExpression, letterDic: dictionary };
};

const unReplaceSets = (expression: string, dictionary: Record<string, string>) => {
  let mutableExpression = expression;
  const keys = Object.keys(dictionary);
  for (let i = 0; i < keys.length; i += 1) {
    const matchRegex = new RegExp(escapeRegExp(keys[i]), 'g');
    mutableExpression = mutableExpression.replaceAll(matchRegex, dictionary[keys[i]]);
  }

  return mutableExpression;
};

/**
 * Evaluates the input from a user input field
 * @param expression: string
 * @return object: TruthtableEvaluation
 */
export const evaluateTruthtable = (expression: string): VariableEvaluation | SetEvaluation => {
  let uppercaseExpression = prepareForEvaluation(expression);
  let dictionary = {};

  // Is a set Operation.
  if (uppercaseExpression.includes('{') && uppercaseExpression.match(/[0-9]/)) {
    const sets = getAllSets(uppercaseExpression);
    const { mutableExpression, letterDic } = replaceSets(uppercaseExpression);
    uppercaseExpression = mutableExpression;
    dictionary = letterDic;
    uppercaseExpression = setOptionalParenthesis(uppercaseExpression);
    uppercaseExpression = unReplaceSets(uppercaseExpression, dictionary);
    const steps = splitByParentheses(uppercaseExpression);

    return {
      steps, parentheses: uppercaseExpression, sets, type: EvaluationType.SET,
    };
  }

  uppercaseExpression = setOptionalParenthesis(uppercaseExpression);
  const variables = getAllVariables(uppercaseExpression);
  const binaries = variables.map(() => [0, 1]);
  const binaryOptions = cartesian(binaries);
  const steps = splitByParentheses(uppercaseExpression);

  return {
    variables, steps, binaryOptions, parentheses: uppercaseExpression, type: EvaluationType.VARIABLE,
  };
};
