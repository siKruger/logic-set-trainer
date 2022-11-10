import React from 'react'
import { Container } from 'react-bootstrap'
import './property.css'

export default function Property(props: { evaluatedExpression: { parentheses: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; variables: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; steps: any[] } }) {
    return (
        <>

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
        </>
    )
}
