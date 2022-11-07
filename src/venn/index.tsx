import React, { useEffect } from 'react';
import * as d3 from 'd3';

function VenDiagramPage() {
  const svgRef = React.useRef(null);

  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    // twoSetVenn(venn);
    // threeSetVenn(venn);
  });
  return (
    <>

      {' '}
      It Works

      <svg ref={svgRef} width={500} height={500} />

    </>
  );
}

export default VenDiagramPage;
