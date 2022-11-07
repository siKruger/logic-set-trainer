import React from 'react'
import { Container, Table } from 'react-bootstrap'

export default function TruthTable(props: { evaluatedExpression: { variables: any[]; steps: any[]; binaryOptions: any[] } | undefined }) {
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
                            binaryRow.map((binaryValue: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, lowerIndex: any) => (
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
    </>
  )
}
