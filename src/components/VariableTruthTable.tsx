import React, { RefObject } from 'react';
import { Table } from 'react-bootstrap';
import './VariableTruthTable.css';
import { VariableEvaluation } from '../helper/expressionEvaluator';
import { evaluateWholeExpression, replaceExpressionToBoolean } from '../helper/logicConverter';

type VennProps = {
  evaluatedExpression: VariableEvaluation;
  divRef: RefObject<HTMLDivElement> | undefined,
  counter: number
};

export default function VariableTruthTable({ evaluatedExpression, divRef, counter }: VennProps) {
  const generateCell = (
    singleStep: string,
    values: number[],
    variables: string[],
  ) => {
    let mutableExpression = singleStep;

    mutableExpression = replaceExpressionToBoolean(
      mutableExpression,
      variables,
      values,
    );
    mutableExpression = evaluateWholeExpression(mutableExpression);
    return (
      <td>
        {mutableExpression}
      </td>
    );
  };

  const generateRow = (step: string[], values: number[], variables: string[]) => step.map((singleStep: string, index) => (index < counter ? (
    generateCell(singleStep, values, variables)
  ) : (
    <td key={undefined}>
      -
    </td>
  )));

  return (

    <div id="table_content">
      <div ref={divRef}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {evaluatedExpression?.variables.map((variable: string) => (
                <th key={variable}>
                  {variable}
                </th>
              ))}
              {
                      evaluatedExpression.steps.map((step) => (
                        <th key={step}>
                          {' '}
                          {step}
                          {' '}
                        </th>
                      ))
                    }
            </tr>
          </thead>
          <tbody>
            {evaluatedExpression?.variables.length === 1
              ? evaluatedExpression?.binaryOptions.map(
                (binaryValue) => (
                  <tr key={undefined}>
                    {' '}
                    <td>
                      {binaryValue}
                    </td>
                    {evaluatedExpression?.variables !== undefined
                      ? generateRow(
                        evaluatedExpression?.steps,
                        binaryValue,
                        evaluatedExpression?.variables,
                      )
                      : undefined}
                  </tr>
                ),
              )
              : evaluatedExpression?.binaryOptions.map(
                (binaryRow) => (
                  <tr key={undefined}>
                    {' '}
                    {binaryRow.map((binaryValue) => (
                      <td key={undefined}>
                        {binaryValue}
                      </td>
                    ))}
                    {evaluatedExpression?.steps !== undefined
                      ? generateRow(
                        evaluatedExpression?.steps,
                        binaryRow,
                        evaluatedExpression?.variables,
                      )
                      : undefined}
                  </tr>
                ),
              )}
          </tbody>
        </Table>
      </div>
    </div>

  );
}
