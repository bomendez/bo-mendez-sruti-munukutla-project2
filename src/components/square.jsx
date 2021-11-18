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
    const isFreePlay = useSelector(state => state.BoardReducer.gameType.freePlay);
    const dispatch = useDispatch();

    const board_state = useSelector(state => state.BoardReducer);
    const playerTurn = useSelector(state => state.PlayerReducer.player_turn);

    let shipsOnBoard;
    let listVisitedSquares;
    let opponentShipsOnBoard;
    let opponentListVisitedSquares;

    //depending on the Board of player, display Board details
    if (props.player_id === '0') {
        shipsOnBoard = board_state.player_zero.ships;
        listVisitedSquares = board_state.player_zero.clickedSquares;
        //opponentShipsOnBoard = board_state.player_one.ships;
        //opponentListVisitedSquares = board_state.player_one.clickedSquares;
    } else {
        shipsOnBoard = board_state.player_one.ships;
        listVisitedSquares = board_state.player_one.clickedSquares;
        //opponentShipsOnBoard = board_state.player_zero.ships;
        //opponentListVisitedSquares = board_state.player_zero.clickedSquares;
    }
    let colorClass;
    let hoverClass = 'hoverClass';

    let icon = "";

    for (let ship in shipsOnBoard) {
        //use of == where string and int can be compared
        // no need to display ships for freeplay, display ships for player's own board
        if (checkCoordinateIsShip(ship) && props.player_id == playerTurn && !isFreePlay) {
            colorClass = 'ship';
            icon = "fa fa-ship";
        }
    }

    if (unselected) {
        colorClass = 'unclicked';
    } else if (hit) {
        colorClass = 'hitSquare';
        icon = "fa fa-bomb";
    } else if (miss) {
        colorClass = 'clickedBox';
        icon = "fa fa-check-square";
    }



    //helper function to check co-ordinate/square has ship
    function checkCoordinateIsShip(ship) {
        if (shipsOnBoard[ship].some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)) {
            return true;
        }
        return false;
    }

    //iterate through all squares and set board visibilities based on current player & board id


    //for free play, dont diplay ships at all
    if (isFreePlay) {
        for (let ship in shipsOnBoard) {
            if (checkCoordinateIsShip(ship)) {
                if (unselected) {
                    colorClass = 'unclicked';
                }
            }
        }
    }

    // for (let ship in opponentShipsOnBoard) {
    //     if (checkCoordinateIsShip(ship)) {
    //         //colorClass = 'ship';
    //         //icon = "fa fa-ship";
    //         colorClass = 'unclicked';
    //         icon = '';
    //     }
    // }

    // for (let ship in shipsOnBoard) {
    //     if (checkCoordinateIsShip(ship)) {
    //         colorClass = 'ship';
    //         icon = "fa fa-ship";

    //     }
    // }

    //check if the clicked co-ordinate is a ship on currently active board


    //set diplay based on board state

    //on hover event handler state change to be added
    // }else if(hover){
    // }

    function setMouseEnter() {
        setHover(true);
    }

    function setMouseLeave() {
        setHover(false)
    }

    function aiTurn() {
        console.log("aiClick()");
        let x = getRandomInteger(10)
        let y = getRandomInteger(10)
        while (!isUnselected(x, y)) {
            // get random number unselected
            x = getRandomInteger(10)
            y = getRandomInteger(10)
        }
        let hitShip = setHitOrMiss();
        dispatch(boardClick(x, y, "1", hitShip));

        let nextTurn = playerTurn === 0 ? 1 : 0;
        setUnselected(false);
        console.log("from square.jsx, player is: ai", nextTurn)
        changePlayer(nextTurn);
    }

    function changePlayer(nextTurn) {
        dispatch(switchTurns(nextTurn));
    }

    function handleClick() {
        let hitShip = setHitOrMiss();
        //if sqaure is already selected, ignore further actions/clicks
        if (unselected) {
            dispatch(boardClick(props.x_coord, props.y_coord, props.player_id, hitShip));

            //for free play, no need to switch turns since there is only one player
            if (!isFreePlay) {
                let nextTurn = playerTurn === 0 ? 1 : 0;
                changePlayer(nextTurn);
            }
            setUnselected(false);
        }
        // console.log("from square.jsx, player is: ", nextTurn)
        // dispatch(switchTurns(nextTurn));

        // if (playerTurn === 0) {

        // }
        // aiTurn();
    }

    // Helper function that checks whether a square is unselected
    function isUnselected(x_coord, y_coord) {
        console.log("AI check x:", x_coord, "y:", y_coord)
        if (board_state.player_one.clickedSquares.some(
            e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)) {
            console.log("AI check already selected")
            return false;
        }
        console.log("AI check unselected")
        return true;
    }

    // Helper function that returns a random integer between
    // 0 and a given maxInt
    function getRandomInteger(maxInt) {
        return Math.floor(Math.random() * maxInt);
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

    function handleAI() {

    }

    return (
        //change to include  onhover event next
        <td className={hover ? hoverClass : colorClass} id={props.id} onClick={handleClick} onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave}>
            <i class={icon}></i>
        </td>
    )

}
