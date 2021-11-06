import React, { Component } from 'react';
import {Square} from './square';


class Board extends React.Component {
    render() { 
         let gridRows = this.initializeBoardState();
         this.putShipsOnBoard();
         
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
        return gridRows;
    }


    putShipsOnBoard(){
        // for (let i =0; i < 17; i++){
        //     let randomInt = this.getRandomInteger(100)
            
        // }
        console.log(this.props)
    }

    getRandomInteger(maxInt) {
        return Math.floor(Math.random() * maxInt);
      }
}
 
export default Board;