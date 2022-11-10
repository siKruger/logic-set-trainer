import React from 'react'
import { Container, Table } from 'react-bootstrap'
import './truthTable.css'
import { evaluateWholeExpression } from '../helper/logicConverter';

export default function TruthTable(props: { evaluatedExpression: { variables: any[]; steps: any[]; binaryOptions: any[] } | undefined }) {
  const getReplacedValue = (values: number[] | number, index: number) => {
    if (typeof (values) !== 'number') {
      return values[index];
    }
    return Number(values);
  };

  const generateCell = (singleStep: string, values: number[], variables: string[]) => {
    let mutableExpression = singleStep;
    for (let x = 0; x < mutableExpression.length; x += 1) {
      const currentChar = mutableExpression.charAt(x);

      const index = variables.indexOf(currentChar);

      // eslint-disable-next-line no-continue
      if (index === -1) continue;
      const replacedValue = getReplacedValue(values, index);

      mutableExpression = mutableExpression.replaceAll(currentChar, `${replacedValue}`);
    }

    mutableExpression = evaluateWholeExpression(mutableExpression);
    return (
        <td>
          {' '}
          {mutableExpression}
          {' '}
        </td>
    );
  };
  const generateRow = (step: string[], values: number[], variables: string[]) => step.map((singleStep: string) => generateCell(singleStep, values, variables));

  return (
    <>
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
                      // eslint-disable-next-line react/jsx-key
                      <th>
                        {' '}
                        {step}
                        {' '}
                      </th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {
                  props.evaluatedExpression !== undefined && props.evaluatedExpression?.variables.length === 1
                      ? props.evaluatedExpression?.binaryOptions.map((binaryValue) => (
                          // eslint-disable-next-line react/jsx-key
                          <tr>
                            {' '}
                            <td>
                              {' '}
                              {binaryValue}
                            </td>
                            {props.evaluatedExpression?.variables!==undefined?generateRow(props.evaluatedExpression?.steps, binaryValue, props.evaluatedExpression?.variables):undefined}
                          </tr>
                      ))
                      : props.evaluatedExpression?.binaryOptions.map((binaryRow) => (
                          // eslint-disable-next-line react/jsx-key
                          <tr>
                            {' '}
                            {
                              binaryRow.map((binaryValue: any) => (
                                  // eslint-disable-next-line react/jsx-key
                                  <td>
                                    {' '}
                                    {binaryValue}
                                    {' '}
                                  </td>
                              ))
                            }

                            {props.evaluatedExpression?.steps!==undefined?generateRow(props.evaluatedExpression?.steps, binaryRow, props.evaluatedExpression?.variables):undefined}

                          </tr>
                      ))
                }
                </tbody>
              </Table>
            </div>
            <div id="table_instead_content"></div>
          </div>



        </Container>
    </>
  )
}
