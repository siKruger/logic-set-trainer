import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { twoSetVenn } from '../helper/vennDiagrams';
import { TruthtableEvaluation } from '../helper/expressionEvaluator';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface vennProps {
  data: TruthtableEvaluation | undefined
}
function VenDiagramPage(props: vennProps) {
  const svgRef = React.useRef(null);

  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };

  useEffect(() => {
    const venn = d3.select(svgRef.current).on('mousemove', (event) => {
      const coords = d3.pointer(event);
      console.log(coords[0], coords[1]); // log the mouse x,y position
    });

    twoSetVenn(venn);
    // threeSetVenn(venn);
    // fourSetVenn(venn);
  });
  console.log(props.data);
  return (
    <>
      ** VENN STARTING **

      <svg ref={svgRef} width={500} height={500} />

      ** VENN ENDING **

    </>
  );
}

export default VenDiagramPage;
