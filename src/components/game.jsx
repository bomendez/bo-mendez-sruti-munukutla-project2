import React, { Component } from 'react';
import Board from './board.jsx';
import Restart from './restart.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { switchTurns } from '../actions/player';
import { boardClick } from '../actions/board';

 
function Game() {
        const boardStats = useSelector(state => state.BoardReducer);
        const playerTurn = useSelector(state => state.PlayerReducer.player_turn);
        const isFreePlay = useSelector(state => state.BoardReducer.gameType.freePlay);
    const board_state = useSelector(state => state.BoardReducer);
        //winner logic

        const dispatch = useDispatch();

        function getRandomInteger(maxInt) {
            return Math.floor(Math.random() * maxInt);
          }
        
          function isSelected(x_coord, y_coord) {
            console.log("AI check x:", x_coord, "y:", y_coord)
            if (board_state.player_zero.clickedSquares.some(
                e => e.x_coord === x_coord && e.y_coord === y_coord)) {
                console.log("AI check already selected")
                return true;
            }
            console.log("AI check unselected")
            return false;
        }
        
        
        function checkCoordinateIsShip(x, y) {
          let opponentShips = board_state.player_zero.ships;
          for(let ship in opponentShips){
            if (opponentShips[ship].some(e => e.x_coord === x && e.y_coord === y)) {
                return true;
            }
          }
            return false;
          }
        
          function aiTurn() {
            console.log("aiClick()");
            // let x = getRandomInteger(10)
            // let y = getRandomInteger(10)
            let x = 7;
            let y = 7;
            //let result = isSelected(7, 8);
            // while (!result) {
            //     // get random number unselected
            //     x = getRandomInteger(10)
            //     y = getRandomInteger(10)
            //     result = isSelected(x,y)
            // }
            let hitShip = checkCoordinateIsShip(x, y);
            dispatch(boardClick(x, y, "0", hitShip));
            setTimeout(function() {
                //your code to be executed after 1 second
                let nextTurn = playerTurn === 0 ? 1 : 0;
                dispatch(switchTurns(nextTurn));
              }, 2000);
            //console.log("ai played from board.jsx, player is: player ", playerTurn, 'board is:', props.player_id)
          }
        
          if(playerTurn == 1){
            aiTurn();
          }
        
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
                    <Board player_id ="0"/>
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
                    <Board player_id ="0"/>
                </div>
                
                <div className={'col-lg-6 col-md-12 col-sm-12 ' + rightClassStat}>
                    <Board player_id="1"/>
                </div>
            </div>
        </div>);
        }
}
 
export default Game;