import { expect, jest, test } from '@jest/globals';
import { prepareForEvaluation, setOptionalParanthesis } from '../helper/expressionEvaluator';

test('¬ Operations', () => {
  expect(setOptionalParanthesis(prepareForEvaluation('!a'))).toBe('(¬A)');
  expect(setOptionalParanthesis(prepareForEvaluation('(!a)'))).toBe('(¬A)');
});

test('&& Operations', () => {
  expect(setOptionalParanthesis(prepareForEvaluation('a&&b'))).toBe('(A∧B)');
  expect(setOptionalParanthesis(prepareForEvaluation('a&&b&&c'))).toBe('((A∧B)∧C)');
  expect(setOptionalParanthesis(prepareForEvaluation('a&&(b&&c)'))).toBe('(A∧((B∧C)))');
  expect(setOptionalParanthesis(prepareForEvaluation('(a&&b)&&c'))).toBe('(((A∧B))∧C)');
});
