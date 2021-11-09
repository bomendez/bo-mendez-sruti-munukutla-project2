import React, { Component } from 'react';
import {Square} from './square';
import {addShip} from '../actions/addShip';
import { useState, useDispatch, useSelector } from 'react-redux';
import {AIRCRAFT_CARRIER, BATTLESHIP, SUBMARINE, DESTROYER, PATROL_BOAT, SIZE_TEN} from './constants';

function Board(props) {
    const dispatch = useDispatch();
    const shipsOnBoard = useSelector(state => state.BoardReducer.ships);
    console.log(shipsOnBoard)
    // const [gridRows, setGridRows] = initializeBoardState();
    let gridRows = initializeBoardState();
    putShipsOnBoard();

    function initializeBoardState(){
        let gridRows = [];
        let id = 0;
         for (let y = 0; y < 10; y++) {
             const rowSquares = [];
             for (let x = 0; x < 10; x++) {
                rowSquares.push(<Square id={id} x_coord={x} y_coord={y}/>);
                id++;
             }
        gridRows.push(<tr>{rowSquares}</tr>);
        }
        console.log(gridRows)
        return gridRows;
    }

    function putShipsOnBoard(){
        for (let i = 2; i < AIRCRAFT_CARRIER + 1; i++) {
            placeOneShip(i)
            if (i === 3) { // two ships have size 3
                placeOneShip(i)
            }
        }
        console.log(props)
    }

    // Helper function to place one ship on board 
    function placeOneShip(shipSize) {
        
        let [randomRow, randomCol] = getRowAndCol(shipSize)
        // check whether ship placement is valid before placing ship
        while (!shipPlacementValid(randomRow, randomCol, shipSize)) {
            let newRowCol = getRowAndCol(shipSize)
            randomRow = newRowCol[0]
            randomCol = newRowCol[1]
        }
        console.log("add ship", randomRow, randomCol)
        grid[randomRow][randomCol] = 'ship'
        console.log("updated ships:", shipsOnBoard)
        
        fillRemainingShipSize(randomRow, randomCol, shipSize)
    }

    // Helper function checking whether a ship can be placed
    // on given location with specified ship length
    function shipPlacementValid(row, col, length) {
        for (let i = col; i < length - 1; i++) {
            if (shipsOnBoard.some(e => e.x_coord === row && e.y_coord === col)) { return false}
        }
        return true
    }

    // Helper function that takes leftmost cell of ship and
    // sets state of squares to the right for length of ship
    function fillRemainingShipSize(row, col, length) {
        for (let i = col + 1; i < length; i++) {
            dispatch(addShip(row, i));
            console.log("fillRemainingShipSize with", row, i)
            console.log("fillRemainingShips:", shipsOnBoard)
        }
    }

    // Helper function to get random row and column values
    function getRowAndCol(shipSize) {
        let randomRow = getRandomInteger(9 - shipSize)
        let randomCol = getRandomInteger(SIZE_TEN)
        return [randomRow, randomCol]
    }

    // Helper function that returns a random integer between
    // 0 and a given maxInt
    function getRandomInteger(maxInt) {
        return Math.floor(Math.random() * maxInt);
    }

    return(
            <table className="board-class"><tbody>{gridRows}</tbody></table>
    )

}

export default Board;