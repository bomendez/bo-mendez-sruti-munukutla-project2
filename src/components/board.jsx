import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Square } from "./square";



function Board(props) {
  const board = initializeBoardState();
  

  function initializeBoardState() {
    let gridRows = [];
    let id = 0;
    for (let y = 0; y < 10; y++) {
      const rowSquares = [];
      for (let x = 0; x < 10; x++) {
        rowSquares.push(<Square id={id} x_coord={x} y_coord={y} player_id={props.player_id}/>);
        id++;
      }
      gridRows.push(<tr>{rowSquares}</tr>);
    }

    // console.log(gridRows);
    return gridRows;
  }


  return (
    <div class="table-responsive">
    <table className="board-class">
      <tbody>{board}</tbody>
    </table>
    </div>
  );
}

export default Board;
