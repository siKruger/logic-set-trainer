import React, { useState } from 'react';
import {
  Alert, AlertTitle, Button, TextField,
} from '@mui/material';
import { Table } from 'react-bootstrap';
import {
  evaluateTruthtable,
  TruthtableEvaluation,
} from '../helper/expressionEvaluator';
import evaluateSymbol from '../helper/logicConverter';

function Truthtable() {
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();

  const getEvaluation = () => {
    const evaluated = evaluateTruthtable(expression);
    setEvaluatedExpression(evaluated);
  };

  //console.log("evalutedExpression:");
  //console.log(evaluatedExpression?.binaryOptions);
  //console.log(evaluatedExpression?.parentheses);
  //console.log(evaluatedExpression?.steps);
  //console.log(evaluatedExpression?.variables);
  //console.log("/evaluatedExpression");

  const getReplacedValue = (values: number[], index: number) => {
    if (typeof (values) !== "number") {
      return values[index];
    } else {
      return Number(values);
    }
  }

  const generateCell = (singleStep: string, values: number[], variables: string[]) => {
    let mutableExpression = singleStep;
    for (let x = 0; x < mutableExpression.length; x += 1) {
      const currentChar = mutableExpression.charAt(x);

      const index = variables.indexOf(currentChar);

      if (index === -1) continue;
      let replacedValue = getReplacedValue(values, index);



      mutableExpression = mutableExpression.replaceAll(currentChar, `${replacedValue}`);
    }

    mutableExpression = evaluateSymbol(mutableExpression);

    return (
      <td>
        {' '}
        {mutableExpression}
        {' '}
      </td>
    );
  };

  const generateRow = (step: string[], values: number[], variables: string[]) => step.map((singleStep: string) => generateCell(singleStep, values, variables));

  return (
    <>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        Please enter your expression and press evaluate
        <br />
        Allowed characters are (ordered in their precedence):
        <br />
        ()
        {' '}
        <br />
        !
        {' '}
        <br />
        &&
        {' '}
        <br />
        {'<=!=>'}
        {' '}
        <br />
        ||
        {' '}
        <br />
        ==
        {' '}
        <br />
        {'=>,<='}
        {' '}
        <br />
      </Alert>
      <br />
      <TextField style={{ width: '40%' }} value={expression} onChange={(e) => setExpression(e.target.value)} id="standard-basic" label="Expression" variant="standard" />
      <Button onClick={getEvaluation} variant="outlined">Evaluate</Button>
      <br />
      <br />

      {evaluatedExpression?.parentheses}
      <br />
      Variables:
      {' '}
      {evaluatedExpression?.variables}
      <ul>
        {evaluatedExpression?.steps.map((val, index) => (
          <li key={val}>
            Step
            {' '}
            {index}
            :
            {' '}
            {val}
          </li>
        ))}
      </ul>

      <Table striped bordered hover>
        <thead>
          <tr>
            {evaluatedExpression?.variables.map((variable) => (
              <th key={variable}>
                {' '}
                {variable}
                {' '}
              </th>
            ))}
            {evaluatedExpression?.steps.map((step) => (
              <th>
                {' '}
                {step}
                {' '}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            evaluatedExpression !== undefined && evaluatedExpression?.variables.length === 1
              ? evaluatedExpression?.binaryOptions.map((binaryValue, index) => (
                <tr>
                  {' '}
                  <td>
                    {' '}
                    {binaryValue}
                  </td>
                  {generateRow(evaluatedExpression?.steps, binaryValue, evaluatedExpression?.variables)}

                </tr>
              ))
              : evaluatedExpression?.binaryOptions.map((binaryRow, index) => (
                <tr>
                  {' '}
                  {
                    binaryRow.map((binaryValue) => (
                      <td>
                        {' '}
                        {binaryValue}
                        {' '}
                      </td>
                    ))
                  }

                  {generateRow(evaluatedExpression?.steps, binaryRow, evaluatedExpression?.variables)}

                </tr>
              ))
          }
        </tbody>
      </Table>
    </>

  );
}

export default Truthtable;
