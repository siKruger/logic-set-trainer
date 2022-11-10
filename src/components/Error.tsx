import React from 'react'
import { Container } from 'react-bootstrap'
import './error.css'

export default function Error() {
  return (
    <>
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
    </>
  )
}
