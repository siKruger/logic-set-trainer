import React, { useState } from "react";
import { Container, Table, Button as Button2 } from "react-bootstrap";
import "./truthTable.css";
import useInterval from "use-interval";
import {
  evaluateWholeExpression,
  replaceExpressionToBoolean,
} from "../helper/logicConverter";
import { Button as Button, CircularProgress } from "@mui/material";
import html2canvas from "html2canvas";
import VenDiagramPage from "./VennDiagram";


export default function TruthTable(props: {
  evaluatedExpression:
    | { variables: any[]; steps: any[]; binaryOptions: any[] }
    | undefined;
  expression: any;
  checkedVennDiagramm: any;
}) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const imageFileName = props.expression.replaceAll(" ", "") + "(truth_table)";
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
    if (props.evaluatedExpression !== undefined) {
      if (counter < props.evaluatedExpression?.steps.length) {
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
    if (props.evaluatedExpression === undefined || !autoplay) return;
    // Increment counter
    setProgressSpinner(progressSpinner + 3.125);

    // If counter is at X * 100
    if (progressSpinner % 100 === 0)
      if (counter >= props.evaluatedExpression?.steps.length) setCounter(0);
      else addColumn();
    // setProgressspinner(0);
  }, 125);

  const getReplacedValue = (values: number[] | number, index: number) => {
    if (typeof values !== "number") {
      return values[index];
    }
    return Number(values);
  };

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
      <Container id="table_container">
        <div id="table">
          <div id="table_text">Truth Table</div>
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
          <div id="table_content" ref={divRef}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {props.evaluatedExpression?.variables.map((variable) => (
                    <th key={variable}> {variable} </th>
                  ))}
                  {props.evaluatedExpression?.steps.map((step) => (
                    // eslint-disable-next-line react/jsx-key
                    <th> {step} </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.evaluatedExpression !== undefined &&
                props.evaluatedExpression?.variables.length === 1
                  ? props.evaluatedExpression?.binaryOptions.map(
                      (binaryValue) => (
                        // eslint-disable-next-line react/jsx-key
                        <tr>
                          {" "}
                          <td> {binaryValue}</td>
                          {props.evaluatedExpression?.variables !== undefined
                            ? generateRow(
                                props.evaluatedExpression?.steps,
                                binaryValue,
                                props.evaluatedExpression?.variables
                              )
                            : undefined}
                        </tr>
                      )
                    )
                  : props.evaluatedExpression?.binaryOptions.map(
                      (binaryRow) => (
                        // eslint-disable-next-line react/jsx-key
                        <tr>
                          {" "}
                          {binaryRow.map((binaryValue: any) => (
                            // eslint-disable-next-line react/jsx-key
                            <td> {binaryValue} </td>
                          ))}
                          {props.evaluatedExpression?.steps !== undefined
                            ? generateRow(
                                props.evaluatedExpression?.steps,
                                binaryRow,
                                props.evaluatedExpression?.variables
                              )
                            : undefined}
                        </tr>
                      )
                    )}
              </tbody>
            </Table>
            
          </div>

          <Button2
            id="truth_table_download_button"
            onClick={() => exportAsImage(divRef.current, imageFileName)}
          >
            Capture table
          </Button2>
        </div>

      </Container>
      {!props.checkedVennDiagramm && (
          <Container id="venn_container">
            <div id="venn">
              <div id="venn_text">venn-diagram</div>
              <div id="venn_content" ref={divRef}>
                <VenDiagramPage
                  data={props.evaluatedExpression}
                  step={counter}
                />
              </div>

              <Button
                id="venn_download_button"
                onClick={() => exportAsImage(divRef.current, imageFileName)}
              >
                Capture venn-diagram
              </Button>
            </div>
          </Container>
        )}
    </>
  );
}
