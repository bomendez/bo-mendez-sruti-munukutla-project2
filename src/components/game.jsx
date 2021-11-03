import React, { Component } from 'react';
import Board from './board.jsx';
import ship5x1 from '../images/5x1_ship.png';
import ship4x1 from '../images/4x1_ship.png';
import ship3x1 from '../images/3x1_ship.png';
import ship2x1 from '../images/2x1_ship.png';


 
class Game extends React.Component{
    render(){
        return (
        <div className="container board-wrapper">
            <h1>Battleship</h1>
            <div className="row">
                <div className="col ships-display">
                    <div className="ship"><img src={ship5x1} alt="5x1_ship"/></div>
                    <div className="ship" ><img src={ship4x1} alt="4x1_ship"/></div>
                    <div className="ship" ><img src={ship3x1} alt="3x1_ship"/></div>
                    <div className="ship" ><img src={ship2x1} alt="2x1_ship"/></div>
                    <div className="ship" ><img src={ship2x1} alt="2x1_ship"/></div>
                </div>
                <div className="col-6">
                    <Board/>
                </div>
                <div className="col">
                    Scores
                </div>
            </div>
        </div>);
    }
}
 
export default Game;