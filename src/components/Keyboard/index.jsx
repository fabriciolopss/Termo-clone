import React, { useCallback, useContext, useEffect } from 'react'
import Key from '../Key'
import "./styles.css"
import { appContext } from '../../App'

function Keyboard() {
  
  const rows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
  ]

  const { onDeleteLetter, onEnterWord, onSelectLetter, disabledLetters } = useContext(appContext);

  const handleKeyboard = useCallback((event) => {
    if(event.key === "Enter"){
      onEnterWord();
    }else if (event.key === "Backspace"){
      onDeleteLetter();
    }else {
      for(let x = 0; x < rows.length; x++){
        rows[x].split('').forEach((key) => {
          if(event.key.toUpperCase() === key){
            onSelectLetter(key);
          }
        })
      }
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    }
  }, [handleKeyboard])

  const alternative = [" ", "Delete", "Enter"];
  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`line${rowIndex + 1}`}>
          {row.split('').map((key, keyIndex) => (
            key === "L" || key === "M" ? (
              <>
                <Key keyVal={key} disabled={disabledLetters.includes(key)} />
                <Key keyVal={alternative[rowIndex]} enterKey />
              </>
            ) : (
              <Key keyVal={key} disabled={disabledLetters.includes(key)} />
            )
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard