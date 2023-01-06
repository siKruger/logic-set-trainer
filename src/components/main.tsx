import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, TextField, Button } from "@mui/material";
// import { evaluateTruthtable, TruthtableEvaluation } from "../helper/expressionEvaluator";
import {
  evaluateTruthtable, VariableEvaluation, SetEvaluation, EvaluationType,
} from '../helper/expressionEvaluator';
import { checkCorrectSyntax } from "../helper/expressionValidator";
import { toast } from "react-toastify";
import "./main.css";
import { Container } from "react-bootstrap";
import Feature from "./Feature";
import VariableTruthTable from "./VariableTruthTable";

import Error from "./Error";
import Checkboxes from "./Checkboxes";


const Main = () => {


  const [checkedVennDiagramm, setCheckedVennDiagramm] = useState(true);
  const [checkedNote, setCheckedNote] = useState(true);
  const [expression, setExpression] = useState('');
  const [showError, setShowError] = useState(false);
  // const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();
  const [evaluatedExpression, setEvaluatedExpression] = useState<VariableEvaluation | SetEvaluation | any>();


  //Die Eingabe wird erst nach Korrektheit kontrolliert, danach wird das Ergebnis angezeigt.
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
      <Container className="cover" >
        <div id="text_field_control">
          <TextField id="input_text_field" fullWidth autoComplete="off"
            placeholder="Enter the logical expression to be computed"
            onChange={(e) => {
              return setExpression(e.target.value)
            }}
            onKeyUp={() => {
              return getEvaluation()
            }}
          />
        </div>
      </Container>

      {/* Checkbox Darstellung */}
      <Container>
        <Checkboxes checkedVennDiagramm={checkedVennDiagramm}
          setCheckedVennDiagramm={setCheckedVennDiagramm}
          checkedNote={checkedNote}
          setCheckedNote={setCheckedNote} />
      </Container>

      {/* für Error Darstellung oder Property und TruthTable(und VennDiagramm) und Feature(Note) Felder */}
      {!showError ? (evaluatedExpression && (<div>
        
        <VariableTruthTable evaluatedExpression={evaluatedExpression} expression={expression} checkedVennDiagramm={checkedVennDiagramm} data={undefined}/>
        <Feature setEvaluatedExpression={setEvaluatedExpression}
        evaluatedExpression={evaluatedExpression}  expression={expression}
        checkedVennDiagramm={checkedVennDiagramm} checkedNote={checkedNote}/>

      </div>
      )) : (expression !== "" && <Error />)}


    </>
  )
}
export default Main;
