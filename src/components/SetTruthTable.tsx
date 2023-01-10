import React, { RefObject } from 'react';
import { Table } from 'react-bootstrap';
import './VariableTruthTable.css';
import { evaluateSetExpression } from '../helper/logicConverter';
import { SetEvaluation } from '../helper/expressionEvaluator';

type VennProps = {
  evaluatedExpression: SetEvaluation
  divRef: RefObject<HTMLDivElement> | undefined,
  counter: number
};

export default function SetTruthTable({ evaluatedExpression, divRef, counter }: VennProps) {
  return (
    <div id="table_content">
      <div ref={divRef}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {evaluatedExpression?.sets.map((set: string) => (
                <th key={set}>
                  {set}
                </th>
              ))}

              {evaluatedExpression?.steps.map((step: string) => (
                <th key={step}>
                  {step}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              {evaluatedExpression?.sets.map((set: string) => (
                <td key={set}>
                  {set}
                </td>
              ))}

              {evaluatedExpression.steps.map((step, index) => {
                if (index >= counter) return <td> - </td>;
                return (
                  <td key={step}>
                    {' '}
                    {evaluateSetExpression(
                      step,
                      evaluatedExpression.sets,
                    )}
                    {' '}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>

  );
}
