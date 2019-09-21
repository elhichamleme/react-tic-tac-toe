import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

const Square = ({ value, onClick}) => 
<button className="square" onClick={onClick}>
        {value}
      </button>
    
  


class Board extends React.Component {

  
  renderSquare(i) {
    const { squares, onClick } = this.props
    return <Square value={squares[i]} onClick={()=>onClick(i)} />;
  }

  render() {
    

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        player: 'X'
      }]
    }
  }

   handleClick = i =>{
   const { history } = this.state
    const {squares, player} = history[history.length-1]
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
   const newSquares = squares.slice()
  
   newSquares[i]= player
   const newPlayer = player==='X'? 'O':'X'
   const newHistory = history.concat({ squares: newSquares, player: newPlayer })
   this.setState({ history: newHistory})
 }

 jumpTo = index =>{
   const { history } = this.state
   const newHistory = history.slice(0, index+1)
   this.setState({ history: newHistory})
 }

  render() {
    const { history } = this.state
    const {squares, player} = history[history.length-1]
    const winner = calculateWinner(squares);
    const moves = history.slice(1).map((step, move) => {
      const desc = move ?
        `Go to move number ${move}`:
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${player}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} player={player} 
          onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

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

render(<Game />, document.getElementById('root'));
