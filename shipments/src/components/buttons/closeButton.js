import React from 'react';
import '../../styles/buttons.css'
import { ReactComponent as Clear } from "../../assets/clear.svg";

export default function CloseButton({ handleClose }) {
    return (
        <button
            className="close"
            onClick={handleClose}
            aria-label="close-button">
            <Clear
                className="icon"
                aria-label="close-icon"
            />
        </button>
    )
}