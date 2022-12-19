/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import {
  Alert, AlertTitle, Button, CircularProgress, TextField,
} from '@mui/material';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useInterval from 'use-interval';
import {
  evaluateTruthtable, VariableEvaluation, SetEvaluation, EvaluationType,
} from '../helper/expressionEvaluator';
import { checkCorrectSyntax } from '../helper/expressionValidator';
import { VennDiagramPage, VennDiagramPageSets } from '../venn';
import { evaluateWholeExpression, replaceExpressionToBoolean, evaluateSetExpression } from '../helper/logicConverter';

function Truthtable() {
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<VariableEvaluation | SetEvaluation>();
  const [counter, setCounter] = useState(0);
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [progressSpinner, setProgressSpinner] = useState<number>(0);

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  const addColumn = () => {
    if (evaluatedExpression === undefined || counter >= evaluatedExpression?.steps.length) return;
    setCounter(counter + 1);
  };
  const reduceColumn = () => {
    if (counter === 0) return;
    setCounter(counter - 1);
  };

  useInterval(() => {
    if (evaluatedExpression === undefined || !autoplay) return;
    // Increment counter
    setProgressSpinner(progressSpinner + 3.125);

    // If counter is at X * 100
    if (progressSpinner % 100 === 0) if (counter >= evaluatedExpression?.steps.length) setCounter(0); else addColumn();
    // setProgressspinner(0);
  }, 125);

  const getEvaluation = () => {
    const check = checkCorrectSyntax(expression);
    if (check !== '') {
      toast.error(`Der eingegebene Ausdruck enthält einen Fehler und kann nicht ausgewertet werden:\n ${check}`, {
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
      setAutoplay(false);
      setProgressSpinner(0);
      setCounter(0);
      const evaluated = evaluateTruthtable(expression);
      setEvaluatedExpression(evaluated);
    }
  };

  const generateCell = (singleStep: string, values: number[], variables: string[]) => {
    let mutableExpression = singleStep;
    if (mutableExpression === 'blank') {
      return (
        <td>
          {' '}
          {' - '}
          {' '}
        </td>
      );
    }

    mutableExpression = replaceExpressionToBoolean(mutableExpression, variables, values);
    mutableExpression = evaluateWholeExpression(mutableExpression);

    return (
      <td>
        {' '}
        {mutableExpression}
        {' '}
      </td>
    );
  };

  const generateRow = (step: string[], values: number[], variables: string[]) => step.map((singleStep: string, index) => (index < counter ? generateCell(singleStep, values, variables) : <td> - </td>));

  function createVariableTable(evaluation: VariableEvaluation) {
    return (
      <>
        Variables:
        {' '}
        {evaluation?.variables}
        <ul>
          {evaluation?.steps.map((val, index) => (
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
              {evaluation?.variables.map((variable) => (
                <th key={variable}>
                  {' '}
                  {variable}
                  {' '}
                </th>
              ))}
              {evaluation?.steps.map((step) => (
                // eslint-disable-next-line react/jsx-key
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
              evaluation !== undefined && evaluation?.variables.length === 1
                ? evaluation?.binaryOptions.map((binaryValue) => (
                  // eslint-disable-next-line react/jsx-key
                  <tr>
                    {' '}
                    <td>
                      {' '}
                      {binaryValue}
                    </td>
                    {generateRow(evaluation?.steps, binaryValue, evaluation?.variables)}
                  </tr>
                ))
                : evaluation?.binaryOptions.map((binaryRow) => (
                  // eslint-disable-next-line react/jsx-key
                  <tr>
                    {' '}
                    {
                      binaryRow.map((binaryValue) => (
                        // eslint-disable-next-line react/jsx-key
                        <td>
                          {' '}
                          {binaryValue}
                          {' '}
                        </td>
                      ))
                    }

                    {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                    {generateRow(evaluation?.steps.slice(0, counter)
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      .concat(Array(evaluation?.steps.length - counter)
                        .fill('blank')), binaryRow, evaluation?.variables)}

                  </tr>
                ))
            }
          </tbody>
        </Table>
        Momentan angezeigt:
        {' '}
        {evaluation?.steps[counter - 1]}
        <p />
        <VennDiagramPage data={evaluation} step={counter} />
      </>
    );
  }

  function createSetTable(evaluation: SetEvaluation) {
    return (
      <>
        Variables:
        {' '}
        {evaluation?.sets}
        <ul>
          {evaluation?.steps.map((val, index) => (
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
              {evaluation?.sets.map((set) => (
                <th key={set}>
                  {' '}
                  {set}
                  {' '}
                </th>
              ))}
              {evaluation?.steps.map((step) => (
                <th key={step}>
                  {' '}
                  {step}
                  {' '}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {evaluation?.sets.map((set) => (
                <td key={set}>
                  {' '}
                  {set}
                  {' '}
                </td>
              ))}
              {evaluation.steps.slice(0, counter).map((step) => (
                <td key={step}>
                  {' '}
                  {evaluateSetExpression(step)}
                  {' '}
                </td>
              ))}
              {evaluation.steps.slice(counter, evaluation.steps.length).map((step) => (
                <td key={step}>
                  {' '}
                  -
                  {' '}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        Momentan angezeigt:
        {' '}
        {evaluation?.steps[counter - 1]}
        <p />
        <VennDiagramPageSets data={evaluation} step={counter} />
      </>
    );
  }

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
        {'<==>'}
        {' '}
        <br />
        {'=>'}
        {' '}
        <br />
        For explicit sets:
        <br />
        ()
        {' '}
        <br />
        ! (Complement)
        {' '}
        <br />
        && (Intersection)
        {' '}
        <br />
        || (Union)
        <br />
        {'=>'}
        {' '}
        (Difference)
        <br />
      </Alert>
      <br />
      <TextField style={{ width: '40%' }} value={expression} onChange={(e) => setExpression(e.target.value)} onKeyDown={(e) => ((e.key === 'Enter') ? (getEvaluation()) : '')} id="standard-basic" label="Expression" variant="standard" />
      <Button onClick={() => getEvaluation()} variant="outlined">Evaluate</Button>
      <Button color={autoplay ? 'success' : 'error'} onClick={() => toggleAutoplay()} variant="outlined" style={{ marginLeft: '50px' }}>
        Autoplay
        <CircularProgress style={{ marginLeft: '1em' }} size={25} variant="determinate" value={progressSpinner} />
      </Button>
      <Button disabled={autoplay} onClick={() => reduceColumn()} variant="outlined" style={{ marginLeft: '30px' }}>-1 Schritt</Button>
      <TextField style={{ width: '195px', marginLeft: '30px' }} value={`Angezeigte Schritte: ${counter}`} />
      <Button disabled={autoplay} onClick={() => addColumn()} variant="outlined" style={{ marginLeft: '50px' }}>+1 Schritt</Button>
      <br />
      <br />

      {evaluatedExpression?.parentheses}
      <br />

      {evaluatedExpression?.type === EvaluationType.VARIABLE ? createVariableTable(evaluatedExpression) : <> </>}
      {evaluatedExpression?.type === EvaluationType.SET ? createSetTable(evaluatedExpression) : <> </>}
    </>

  );
}

export default Truthtable;
