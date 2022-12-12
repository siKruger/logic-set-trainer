import { describe, expect, test } from '@jest/globals';
import { prepareForEvaluation, setOptionalParenthesis } from '../helper/expressionEvaluator';
import {
  checkCorrectParenthesesAmount,
  checkCorrectSubexpressions,
  checkCorrectSymbols,
} from '../helper/expressionValidator';

describe('check for valid expression inputs', () => {
  test('Correct symbols', () => {
    expect(checkCorrectSymbols('&ad')).toBe('Ungültiges Symbol an Stelle: 0');
    expect(checkCorrectSymbols('(!a)')).toBe('');
    expect(checkCorrectSymbols('!a &"§&& b')).toBe('Ungültiges Symbol an Stelle: 3');
    expect(checkCorrectSymbols('!1(a4 &&32 b)')).toBe('Ungültiges Symbol an Stelle: 1');
  });

  test('Correct parentheses amount', () => {
    expect(checkCorrectParenthesesAmount('&ad')).toBe('');
    expect(checkCorrectParenthesesAmount('(!a)')).toBe('');
    expect(checkCorrectParenthesesAmount('((!a)')).toBe('Eine Klammer wurde nicht geschlossen! An Stelle: 0');
    expect(checkCorrectParenthesesAmount('()!a)')).toBe('Eine Klammer wurde nicht geöffnet! An Stelle: 4');
    expect(checkCorrectParenthesesAmount('()!a()')).toBe('');
    expect(checkCorrectParenthesesAmount('(a&&b))')).toBe('Eine Klammer wurde nicht geöffnet! An Stelle: 6');
    expect(checkCorrectParenthesesAmount('!a (&)("§&& b')).toBe('Eine Klammer wurde nicht geschlossen! An Stelle: 6');
    expect(checkCorrectParenthesesAmount('!1()a4 &&32 b)')).toBe('Eine Klammer wurde nicht geöffnet! An Stelle: 13');
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
