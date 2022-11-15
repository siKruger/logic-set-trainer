import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { fourSetVenn, threeSetVenn, twoSetVenn } from '../helper/vennDiagrams';
import { TruthtableEvaluation } from '../helper/expressionEvaluator';

type VennProps = {
  data?: TruthtableEvaluation;
};

function VenDiagramPage({ data }: VennProps) {
  const svgRef = React.useRef(null);

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    const everything = venn.selectAll('*');
    everything.remove();

    switch (data !== undefined && data.variables.length) {
      case 2: twoSetVenn(venn); break;
      case 3: threeSetVenn(venn); break;
      case 4: fourSetVenn(venn); break;
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
