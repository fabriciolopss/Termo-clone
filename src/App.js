import './App.css';
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"
import { createContext, useEffect, useState } from 'react'
import { boardDefault, generateWordSet } from './words';
import GameOver from './components/GameOver';
import AlertBox from './components/AlertBox';

export const appContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPosition: 0 });
  const [wordSet, setWordSet] = useState(new Set())
  const [selectedSquare, setSelectedSquare] = useState({ row: 0, col: 0 });
  const [disabledLetters, setDisabledLetter] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver : false, guessedWord : false})
  const [correctWord, setCorrectWord] = useState("");
  const [alertInfo, setAlertInfo] = useState({showAlert: false, alertMessage: ''})


  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
      console.log(words.todaysWord);
    })
  }, [])

  const handleSquareClick = (row, col) => {
    setSelectedSquare({ row, col });
  }

  const onSelectLetter = (keyVal) => {
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyVal
    setBoard(newBoard)
    if (currentAttempt.letterPosition <= 4) {
      setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition + 1 })
    } else {
      setCurrentAttempt({ ...currentAttempt, letterPosition: 4 });
    }

    setSelectedSquare({
      row: currentAttempt.attempt,
      col: currentAttempt.letterPosition + 1
    });
  }

  const showAlertMessage = (message) => {
    setAlertInfo({showAlert: true, alertMessage: message});
  }

  const handleAlertClose = () => {
    setAlertInfo({showAlert:false, alertMessage: ''});
  }

  const onDeleteLetter = () => {
    if (currentAttempt.letterPosition === 0) {
      showAlertMessage("Não existe letra para ser deletada!");
      return;
    }
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setSelectedSquare({
      row: currentAttempt.attempt,
      col: currentAttempt.letterPosition - 1
    });

    setBoard(newBoard);
    setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition - 1 })

  }

  const onEnterWord = () => {
    let letterCounter = 0;
    let currentWord = "";
    for (let x = 0; x < 5; x++) {
      currentWord += board[currentAttempt.attempt][x];
      letterCounter = board[currentAttempt.attempt][x] !== "" ? letterCounter += 1 : letterCounter;
    }

    if (letterCounter !== 5) {
      showAlertMessage("Preencha todas as letras!");
      return
    }else if(wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ ...currentAttempt, attempt: currentAttempt.attempt + 1, letterPosition: 0 })
      setSelectedSquare({
        row: currentAttempt.attempt + 1,
        col: 0
    });
  }else {
    showAlertMessage("Essa palavra não existe!");

  }
  if(currentWord === correctWord.toUpperCase()){
    setGameOver({gameOver:true, guessedWord:true})
    return
  }

  if(currentAttempt.attempt === 5){
    setGameOver({gameOver:true, guessedWord:false})
    return
  }



  }

  return (
    <div className="App">
      <nav>Termo <span className = "author">by: Fabricio Lopes</span></nav>
      <appContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, onDeleteLetter, onEnterWord, onSelectLetter, correctWord, disabledLetters, setDisabledLetter, gameOver, setGameOver }}>
        {gameOver.gameOver ? <GameOver /> : null}
        <Board handleSquareClick={handleSquareClick} selectedSquare={selectedSquare} />
        {gameOver.gameOver ? null : <Keyboard />}
      </appContext.Provider>

      {alertInfo.showAlert && <AlertBox message = {alertInfo.alertMessage} onClose = {handleAlertClose}/>}
    </div>
  );
}

export default App;
