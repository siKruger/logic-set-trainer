import React, {useState} from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./top.css"
import {Col, Collapse, Container, Row} from "react-bootstrap";
import {Alert, AlertTitle, IconButton, Menu} from "@mui/material";

const Footer = () => {
  const [open, setOpen] = useState(false);
  return (
      <Container>
        <div id="footer_text">
          designed by Krüger, Simon; May,Moritz; Geisler, Moritz; Ghalandari, Mohammad; Reichmuth, Julian; Bohlens, Tristan; Li, Kehao; Moffo Kamta, Diane
        </div>
      </Container>
  )
}
export default Footer;