import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameResult = calculateWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className='flex justify-center'>
      <div className='text-center items-center'>
        <h1 className='text-white text-7xl font-semibold'>
          Tic <span className='text-blue-700'>Tac</span> Toe
        </h1>
        <div className='mt-6 mb-10 relative'>
          <div className='flex flex-col gap-4 justify-center'>
            {[0, 3, 6].map(rowStart => (
              <div key={rowStart} className='flex gap-4 justify-center'>
                {[0, 1, 2].map(col => {
                  const index = rowStart + col;
                  return (
                    <div
                      key={index}
                      className='h-24 w-24 rounded-lg bg-blue-950 flex items-center justify-center text-4xl text-white'
                      onClick={() => handleClick(index)}
                    >
                      {board[index]}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {winner && (
            <div className='absolute inset-0 flex justify-center top-0 left-0 right-0 bottom-0 backdrop-blur   rounded-lg items-center'>
              <div className='text-4xl text-white'>
                Winner: {winner.winner}
              </div>
            </div>
          )}
        </div>
        <button
          className='cursor-pointer text-blue-700 font-semibold border-solid border-2 border-blue-700 px-6 rounded-full py-2'
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
