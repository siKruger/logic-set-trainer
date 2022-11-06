
import { TextField, Button } from "@mui/material";
import "../main.css";
import { Container, Table } from "react-bootstrap";
import { MouseEventHandler, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

export default function Tables(props) {
  return (
    <>
        <Container className="cover">
        <div id="text_field_control">
          <TextField id="input_text_field" fullWidth
            placeholder="Enter the logical expression to be computed"
            onChange={(e) => {
              return props.setExpression(e.target.value)
            }}
          />
          {/* hier ändere ich die Funktion evaluate zu getEvaluation */}
          <Button onClick={props.getEvaluation} variant="contained" id="evaluate_button">Evaluate</Button>
        </div>
      </Container>
      <Container id="property_container">
        <div id="property">
          <div id="property_text">
            property
          </div>
          <div id="property_content">
            {props.evaluatedExpression?.parentheses}
            <br />
            Variables:
            {' '}
            {props.evaluatedExpression?.variables}
            <ul>
              {props.evaluatedExpression?.steps.map((val, index) => (
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
          </div>
        </div>
      </Container>
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
      {props.evaluatedExpression && (
        <Container id="table_container">
          <div id="table">
            <div id="table_text">
              Truth Table
            </div>
            <div id="table_content">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {props.evaluatedExpression?.variables.map((variable) => (
                      <th key={variable}>
                        {' '}
                        {variable}
                        {' '}
                      </th>
                    ))}
                    {props.evaluatedExpression?.steps.map((step) => (
                      <th key={step}>
                        {' '}
                        {step}
                        {' '}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* todo better keys  */}
                  {
                    props.evaluatedExpression !== undefined && props.evaluatedExpression?.variables.length === 1
                      ? props.evaluatedExpression?.binaryOptions.map((binaryValue, upperIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={`${upperIndex}upperBinary`}>
                          {' '}
                          <td>
                            {' '}
                            {binaryValue}
                          </td>
                          {props.evaluatedExpression?.steps.map((step, lowerIndex) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <td key={step + upperIndex + lowerIndex}>
                              {' '}
                              **PLACEHOLDER**
                              {' '}
                            </td>
                          ))}
                        </tr>
                      ))
                      : props.evaluatedExpression?.binaryOptions.map((binaryRow, upperIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={`${upperIndex}upperBinary1`}>
                          {' '}
                          {
                            binaryRow.map((binaryValue, lowerIndex) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <td key={`${upperIndex}lowerBinary1${lowerIndex}`}>
                                {' '}
                                {binaryValue}
                                {' '}
                              </td>
                            ))
                          }
                          {props.evaluatedExpression?.steps.map((step) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <td key={step + binaryRow + upperIndex}>
                              {' '}
                              **PLACEHOLDER**
                              {' '}
                            </td>
                          ))}
                        </tr>
                      ))
                  }
                </tbody>
              </Table>
            </div>
            <div id="table_instead_content"></div>
          </div>



        </Container>
      )}
    </>
  )
}
