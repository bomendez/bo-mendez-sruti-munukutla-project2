import React, { Component } from 'react';
import Board from './board.jsx';
import Restart from './restart.jsx';
import { useSelector } from 'react-redux';


 
function Game() {
        const boardStats = useSelector(state => state.BoardReducer);
        const playerTurn = useSelector(state => state.PlayerReducer.player_turn);
        const isFreePlay = useSelector(state => state.BoardReducer.gameType.freePlay);
        //winner logic
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
        //board display switch based on turn
        let leftClassStat = '';
        let rightClassStat = '';
        if(!playerTurn){
            leftClassStat = 'classOverlay';
            rightClassStat = 'highlight';
        }else{
            rightClassStat = 'classOverlay';
            leftClassStat = 'highlight';
        }
        if(isFreePlay){
            return(
                <div className="container board-wrapper">
                <h1>Battleship</h1>            
                <Restart/>
                <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <h1>Scoreboard</h1>
                    <div className="ScoreBoard">          
                    Ships Hit: {(17- boardStats.player_zero.score)}</div>
                    <div className={winnerBoardClass}> Congratulations! You hit all ships</div>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                    <Board player_id={0}/>
                </div>
                </div>
            </div>);
        }else{
        return (
        <div className="container board-wrapper">
            <h1>Battleship</h1>            
            
            <div className="ScoreBoard">ScoreBoard: 
            Player: {playerTurn} <span> </span>
            Score: {playerTurn === 0 ? (17 - boardStats.player_one.score): (17- boardStats.player_zero.score)}</div>
            <div className={winnerBoardClass}>Player {playerZeroWins ? 0 : 1} wins the game</div>
            <Restart/>
            <div className="row">
                <div className={'col-lg-6 col-md-12 col-sm-12 ' + leftClassStat}>
                    <Board player_id ={0}/>
                </div>
                
                <div className={'col-lg-6 col-md-12 col-sm-12 ' + rightClassStat}>
                    <Board player_id={1}/>
                </div>
            </div>
        </div>);
        }
}
 
export default Game;