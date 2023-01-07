import { useState } from "react";
import { TextField, Button } from "@mui/material";
import {
  evaluateTruthtable,
  VariableEvaluation,
  SetEvaluation,
  EvaluationType,
} from "../helper/expressionEvaluator";
import { checkCorrectSyntax } from "../helper/expressionValidator";
import "./main.css";
import { Container } from "react-bootstrap";
import Feature from "./Feature";
import Error from "./Error";
import Checkboxes from "./Checkboxes";
import SetTruthTable from "./SetTruthTable";
import VariableTruthTable from "./VariableTruthTable";

const Main = () => {
  const [checkedVennDiagramm, setCheckedVennDiagramm] = useState(true);
  const [checkedNote, setCheckedNote] = useState(true);
  const [expression, setExpression] = useState("");
  const [showError, setShowError] = useState(false);

  const [evaluatedExpression, setEvaluatedExpression] = useState<
    VariableEvaluation | SetEvaluation | any
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

  const setTruth = () => {
    return (
      <div>
        <SetTruthTable
          evaluatedExpression={evaluatedExpression}
          expression={expression}
          checkedVennDiagramm={checkedVennDiagramm}
          data={evaluatedExpression}
        />

        <Feature
          setEvaluatedExpression={setEvaluatedExpression}
          evaluatedExpression={evaluatedExpression}
          expression={expression}
          checkedVennDiagramm={checkedVennDiagramm}
          checkedNote={checkedNote}
        />
      </div>
    );
  };
  const VariableTruth = () => {
    return (
      <div>
        <VariableTruthTable
          evaluatedExpression={evaluatedExpression}
          expression={expression}
          checkedVennDiagramm={checkedVennDiagramm}
          data={evaluatedExpression}
        />

        <Feature
          setEvaluatedExpression={setEvaluatedExpression}
          evaluatedExpression={evaluatedExpression}
          expression={expression}
          checkedVennDiagramm={checkedVennDiagramm}
          checkedNote={checkedNote}
        />
      </div>
    );
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
            onChange={(e) => {
              return setExpression(e.target.value);
            }}
            onKeyUp={() => {
              return getEvaluation();
            }}
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

      {showError && expression !== "" && <Error />}

      {!showError && evaluatedExpression?.type === EvaluationType.SET && (
        <div>
          <SetTruthTable
            evaluatedExpression={evaluatedExpression}
            expression={expression}
            checkedVennDiagramm={checkedVennDiagramm}
            data={evaluatedExpression}
          />

          <Feature
            setEvaluatedExpression={setEvaluatedExpression}
            evaluatedExpression={evaluatedExpression}
            expression={expression}
            checkedVennDiagramm={checkedVennDiagramm}
            checkedNote={checkedNote}
          />
        </div>
      )}
      {!showError && evaluatedExpression?.type === EvaluationType.VARIABLE && (
        <div>
          <VariableTruthTable
            evaluatedExpression={evaluatedExpression}
            expression={expression}
            checkedVennDiagramm={checkedVennDiagramm}
            data={evaluatedExpression}
          />

          <Feature
            setEvaluatedExpression={setEvaluatedExpression}
            evaluatedExpression={evaluatedExpression}
            expression={expression}
            checkedVennDiagramm={checkedVennDiagramm}
            checkedNote={checkedNote}
          />
        </div>
      )}
    </>
  );
};
export default Main;
