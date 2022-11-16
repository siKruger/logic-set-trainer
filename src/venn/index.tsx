import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { fourSetVenn, threeSetVenn, twoSetVenn } from '../helper/vennDiagrams';
import { TruthtableEvaluation } from '../helper/expressionEvaluator';
import { evaluateWholeExpression, replaceExpressionToBoolean } from '../helper/logicConverter';

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

    for (let x = 0; x < data.binaryOptions.length; x++) {
      const binaryOption = data.binaryOptions[x];

      const replacedExpression = replaceExpressionToBoolean(lastExpression, data.variables, binaryOption);
      const evaluated = evaluateWholeExpression(replacedExpression);

      if (evaluated === '1') {
        const foo = [];

        for (let y = 0; y < data.variables.length; y++) {
          if (binaryOption[y] === 1) foo.push(data.variables[y]);
          if (binaryOption[y] === 0) foo.push(`!${data.variables[y]}`);
        }

        trueEvaluations.push(foo);
      }
    }

    // In this array we have the EXACT array that needs to match our intersection on the set

    switch (data.variables.length) {
      case 2: twoSetVenn(venn, trueEvaluations, data.variables); break;
      case 3: threeSetVenn(venn, trueEvaluations, data.variables); break;
      case 4: fourSetVenn(venn, trueEvaluations, data.variables); break;
    }
  });

  // console.log(data);

  return (
    <svg ref={svgRef} width={500} height={500} />
  );
}

VenDiagramPage.defaultProps = {
  data: undefined,
};

export default VenDiagramPage;
