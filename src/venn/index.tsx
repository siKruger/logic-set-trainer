import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { threeSetVenn } from '../helper/vennDiagrams';

function VenDiagramPage() {
  const svgRef = React.useRef(null);

  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };

  useEffect(() => {
    const venn = d3.select(svgRef.current).on('mousemove', (event) => {
      const coords = d3.pointer(event);
      console.log(coords[0], coords[1]); // log the mouse x,y position
    });

    // twoSetVenn(venn);
    threeSetVenn(venn);
    // fourSetVenn(venn);
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
