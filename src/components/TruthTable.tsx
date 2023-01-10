import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './VariableTruthTable.css';
import useInterval from 'use-interval';
import { Button, CircularProgress } from '@mui/material';
import { EvaluationType, SetEvaluation, VariableEvaluation } from '../helper/expressionEvaluator';
import { exportAsImage } from '../helper/downloadHelper';
import VariableTruthTable from './VariableTruthTable';
import SetTruthTable from './SetTruthTable';
import { VennDiagrammPageVariable, VennDiagramPageSets } from './VennDiagram';

type VennProps = {
  evaluatedExpression: VariableEvaluation | SetEvaluation;
  expression: string;
  checkedVennDiagramm: boolean;
};

export default function TruthTable({
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

  useEffect(() => {
    setCounter(0);
  }, [evaluatedExpression]);

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
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

  const propertyData = () => (
    <div id="property">
      <div id="property_text">
        <h6>property</h6>
      </div>
      <div id="property_content">
        {evaluatedExpression?.parentheses}
        <br />
        Variables:
        {evaluatedExpression.type === EvaluationType.VARIABLE && evaluatedExpression?.variables}
        {evaluatedExpression.type === EvaluationType.SET && evaluatedExpression?.sets}

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
  );

  const controlElements = () => (
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
  );
  return (
    <>
      <Container id="property_container">
        {propertyData()}
      </Container>
      <Container id="table_container">
        <div id="table">
          <div id="table_text">
            <h6>Truth Table</h6>
          </div>
          {controlElements()}

          {evaluatedExpression.type === EvaluationType.VARIABLE && (<VariableTruthTable evaluatedExpression={evaluatedExpression} counter={counter} divRef={divRef} />)}
          {evaluatedExpression.type === EvaluationType.SET && (<SetTruthTable evaluatedExpression={evaluatedExpression} counter={counter} divRef={divRef} />)}

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
                {evaluatedExpression.type === EvaluationType.SET && <VennDiagramPageSets data={evaluatedExpression} step={counter} />}
                {evaluatedExpression.type === EvaluationType.VARIABLE && <VennDiagrammPageVariable data={evaluatedExpression} step={counter} />}
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
