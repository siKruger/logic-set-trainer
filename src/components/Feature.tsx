import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './feature.css'


export default function Feature(props: {
    expression: any; checkedVennDiagramm: any; checkedNote: any; 
}) {
 
    const [text, setText] = useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const element = document.createElement('a');
        const txt = "" + props.expression + " :\n\n" + text;
        const file = new Blob([txt], {
            type: "text/plain;charset=utf-8"
        });
        element.href = URL.createObjectURL(file);
        element.download = "NewDocument.txt";
        document.body.appendChild(element);
        element.click();
        
    }
    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(e.target.value);     
    }


    return (
        <>

            {!props.checkedVennDiagramm && (
                <Container id="venn_container">
                    <div id="venn">
                        <div id="venn_text">
                            venn-diagram
                        </div>
                        <div id="venn_content">
                            <img
                                src="https://www.presentationload.de/blog/wp-content/uploads/Venn-Diagramm-Titelbild-16-zu-9.jpg.webp"
                                className='img-thumbnail'
                                alt='...'
                            /><br />
                        </div>
                    </div>
                </Container>
            )
            }

            {!props.checkedNote &&
                <Container id="note_container">
                    <div id="note">


                        <Form  onSubmit={handleSubmit}>
                            <Form.Group className="mb-3"> <br />
                                <Form.Label className="lead">Make a note</Form.Label>
                                <Form.Control onChange={handleChange} id="text" as="textarea" rows={5} placeholder="Type your note here..." />
                            </Form.Group>


                            <Button variant="contained" type="submit" className="btn btn-success">
                                save
                            </Button>

                        </Form>
                    </div>
                    {/* <div id="note">
                        <div id="note_text">note</div>
                        <div id="note_content">
                            <form onSubmit={handleSubmit}>
                                <label >
                                    <textarea onChange={handleChange} id="note_form" rows={5} cols={100} placeholder="Type your note here..."></textarea>
                                </label><br />
                                <button>Save</button>
                            </form>
                        </div>
                    </div> */}
                </Container>
            }
        </>
    )
}
