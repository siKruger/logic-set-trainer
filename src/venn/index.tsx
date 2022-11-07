import React, { useEffect } from 'react';
import * as d3 from 'd3';

function VenDiagramPage() {
  const svgRef = React.useRef(null);

  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    venn.append('circle')
      .attr('cx', circleProps.xOffset)
      .attr('cy', circleProps.yOffset)
      .attr('r', circleProps.radius)
      .style('fill', 'none')
      .style('stroke', 'black');

    venn.append('circle')
      .attr('cx', circleProps.xOffset * 2)
      .attr('cy', circleProps.yOffset)
      .attr('r', circleProps.radius)
      .style('fill', 'none')
      .style('stroke', 'black');

    const intersectionMiddle = 'M 165 15 '
      + 'A 110 110 0 0 1 220 110'
      + 'A 110 110 0 0 1 165 205'
      + 'A 110 110 0 0 1 110 110'
      + 'A 110 110 0 0 1 165 15';

    const rightCircle = 'M 165 15 '
      + 'A 110 110 0 1 1 165 205'
      + 'A 110 110 0 0 0 165 15';

    const leftCircle = 'M 165 15 '
      + 'A 110 110 0 1 0 165 205'
      + 'A 110 110 0 0 1 165 15';

    venn.append('path')
      // @ts-ignore
      .attr('d', intersectionMiddle)
      .style('fill', 'red')
      .style('stroke', 'red');

    venn.append('path')
      // @ts-ignore
      .attr('d', rightCircle)
      .style('fill', 'none')
      .style('stroke', 'orange');

    venn.append('path')
      // @ts-ignore
      .attr('d', leftCircle)
      .style('fill', 'none')
      .style('stroke', 'blue');
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
