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
    const aiPlayed = board_state.player_one.aiPlayed;
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
        opponentShipsOnBoard = board_state.player_zero.ships;
        opponentListVisitedSquares = board_state.player_zero.clickedSquares;
        
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

    
    // if(props.player_id === "0"){
    //     console.log("caaling")
    //     setUnselectedState();
    //     setHitOrMiss();
    // }

    if (unselected) {
        colorClass = 'unclicked';
    } else if (hit) {
        colorClass = 'hitSquare';
        icon = "fa fa-bomb";
    } else if (miss) {
        colorClass = 'clickedBox';
        icon = "fa fa-check-square";
    }


    let lastInserted = listVisitedSquares[listVisitedSquares.length-1];
        console.log("lastInserted", lastInserted)
        if(props.player_id==="0" && aiPlayed){
            if(props.x_coord === lastInserted.x_coord && props.y_coord === lastInserted.y_coord){
                dispatch(switchTurns(0))
                setUnselected(false)
            }
    }



    //functions to set the states of the square
   
    function setUnselectedState(){
        if(listVisitedSquares.some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)) {
            setUnselected(true);
        }
    }

    function checkCoordinateIsShip(ship) {
        if (shipsOnBoard[ship].some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)) {
            return true;
        }
        return false;
    }

    function checkisShipClick(){
        let isClick;
        for(let ship in shipsOnBoard){
            isClick = checkCoordinateIsShip(ship);
        }
        return isClick;
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


    function setMouseEnter() {
        setHover(true);
    }

    function setMouseLeave() {
        setHover(false)
    }

    // function aiTurn() {
    //     console.log("aiClick()");
    //     let x = getRandomInteger(10)
    //     let y = getRandomInteger(10)
    //     while (isSelected(x, y)) {
    //         // get random number unselected
    //         x = getRandomInteger(10)
    //         y = getRandomInteger(10)
    //     }
    //     let hitShip = setHitOrMiss();
    //     dispatch(boardClick(x, y, "1", hitShip));
    //     setTimeout(function() {
    //         //your code to be executed after 1 second
    //       }, 2000);
    //     let nextTurn = playerTurn === 0 ? 1 : 0;
    //     setUnselected(false);
    //     console.log("from square.jsx, next player is: player ", nextTurn)
    //     changePlayer(nextTurn);
    // }

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
                console.log("inside the handle click current player is:", playerTurn, "board id is:", props.player_id)
                console.log("Current square coord", props.x_coord, props.y_coord, "board", props.player_id)
                let nextTurn = playerTurn === 0 ? 1 : 0;
                changePlayer(nextTurn);
                //aiTurn();
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
    // function isSelected(x_coord, y_coord) {
    //     console.log("AI check x:", x_coord, "y:", y_coord)
    //     if (board_state.player_zero.clickedSquares.some(
    //         e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)) {
    //         console.log("AI check already selected")
    //         return true;
    //     }
    //     console.log("AI check unselected")
    //     return false;
    // }

    // Helper function that returns a random integer between
    // 0 and a given maxInt
    // function getRandomInteger(maxInt) {
    //     return Math.floor(Math.random() * maxInt);
    // }

    
    function handleAI() {

    }

    return (
        //change to include  onhover event next
        <td className={hover ? hoverClass : colorClass} id={props.id} onClick={handleClick} onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave}>
            <i class={icon}></i>
        </td>
    )

}
