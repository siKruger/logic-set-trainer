import React, { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./top.css";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { Alert, AlertTitle, IconButton } from "@mui/material";

const Top = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Container id="top_container">
      <Row className="header">
        <Col className="logo" xs={8}>
          logic set trainer
        </Col>
        <Col className="toolbar">
          <a
            href={"https://github.com/siKruger/logic-set-trainer"}
            target="_blank"
            type="button"
          >
            <IconButton id="github_icon_button">
              <GitHubIcon id="github_icon" className="icon" />
            </IconButton>
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-controls="info-collapse-text"
            aria-expanded={open}
            id="info_button"
            className="icon"
          >
            <IconButton color="inherit">
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </button>
        </Col>
      </Row>

      <Collapse in={open} appear={false} timeout={0}>
        <div className="instructions">
          <Alert id="info-collapse-text" severity="info">
            <AlertTitle>Info</AlertTitle>
            Please enter your expression and press evaluate. Allowed characters
            are (ordered in their precedence): (), !, &&, {"<=!=>"}, ||,{" "}
            {"=>,<="}
          </Alert>
        </div>
      </Collapse>
    </Container>
  );
};
export default Top;
