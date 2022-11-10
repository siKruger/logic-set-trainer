import React from 'react'

export default function Checkboxes(props: { checkedVennDiagramm: any; setCheckedVennDiagramm: (arg0: boolean) => void; checkedNote: any; setCheckedNote: (arg0: boolean) => void }) {
    return (
        <>
            <label>
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
            </label>
        </>
    )
}
