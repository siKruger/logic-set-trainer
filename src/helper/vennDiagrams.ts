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
    const notArea = 'M10,9 L367,8 C280,20 251,82 227,163 '
     + 'C-5,175 -48,342 128,450 '
     + 'C69,655 199,776 370,633 '
     + 'C540,750 702,675 619,459 '
     + 'C782,339 760,153 530,169 '
     + 'C480,38 420,15 367,8'
     + 'L749,9'
     + 'L749,696'
     + 'L10,696'
     + 'L10,9';

    venn.append('path')
      .attr('d', notArea)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  } else {
    venn.append('rect')
      .attr('x', '10')
      .attr('y', '9')
      .attr('width', '739')
      .attr('height', '687')
      .attr('fill', 'none')
      .style('stroke', 'black');
  }

  venn.append('ellipse')
    .attr('cx', 395)
    .attr('cy', 300)
    .attr('rx', 170)
    .attr('ry', 290)
    .attr('transform', 'rotate(-150,375,375)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn.append('ellipse')
    .attr('cx', 395)
    .attr('cy', 300)
    .attr('rx', 170)
    .attr('ry', 290)
    .attr('transform', 'rotate(-222,375,375)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn.append('ellipse')
    .attr('cx', 395)
    .attr('cy', 300)
    .attr('rx', 170)
    .attr('ry', 290)
    .attr('transform', 'rotate(-294,375,375)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn.append('ellipse')
    .attr('cx', 395)
    .attr('cy', 300)
    .attr('rx', 170)
    .attr('ry', 290)
    .attr('transform', 'rotate(-6,375,375)')
    .style('fill', 'none')
    .style('stroke', 'black');

  venn.append('ellipse')
    .attr('cx', 395)
    .attr('cy', 300)
    .attr('rx', 170)
    .attr('ry', 290)
    .attr('transform', 'rotate(-78,375,375)')
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
  /** ********************************************************** */
  venn.append('text')
    .text(A)
    .attr('x', 360)
    .attr('y', 50);

  const alphaSet = [A, `!${B}`, `!${C}`, `!${D}`, `!${E}`];
  if (shouldDrawSet(trueEvaluations, alphaSet)) {
    const alpha = 'M227,163 '
    + 'C289,-66 465,-17 531,169 '
    + 'C507,171 479,175 466,179 '
    + 'C435,161 394,160 352,176 '
    + 'C315,168 278,161.5 227,163';

    venn.append('path')
      .attr('d', alpha)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(B)
    .attr('x', 666)
    .attr('y', 274);

  const betaSet = [`!${A}`, B, `!${C}`, `!${D}`, `!${E}`];
  if (shouldDrawSet(trueEvaluations, betaSet)) {
    const beta = 'M531,169 '
+ 'C760,153 782,339 619,459 '
+ 'C611,439 600,419 589,400 '
+ 'C598,362 584,327 557,292 '
+ 'C553,242 543,205 531,169';

    venn.append('path')
      .attr('d', beta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(C)
    .attr('x', 563)
    .attr('y', 621);

  const gammaSet = [`!${A}`, `!${B}`, C, `!${D}`, `!${E}`];
  if (shouldDrawSet(trueEvaluations, gammaSet)) {
    const gamma = 'M619,459 '
+ 'C702,675 540,750 370,633 '
+ 'C388,619 406,600 416,587 '
+ 'C457,584 494,550 511,522 '
+ 'C553,504 589,483 619,459';

    venn.append('path')
      .attr('d', gamma)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(D)
    .attr('x', 213)
    .attr('y', 613);

  const deltaSet = [`!${A}`, `!${B}`, `!${C}`, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, deltaSet)) {
    const delta = 'M370,633 '
+ 'C199,776 69,655 128,450 '
+ 'C146,462 165,471 187,480 '
+ 'C203,517 240,540 276,549 '
+ 'C304,582 326,601 370,633';

    venn.append('path')
      .attr('d', delta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(E)
    .attr('x', 93)
    .attr('y', 294);

  const epsilonSet = [`!${A}`, `!${B}`, `!${C}`, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, epsilonSet)) {
    const epsilon = 'M128,450 '
+ 'C-48,342 -5,175 227,163 '
+ 'C221,186 220,201 216,229 '
+ 'C192,252 178,280 179,335 '
+ 'C155,374 144,399 128,450';

    venn.append('path')
      .attr('d', epsilon)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B)
    .attr('x', 502)
    .attr('y', 198);

  const zetaSet = [A, B, `!${C}`, `!${D}`, `!${E}`];
  if (shouldDrawSet(trueEvaluations, zetaSet)) {
    const zeta = 'M465,179 '
+ 'C488,174 507,170 531,169 '
+ 'C541,197 553,239 557,292 '
+ 'C545,277 533,265 520,255 '
+ 'C509,223 499,200 465,179';

    venn.append('path')
      .attr('d', zeta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(B + C)
    .attr('x', 579)
    .attr('y', 459);

  const etaSet = [`!${A}`, B, C, `!${D}`, `!${E}`];
  if (shouldDrawSet(trueEvaluations, etaSet)) {
    const eta = 'M589,400 '
+ 'C601,418 611,438 619,460 '
+ 'C582,486 554,504 509,523 '
+ 'C525,502 527,491 535,474 '
+ 'C556,459 582,438 589,400';

    venn.append('path')
      .attr('d', eta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(C + D)
    .attr('x', 354)
    .attr('y', 604);

  const thetaSet = [`!${A}`, `!${B}`, C, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, thetaSet)) {
    const theta = 'M417,587 '
+ 'C400,606 387,619 370,633 '
+ 'C329,604 305,582 276,549 '
+ 'C296,554 312,557 329,557 '
+ 'C353,574 375,590 417,587';

    venn.append('path')
      .attr('d', theta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(D + E)
    .attr('x', 147)
    .attr('y', 433);

  const iotaSet = [`!${A}`, `!${B}`, `!${C}`, D, E];
  if (shouldDrawSet(trueEvaluations, iotaSet)) {
    const iota = 'M186,480 '
+ 'C164,471 144,461 128,450 '
+ 'C142,404 155,374 179,334 '
+ 'C180,357 182,367 187,388 '
+ 'C177,421 173,441 186,480';

    venn.append('path')
      .attr('d', iota)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(E + A)
    .attr('x', 246)
    .attr('y', 182);

  const kappaSet = [A, `!${B}`, `!${C}`, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, kappaSet)) {
    const kappa = 'M216,229 '
+ 'C219,198 223,183 227,163 '
+ 'C266,162 304,165 353,176 '
+ 'C337,181 322,189 305,200 '
+ 'C273,200 245,204 216,229';

    venn.append('path')
      .attr('d', kappa)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + D)
    .attr('x', 414)
    .attr('y', 183);

  const lambdaSet = [A, `!${B}`, `!${C}`, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, lambdaSet)) {
    const lambda = 'M352,176 '
+ 'C375,181 390,186 414,195 '
+ 'C430,189 445,184 466,179 '
+ 'C441,163 396,159 352,176';

    venn.append('path')
      .attr('d', lambda)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(E + C)
    .attr('x', 562)
    .attr('y', 352);

  const mySet = [`!${A}`, `!${B}`, C, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, mySet)) {
    const my = 'M557,292 '
+ 'C582,322 598,359 589,401 '
+ 'C578,382 570,372 558,355 '
+ 'C559,335 559,316 557,292';

    venn.append('path')
      .attr('d', my)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + C)
    .attr('x', 445)
    .attr('y', 562);

  const nySet = [A, `!${B}`, C, `!${D}`, `!${E}`];
  if (shouldDrawSet(trueEvaluations, nySet)) {
    const ny = 'M509,523 '
+ 'C489,557 459,581 417,586 '
+ 'C430,572 439,558 450,543 '
+ 'C470,538 490,531 509,523';

    venn.append('path')
      .attr('d', ny)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(B + D)
    .attr('x', 214)
    .attr('y', 513);

  const xiSet = [`!${A}`, B, `!${C}`, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, xiSet)) {
    const xi = 'M276,549 '
+ 'C234,536 205,516 186,480 '
+ 'C204,487 222,494 238,498 '
+ 'C246,512 257,526 276,549';

    venn.append('path')
      .attr('d', xi)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(E + C)
    .attr('x', 190)
    .attr('y', 280);

  const omikronSet = [`!${A}`, `!${B}`, C, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, omikronSet)) {
    const omikron = 'M179,335 '
+ 'C180,284 188,259 217,227 '
+ 'C215,247 215,259 216,283 '
+ 'C203,297 192,313 179,335';

    venn.append('path')
      .attr('d', omikron)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + D + E)
    .attr('x', 337)
    .attr('y', 197);

  const piSet = [A, `!${B}`, `!${C}`, D, E];
  if (shouldDrawSet(trueEvaluations, piSet)) {
    const pi = 'M304,200 '
+ 'C320,191 333,185 351,176 '
+ 'C376,181 390,186 413,195 '
+ 'C395,202 383,207 369,214 '
+ 'C349,206 334,203 304,200';

    venn.append('path')
      .attr('d', pi)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B + E)
    .attr('x', 528)
    .attr('y', 310);

  const rhoSet = [A, B, `!${C}`, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, rhoSet)) {
    const rho = 'M519,254 '
+ 'C533,265 541,274 557,293 '
+ 'C558,318 558,335 558,356 '
+ 'C546,341 538,332 527,319 '
+ 'C527,296 525,279 519,254';

    venn.append('path')
      .attr('d', rho)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B + C)
    .attr('x', 473)
    .attr('y', 517);

  const sigmaSet = [A, B, C, `!${D}`, `!${E}`];
  if (shouldDrawSet(trueEvaluations, sigmaSet)) {
    const sigma = 'M535,474 '
+ 'C527,492 521,505 509,523 '
+ 'C486,532 470,537 449,543 '
+ 'C459,530 468,516 474,502 '
+ 'C491,496 510,492 535,474';

    venn.append('path')
      .attr('d', sigma)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(B + C + D)
    .attr('x', 260)
    .attr('y', 530);

  const tauSet = [`!${A}`, B, C, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, tauSet)) {
    const tau = 'M328,557 '
+ 'C310,556 300,555 276,549 '
+ 'C260,531 248,514 237,498 '
+ 'C256,503 266,505 284,509 '
+ 'C295,524 307,538 329,557';

    venn.append('path')
      .attr('d', tau)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(C + D + E)
    .attr('x', 185)
    .attr('y', 336);

  const ypsilonSet = [`!${A}`, `!${B}`, C, D, E];
  if (shouldDrawSet(trueEvaluations, ypsilonSet)) {
    const ypsilon = 'M187,388 '
+ 'C182,370 180,356 178,334 '
+ 'C191,313 202,298 216,282 '
+ 'C216,299 216,309 220,330 '
+ 'C207,348 197,363 187,388';

    venn.append('path')
      .attr('d', ypsilon)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(E + A + C)
    .attr('x', 225)
    .attr('y', 235);

  const phiSet = [A, `!${B}`, C, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, phiSet)) {
    const phi = 'M216,283 '
+ 'C214,258 214,246 217,228 '
+ 'C242,208 265,201 305,200 '
+ 'C272,223 243,249 216,283';

    venn.append('path')
      .attr('d', phi)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B + D)
    .attr('x', 448)
    .attr('y', 200);

  const chiSet = [A, B, `!${C}`, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, chiSet)) {
    const chi = 'M413,195 '
+ 'C434,187 446,183 465,179 '
+ 'C494,200 499,201 519,254 '
+ 'C481,225 453,210 413,195';

    venn.append('path')
      .attr('d', chi)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(B + C + E)
    .attr('x', 555)
    .attr('y', 407);

  const psiSet = [`!${A}`, B, C, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, psiSet)) {
    const psi = 'M558,356 '
+ 'C570,372 577,381 589,401 '
+ 'C579,438 563,455 534,474 '
+ 'C552,429 555,395 558,356';

    venn.append('path')
      .attr('d', psi)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + C + D)
    .attr('x', 372)
    .attr('y', 575);

  const omegaSet = [A, `!${B}`, C, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, omegaSet)) {
    const omega = 'M449,544 '
+ '438,560 431,569 416,587 '
+ 'C377,586 370,585 328,557 '
+ 'C368,560 400,556 449,543';

    venn.append('path')
      .attr('d', omega)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(B + D + E)
    .attr('x', 184)
    .attr('y', 470);

  const alphaalphaSet = [`!${A}`, B, `!${C}`, D, E];
  if (shouldDrawSet(trueEvaluations, alphaalphaSet)) {
    const alphaalpha = 'M238,498 '
+ 'C217,492 206,488 186,480 '
+ 'C175,445 175,429 187,387 '
+ 'C199,426 211,455 238,498';

    venn.append('path')
      .attr('d', alphaalpha)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + C + D + E)
    .attr('x', 251)
    .attr('y', 259);

  const alphabetaSet = [A, `!${B}`, C, D, E];
  if (shouldDrawSet(trueEvaluations, alphabetaSet)) {
    const alphabeta = 'M220,331 '
+ 'C217,310 216,299 216,283 '
+ 'C246,246 275,220 304,200 '
+ 'C332,203 348,206 369,213 '
+ 'C301,250 250,289 220,330';

    venn.append('path')
      .attr('d', alphabeta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B + D + E)
    .attr('x', 448)
    .attr('y', 246);

  const alphagammaSet = [A, B, `!${C}`, D, E];
  if (shouldDrawSet(trueEvaluations, alphagammaSet)) {
    const alphagamma = 'M369,213 '
+ 'C386,205 397,200 414,195 '
+ 'C455,212 483,228 519,254 '
+ 'C525,280 526,292 527,319 '
+ 'C480,270 433,237 369,213';

    venn.append('path')
      .attr('d', alphagamma)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B + C + E)
    .attr('x', 499)
    .attr('y', 457);

  const alphadeltaSet = [A, B, C, `!${D}`, E];
  if (shouldDrawSet(trueEvaluations, alphadeltaSet)) {
    const alphadelta = 'M526,319 '
+ 'C538,331 544,338 558,356 '
+ 'C554,400 552,425 534,474 '
+ 'C514,487 497,497 473,502';

    venn.append('path')
      .attr('d', alphadelta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B + C + D)
    .attr('x', 338)
    .attr('y', 539);

  const alphaepsilonSet = [A, B, C, D, `!${E}`];
  if (shouldDrawSet(trueEvaluations, alphaepsilonSet)) {
    const alphaepsilon = 'M474,503 '
+ 'C466,517 460,526 449,544 '
+ 'C410,552 375,560 328,557 '
+ 'C310,541 298,527 284,509 '
+ 'C352,520 410,520 474,503';

    venn.append('path')
      .attr('d', alphaepsilon)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(B + C + D + E)
    .attr('x', 192)
    .attr('y', 396);

  const alphazetaSet = [`!${A}`, B, C, D, E];
  if (shouldDrawSet(trueEvaluations, alphazetaSet)) {
    const alphazeta = 'M220,329 '
+ 'C230,406 248,449 284,508 '
+ 'C266,505 255,503 237,498 '
+ 'C210,452 198,424 187,386 '
+ 'C197,366 205,350 221,329';

    venn.append('path')
      .attr('d', alphazeta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
  venn.append('text')
    .text(A + B + C + D + E)
    .attr('x', 350)
    .attr('y', 375);

  const alphaetaSet = [A, B, C, D, E];
  if (shouldDrawSet(trueEvaluations, alphaetaSet)) {
    const alphaeta = 'M220,330 '
+ 'C269,270 315,242 369,213 '
+ 'C441,241 481,274 527,320 '
+ 'C525,379 508,439 474,503 '
+ 'C413,519 354,520 284,509 '
+ 'C256,467 228,401 220,330';

    venn.append('path')
      .attr('d', alphaeta)
      .style('fill', 'url(#diagonalHatch)')
      .style('stroke', 'red');
  }
  /** ********************************************************** */
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