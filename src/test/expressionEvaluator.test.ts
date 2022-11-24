import { describe, expect, test } from '@jest/globals';
import { prepareForEvaluation, setOptionalParenthesis } from '../helper/expressionEvaluator';
import {
  checkCorrectParenthesesAmount,
  checkCorrectSubexpressions,
  checkCorrectSymbols,
} from '../helper/expressionValidator';

describe('check for valid expression inputs', () => {
  test('Correct symbols', () => {
    expect(checkCorrectSymbols('&ad')).toBe(false);
    expect(checkCorrectSymbols('(!a)')).toBe(true);
    expect(checkCorrectSymbols('!a &"§&& b')).toBe(false);
    expect(checkCorrectSymbols('!1(a4 &&32 b)')).toBe(false);
  });

  test('Correct parentheses amount', () => {
    expect(checkCorrectParenthesesAmount('&ad')).toBe(true);
    expect(checkCorrectParenthesesAmount('(!a)')).toBe(true);
    expect(checkCorrectParenthesesAmount('((!a)')).toBe(false);
    expect(checkCorrectParenthesesAmount('()!a)')).toBe(false);
    expect(checkCorrectParenthesesAmount('()!a()')).toBe(true);
    expect(checkCorrectParenthesesAmount('(a&&b))')).toBe(false);
    expect(checkCorrectParenthesesAmount('!a (&)("§&& b')).toBe(false);
    expect(checkCorrectParenthesesAmount('!1()a4 &&32 b)')).toBe(false);
  });

  test('Correct expression', () => {
    expect(checkCorrectSubexpressions('&ad')).toBe(false);
    expect(checkCorrectSubexpressions('(!a)')).toBe(true);
    expect(checkCorrectSubexpressions('!a (&)("§&& b')).toBe(false);
    expect(checkCorrectSubexpressions('!1()a4 &&32 b)')).toBe(false);
    expect(checkCorrectSubexpressions('a<==>(b<===>c)')).toBe(false);
    expect(checkCorrectSubexpressions('a && (b && c) &&& d && e')).toBe(false);
    expect(checkCorrectSubexpressions('(a || b) && (!c!  | | d) => (a <=!=> !d && (!a <==> d) | | c <=  !a) <= !b && !a')).toBe(false);
    expect(checkCorrectSubexpressions('a<==>(b<==>c)')).toBe(true);
    expect(checkCorrectSubexpressions('a && (b && c) && d && e')).toBe(true);
    expect(checkCorrectSubexpressions('(a || b) && (!c  | | d) => (a <=!=> !d && (!a <==> d) | | c <=  !a) <= !b && !a')).toBe(true);
  });
});

describe('optional parentheses', () => {
  test('¬ Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('!a'))).toBe('(¬A)');
    expect(setOptionalParenthesis(prepareForEvaluation('(!a)'))).toBe('(¬A)');
    expect(setOptionalParenthesis(prepareForEvaluation('!a && b'))).toBe('((¬A)∧B)');
    expect(setOptionalParenthesis(prepareForEvaluation('!(a && b)'))).toBe('(¬(A∧B))');
  });

  test('&& Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a&&b'))).toBe('(A∧B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a&&b&&c'))).toBe('((A∧B)∧C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a&&(b&&c)'))).toBe('(A∧(B∧C))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a&&b)&&c'))).toBe('((A∧B)∧C)');
  });

  test('<=!=> Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a<=!=>b'))).toBe('(A↮B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=!=>b<=!=>c'))).toBe('((A↮B)↮C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=!=>(b<=!=>c)'))).toBe('(A↮(B↮C))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a<=!=>b)<=!=>c'))).toBe('((A↮B)↮C)');
  });

  test('|| Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a||b'))).toBe('(A∨B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a||b||c'))).toBe('((A∨B)∨C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a||(b||c)'))).toBe('(A∨(B∨C))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a||b)||c'))).toBe('((A∨B)∨C)');
  });

  test('<==> Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a<==>b'))).toBe('(A⇔B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<==>b<==>c'))).toBe('((A⇔B)⇔C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<==>(b<==>c)'))).toBe('(A⇔(B⇔C))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a<==>b)<==>c'))).toBe('((A⇔B)⇔C)');
  });

  test('=> Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a=>b'))).toBe('(A⇒B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a=>b=>c'))).toBe('((A⇒B)⇒C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a=>(b=>c)'))).toBe('(A⇒(B⇒C))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a=>b)=>c'))).toBe('((A⇒B)⇒C)');
  });

  test('<= Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a<=b'))).toBe('(A⇐B)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=b<=c'))).toBe('((A⇐B)⇐C)');
    expect(setOptionalParenthesis(prepareForEvaluation('a<=(b<=c)'))).toBe('(A⇐(B⇐C))');
    expect(setOptionalParenthesis(prepareForEvaluation('(a<=b)<=c'))).toBe('((A⇐B)⇐C)');
  });

  test('Mixed Operations', () => {
    expect(setOptionalParenthesis(prepareForEvaluation('a && (b || c)'))).toBe('(A∧(B∨C))');
    expect(setOptionalParenthesis(prepareForEvaluation('a || (b && c)'))).toBe('(A∨(B∧C))');
    expect(setOptionalParenthesis(prepareForEvaluation('!a || (b && c)'))).toBe('((¬A)∨(B∧C))');
    expect(setOptionalParenthesis(prepareForEvaluation('a || !(b && c)'))).toBe('(A∨(¬(B∧C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('a && !(b || c)'))).toBe('(A∧(¬(B∨C)))');
    expect(setOptionalParenthesis(prepareForEvaluation('a && (b && c) && d && e'))).toBe('(((A∧(B∧C))∧D)∧E)');
    expect(setOptionalParenthesis(prepareForEvaluation('(a || b) && (!c  | | d) => (a <=!=> !d && (!a <==> d) | | c <=  !a) <= !b && !a'))).toBe('((((A∨B)∧((¬C)∨D))⇒(((A↮((¬D)∧((¬A)⇔D)))∨C)⇐(¬A)))⇐((¬B)∧(¬A)))');
  });
});
