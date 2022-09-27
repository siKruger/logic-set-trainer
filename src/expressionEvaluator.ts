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

const evaluateExpression = (expression: string): string[] => {
  const cleanedExpression = [...expression.replaceAll(/\s/g, '')];

  const openParentheses = cleanedExpression.filter((val) => val === '(');
  const closedParentheses = cleanedExpression.filter((val) => val === ')');

  // Check if parentheses are correct
  if (openParentheses.length !== closedParentheses.length) throw Error();

  // No parentheses
  if (openParentheses.length === 0) return cleanedExpression;

  // We have some work to do.. :(
  const openParenthesesPosition: number[] = [];
  cleanedExpression.forEach((char, index) => {
    if (char === '(') openParenthesesPosition.push(index);
  });

  const outputBuffer: string[][] = [];

  for (let x = openParenthesesPosition.length - 1; x >= 0; x -= 1) {
    const position = openParenthesesPosition[x];
    const parenthesesPart = cleanedExpression.slice(position);

    for (let subIndex = 0; subIndex < parenthesesPart.length; subIndex += 1) {
      const subPart = parenthesesPart[subIndex];
      if (subPart === ')') {
        openParenthesesPosition.pop();
        outputBuffer.push(cleanedExpression.slice(position, position + subIndex + 1));
        break;
      }
    }
  }

  console.log(outputBuffer);
  return [];
};

export default evaluateExpression;
