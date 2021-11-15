import React, { Component } from 'react';
import Board from './board.jsx';
import Restart from './restart.jsx';
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
                <div className={'col-6 ' + leftClassStat}>
                    <Board player_id ="0"/>
                </div>
                <div className={'col-6 ' + rightClassStat}>
                    <Board player_id="1"/>
                </div>
            </div>
        </div>);
}
 
export default Game;