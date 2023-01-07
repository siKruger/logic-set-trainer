import React, { useState } from "react";
import { Container, Table, Button as Button2 } from "react-bootstrap";
import "./VariableTruthTable.css";
import useInterval from "use-interval";
import {
  evaluateWholeExpression,
  replaceExpressionToBoolean,
  evaluateSetExpression
} from "../helper/logicConverter";
import { Button as Button, CircularProgress } from "@mui/material";
import html2canvas from "html2canvas";
import { VennDiagramPage, VennDiagramPageSets } from "./VennDiagram";
import {
  VariableEvaluation,
  SetEvaluation,
  EvaluationType,
} from "../helper/expressionEvaluator";

type VennProps = {
  evaluatedExpression: any;
  expression: any;
  checkedVennDiagramm: any;
  data: any;
};

export default function SetTruthTable({
  evaluatedExpression,
  expression,
  checkedVennDiagramm,
}: VennProps) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const divRef2 = React.useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const imageFileName = expression.replaceAll(" ", "");
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [progressSpinner, setProgressSpinner] = useState<number>(0);

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  const exportAsImage = async (el: any, imageFileName: any) => {
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };

  const downloadImage = (blob: any, fileName: string) => {
    const fakeLink = window.document.createElement("a");
    // fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
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
    // Increment counter
    setProgressSpinner(progressSpinner + 3.125);

    // If counter is at X * 100
    if (progressSpinner % 100 === 0)
      if (counter >= evaluatedExpression?.steps.length) setCounter(0);
      else addColumn();
    // setProgressspinner(0);
  }, 125);

  const generateCell = (
    singleStep: string,
    values: number[],
    variables: string[]
  ) => {
    let mutableExpression = singleStep;

    if (mutableExpression == "blank") {
      return <td> {" - "} </td>;
    }

    mutableExpression = replaceExpressionToBoolean(
      mutableExpression,
      variables,
      values
    );
    mutableExpression = evaluateWholeExpression(mutableExpression);
    return <td> {mutableExpression} </td>;
  };

  const generateRow = (step: string[], values: number[], variables: string[]) =>
    step.map((singleStep: string, index) =>
      index < counter ? (
        generateCell(singleStep, values, variables)
      ) : (
        <td> - </td>
      )
    );

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
            Variables: {evaluatedExpression?.sets}
            <ul>
              {evaluatedExpression?.steps.map((val: any, index: any) => (
                <li key={val}>
                  Step {index}: {val}
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
              color={autoplay ? "success" : "error"}
              onClick={() => toggleAutoplay()}
              variant="outlined"
              style={{ marginLeft: "50px" }}
            >
              Autoplay
              <CircularProgress
                style={{ marginLeft: "1em" }}
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
                style={{ marginLeft: "50px" }}
              >
                +1 Schritt
              </Button>
            </div>
            <div id="button_of_reduce">
              <Button
                disabled={autoplay}
                onClick={() => reduceColumn()}
                variant="outlined"
                style={{ marginLeft: "30px" }}
              >
                -1 Schritt
              </Button>
            </div>
          </div>

          {/*<TextField style={{ width: '195px', marginLeft: '30px' }} value={`Angezeigte Schritte: ${counter}`} />*/}
          <div id="table_content">
            <div ref={divRef}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {/* {
                    evaluatedExpression?.sets.map((set: any) => (
                      <th key={set}> {set} </th>
                    ))
                    } */}
                    {evaluatedExpression?.sets.map((set: string) => (
                      <th key={set}> {set} </th>
                    ))}
                    {/* { 
                    evaluatedExpression?.steps.map((step:any) => (
                      // eslint-disable-next-line react/jsx-key
                      <th> {step} </th>
                    ))} */}
                    {evaluatedExpression?.steps.map((step: string) => (
                      <th key={step}> {step} </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    {
                      evaluatedExpression?.sets.map((set: string) => (
                        <td key={set}> {set} </td>
                      ))}

                    {
                      evaluatedExpression.steps.slice(0, counter).map((step: string) => (
                          <td key={step}>
                            {" "}
                            {evaluateSetExpression(step,evaluatedExpression.sets)}{" "}
                          </td>
                        ))}

                    {
                      evaluatedExpression.steps
                        .slice(counter, evaluatedExpression.steps.length)
                        .map((step: string) => <td key={step}> - </td>)}
                  </tr>
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
                <VennDiagramPageSets
                  data={evaluatedExpression}
                  step={counter}
                />
                {/* <VennDiagramPageSets data={evaluation} step={counter} */}
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
