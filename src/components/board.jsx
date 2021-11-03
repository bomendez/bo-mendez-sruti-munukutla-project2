import React, { Component } from 'react';
import Square from './square.jsx';


class Board extends React.Component {
    render() { 
         let gridRows = [];
         let id = 0;
         for (let y = 0; y < 10; y++) {
             const rowSquares = [];
             for (let x = 0; x < 10; x++) {
                rowSquares.push(<Square id={id} x-co-ord={x} y-co-ord={y}/>);
                id++;
             }
        gridRows.push(<tr>{rowSquares}</tr>);
        }
        return (
            <table className="board-class"><tbody>{gridRows}</tbody></table>
            );
    }
}
 
export default Board;