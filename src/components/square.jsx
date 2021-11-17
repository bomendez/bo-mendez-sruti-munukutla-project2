import React, { Component } from 'react';
import '../square.css';
import { boardClick } from '../actions/board';
import { switchTurns } from '../actions/player';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Square(props) {
    const [unselected, setUnselected] = useState(true);
    const [hit, setHit] = useState(false);
    const [miss, setMiss] = useState(false);
    const [hover, setHover] = useState(false);

    const dispatch = useDispatch();

    const board_state = useSelector(state => state.BoardReducer);
    const playerTurn = useSelector(state => state.PlayerReducer.player_turn);

    let shipsOnBoard;
    let listVisitedSquares;
    let opponentShipsOnBoard;
    let opponentListVisitedSquares;
    //console.log(props);
    //depending on the Board of player, display Board details
    if (props.player_id === '0') {
        shipsOnBoard = board_state.player_zero.ships;
        listVisitedSquares = board_state.player_zero.clickedSquares;
        opponentShipsOnBoard = board_state.player_one.ships;
        opponentListVisitedSquares = board_state.player_one.clickedSquares;
    } else {
        shipsOnBoard = board_state.player_one.ships;
        listVisitedSquares = board_state.player_one.clickedSquares;
        opponentShipsOnBoard = board_state.player_zero.ships;
        opponentListVisitedSquares = board_state.player_zero.clickedSquares;
    }
    let colorClass = 'unclicked';

    let icon = "";

    //iterate through all squares and check that there is a ship
    for (let ship in shipsOnBoard) {
        if (checkCoordinateIsShip(ship)) {
            colorClass = 'ship';
            icon = "fas fa-ship";
        }
    }

    //check if the clicked co-ordinate is a ship on currently active board
    function checkCoordinateIsShip(ship) {
        if (shipsOnBoard[ship].some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)) {
            return true;
        }
        return false;
    }


   
    if (listVisitedSquares.some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)) {
        colorClass = 'clickedBox';
        icon = "far fa-check-square";

    }

    function handleClick() {
        let hitShip = setHitOrMiss();
        dispatch(boardClick(props.x_coord, props.y_coord, props.player_id,hitShip));
        let nextTurn = playerTurn === 0 ? 1 : 0;
        setUnselected(false);
        //console.log("from square.jsx, player is: ", nextTurn)
        dispatch(switchTurns(nextTurn));
    }

    function setHitOrMiss() {
        for (let ship in shipsOnBoard) {
            if (checkCoordinateIsShip(ship)) {
                setHit(true);
                return true;
            }
        }
        setMiss(true);
        return false;
    }
    return (
        //change to include  onhover event next
        <td className={colorClass} id={props.id} onClick={handleClick}>
            <i class={icon}></i>
        </td>
    )

    // makeSquareVisited(){
    //     this.setState({visited: true});
    //     document.getElementById(this.props.id).style.backgroundColor = "coral";
    // }
}
