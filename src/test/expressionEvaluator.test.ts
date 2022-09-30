import {
  describe, expect, jest, test,
} from '@jest/globals';
import { prepareForEvaluation, setOptionalParenthesis } from '../helper/expressionEvaluator';

describe('optional parentheses', () => {
  test('¬ Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('!a'))).toBe('(¬A)');
    expect(setOptionalParenthesis(prepareForEvaluation('(!a)'))).toBe('((¬A))');
    expect(setOptionalParenthesis(prepareForEvaluation('!a && b'))).toBe('((¬A)∧B)');
    expect(setOptionalParenthesis(prepareForEvaluation('!(a && b)'))).toBe('(¬((A∧B)))');
  });

  test('&& Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a&&b'))).toBe('(A∧B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a&&b&&c'))).toBe('((A∧B)∧C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a&&(b&&c)'))).toBe('(A∧((B∧C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a&&b)&&c'))).toBe('(((A∧B))∧C)');
  });

  test('<=!=> Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a<=!=>b'))).toBe('(A↮B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=!=>b<=!=>c'))).toBe('((A↮B)↮C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=!=>(b<=!=>c)'))).toBe('(A↮((B↮C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a<=!=>b)<=!=>c'))).toBe('(((A↮B))↮C)');
  });

  test('|| Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a||b'))).toBe('(A∨B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a||b||c'))).toBe('((A∨B)∨C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a||(b||c)'))).toBe('(A∨((B∨C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a||b)||c'))).toBe('(((A∨B))∨C)');
  });

  test('<===> Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a<==>b'))).toBe('(A⇔B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<==>b<==>c'))).toBe('((A⇔B)⇔C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<==>(b<==>c)'))).toBe('(A⇔((B⇔C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a<==>b)<==>c'))).toBe('(((A⇔B))⇔C)');
  });

  test('=> Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a=>b'))).toBe('(A⇒B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a=>b=>c'))).toBe('((A⇒B)⇒C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a=>(b=>c)'))).toBe('(A⇒((B⇒C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a=>b)=>c'))).toBe('(((A⇒B))⇒C)');
  });

  test('<= Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a<=b'))).toBe('(A⇐B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=b<=c'))).toBe('((A⇐B)⇐C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=(b<=c)'))).toBe('(A⇐((B⇐C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a<=b)<=c'))).toBe('(((A⇐B))⇐C)');
  });

  test('Mixed Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a && (b || c)'))).toBe('(A∧((B∨C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('a || (b && c)'))).toBe('(A∨((B∧C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('!a || (b && c)'))).toBe('((¬A)∨((B∧C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('a || !(b && c)'))).toBe('(A∨(¬((B∧C))))');
    expect(setOptionalParenthesis(prepareForEvaluation('a && !(b || c)'))).toBe('(A∧(¬((B∨C))))');
  });
});
