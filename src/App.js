// src/App.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css"; // Make sure to import the custom styles

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <h1 className="text-7xl font-extrabold text-white mb-5 text-shadow">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-4">
        {board.map((value, index) => (
          <motion.button
            key={index}
            className={`w-24 h-24 text-5xl font-bold rounded-lg transition duration-300 transform shadow-md
              ${value === "X" ? "bg-red-300 text-red-800" : "bg-green-300 text-green-800"}
              hover:scale-105 hover:shadow-xl`}
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {value}
          </motion.button>
        ))}
      </div>

      {/* Enhanced Winner Display */}
      {winner && (
        <motion.div
          className="mt-5 text-5xl text-white font-extrabold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className={`text-6xl ${winner === "X" ? "text-red-400" : "text-green-400"}`}>{`Winner: ${winner}`}</p>
          <motion.button
            className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={resetGame}
          >
            Reset Game
          </motion.button>
        </motion.div>
      )}

      {/* Draw Display */}
      {!winner && board.every(Boolean) && (
        <motion.div
          className="mt-5 text-5xl text-white font-extrabold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-6xl">It's a Draw!</p>
          <motion.button
            className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={resetGame}
          >
            Reset Game
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

const calculateWinner = (squares) => {
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
};

const App = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
