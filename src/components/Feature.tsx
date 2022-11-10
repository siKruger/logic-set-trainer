import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'



export default function Feature(props: { checkedVennDiagramm: any; evaluatedExpression: any; checkedNote: any }) {

    

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

    }

    return (
        <>

            {!props.checkedVennDiagramm && props.evaluatedExpression && (
                <Container>
                    <img
                        src="https://www.presentationload.de/blog/wp-content/uploads/Venn-Diagramm-Titelbild-16-zu-9.jpg.webp"
                        className='img-thumbnail'
                        alt='...'
                    /><br />
                </Container>
            )
            }

            {!props.checkedNote && props.evaluatedExpression &&
                <Container>
                    <div id="form">


                        {/* <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"> <br />
                                <Form.Label className="lead">Make a note</Form.Label>
                                <Form.Control id="text" as="textarea" rows={5} placeholder="Type your note here..." />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control id="filename" as="input" placeholder="Specify a filename..." />
                            </Form.Group>

                            <Button variant="contained" type="submit">
                                save
                            </Button>
                        </Form> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label >
                            <span>Make a note</span>
                            <br />
                            <textarea  id="text" rows={5} cols={100} placeholder="Type your note here..."></textarea>
                        </label><br />
                        <button>Save</button>
                    </form>
                </Container>
            }
        </>
    )
}
