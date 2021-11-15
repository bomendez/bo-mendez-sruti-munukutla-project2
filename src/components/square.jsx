import React, { Component } from 'react';
import '../square.css';
import {boardClick} from '../actions/board';
import {switchTurns} from '../actions/player'
import { useDispatch, useSelector } from 'react-redux';

export function Square(props){
    
    // state = {
    //     Unselected: false,
    //     HitShip: false,
    //     Miss: false,
    //     Hover: false
    // }
    const dispatch = useDispatch();

    const board_state = useSelector(state => state.BoardReducer);
    let shipsOnBoard;
    let listVisitedSquares;
    console.log(props);
    if(props.player_id === '0'){
        // const player = board_state.player_zero;
         shipsOnBoard = board_state.player_zero.ships;
         listVisitedSquares = board_state.player_zero.clickedSquares;
    }else{
        // const player = board_state.player_one;
         shipsOnBoard = board_state.player_one.ships;
         listVisitedSquares = board_state.player_one.clickedSquares;

    }
    const playerTurn = useSelector(state => state.PlayerReducer.player_turn);
    let colorClass = 'unclicked';
    for(let ship in shipsOnBoard){
        if(shipsOnBoard[ship].some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)){
            colorClass  = 'ship';
        }
    }
    
    if(listVisitedSquares.some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)){
           colorClass  = 'clickedBox';
    }

    function handleClick() {
        console.log("handleClick()");
        dispatch(boardClick(props.x_coord, props.y_coord, props.player_id));
        let nextTurn = playerTurn === 0? 1 : 0;
        console.log("from square.jsx, player is: ", nextTurn)
        dispatch(switchTurns(nextTurn));
    }

    return(
            //change to include  onhover event next

     <td className={colorClass} id={props.id} onClick={handleClick}></td>
    )
    
    // makeSquareVisited(){
    //     this.setState({visited: true});
    //     document.getElementById(this.props.id).style.backgroundColor = "coral";
    // }
}
