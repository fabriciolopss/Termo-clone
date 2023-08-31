import React, { useContext } from 'react'
import "./styles.css"
import { LuDelete } from 'react-icons/lu'
import { appContext } from '../../App'


function Key({ keyVal, enterKey, disabled }) {
    const { onDeleteLetter, onEnterWord, onSelectLetter } = useContext(appContext);

    const selectLetter = () => {
        if (keyVal === "Enter") {
            onEnterWord();
        } else if (keyVal === "Delete") {
            onDeleteLetter()
        } else {
            onSelectLetter(keyVal);

        }
    }
    if (keyVal === "Delete") {
        return (
            <div className="key deleteKey" onClick={selectLetter}><LuDelete /></div>

        )
    } else {
        return (
            <div className="key" id={enterKey ? "big" : disabled && "disabled"} onClick={selectLetter}>{keyVal}</div>
        )
    }
}


export default Key