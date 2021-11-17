import React, { Component } from 'react';
import Board from './board.jsx';
import Restart from './restart.jsx';
import { useSelector } from 'react-redux';


 
function Game() {
        const boardStats = useSelector(state => state.BoardReducer);
        const playerTurn = useSelector(state => state.PlayerReducer.player_turn);
        let playerZeroWins = false;
        let playerOneWins = false;
        let player_one_score = boardStats.player_one.score;
        let player_zero_score= boardStats.player_zero.score;
        let winnerBoardClass = 'NoWinner';
        if(player_one_score === 0){
            playerZeroWins = true;
            winnerBoardClass = 'WinnerBoard';
        }else if(player_zero_score === 0){
            playerOneWins = true;
            winnerBoardClass = 'WinnerBoard';
        }

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
            <div className="ScoreBoard">ScoreBoard: 
            Player: {playerTurn} <span> </span>
            Score: {playerTurn === 0 ? (17 - boardStats.player_one.score): (17- boardStats.player_zero.score)}</div>
            <div className={winnerBoardClass}>Player {playerZeroWins ? 0 : 1} wins the game</div>
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