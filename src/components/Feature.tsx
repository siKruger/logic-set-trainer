import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './feature.css';

export default function Feature(props: {
  evaluatedExpression: any;
  expression: any;
  checkedNote: any;
}) {
  const [text, setText] = useState('');
  const evaluatedExpression = props.evaluatedExpression;
  const expression = props.expression;
  const checkedNote = props.checkedNote;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const element = document.createElement('a');
    const txt = ''
      + expression
      + ' :\n\n'
      + 'Steps:  '
      + evaluatedExpression.steps
      + '\n\n'
      + text;
    const file = new Blob([txt], {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'NewDocument.txt';
    document.body.appendChild(element);
    element.click();
  };
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  return (
    <>
      {!checkedNote && (
        <Container id="note_container">
          <div id="note">
            <div id="note_text">
              <h6>note</h6>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                {' '}
                <br />
                <Form.Control
                  onChange={handleChange}
                  id="text"
                  as="textarea"
                  rows={5}
                  placeholder="Type your note here..."
                />
              </Form.Group>

              <Button
                id="save_note_button"
                type="submit"
                variant="outlined"
                className="btn btn-outline-primary"
              >
                save
              </Button>
            </Form>
          </div>
        </Container>
      )};
      <div />
    </>
  );
}
