import React from 'react';
import evaluateExpression from '../expressionEvaluator';

function Truthtable() {
  evaluateExpression('(a &&  b ) || c');

  evaluateExpression('(a &&  b && ( d || e)) || c');

  return <h1> Hello, truthtable </h1>;
}

export default Truthtable;
