import React, { useEffect } from 'react';
import * as d3 from 'd3';

function VenDiagramPage() {
  const svgRef = React.useRef(null);

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    venn.append('circle')
      .attr('cx', 110)
      .attr('cy', 110)
      .attr('r', 110)
      .style('fill', 'none')
      .style('stroke', 'black');

    venn.append('circle')
      .attr('cx', 220)
      .attr('cy', 110)
      .attr('r', 110)
      .style('fill', 'none')
      .style('stroke', 'black');

    const intersectionMiddle = 'M 165 15 '
      + 'A 110 110 0 0 1 220 110'
      + 'A 110 110 0 0 1 165 205'
      + 'A 110 110 0 0 1 110 110'
      + 'A 110 110 0 0 1 165 15';

    venn.append('path')
      // @ts-ignore
      .attr('d', intersectionMiddle)
      .style('fill', 'none')
      .style('stroke', 'red');
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
