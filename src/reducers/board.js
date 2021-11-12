import { BOARD_CLICK, RESTART, SWITCH_TURNS } from "../actions/constants";
import { AIRCRAFT_CARRIER, SIZE_TEN } from "../components/constants";

function initialStateFunc() {
  const initialState = {
    clickedSquares: [],
    ships: [],
    scores: {
      userScore: 0,
      aiScore: 0,
    },
    userTurn: true,
    winner: "",
  };

  let gridRows = initializeBoardState();
  putShipsOnBoard();

  function initializeBoardState() {
    let gridRows = [];
    let id = 0;
    for (let y = 0; y < 10; y++) {
      const rowSquares = [];
      for (let x = 0; x < 10; x++) {
        rowSquares.push(id);
        id++;
      }
      gridRows.push(rowSquares);
    }
    console.log("gridRows", gridRows);
    return gridRows;
  }

  function putShipsOnBoard() {
    for (let i = 2; i < AIRCRAFT_CARRIER + 1; i++) {
      placeOneShip(i);
      if (i === 3) {
        // two ships have size 3
        placeOneShip(i);
      }
    }
  }

  // Helper function to place one ship on board
  function placeOneShip(shipSize) {
    let [randomRow, randomCol] = getRowAndCol(shipSize);
    // check whether ship placement is valid before placing ship
    while (!shipPlacementValid(randomRow, randomCol, shipSize)) {
      let newRowCol = getRowAndCol(shipSize);
      randomRow = newRowCol[0];
      randomCol = newRowCol[1];
    }
    console.log("add ship", randomRow, randomCol);
    gridRows[randomRow][randomCol] = "ship";
    initialState.ships.push({ x_coord: randomCol, y_coord: randomRow });

    fillRemainingShipSize(randomRow, randomCol, shipSize);
  }

  // Helper function checking whether a ship can be placed
  // on given location with specified ship length
  function shipPlacementValid(row, col, length) {
    for (let i = col; i < length - 1; i++) {
      if (
        initialState.ships.some((e) => e.x_coord === row && e.y_coord === col)
      ) {
        return false;
      }
    }
    return true;
  }

  // Helper function that takes leftmost cell of ship and
  // sets state of squares to the right for length of ship
  function fillRemainingShipSize(row, col, length) {
    let currCol = col + 1;
    for (let i = 0; i < length - 1; i++) {
      gridRows[row][currCol] = "ship";
      initialState.ships.push({ x_coord: currCol, y_coord: row });
      currCol++;
    }
  }

  // Helper function to get random row and column values
  function getRowAndCol(shipSize) {
    let randomRow = getRandomInteger(SIZE_TEN);
    let randomCol = getRandomInteger(9 - shipSize);
    return [randomRow, randomCol];
  }

  // Helper function that returns a random integer between
  // 0 and a given maxInt
  function getRandomInteger(maxInt) {
    return Math.floor(Math.random() * maxInt);
  }

  initialState.board = gridRows;
  console.log("initial state", initialState);
  return initialState;
}

// REDUCER STARTS HERE
export const BoardReducer = (state, action) => {
  if (state === undefined) {
    return initialStateFunc();
  }

  if (
    action.type === BOARD_CLICK &&
    //avoid already clicked squares being added to the list of visited squares
    !state.clickedSquares.some(
      (e) =>
        e.x_coord === action.payload.x_coord &&
        e.y_coord === action.payload.y_coord
    )
  ) 
  {
    return {
      ...state,
      clickedSquares: [
        ...state.clickedSquares,
        {
          x_coord: action.payload.x_coord,
          y_coord: action.payload.y_coord,
        },
      ],
    };
  }
  if (
    action.type === RESTART
  ) {
    return initialStateFunc();
  }
  if (
    action.type === SWITCH_TURNS
  ) {
    console.log(state.userTurn)
    return {
      ...state,
      userTurn: !state.userTurn,
    }
  }
  return state;
};
