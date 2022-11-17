import * as d3 from 'd3';

const shouldDrawSet = (inputSet: string[][], testSet: string[]) => inputSet.filter((elem) => JSON.stringify(elem) === JSON.stringify(testSet)).length > 0;

export const fiveSetVenn = (venn: d3.Selection<null, unknown, null, undefined>, trueEvaluations: string[][], variables: string[]) => {
  const A = variables[0];
  const B = variables[1];
  const C = variables[2];
  const D = variables[3];
  const E = variables[4];

  const notAreaSet = [`!${A}`, `!${B}`, `!${C}`, `!${D}`, `!${E}`];

  if (shouldDrawSet(trueEvaluations, notAreaSet)) {
    const notArea = 'M 27 147'
      + 'L 27 46'
      + 'L 145 46'
      + 'A 50 50 0 0 0 98.63333129882812 70.16666412353516'
      + 'A 60 60 0 0 0 47 91.13333129882812'
      + 'A 80 80 0 0 0 27 147'
      + 'M 145 46'
      + 'L 300 46'
      + 'A 150 150 0 0 0 225.7833251953125 80.78333282470703'
      + 'A 150 150 0 0 0 145 46'
      + 'M 310 46'
      + 'L 425 46'
      + 'L 425 143'
      + 'A 80 80 0 0 0 399.3166809082031 84.56666564941406'
      + 'A 70 70 0 0 0 353.8999938964844 69.36666870117188'
      + 'A 50 50 0 0 0 310 46'
      + 'M 425 46'
      + 'L 425 371'
      + 'L 240 371'
      + 'A 160 160 0 0 0 348 315.6166687011719'
      + 'A 250 250 0 0 0 425 143'
      + 'M 200 371'
      + 'L 27 371'
      + 'L 27 147'
      + 'A 250 250 0 0 0 92 301.566650390625'
      + 'A 180 180 0 0 0 200 371';

    venn.append('path')
      .attr('d', notArea)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  } else {
    venn.append('rect')
      .attr('x', '26')
      .attr('y', '44')
      .attr('width', '400')
      .attr('height', '330')
      .attr('fill', 'none')
      .style('stroke', 'black');
  }

    venn.append('ellipse')
    .attr('cx', 60)
    .attr('cy', 280)
    .attr('rx', 90)
    .attr('ry', 170)
    .attr('transform', 'rotate(0)')
    .style('fill', 'none')
    .style('stroke', 'black');

    venn.append('ellipse')
    .attr('cx', 60)
    .attr('cy', 280)
    .attr('rx', 90)
    .attr('ry', 170)
    .attr('transform', 'rotate(72)')
    .style('fill', 'none')
    .style('stroke', 'black');

    venn.append('ellipse')
    .attr('cx', 60)
    .attr('cy', 280)
    .attr('rx', 90)
    .attr('ry', 170)
    .attr('transform', 'rotate(144)')
    .style('fill', 'none')
    .style('stroke', 'black');

    venn.append('ellipse')
    .attr('cx', 60)
    .attr('cy', 280)
    .attr('rx', 90)
    .attr('ry', 170)
    .attr('transform', 'rotate(216)')
    .style('fill', 'none')
    .style('stroke', 'black');

    venn.append('ellipse')
    .attr('cx', 60)
    .attr('cy', 280)
    .attr('rx', 90)
    .attr('ry', 170)
    .attr('transform', 'rotate(288)')
    .style('fill', 'none')
    .style('stroke', 'black');



};

export const fourSetVenn = (venn: d3.Selection<null, unknown, null, undefined>, trueEvaluations: string[][], variables: string[]) => {
  const A = variables[0];
  const B = variables[1];
  const C = variables[2];
  const D = variables[3];

  const notAreaSet = [`!${A}`, `!${B}`, `!${C}`, `!${D}`];

  if (shouldDrawSet(trueEvaluations, notAreaSet)) {
    const notArea = 'M 27 147'
      + 'L 27 46'
      + 'L 145 46'
      + 'A 50 50 0 0 0 98.63333129882812 70.16666412353516'
      + 'A 60 60 0 0 0 47 91.13333129882812'
      + 'A 80 80 0 0 0 27 147'
      + 'M 145 46'
      + 'L 300 46'
      + 'A 150 150 0 0 0 225.7833251953125 80.78333282470703'
      + 'A 150 150 0 0 0 145 46'
      + 'M 310 46'
      + 'L 425 46'
      + 'L 425 143'
      + 'A 80 80 0 0 0 399.3166809082031 84.56666564941406'
      + 'A 70 70 0 0 0 353.8999938964844 69.36666870117188'
      + 'A 50 50 0 0 0 310 46'
      + 'M 425 46'
      + 'L 425 371'
      + 'L 240 371'
      + 'A 160 160 0 0 0 348 315.6166687011719'
      + 'A 250 250 0 0 0 425 143'
      + 'M 200 371'
      + 'L 27 371'
      + 'L 27 147'
      + 'A 250 250 0 0 0 92 301.566650390625'
      + 'A 180 180 0 0 0 200 371';

    venn.append('path')
      .attr('d', notArea)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  } else {
    venn.append('rect')
      .attr('x', '26')
      .attr('y', '44')
      .attr('width', '400')
      .attr('height', '330')
      .attr('fill', 'none')
      .style('stroke', 'black');
  }

  venn.append('ellipse')
    .attr('cx', 60)
    .attr('cy', 280)
    .attr('rx', 90)
    .attr('ry', 170)
    .attr('transform', 'rotate(-35)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn.append('ellipse')
    .attr('cx', 310)
    .attr('cy', 20)
    .attr('rx', 90)
    .attr('ry', 170)
    .attr('transform', 'rotate(35)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn.append('ellipse')
    .attr('cx', 0)
    .attr('cy', 270)
    .attr('rx', 100)
    .attr('ry', 170)
    .attr('transform', 'rotate(-35)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn.append('ellipse')
    .attr('cx', 370)
    .attr('cy', 10)
    .attr('rx', 100)
    .attr('ry', 170)
    .attr('transform', 'rotate(35)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn
    .append('defs')
    .append('pattern')
    .attr('id', 'diagonalHatch')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 4)
    .attr('height', 4)
    .append('path')
    .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
    .attr('stroke', 'red')
    .attr('stroke-width', 1);
  //* **************************************************
  venn.append('text')
    .text(A + D)
    .attr('x', 222.68333435058594)
    .attr('y', 352.91668701171875);

  const deltaSet = [A, `!${B}`, `!${C}`, D];
  if (shouldDrawSet(trueEvaluations, deltaSet)) {
    const delta = 'M 225.64999389648438 329.1000061035156'
      + 'A 110 110 0 0 1 183.6999969482422 342.73333740234375'
      + 'A 60 60 0 0 0 228.81666564941406 370.316650390625'
      + 'A 55 55 0 0 0 268.95001220703125 342.95001220703125'
      + 'A 110 110 0 0 1 225.64999389648438 329.1000061035156';

    venn.append('path')
      .attr('d', delta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + C + D)
    .style('font-size', '15px')
    .attr('x', 180)
    .attr('y', 330.5);

  const epsilonSet = [A, `!${B}`, C, D];
  if (shouldDrawSet(trueEvaluations, epsilonSet)) {
    const epsilon = 'M 225.64999389648438 329.1000061035156'
      + 'A 110 110 0 0 1 183.6999969482422 342.73333740234375'
      + 'A 110 110 0 0 1 169.64999389648438 287.066650390625'
      + 'A 220 220 0 0 0 225.64999389648438 329.1000061035156';

    venn.append('path')
      .attr('d', epsilon)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + B + D)
    .style('font-size', '15px')
    .attr('x', 245)
    .attr('y', 330.5);

  const zetaSet = [A, B, `!${C}`, D];
  if (shouldDrawSet(trueEvaluations, zetaSet)) {
    const zeta = 'M 225.64999389648438 329.1000061035156 '
      + 'A 110 110 0 0 0 268.95001220703125 342.95001220703125'
      + 'A 90 90 0 0 0 282.1499938964844 286.5000061035156'
      + 'A 220 220 0 0 1 225.64999389648438 329.1000061035156';

    venn.append('path')
      .attr('d', zeta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + B + C + D)
    .attr('x', 210)
    .attr('y', 253);

  const alphaSet = [A, B, C, D];
  if (shouldDrawSet(trueEvaluations, alphaSet)) {
    const alpha = 'M 225.64999389648438 329.1000061035156'
      + 'A 220 220 0 0 0 282.1499938964844 286.5000061035156'
      + 'A 250 250 0 0 0 225.38333129882812 149.31666564941406'
      + 'A 250 250 0 0 0 169.64999389648438 287.066650390625'
      + 'A 250 250 0 0 0 225.64999389648438 329.1000061035156';

    venn.append('path')
      .attr('d', alpha)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + B + C)
    .attr('x', 166)
    .attr('y', 187);

  const betaSet = [A, B, C, `!${D}`];
  if (shouldDrawSet(trueEvaluations, betaSet)) {
    const beta = 'M 225.38333129882812 149.31666564941406'
      + 'A 330 280 0 0 0 169.64999389648438 287.066650390625'
      + 'A 300 300 0 0 1 126.38333129882812 231.60000610351562'
      + 'A 300 300 0 0 1 191.38333129882812 113.4000015258789'
      + 'A 300 300 0 0 1 225.38333129882812 149.31666564941406';

    venn.append('path')
      .attr('d', beta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(B + C + D)
    .attr('x', 270.04998779296875)
    .attr('y', 186.6666717529297);

  const gammaSet = [`!${A}`, B, C, D];
  if (shouldDrawSet(trueEvaluations, gammaSet)) {
    const gamme = 'M 225.38333129882812 149.31666564941406'
      + 'A 330 280 0 0 1 282.1499938964844 286.5000061035156'
      + 'A 330 280 0 0 0 325.75 230.93333435058594'
      + 'A 330 280 0 0 0 259.33331298828125 113.11666870117188'
      + 'A 300 300 0 0 0 225.38333129882812 149.31666564941406';
    venn.append('path')
      .attr('d', gamme)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(B + C)
    .attr('x', 220.7833251953125)
    .attr('y', 115.78333282470703);

  const etaSet = [`!${A}`, B, C, `!${D}`];
  if (shouldDrawSet(trueEvaluations, etaSet)) {
    const eta = 'M 191.38333129882812 113.4000015258789'
      + 'A 330 280 0 0 1 225.38333129882812 149.31666564941406'
      + 'A 330 280 0 0 1 259.33331298828125 113.11666870117188'
      + 'A 300 300 0 0 0 225.7833251953125 80.78333282470703'
      + 'A 300 300 0 0 0 191.38333129882812 113.4000015258789';
    venn.append('path')
      .attr('d', eta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + C)
    .attr('x', 140.81666564941406)
    .attr('y', 300.70001220703125);

  const thetaSet = [A, `!${B}`, C, `!${D}`];
  if (shouldDrawSet(trueEvaluations, thetaSet)) {
    const theta = 'M 169.64999389648438 287.066650390625'
      + 'A 110 110 0 0 0 183.6999969482422 342.73333740234375'
      + 'A 55 55 0 0 1 125.69999694824219 307.73333740234375'
      + 'A 130 130 0 0 1 126.38333129882812 231.60000610351562'
      + 'A 300 300 0 0 0 169.64999389648438 287.066650390625';

    venn.append('path')
      .attr('d', theta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(B + D)
    .attr('x', 304.816650390625)
    .attr('y', 299.9166564941406);
  const iotaSet = [`!${A}`, B, `!${C}`, D];
  if (shouldDrawSet(trueEvaluations, iotaSet)) {
    const iota = 'M 325.75 230.93333435058594'
      + 'A 300 300 0 0 1 282.1499938964844 286.5000061035156'
      + 'A 130 130 0 0 1 268.95001220703125 342.95001220703125'
      + 'A 55 55 0 0 0 325.5 312.0333251953125'
      + 'A 130 130 0 0 0 325.75 230.93333435058594';

    venn.append('path')
      .attr('d', iota)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(C + D)
    .attr('x', 325.3999938964844)
    .attr('y', 126.4000015258789);
  const kappaSet = [`!${A}`, `!${B}`, C, D];
  if (shouldDrawSet(trueEvaluations, kappaSet)) {
    const kappa = 'M 325.75 230.93333435058594'
      + 'A 300 300 0 0 0 259.33331298828125 113.11666870117188'
      + 'A 200 260 0 0 1 353.8999938964844 69.36666870117188'
      + 'A 120 120 0 0 1 359.8833312988281 152.5500030517578'
      + 'A 250 250 0 0 1 325.75 230.93333435058594';

    venn.append('path')
      .attr('d', kappa)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + B)
    .attr('x', 133)
    .attr('y', 126.23333740234375);
  const lambdaSet = [A, B, `!${C}`, `!${D}`];
  if (shouldDrawSet(trueEvaluations, lambdaSet)) {
    const lambda = 'M 191.38333129882812 113.4000015258789'
      + 'A 300 300 0 0 0 126.38333129882812 231.60000610351562'
      + 'A 200 260 0 0 1 95.63333129882812 164.36666870117188'
      + 'A 120 120 0 0 1 98.63333129882812 70.16666412353516'
      + 'A 160 160 0 0 1 191.38333129882812 113.4000015258789';

    venn.append('path')
      .attr('d', lambda)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(B)
    .attr('x', 159.13333129882)
    .attr('y', 79);
  const mySet = [`!${A}`, B, `!${C}`, `!${D}`];
  if (shouldDrawSet(trueEvaluations, mySet)) {
    const my = 'M 191.38333129882812 113.4000015258789'
      + 'A 300 300 0 0 1 225.7833251953125 80.78333282470703'
      + 'A 150 150 0 0 0 147.0500030517578 46.03333282470703'
      + 'A 55 55 0 0 0 98.63333129882812 70.16666412353516'
      + 'A 160 160 0 0 1 191.38333129882812 113.4000015258789';

    venn.append('path')
      .attr('d', my)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************

  venn.append('text')
    .text(C)
    .attr('x', 277.2833251953125)
    .attr('y', 72.383331298828);
  const nySet = [`!${A}`, `!${B}`, C, `!${D}`];
  if (shouldDrawSet(trueEvaluations, nySet)) {
    const ny = 'M 225.7833251953125 80.78333282470703'
      + 'A 300 300 0 0 1 259.33331298828125 113.11666870117188'
      + 'A 200 260 0 0 1 353.8999938964844 69.36666870117188'
      + 'A 55 55 0 0 0 291.816650390625 47.43333435058594'
      + 'A 160 160 0 0 0 225.7833251953125 80.78333282470703';

    venn.append('path')
      .attr('d', ny)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************

  venn.append('text')
    .text(A)
    .attr('x', 72.6500015258789)
    .attr('y', 204.86666870117188);
  const xiSet = [A, `!${B}`, `!${C}`, `!${D}`];
  if (shouldDrawSet(trueEvaluations, xiSet)) {
    const xi = 'M 98.63333129882812 70.16666412353516'
      + 'A 120 120 0 0 0 95.63333129882812 164.36666870117188'
      + 'A 280 280 0 0 0 126.38333129882812 231.60000610351562'
      + 'A 130 130 0 0 0 125.69999694824219 307.73333740234375'
      + 'A 55 55 0 0 0 183.6999969482422 342.73333740234375'
      + 'A 60 60 0 0 0 228.81666564941406 370.316650390625'
      + 'A 220 370 0 0 1 52.79999923706055 245.33334350585938'
      + 'A 220 220 0 0 1 28 161.8000030517578'
      + 'A 100 100 0 0 1 50 87.80000305175781'
      + 'A 66 66 0 0 1 98.63333129882812 70.16666412353516';

    venn.append('path')
      .attr('d', xi)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************

  venn.append('text')
    .text(D)
    .attr('x', 374.95001220703125)
    .attr('y', 204.5);
  const omikronSet = [`!${A}`, `!${B}`, `!${C}`, D];

  if (shouldDrawSet(trueEvaluations, omikronSet)) {
    const omikron = 'M 353.8999938964844 69.36666870117188'
      + 'A 200 260 0 0 1 353.8999938964844 69.36666870117188'
      + 'A 120 120 0 0 1 359.8833312988281 152.5500030517578'
      + 'A 250 250 0 0 1 325.75 230.93333435058594'
      + 'A 130 130 0 0 1 325.5 312.0333251953125'
      + 'A 55 55 0 0 1 268.95001220703125 342.95001220703125'
      + 'A 60 60 0 0 1 228.81666564941406 370.316650390625'
      + 'A 220 370 0 0 0 399.20001220703125 245.1666717529297'
      + 'A 220 220 0 0 0 424.1000061035156 161.0500030517578'
      + 'A 100 100 0 0 0 403.1000061035156 87.25'
      + 'A 66 66 0 0 0 353.8999938964844 69.36666870117188';

    venn.append('path')
      .attr('d', omikron)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
};

export const threeSetVenn = (venn: d3.Selection<null, unknown, null, undefined>, trueEvaluations: string[][], variables: string[]) => {
  const A = variables[0];
  const B = variables[1];
  const C = variables[2];

  const notAreaSet = [`!${A}`, `!${B}`, `!${C}`];

  if (shouldDrawSet(trueEvaluations, notAreaSet)) {
    const notArea = 'M 0 110 '
      + 'L 0 0'
      + 'L 110 0'
      + 'A 110 110 0 0 0 0 110'
      + 'M 110 0'
      + 'L 220 0'
      + 'A 110 110 0 0 0 165 15'
      + 'A 110 110 0 0 0 110 0'
      + 'M 220 0'
      + 'L 330 0'
      + 'L 330 330'
      + 'L 165 330'
      + 'A 110 110 0 0 0 274.45001220703125 206.10000610351562'
      + 'A 110 110 0 0 0 330 105'
      + 'A 110 110 0 0 0 220 0'
      + 'M 165 330'
      + 'L 0 330'
      + 'L 0 110'
      + 'A 110 110 0 0 0 56 205.14999389648438'
      + 'A 110 110 0 0 0 165 330';

    venn.append('path')
      .attr('d', notArea)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  } else {
    venn.append('rect')
      .attr('x', '1')
      .attr('width', '330')
      .attr('height', '330')
      .attr('fill', 'none')
      .style('stroke', 'black');
  }

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

  venn.append('circle')
    .attr('cx', 165)
    .attr('cy', 220)
    .attr('r', 110)
    .style('fill', 'none')
    .style('stroke', 'black');

  venn
    .append('defs')
    .append('pattern')
    .attr('id', 'diagonalHatch')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 4)
    .attr('height', 4)
    .append('path')
    .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
    .attr('stroke', 'red')
    .attr('stroke-width', 1);
  //* **************************************************
  venn.append('text')
    .text(A)
    .attr('x', 160)
    .attr('y', 260);

  const alphaSet = [A, `!${B}`, `!${C}`];
  if (shouldDrawSet(trueEvaluations, alphaSet)) {
    const alpha = 'M 55.849998474121094 205.76666259765625 '
      + 'A 110 110 0 0 0 164.86666870117188 205.1999969482422'
      + 'A 110 110 0 0 0 273.79998779296875 205.76666259765625'
      + 'A 110 110 0 1 1 55.849998474121094 205.76666259765625';

    venn.append('path')
      .attr('d', alpha)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(B)
    .attr('x', 50)
    .attr('y', 105);

  const betaSet = [`!${A}`, B, `!${C}`];
  if (shouldDrawSet(trueEvaluations, betaSet)) {
    const beta = 'M 165 14.75 '
      + 'A 100 100 0 0 0 55.849998474121094 205.76666259765625'
      + 'A 110 110 0 0 1 111 123.83332824707031'
      + 'A 110 110 0 0 1 165 14.75';

    venn.append('path')
      .attr('d', beta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(C)
    .attr('x', 250)
    .attr('y', 105);

  const gammaSet = [`!${A}`, `!${B}`, C];
  if (shouldDrawSet(trueEvaluations, gammaSet)) {
    const gamma = 'M 219.64999389648438 123.83332824707031 '
      + 'A 110 110 0 0 1 273.79998779296875 205.76666259765625'
      + 'A 100 100 0 0 0 165 14.75'
      + 'A 110 110 0 0 1 219.64999389648438 123.83332824707031';

    venn.append('path')
      .attr('d', gamma)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(B + C)
    .attr('x', 166)
    .attr('y', 80);

  const deltaSet = [`!${A}`, B, C];
  if (shouldDrawSet(trueEvaluations, deltaSet)) {
    const delta = 'M 165 14.75 '
      + 'A 110 110 0 0 1 219.64999389648438 123.83332824707031'
      + 'A 110 110 0 0 0 111 123.83332824707031'
      + 'A 110 110 0 0 1 165 14.75';

    venn.append('path')
      .attr('d', delta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + B + C)
    .attr('x', 166)
    .attr('y', 159);
  const epsilonSet = [A, B, C];
  if (shouldDrawSet(trueEvaluations, epsilonSet)) {
    const epsilon = 'M 219.64999389648438 123.83332824707031 '
      + 'A 110 110 0 0 0 111 123.83332824707031'
      + 'A 110 110 0 0 0 164.86666870117188 205.1999969482422'
      + 'A 110 110 0 0 0 219.64999389648438 123.83332824707031';

    venn.append('path')
      .attr('d', epsilon)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + B)
    .attr('x', 100)
    .attr('y', 190);
  const zetaSet = [A, B, `!${C}`];
  if (shouldDrawSet(trueEvaluations, zetaSet)) {
    const zeta = 'M 111 123.83332824707031 '
      + 'A 110 110 0 0 0 55.849998474121094 205.76666259765625'
      + 'A 110 110 0 0 0 164.86666870117188 205.1999969482422'
      + 'A 110 110 0 0 1 111 123.83332824707031';

    venn.append('path')
      .attr('d', zeta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A + C)
    .attr('x', 220)
    .attr('y', 190);
  const etaSet = [A, `!${B}`, C];
  if (shouldDrawSet(trueEvaluations, etaSet)) {
    const eta = 'M 219.64999389648438 123.83332824707031 '
      + 'A 110 110 0 0 1 273.79998779296875 205.76666259765625'
      + 'A 110 110 0 0 1 164.86666870117188 205.1999969482422'
      + 'A 110 110 0 0 0 219.64999389648438 123.83332824707031';

    venn.append('path')
      .attr('d', eta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
};

export const twoSetVenn = (venn: d3.Selection<null, unknown, null, undefined>, trueEvaluations: string[][], variables: string[]) => {
  const A = variables[0];
  const B = variables[1];

  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };

  const notAreaSet = [`!${A}`, `!${B}`];

  if (shouldDrawSet(trueEvaluations, notAreaSet)) {
    const notArea = 'M 0 110 '
      + 'L 0 0'
      + 'L 110 0'
      + 'A 110 110 0 0 0 0 110'
      + 'M 110 0'
      + 'L 220 0'
      + 'A 110 110 0 0 0 165 15'
      + 'A 110 110 0 0 0 110 0'
      + 'M 220 0'
      + 'L 330 0'
      + 'L 330 220'
      + 'L 220 220'
      + 'A 110 110 0 0 0 330 115'
      + 'A 110 110 0 0 0 220 0'
      + 'M 220 220'
      + 'L 110 220'
      + 'A 110 110 0 0 0 165 205'
      + 'A 110 110 0 0 0 220 220'
      + 'M 110 220'
      + 'L 0 220'
      + 'L 0 110'
      + 'A 110 110 0 0 0 110 220';
    venn.append('path')
      .attr('d', notArea)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  } else {
    venn.append('rect')
      .attr('x', '1')
      .attr('width', '330')
      .attr('height', '220')
      .attr('fill', 'none')
      .style('stroke', 'black');
  }

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

  venn
    .append('defs')
    .append('pattern')
    .attr('id', 'diagonalHatch')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 4)
    .attr('height', 4)
    .append('path')
    .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
    .attr('stroke', 'red')
    .attr('stroke-width', 1);
  //* **************************************************
  venn.append('text')
    .text(A + B)
    .attr('x', 166)
    .attr('y', 105);

  const alphaSet = [A, B];

  if (shouldDrawSet(trueEvaluations, alphaSet)) {
    const alpha = 'M 165 15 '
      + 'A 110 110 0 0 1 220 110'
      + 'A 110 110 0 0 1 165 205'
      + 'A 110 110 0 0 1 110 110'
      + 'A 110 110 0 0 1 165 15';

    venn.append('path')
      .attr('d', alpha)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(A)
    .attr('x', 55)
    .attr('y', 105);

  const betaSet = [`!${A}`, B];

  if (shouldDrawSet(trueEvaluations, betaSet)) {
    const beta = 'M 165 15 '
      + 'A 110 110 0 1 1 165 205'
      + 'A 110 110 0 0 0 165 15';

    venn.append('path')
      .attr('d', beta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
  venn.append('text')
    .text(B)
    .attr('x', 255)
    .attr('y', 105);

  const gammaSet = [A, `!${B}`];

  if (shouldDrawSet(trueEvaluations, gammaSet)) {
    const gamma = 'M 165 15 '
      + 'A 110 110 0 1 0 165 205'
      + 'A 110 110 0 0 1 165 15';

    venn.append('path')
      .attr('d', gamma)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  //* **************************************************
};

export const oneSetVenn = (venn: d3.Selection<null, unknown, null, undefined>, trueEvaluations: string[][], variables: string[]) => {
  const A = variables[0];

  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };

  console.log(trueEvaluations);

  const notAreaSet = [`!${A}`];
  if (shouldDrawSet(trueEvaluations, notAreaSet)) {
    const notArea = 'M 1 110 '
      + 'L 1 0'
      + 'L 110 0'
      + 'L 220 0'
      + 'L 220 110'
      + 'A 90 90 0 0 0 1 110'
      + 'M 220 110'
      + 'L 220 220'
      + 'L 1 220'
      + 'L 1 110'
      + 'A 90 90 0 0 0 220 110';

    venn.append('path')
      .attr('d', notArea)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  } else {
    venn.append('rect')
      .attr('x', '1')
      .attr('width', '220')
      .attr('height', '220')
      .attr('fill', 'none')
      .style('stroke', 'black');
  }
  //* **************************************************
  venn.append('text')
    .text(A)
    .attr('x', 100)
    .attr('y', 105);

  const alphaSet = [A];

  if (shouldDrawSet(trueEvaluations, alphaSet)) {
    venn.append('circle')
      .attr('cx', circleProps.xOffset)
      .attr('cy', circleProps.yOffset)
      .attr('r', circleProps.radius)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'black');
  } else {
    venn.append('circle')
      .attr('cx', circleProps.xOffset)
      .attr('cy', circleProps.yOffset)
      .attr('r', circleProps.radius)
      .style('fill', 'none')
      .style('stroke', 'black');
  }

  venn
    .append('defs')
    .append('pattern')
    .attr('id', 'diagonalHatch')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 4)
    .attr('height', 4)
    .append('path')
    .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
    .attr('stroke', 'red')
    .attr('stroke-width', 1);
};
