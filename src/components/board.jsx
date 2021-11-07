import React, { Component } from 'react';
import {Square} from './square';
import {AIRCRAFT_CARRIER, BATTLESHIP, SUBMARINE, DESTROYER, PATROL_BOAT, SIZE_TEN} from './constants';


class Board extends React.Component {
    render() { 
         let gridRows = this.initializeBoardState();
         this.putShipsOnBoard(gridRows);
         
        return (
            <table className="board-class"><tbody>{gridRows}</tbody></table>
            );
    }

    initializeBoardState(){
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

    putShipsOnBoard(gridRows){
        for (let i = 2; i < AIRCRAFT_CARRIER + 1; i++) {
            this.placeOneShip(gridRows, i)
            if (i === 3) { // two ships have size 3
                this.placeOneShip(gridRows, i)
            }
        }
        console.log(this.props)
    }

    /*
    * Helper function to place one ship on board
    */
    placeOneShip(gridRows, shipSize) {
        let randomRow, randomCol = this.getRowAndCol(shipSize)
        // check whether ship placement is valid before placing ship
        while (!this.shipPlacementValid(gridRows, randomRow, randomCol, shipSize)) {
            randomRow = this.getRowAndCol(shipSize)[0]
            randomCol = this.getRowAndCol(shipSize)[1]
            // not sure why line below returns error
            // randomRow, randomCol = this.getRowAndCol(shipSize)
        }
        gridRows[randomRow][randomCol] = 'ship'
        this.fillRemainingShipSize(gridRows, randomRow, randomCol, shipSize)
    }

    /*
    * Helper function checking whether a ship can be placed
    * on given location with specified ship length
    */
    shipPlacementValid(gridRows, row, col, length) {
        for (let i = col; i < length - 1; i++) {
            if (gridRows[row][col] === 'ship') { return false}
        }
        return true
    }

    /*
    * Helper function that takes leftmost cell of ship and
    * sets state of squares to the right for length of ship
    */
    fillRemainingShipSize(gridRows, row, col, length) {
        for (let i = col + 1; i < length; i++) {
            gridRows[row][i] = 'ship'
        }
    }

    /*
    * Helper function to get random row and column values
    */
    getRowAndCol(shipSize) {
        let randomRow = this.getRandomInteger(shipSize)
        let randomCol = this.getRandomInteger(SIZE_TEN)
        return randomRow, randomCol
    }

    /*
    * Helper function that returns a random integer between
    * 0 and a given maxInt
    */
    getRandomInteger(maxInt) {
        return Math.floor(Math.random() * maxInt);
      }
}
 
export default Board;