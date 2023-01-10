import React from 'react';
import { Container } from 'react-bootstrap';
import './Checkboxes.css';

export default function Checkboxes(props: {
  checkedVennDiagramm: boolean;
  setCheckedVennDiagramm: (arg0: boolean) => void;
  checkedNote: boolean;
  setCheckedNote: (arg0: boolean) => void;
}) {
  const {
    checkedVennDiagramm, setCheckedVennDiagramm, checkedNote, setCheckedNote,
  } = props;
  return (
    <Container id="checkbox-container">
      <div className="form-check">
        <label
          className="form-check-label checkbox_label"
          htmlFor="flexCheckDefault"
        >
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={!checkedVennDiagramm}
            onChange={() => setCheckedVennDiagramm(!checkedVennDiagramm)}
          />
          Venn-Diagramm
        </label>
      </div>
      <div className="form-check">
        <label
          className="form-check-label checkbox_label"
          htmlFor="flexCheckChecked"
        >
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={!checkedNote}
            onChange={() => setCheckedNote(!checkedNote)}
          />
          Note
        </label>
      </div>
    </Container>
  );
}
