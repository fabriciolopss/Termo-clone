import React, { useContext, useEffect } from 'react'
import "./styles.css"
import { appContext } from '../../App';

function Letter({letterPos, attemptVal}) {
    const {board, correctWord, currentAttempt, setDisabledLetter} = useContext(appContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
    const letterState = currentAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
      if(letter !== "" && !correct && !almost){
        setDisabledLetter((prev) => [...prev, letter])
      }
    }, [currentAttempt.attempt, almost, correct, letter, setDisabledLetter])
  return (
    <div className = "letter" id = {letterState}>{letter}</div>
    
  )
}

export default Letter