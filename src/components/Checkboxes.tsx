import React from 'react';
import { Container } from 'react-bootstrap';
import './Checkboxes.css';

export default function Checkboxes(props: {
  checkedVennDiagramm: any;
  setCheckedVennDiagramm: (arg0: boolean) => void;
  checkedNote: any;
  setCheckedNote: (arg0: boolean) => void;
}) {
  const checkedVennDiagramm = props.checkedVennDiagramm;
  const setCheckedVennDiagramm = props.setCheckedVennDiagramm;
  const checkedNote = props.checkedNote;
  const setCheckedNote = props.setCheckedNote;
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
