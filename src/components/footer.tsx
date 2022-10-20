import React, {useState} from "react";
import "./footer.css"
import {Container} from "react-bootstrap";


const Footer = () => {



  const setFooter = () => {
    const footerContainer = document.getElementById("footer_container");
    if (window.outerHeight-document.body.clientHeight>100) {
      let footerPosition = window.outerHeight-document.body.clientHeight-200;
      // alert(footerPosition)
      // @ts-ignore
      footerContainer.style.marginTop = footerPosition.toString() + "px";
      // footerContainer.style.marginTop = "100px";
    }
    // @ts-ignore
    else footerContainer.style.marginTop = 0;
  }

  return (
      <Container id="footer_container">
        <div id="footer_text">
          ©Copyright 2022 <br/>
          designed by Krüger, Simon; May,Moritz; Geisler, Moritz; Ghalandari, Mohammad; Reichmuth, Julian; Bohlens, Tristan; Li, Kehao; Moffo Kamta, Diane
        </div>
      </Container>
  )
}
export default Footer;
