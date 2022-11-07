import React, { useEffect } from 'react';
import * as d3 from 'd3';

function VenDiagramPage() {
  const svgRef = React.useRef(null);

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    venn.append('circle').attr('cx', 150)
      .attr('cy', 70)
      .attr('r', 50);
  });

  return (
    <>

      {' '}
      It Works

      <svg ref={svgRef} width={200} height={200} />

    </>
  );
}

export default VenDiagramPage;
