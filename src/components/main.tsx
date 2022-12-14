import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Container } from 'react-bootstrap';
import { checkCorrectSyntax } from '../helper/expressionValidator';
import {
  evaluateTruthtable,
  SetEvaluation,
  VariableEvaluation,
} from '../helper/expressionEvaluator';
import './main.css';
import Feature from './Feature';
import Error from './Error';
import Checkboxes from './Checkboxes';
import TruthTable from './TruthTable';

export default function Main() {
  const [checkedVennDiagramm, setCheckedVennDiagramm] = useState(true);
  const [checkedNote, setCheckedNote] = useState(true);
  const [expression, setExpression] = useState('');
  const [showError, setShowError] = useState(false);

  const [evaluatedExpression, setEvaluatedExpression] = useState<
  VariableEvaluation | SetEvaluation
  >();

  const getEvaluation = () => {
    if (checkCorrectSyntax(expression)) {
      setShowError(true);
    } else {
      setShowError(false);
      const evaluated = evaluateTruthtable(expression);
      setEvaluatedExpression(evaluated);
    }
  };

  return (
    <>
      <Container className="cover">
        <div id="text_field_control">
          <TextField
            id="input_text_field"
            fullWidth
            autoComplete="off"
            placeholder="Enter the logical expression to be computed"
            onChange={(e) => setExpression(e.target.value)}
            onKeyUp={() => getEvaluation()}
          />
        </div>
      </Container>

      <Container>
        <Checkboxes
          checkedVennDiagramm={checkedVennDiagramm}
          setCheckedVennDiagramm={setCheckedVennDiagramm}
          checkedNote={checkedNote}
          setCheckedNote={setCheckedNote}
        />
      </Container>

      {showError && expression !== '' && <Error expression={expression} /> }

      {!showError && evaluatedExpression !== undefined && (
        <div>
          <TruthTable
            evaluatedExpression={evaluatedExpression}
            expression={expression}
            checkedVennDiagramm={checkedVennDiagramm}
          />

          <Feature
            evaluatedExpression={evaluatedExpression}
            expression={expression}
            checkedNote={checkedNote}
          />
        </div>
      )}
    </>
  );
}
