import React, { useState, useRef } from 'react'
import './TicTacToe.css';
import Modal from './Components/Modal'

const Cell = ({ num, cells, handleClick }) => {
  return <td onClick={() => handleClick(num, cells)}>{cells[num]}</td>
}

export function TicTacToe() {
  const reiniciar = (squares) => {
    console.log('paso 1');
    setCells(Array(9).fill(''));
    setWinner('');
    btn.current.click();
  }
  let btn = useRef();
  const [turn, setTurn] = useState('x');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState(null);

  const [scoreX, setScoreX] = useState(0)
  const [scoreO, setScoreO] = useState(0)

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6]
      ]
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
          if (squares[pattern[0]] === 'x') {
            setScoreX(scoreX + 1);
            reiniciar();
          }
          else if (squares[pattern[0]] === 'o') {
            setScoreO(scoreO + 1);
            reiniciar();
          }
        }
        else { }

      });
    }
  };

  const handleClick = (num, cells) => {
    let squares = [...cells];

    if (turn === 'x' && squares[num] === '') {
      squares[num] = 'x';
      setTurn('o')

    }
    else if (squares[num] === '') {
      squares[num] = 'o';
      setTurn('x');
    }

    checkForWinner(squares);
    setCells(squares);
    console.log(squares);
  }

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const updatePlayer1 = (e) => {
    setPlayer1(e.target.value)
    console.log(player1)
  }

  const UpdatePlayer2 = (e) => {
    setPlayer2(e.target.value)
    console.log(player2)
  }




  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Modal className="outter-modal" open={isOpen}>
        <div className='inner-modal'>
          <div>
            <p className='texto-jugador'>jugador 1:</p>
            <input className='input-jugador' onChange={updatePlayer1}></input>
          </div>
          <div>
            <p className='texto-jugador'>jugador 2:</p>
            <input className='input-jugador' onChange={UpdatePlayer2}></input>
          </div>
          <button className='boton-jugar' onClick={() => setIsOpen(false)}>Jugar!</button>
        </div>
      </Modal>
      <div className='container'>
        <h1 className='titulo'>Tic Tac Toe in React.js</h1>
        <h2 className='subtitulo'>It is {turn} turn!</h2>
        <table className='table'>
          <tbody className='tbody'>
            <tr>
              <Cell num={0} cells={cells} handleClick={handleClick} />
              <Cell num={1} cells={cells} handleClick={handleClick} />
              <Cell num={2} cells={cells} handleClick={handleClick} />
            </tr>
            <tr>
              <Cell num={3} cells={cells} handleClick={handleClick} />
              <Cell num={4} cells={cells} handleClick={handleClick} />
              <Cell num={5} cells={cells} handleClick={handleClick} />
            </tr>
            <tr>
              <Cell num={6} cells={cells} handleClick={handleClick} />
              <Cell num={7} cells={cells} handleClick={handleClick} />
              <Cell num={8} cells={cells} handleClick={handleClick} />
            </tr>
          </tbody>
        </table>
        {
          winner && (
            <>
              {winner} es el ganador!

            </>
          )
        }
        <div className='puntaje'>Puntaje {player1} (X): {scoreX}</div>
        <div className='puntaje'>Puntaje {player2} (O): {scoreO}</div>
        <button className='boton-reiniciar' onClick={() => reiniciar()} ref={btn}>Reiniciar</button>
      </div >
    </>
  )
}

export default TicTacToe;