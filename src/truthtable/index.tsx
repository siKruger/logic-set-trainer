import React, { useState } from 'react';
import {
  Alert, AlertTitle, Button, TextField,
} from '@mui/material';
import { Table } from 'react-bootstrap';
import {
  evaluateTruthtable,
  TruthtableEvaluation,
} from '../helper/expressionEvaluator';

function Truthtable() {
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();

  const getEvaluation = () => {
    const evaluated = evaluateTruthtable(expression);
    setEvaluatedExpression(evaluated);
  };

  return (
    <>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        Please enter your expression and press evaluate
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
        { evaluatedExpression?.steps.map((val, index) => (
          <li key={val}>
            Step
            {' '}
            {index}
            :
            {' '}
            {val}
          </li>
        )) }
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
          evaluatedExpression?.binaryOptions.map((binaryRow) => (
            <tr>
              {' '}
              {binaryRow.map((binaryValue) => (
                <td>
                  {' '}
                  {binaryValue}
                  {' '}
                </td>
              ))}

              {evaluatedExpression?.steps.map(() => (
                <td>
                  ** PLACEHOLDER **
                </td>
              ))}
            </tr>
          ))
        }
        </tbody>
      </Table>
    </>

  );
}

export default Truthtable;
