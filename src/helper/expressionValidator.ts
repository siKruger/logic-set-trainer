export const checkCorrectSymbols = (expression: string): boolean => {
  const validCharacters = /^(<=!=>|&&|\|\||!|<==>|=>|<=|\(|\)|[A-Z])+$/g;
  return !expression.toUpperCase().match(validCharacters) === null;
};

export const checkCorrectParentheses = (expression: string): boolean => {
  const validCharacters = /^(<=!=>|&&|\|\||!|<==>|=>|<=|\(|\)|[A-Z])+$/g;
  return !expression.toUpperCase().replaceAll(/\s/g, '').match(validCharacters) === null;
};

/*
Pseudocode Regex for correctParentheses
(([NEGATION][A-Z]\))|([A-Z][OPERATOR]\))|([A-Z]\))*
 */
