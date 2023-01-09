import React from 'react';
import { Container } from 'react-bootstrap';
import './error.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { checkCorrectSyntax } from '../helper/expressionValidator';

export default function Error(props: {
  expression: any;
}) {
  const expression = props.expression;
  const check = checkCorrectSyntax(expression);
  return (
    <Container id="error_container">
      <div id="error">
        <div id="error_text">ERROR</div>
        <div id="error_content">
          The entered expression contains an error and cannot be evaluated:
          <br />
          {check}
          <br />
          <br />
          Your input is not valid, you can click
          {' '}
          <InfoOutlinedIcon id="info_icon" /> to know how to type a valid
          input.
        </div>
      </div>
    </Container>
  );
}
