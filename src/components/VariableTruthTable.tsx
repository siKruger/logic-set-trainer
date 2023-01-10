import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import './VariableTruthTable.css';
import useInterval from 'use-interval';
import html2canvas from 'html2canvas';
import { Button, CircularProgress } from '@mui/material';
import { VennDiagrammPageVariable } from './VennDiagram';
import { evaluateWholeExpression, replaceExpressionToBoolean } from '../helper/logicConverter';
import { VariableEvaluation } from '../helper/expressionEvaluator';

type VennProps = {
  evaluatedExpression: VariableEvaluation;
  expression: string;
  checkedVennDiagramm: boolean;
};

export default function VariableTruthTable({
  evaluatedExpression,
  expression,
  checkedVennDiagramm,
}: VennProps) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const divRef2 = React.useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const imageFileName = expression.replaceAll(' ', '');
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [progressSpinner, setProgressSpinner] = useState<number>(0);

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  const downloadImage = (blob: string, fileName: string) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  const exportAsImage = async (el: HTMLElement | null, imageFileName2: string) => {
    if (el === null) return;
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL('image/png', 1.0);
    downloadImage(image, imageFileName2);
  };

  const addColumn = () => {
    if (evaluatedExpression !== undefined) {
      if (counter < evaluatedExpression?.steps.length) {
        setCounter(counter + 1);
      }
    }
  };

  const reduceColumn = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  useInterval(() => {
    if (evaluatedExpression === undefined || !autoplay) return;
    setProgressSpinner(progressSpinner + 3.125);

    if (progressSpinner % 100 === 0) {
      if (counter >= evaluatedExpression?.steps.length) {
        setCounter(0);
      } else addColumn();
    }
  }, 125);

  const generateCell = (
    singleStep: string,
    values: number[],
    variables: string[],
  ) => {
    let mutableExpression = singleStep;

    if (mutableExpression === 'blank') {
      return (
        <td>
          {' - '}
        </td>
      );
    }

    mutableExpression = replaceExpressionToBoolean(
      mutableExpression,
      variables,
      values,
    );
    mutableExpression = evaluateWholeExpression(mutableExpression);
    return (
      <td>
        {mutableExpression}
      </td>
    );
  };

  const generateRow = (step: string[], values: number[], variables: string[]) => step.map((singleStep: string, index) => (index < counter ? (
    generateCell(singleStep, values, variables)
  ) : (
    <td key={undefined}>
      -
    </td>
  )));

  return (
    <>
      <Container id="property_container">
        <div id="property">
          <div id="property_text">
            <h6>property</h6>
          </div>
          <div id="property_content">
            {evaluatedExpression?.parentheses}
            <br />
            Variables:
            {evaluatedExpression?.variables}
            <ul>
              {evaluatedExpression?.steps.map((val: string, index: number) => (
                <li key={val}>
                  Step&nbsp;
                  {index}
                  :
                  {val}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <Container id="table_container">
        <div id="table">
          <div id="table_text">
            <h6>Truth Table</h6>
          </div>
          <div id="increment_button">
            <Button
              color={autoplay ? 'success' : 'error'}
              onClick={() => toggleAutoplay()}
              variant="outlined"
              style={{ marginLeft: '50px' }}
            >
              Autoplay
              <CircularProgress
                style={{ marginLeft: '1em' }}
                size={25}
                variant="determinate"
                value={progressSpinner}
              />
            </Button>
            <div id="button_of_add">
              <Button
                disabled={autoplay}
                onClick={() => addColumn()}
                variant="outlined"
                style={{ marginLeft: '50px' }}
              >
                +1 Schritt
              </Button>
            </div>
            <div id="button_of_reduce">
              <Button
                disabled={autoplay}
                onClick={() => reduceColumn()}
                variant="outlined"
                style={{ marginLeft: '30px' }}
              >
                -1 Schritt
              </Button>
            </div>
          </div>

          <div id="table_content">
            <div ref={divRef}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {evaluatedExpression?.variables.map((variable: string) => (
                      <th key={variable}>
                        {variable}
                      </th>
                    ))}
                    {
                      evaluatedExpression.steps.map((step) => (
                        <th key={step}>
                          {' '}
                          {step}
                          {' '}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {evaluatedExpression?.variables.length === 1
                    ? evaluatedExpression?.binaryOptions.map(
                      (binaryValue) => (
                        <tr key={undefined}>
                          {' '}
                          <td>
                            {binaryValue}
                          </td>
                          {evaluatedExpression?.variables !== undefined
                            ? generateRow(
                              evaluatedExpression?.steps,
                              binaryValue,
                              evaluatedExpression?.variables,
                            )
                            : undefined}
                        </tr>
                      ),
                    )
                    : evaluatedExpression?.binaryOptions.map(
                      (binaryRow) => (
                        <tr key={undefined}>
                          {' '}
                          {binaryRow.map((binaryValue) => (
                            <td key={undefined}>
                              {binaryValue}
                            </td>
                          ))}
                          {evaluatedExpression?.steps !== undefined
                            ? generateRow(
                              evaluatedExpression?.steps,
                              binaryRow,
                              evaluatedExpression?.variables,
                            )
                            : undefined}
                        </tr>
                      ),
                    )}
                </tbody>
              </Table>
            </div>
          </div>

          <Button
            variant="outlined"
            id="truth_table_download_button"
            onClick={() => exportAsImage(divRef.current, imageFileName)}
          >
            Capture table
          </Button>
        </div>
      </Container>

      {!checkedVennDiagramm && (
        <Container id="venn_container">
          <div id="venn">
            <div id="venn_text">
              <h6>venn-diagram</h6>
            </div>
            <div ref={divRef2}>
              <div id="now">{evaluatedExpression?.steps[counter - 1]}</div>
              <div id="venn_content">
                <VennDiagrammPageVariable data={evaluatedExpression} step={counter} />
              </div>
            </div>

            <Button
              variant="outlined"
              id="venn_download_button"
              onClick={() => exportAsImage(divRef2.current, imageFileName)}
            >
              Capture venn-diagram
            </Button>
          </div>
        </Container>
      )}
    </>
  );
}
