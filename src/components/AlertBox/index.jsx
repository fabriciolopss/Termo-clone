import React from 'react'
import "./styles.css"

function AlertBox({message, onClose}) {
  return (
    <div className = "alertBox">
        <div className = "alertBoxWrapper">
            <div className = "message">
                <h3>{message}</h3>
            </div>
            <div className = "closeButtonWrapper" onClick = {onClose}>
                <h3 onClick = {onClose} className = "closeButton">Fechar</h3>               
            </div>
            
        </div>
    </div>
  )
}

export default AlertBox