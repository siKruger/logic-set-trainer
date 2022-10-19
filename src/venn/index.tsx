import React from 'react';
import { layout } from '@upsetjs/venn.js';

function VenDiagramPage() {
  const sets = [
    { sets: ['A'], size: 12 },
    { sets: ['B'], size: 12 },
    { sets: ['A', 'B'], size: 2 },
  ];

  const data = layout(sets);

  console.log(data);
  console.log(data);
  return (
    <>

      {' '}
      It Works

      <div className="venn" id="venn" style={{ width: '500px', height: '500px' }} />
    </>
  );
}

export default VenDiagramPage;
