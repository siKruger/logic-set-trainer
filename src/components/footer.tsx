import React from 'react';
import './footer.css';
import { Container } from 'react-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  return (
    <Container id="footer_container">
      <div id="footer_text">
        ©Copyright 2022
        <br />
        designed by Judenhagen, Felix; Krüger, Simon; May,Moritz; Geisler,
        Moritz; Ghalandari, Mohammad; Reichmuth, Julian; Bohlens, Tristan; Li,
        Kehao; Moffo Kamta, Diane with
        <FavoriteIcon id="love_icon" />
      </div>
    </Container>
  );
};
export default Footer;
