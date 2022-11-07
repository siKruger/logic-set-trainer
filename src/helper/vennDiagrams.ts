export const threeSetVenn = (venn: any) => {
  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };
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

  const middleTopIntersect = 'M 165 15 '
    + 'A 110 110 0 0 1 219 125'
    + 'A 110 110 0 0 0 110 125'
    + 'A 110 110 0 0 1 165 15';

  const middleBottomIntersect = 'M 219 125 '
    + 'A 110 110 0 0 0 111 125'
    + 'A 110 110 0 0 0 165 205'
    + 'A 110 110 0 0 0 219 125';

  const leftIntersection = 'M 111 125 '
    + 'A 110 110 0 0 0 56 205'
    + 'A 110 110 0 0 0 165 205'
    + 'A 110 110 0 0 1 111 125';

  const rightIntersection = 'M 219 125 '
    + 'A 110 110 0 0 1 274 205'
    + 'A 110 110 0 0 1 165 205'
    + 'A 110 110 0 0 0 219 125';

  const rightCircle = 'M 219 125 '
    + 'A 110 110 0 0 1 274 205'
    + 'A 100 100 0 0 0 165 15'
    + 'A 110 110 0 0 1 219 125';

  const leftCircle = 'M 165 15 '
    + 'A 100 100 0 0 0 56 205'
    + 'A 110 110 0 0 1 111 125'
    + 'A 110 110 0 0 1 165 15';

  const bottomCircle = 'M 56 205 '
    + 'A 110 110 0 0 0 165 205'
    + 'A 110 110 0 0 0 274 205'
    + 'A 110 110 0 1 1 56 205';

  venn.append('path')
    // @ts-ignore
    .attr('d', bottomCircle)
    .style('fill', 'yellow')
    .style('stroke', 'yellow');

  venn.append('path')
    // @ts-ignore
    .attr('d', leftCircle)
    .style('fill', 'green')
    .style('stroke', 'green');

  venn.append('path')
    // @ts-ignore
    .attr('d', rightCircle)
    .style('fill', 'red')
    .style('stroke', 'red');

  venn.append('path')
    // @ts-ignore
    .attr('d', middleTopIntersect)
    .style('fill', 'none')
    .style('stroke', 'none');

  venn.append('path')
    // @ts-ignore
    .attr('d', middleBottomIntersect)
    .style('fill', 'none')
    .style('stroke', 'none');

  venn.append('path')
    // @ts-ignore
    .attr('d', leftIntersection)
    .style('fill', 'none')
    .style('stroke', 'none');

  venn.append('path')
    // @ts-ignore
    .attr('d', rightIntersection)
    .style('fill', 'none')
    .style('stroke', 'none');
};

export const twoSetVenn = (venn: any) => {
  const circleProps = { radius: 110, yOffset: 110, xOffset: 110 };

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
};
