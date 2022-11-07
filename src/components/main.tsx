import React, { useState } from "react";
import { Alert, AlertTitle, TextField, Button } from "@mui/material";
import { evaluateTruthtable, TruthtableEvaluation } from "../helper/expressionEvaluator";
import { checkCorrectSyntax } from "../helper/expressionValidator";
import { toast } from "react-toastify";
import "./main.css";
import { Container, Row, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Top from './top';
import Feature from "./Feature";
import TruthTable from "./TruthTable";
import Property from "./Property";

const Main = () => {


  const [checkedVennDiagramm, setCheckedVennDiagramm] = useState(true);
  const [checkedNote, setCheckedNote] = useState(true);
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();

  const getEvaluation = () => {
    if (!checkCorrectSyntax(expression)) {
      toast.error('The entered expression contains an error and cannot be evaluated! You can click on the "i" icon for instructions on how to use', {
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

  const downloadFile = () => {

  }

  return (
    <>
      <Container>
        <label>
          <input type="checkbox"
            defaultChecked={!checkedVennDiagramm}
            onChange={() => setCheckedVennDiagramm(!checkedVennDiagramm)}
          />
          Venn-Diagramm
        </label> <br />



        <label>
          <input type="checkbox"
            defaultChecked={!checkedNote}
            onChange={() => setCheckedNote(!checkedNote)}
          />
          Note
        </label>
      </Container>



      <Container className="cover">
        <div id="text_field_control">
          <TextField id="input_text_field" fullWidth
            placeholder="Enter the logical expression to be computed"
            onChange={(e) => {
              return setExpression(e.target.value)
            }}
          />
          {/* hier ändere ich die Funktion evaluate zu getEvaluation */}
          <Button onClick={getEvaluation} variant="contained" id="evaluate_button">Evaluate</Button>
        </div>
      </Container>

      
      {/* für Property Feld */}
      {evaluatedExpression && (<Property evaluatedExpression={evaluatedExpression}/>)}

      <Container id="error_container">
        <div id="error">
          <div id="error_text">
            ERROR
          </div>
          <div id="error_content">
            Your input is not valid
          </div>
        </div>
      </Container>

      {/*erst wenn ein Parameter eingegeben wird, wird dann angezeigt. */}
      {evaluatedExpression && (<TruthTable evaluatedExpression={evaluatedExpression}/>)}

      {/* Das ist für die Darstellung von Venn-Diagramm und Note */}
      <Feature checkedVennDiagramm={checkedVennDiagramm} evaluatedExpression={evaluatedExpression} checkedNote={checkedNote} />

    </>
  )
}
export default Main;
