import React, {useState} from "react";
import {Alert, AlertTitle, TextField, Button} from "@mui/material";
import {evaluateTruthtable, TruthtableEvaluation} from "../helper/expressionEvaluator";
import {checkCorrectSyntax} from "../helper/expressionValidator";
import {toast} from "react-toastify";
import "./main.css";
import {Container, Row, Table} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Top from './top';
import Feature from "./Feature";
import TruthTable from "./TruthTable";
import Property from "./Property";
import Error from "./Error";
import Checkboxes from "./Checkboxes";
import onChange = toast.onChange;

const Main = () => {


  const [checkedVennDiagramm, setCheckedVennDiagramm] = useState(true);
  const [checkedNote, setCheckedNote] = useState(true);
  const [expression, setExpression] = useState('');
  const [showError, setShowError] = useState(false);
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();

  const getEvaluation = () => {
    if (!checkCorrectSyntax(expression)) {
      setShowError(true);
    } else {
      setShowError(false);
      const evaluated = evaluateTruthtable(expression);
      setEvaluatedExpression(evaluated);
    }
  };

  const downloadFile = () => {

  }

  return (
      <>
        <Container className="cover">
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
            {/* hier ändere ich die Funktion evaluate zu getEvaluation */}
            {/*<Button onClick={getEvaluation} variant="contained" id="evaluate_button">Evaluate</Button>*/}
          </div>
        </Container>

        {/* Checkbox Darstellung */}
        <Container>
          <Checkboxes checkedVennDiagramm={checkedVennDiagramm}
                      setCheckedVennDiagramm={setCheckedVennDiagramm}
                      checkedNote={checkedNote}
                      setCheckedNote={setCheckedNote}/>
        </Container>

        {/* für Error Darstellung oder Property und TruthTable und Feature(Venn-Diagramm und Note) Felder */}
        {!showError ? (evaluatedExpression && (<div>
              <Property evaluatedExpression={evaluatedExpression}/>
              <TruthTable evaluatedExpression={evaluatedExpression}/>
              <Feature checkedVennDiagramm={checkedVennDiagramm} checkedNote={checkedNote}/>
            </div>
        )) : (expression !== "" && <Error/>)}
      </>
  )
}
export default Main;
