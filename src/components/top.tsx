import React, {useState} from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./top.css"
import {Col, Collapse, Container, Row} from "react-bootstrap";
import {Alert, AlertTitle, IconButton, Menu} from "@mui/material";

const Top = () => {
  const [open, setOpen] = useState(false);

  
  

  return (
      <Container>
        <Row className="header">
          <Col className="logo" xs={8}>
          
          </Col>
          <Col className="toolbar">
            <button onClick={() => setOpen(!open)}
                    aria-controls="info-collapse-text"
                    aria-expanded={open}
                    id="info_button"
                    className="icon"
            >
              <IconButton color="inherit">
                <InfoOutlinedIcon/>
              </IconButton>
            </button>
            <a href={"https://github.com/siKruger/logic-set-trainer"} target="_blank" type="button">
              <IconButton id="github_icon_button">
                <GitHubIcon id="github_icon" className="icon"/>
              </IconButton>
            </a>
          </Col>
        </Row>

        <Collapse in={open} appear={false} timeout={0}>
          <div className="instructions">
            <Alert id="info-collapse-text" severity="info">
              <AlertTitle>Info</AlertTitle>
              Please enter your expression and press evaluate.
              Allowed characters are (ordered in their precedence):
              (){' '}, !{' '}, &&{' '}, {'<=!=>'}
              {' '}, ||{' '}, =={' '}, {'=>,<='}{' '},
            </Alert>
          </div>
        </Collapse>


      </Container>
  )
}
export default Top;