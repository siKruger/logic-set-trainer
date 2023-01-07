import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import {
  fiveSetVenn,
  fourSetVenn,
  oneSetVenn,
  threeSetVenn,
  twoSetVenn,
} from '../helper/vennDiagrams';
import {
  fiveSetVennExp,
  fourSetVennExp,
  oneSetVennExp,
  threeSetVennExp,
  twoSetVennExp,
} from '../helper/vennDiagramsExp';
// import { TruthtableEvaluation } from '../helper/expressionEvaluator';
import { VariableEvaluation, SetEvaluation, EvaluationType } from '../helper/expressionEvaluator';
import {evaluateSetExpression, evaluateWholeExpression, replaceExpressionToBoolean } from '../helper/logicConverter';


type VennProps = {
  data?: {
    sets: any;
    type: EvaluationType; variables: any[]; steps: any[]; binaryOptions: any[]; 
} | undefined;
  step: number
};
// let cl = "oneSetVenn";


function VennDiagramPage({ data, step }: VennProps) {
  const [cl, setCl] = useState('oneSetVenn');
  const svgRef = React.useRef(null);

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    // Undefined check
    if (data === undefined) return;

    const everything = venn.selectAll('*');
    everything.remove();

    // const lastExpression = data.steps[data.steps.length - 1];
    const trueEvaluations = [];

    if (step !== 0) {
      const lastExpression = data.steps[step - 1];

      // Only one var so only !X or X
      if (data.variables.length === 1) {
        for (let x = 0; x < 2; x += 1) {
          const replacedExpression = replaceExpressionToBoolean(lastExpression, data.variables, [x]);
          const evaluated = evaluateWholeExpression(replacedExpression);

          if (evaluated === '1' && x === 0) trueEvaluations.push([`!${[data.variables[0]]}`]); else if (evaluated === '1' && x === 1) trueEvaluations.push([data.variables[0]]);
        }

        // Multiple Vars, sadly
      } else {
        for (let x = 0; x < data.binaryOptions.length; x += 1) {
          const binaryOption: number[] = data.binaryOptions[x] as number[];

          const replacedExpression = replaceExpressionToBoolean(lastExpression, data.variables, binaryOption);
          const evaluated = evaluateWholeExpression(replacedExpression);

          if (evaluated === '1') {
            const foo = [];

            for (let y = 0; y < data.variables.length; y += 1) {
              if (binaryOption[y] === 1) foo.push(data.variables[y]);
              if (binaryOption[y] === 0) foo.push(`!${data.variables[y]}`);
            }

            trueEvaluations.push(foo);
          }
        }
      }
    }

    switch (data.variables.length) {
      case 1: oneSetVenn(venn, trueEvaluations, data.variables); break;
      case 2: twoSetVenn(venn, trueEvaluations, data.variables); setCl('twoSetVenn'); break;
      case 3: threeSetVenn(venn, trueEvaluations, data.variables); setCl('threeSetVenn'); break;
      case 4: fourSetVenn(venn, trueEvaluations, data.variables); setCl('fourSetVenn'); break;
      case 5: fiveSetVenn(venn, trueEvaluations, data.variables); setCl('fiveSetVenn'); break;
      default:
    }
  });

  return (
    <svg className={cl} ref={svgRef} />
  );
}


function VennDiagramPageSets({ data, step }: VennProps) {
  const [cl, setCl] = useState('oneSetVenn');
  const svgRef = React.useRef(null);

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    // Undefined check
    if (data === undefined || data.type === EvaluationType.VARIABLE) return;

    const everything = venn.selectAll('*');
    everything.remove();

    // const lastExpression = data.steps[data.steps.length - 1];
    let trueSet = [];

    if (data.sets.length === 1 && step === 0) {
      const evaluated = evaluateSetExpression(data.sets[0], data.sets);
      const numbers = evaluated.substring(1, evaluated.length - 1).split(',');
      for (let i = 0; i < numbers.length; i += 1) {
        trueSet.push(numbers[i]);
      }
    } else if (step !== 0) {
      const evaluated = evaluateSetExpression(data.steps[step - 1], data.sets);
      const numbers = evaluated.substring(1, evaluated.length - 1).split(',');
      for (let i = 0; i < numbers.length; i += 1) {
        trueSet.push(numbers[i]);
      }
    }

    trueSet = Array.from(new Set(trueSet));

    switch (data.sets.length) {
      case 1: oneSetVennExp(venn, trueSet, data.sets); break;
      case 2: twoSetVennExp(venn, trueSet, data.sets); setCl('twoSetVenn'); break;
      case 3: threeSetVennExp(venn, trueSet, data.sets); setCl('threeSetVenn'); break;
      case 4: fourSetVennExp(venn, trueSet, data.sets); setCl('fourSetVenn'); break;
      case 5: fiveSetVennExp(venn, trueSet, data.sets); setCl('fiveSetVenn'); break;
      default:
    }
  });

  return (
    <svg ref={svgRef} className={cl} />
  );
}

VennDiagramPage.defaultProps = {
  data: undefined,
};

VennDiagramPageSets.defaultProps = {
  data: undefined,
};

export { 
  VennDiagramPage, VennDiagramPageSets
};
