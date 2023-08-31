import React, { useContext } from 'react'
import { appContext } from '../../App'
import "./styles.css"
function GameOver() {
    const {gameOver, currentAttempt, correctWord} = useContext(appContext)
    const elogios = [
        "Espetacular",
        "Incrível",
        "Fantástico",
        "Brilhante",
        "Extraordinário",
        "Fenomenal",
        "Excepcional",
        "Maravilhoso",
        "Magnífico",
        "Épico",
        "Supremo",
        "Sensacional",
        "Deslumbrante",
        "Estupendo",
        "Impressionante",
        "Surpreendente",
        "Genial",
        "Espantoso",
        "Divino",
        "Mágico",
        "Impressionante", 
        "Surreal", 
        "Genial"
      ];
  return (
    <div className = "gameOver">
        <div class = "gameOverWrapper">
            {gameOver.guessedWord ? <h3>{elogios[Math.floor(Math.random() * elogios.length)]}!</h3> : null}
            <h3>Palavra correta: {correctWord}!</h3>
        </div>
    </div>
  )
}

export default GameOver