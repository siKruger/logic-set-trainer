import React, { useState } from 'react';
import {
  Alert, AlertTitle, Button, TextField,
} from '@mui/material';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { evaluateTruthtable, TruthtableEvaluation } from '../helper/expressionEvaluator';
import { checkCorrectSyntax } from '../helper/expressionValidator';
import evaluateSymbol from "../helper/logicConverter";

function Truthtable() {
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();

  const getEvaluation = () => {
    if (!checkCorrectSyntax(expression)) {
      toast.error('Der eingegebene Ausdruck enthält einen Fehler und kann nicht ausgewertet werden!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      const evaluated = evaluateTruthtable(expression);
      setEvaluatedExpression(evaluated);
    }
  };

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

    console.log(mutableExpression + " mutableExpression in generateCell");

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
              <th key={step}>
                {' '}
                {step}
                {' '}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* todo better keys  */}
          {
            evaluatedExpression !== undefined && evaluatedExpression?.variables.length === 1
              ? evaluatedExpression?.binaryOptions.map((binaryValue, upperIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`${upperIndex}upperBinary`}>
                  {' '}
                  <td>
                    {' '}
                    {binaryValue}
                  </td>
                  {evaluatedExpression?.steps.map((step, lowerIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={step + upperIndex + lowerIndex}>
                      {' '}
                      {generateRow(evaluatedExpression?.steps, binaryValue, evaluatedExpression?.variables)}
                      {' '}
                    </td>
                  ))}
                </tr>
              ))
              : evaluatedExpression?.binaryOptions.map((binaryRow, upperIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`${upperIndex}upperBinary1`}>
                  {' '}
                  {
                    binaryRow.map((binaryValue, lowerIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <td key={`${upperIndex}lowerBinary1${lowerIndex}`}>
                        {' '}
                        {binaryValue}
                        {' '}
                      </td>
                    ))
                  }
                  {evaluatedExpression?.steps.map((step) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={step + binaryRow + upperIndex}>
                      {' '}
                      {generateRow(evaluatedExpression?.steps, binaryRow, evaluatedExpression?.variables)}
                      {' '}
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
