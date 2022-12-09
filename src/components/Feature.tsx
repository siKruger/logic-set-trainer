import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./feature.css";
import { evaluateTruthtable } from "../helper/expressionEvaluator";
import VenDiagramPage from "./VennDiagram";
import html2canvas from "html2canvas";
import { useRef } from "react";
export default function Feature(props: {
  setEvaluatedExpression: any;
  evaluatedExpression: any;
  expression: any;
  checkedVennDiagramm: any;
  checkedNote: any;
}) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // props.setEvaluatedExpression(evaluateTruthtable(props.expression));
    const element = document.createElement("a");
    const txt =
      "" +
      props.expression +
      " :\n\n" +
      "Steps:  " +
      props.evaluatedExpression.steps +
      "\n\n" +
      text;
    const file = new Blob([txt], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "NewDocument.txt";
    document.body.appendChild(element);
    element.click();
  };
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  const exportAsImage = async (el: any, imageFileName: any) => {
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };

  const downloadImage = (blob: any, fileName: string) => {
    const fakeLink = window.document.createElement("a");
    // fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  return (
    <>
      {!props.checkedVennDiagramm && (
        <Container id="venn_container">
          <div id="venn">
            <div id="venn_text">venn-diagram</div>
            <div id="venn_content" ref={divRef}>
              <VenDiagramPage data={props.evaluatedExpression} />
              <br />
            </div>

            <Button onClick={() => exportAsImage(divRef.current, "venn-diagram")}>Capture Image</Button>
            
          </div>
        </Container>
      )}

      {!props.checkedNote && (
         <Container id="note_container">
         <div id="note">
             <div id="note_text">
                 note
             </div>

             <Form  onSubmit={handleSubmit}>
                 <Form.Group className="mb-3"> <br />
                     <Form.Control onChange={handleChange} id="text" as="textarea" rows={5} placeholder="Type your note here..." />
                 </Form.Group>


                 <Button variant="contained" type="submit" className="btn btn-success">
                     save
                 </Button>

             </Form>
         </div>
     </Container>
      )}
    </>
  );
}
