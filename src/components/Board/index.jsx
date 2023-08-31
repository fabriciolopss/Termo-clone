import React from 'react'
import Letter from "../Letter"
import "./styles.css"

function Board({handleSquareClick, selectedSquare}) {

    return (
        <div className="board">
            {[...Array(6)].map((_, row) => (
                <div key={row} className="row">
                    {[...Array(5)].map((_, col) => (
                        <div
                            key={col}
                            className={`square ${selectedSquare && selectedSquare.row === row && selectedSquare.col === col ? 'selected' : ''}`}
                        >
                            <Letter letterPos={col} attemptVal={row} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board