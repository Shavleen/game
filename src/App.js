import { useState } from 'react';
import "./App.css"; //connects to the css file


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  /*
    - setSquares function gives React state of the component and whether it changed
    - i takes the index of the square to update
  */

 //checks if game has been won
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //game con't creates new array 
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

//determines winner by passing current state of board
  const winner = calculateWinner(squares);

  //gives game status message to indicate winner
  let status;
  //checks for winner if not then next person's turn
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {/*handleClick updates the nextSquares array 
        - adds X to the first ([0] index) square
        - index of the squares to be handled
        - arrow function shorter way to define functions
        - click square code after -> runs calls function after
      */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//defines component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);  //initial state of game
  const [currentMove, setCurrentMove] = useState(0); //current move state 
  const xIsNext = currentMove % 2 === 0;  //whose turn it is 
  const currentSquares = history[currentMove];  //state based on move number

  //handles the player's moves
  function handlePlay(nextSquares) {

    //new copy of game with new move added 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);  //updates game
    setCurrentMove(nextHistory.length - 1); //current move using array
  }

  //goes to next move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //jumps to the move that is selected
  //helps determine move number 
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //div helps to keep stuff in order for game, game board and game info
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


//checks winning combinations
//returns winner if correct combo is there or null if not
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}