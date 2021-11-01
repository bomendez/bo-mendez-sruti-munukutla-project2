import React, { Component } from 'react';
import Square from './square.jsx';


class Board extends React.Component {
    render() { 
              // Build the rows in an array
         let gridRows = [];
         for (let y = 0; y < 10; y++) {
        //     // Build the cells in an array
             const rowSquares = [];
             for (let x = 0; x < 10; x++) {
                rowSquares.push(<Square />);
             }
        //     // Put them in the row
        gridRows.push(<tr>{rowSquares}</tr>);
         }
        // Return the table
        return (<div class="container board-wrapper">
            <h1>Battleship</h1>
            <table className="board-class"><tbody>{gridRows}</tbody></table>
            </div>);
    }
}
 
export default Board;
// ReactDOM.render(
//     <Board />,
//     document.getElementById("react")
// );