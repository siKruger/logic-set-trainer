import React from 'react'
import './Checkboxes.css'
export default function Checkboxes(props: { checkedVennDiagramm: any; setCheckedVennDiagramm: (arg0: boolean) => void; checkedNote: any; setCheckedNote: (arg0: boolean) => void }) {
    return (
        <>
            {/* <label>
                <input type="checkbox"
                    defaultChecked={!props.checkedVennDiagramm}
                    onChange={() => props.setCheckedVennDiagramm(!props.checkedVennDiagramm)}
                />
                Venn-Diagramm
            </label> <br />

            <label>
                <input type="checkbox"
                    defaultChecked={!props.checkedNote}
                    onChange={() => props.setCheckedNote(!props.checkedNote)}
                />
                Note
            </label> */}
            <div id='checkbox-container'>
            <div className="form-check">
                <input className="form-check-input" type="checkbox"
                defaultChecked={!props.checkedVennDiagramm}
                onChange={() => props.setCheckedVennDiagramm(!props.checkedVennDiagramm)}
                />
                    <label className="form-check-label checkbox_label" htmlFor="flexCheckDefault">
                    Venn-Diagramm
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox"
                defaultChecked={!props.checkedNote}
                onChange={() => props.setCheckedNote(!props.checkedNote)}
                />
                    <label className="form-check-label checkbox_label" htmlFor="flexCheckChecked">
                    Note
                    </label>
            </div>
            </div>
        </>
    )
}
