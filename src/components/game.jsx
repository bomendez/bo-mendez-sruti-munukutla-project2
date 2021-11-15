import React, { Component } from 'react';
import Board from './board.jsx';
import Restart from './restart.jsx';
import ship5x1 from '../images/5x1_ship.png';
import ship4x1 from '../images/4x1_ship.png';
import ship3x1 from '../images/3x1_ship.png';
import ship2x1 from '../images/2x1_ship.png';
import { useSelector } from 'react-redux';


 
function Game() {
        const playerTurn = useSelector(state => state.PlayerReducer.player_turn);
        let leftClassStat = '';
        let rightClassStat = '';
        if(!playerTurn){
            leftClassStat = 'classOverlay';
            rightClassStat = 'highlight';
        }else{
            rightClassStat = 'classOverlay';
            leftClassStat = 'highlight';
        }
        return (
        <div className="container board-wrapper">
            <h1>Battleship</h1>            
            <div className="ScoreBoard">ScoreBoard: Player: {playerTurn}</div>
            <Restart/>
            <div className="row">
                {/* <div className="col ships-display">
                    <div className="ship"><img src={ship5x1} alt="5x1_ship"/></div>
                    <div className="ship" ><img src={ship4x1} alt="4x1_ship"/></div>
                    <div className="ship" ><img src={ship3x1} alt="3x1_ship"/></div>
                    <div className="ship" ><img src={ship2x1} alt="2x1_ship"/></div>
                    <div className="ship" ><img src={ship2x1} alt="2x1_ship"/></div>
                </div> */}
                <div className={'col-6 ' + leftClassStat}>
                    <Board player_id ="0"/>
                </div>
                <div className={'col-6 ' + rightClassStat}>
                    <Board player_id="1"/>
                </div>
                {/* <div className="col">
                    Scores
                </div> */}
            </div>
        </div>);
}
 
export default Game;