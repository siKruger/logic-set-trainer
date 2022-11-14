import React from 'react'
import { Container } from 'react-bootstrap'
import './error.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Error() {
  return (
    <>
    <Container id="error_container">
        <div id="error">
          <div id="error_text">
            ERROR
          </div>
          <div id="error_content">
            Your input is not valid, you can click <InfoOutlinedIcon id="info_icon"/> to know how to type a valid input.
          </div>
        </div>
      </Container>
    </>
  )
}
