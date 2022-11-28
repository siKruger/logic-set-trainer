import React, { useEffect } from 'react';
import * as d3 from 'd3';
import {
  fiveSetVenn, fourSetVenn, oneSetVenn, threeSetVenn, twoSetVenn,
} from '../helper/vennDiagrams';
import { TruthtableEvaluation } from '../helper/expressionEvaluator';
import { evaluateWholeExpression, replaceExpressionToBoolean } from '../helper/logicConverter';
import "./feature.css"
type VennProps = {
  data?: TruthtableEvaluation;
};

function VenDiagramPage({ data }: VennProps) {
  const svgRef = React.useRef(null);

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    // Undefined check
    if (data === undefined) return;

    const everything = venn.selectAll('*');
    everything.remove();

    const lastExpression = data.steps[data.steps.length - 1];

    const trueEvaluations = [];
    // Only one var so only !X or X
    if (data.variables.length === 1) {
      if (lastExpression.includes('¬')) {
        trueEvaluations.push([`!${[data.variables[0]]}`]);
      } else {
        trueEvaluations.push([data.variables[0]]);
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

    switch (data.variables.length) {
      case 1: oneSetVenn(venn, trueEvaluations, data.variables); break;
      case 2: twoSetVenn(venn, trueEvaluations, data.variables); break;
      case 3: threeSetVenn(venn, trueEvaluations, data.variables); break;
      case 4: fourSetVenn(venn, trueEvaluations, data.variables); break;
      case 5: fiveSetVenn(venn, trueEvaluations, data.variables); break;
      default:
    }
  });

  return (
    <svg ref={svgRef} />
  );
}

VenDiagramPage.defaultProps = {
  data: undefined,
};

export default VenDiagramPage;
