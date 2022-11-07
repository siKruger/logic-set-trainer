import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { twoSetVenn } from '../helper/vennDiagrams';

function VenDiagramPage() {
  const svgRef = React.useRef(null);

  useEffect(() => {
    const venn = d3.select(svgRef.current);

    twoSetVenn(venn);
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
