import { BOARD_CLICK, RESTART } from "../actions/constants";
import { AIRCRAFT_CARRIER, SIZE_TEN } from "../components/constants";

function initialStateFunc() {
  const initialState = {
    clickedSquares: [],
    ships: {},
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
    return gridRows;
  }

  function putShipsOnBoard() {
    for(let ship in ships){
      placeOneShip(ship, ships[ship])
    }
  }

  // Helper function to place one ship on board
  function placeOneShip(shipType, shipSize) {
    let isVertical = getRandomInteger(2);
    
    let [randomRow, randomCol] = getRowAndCol(shipSize, isVertical);
    // check whether ship placement is valid before placing ship
    while (!shipPlacementValid(randomRow, randomCol, shipSize, isVertical)) {
      let newRowCol = getRowAndCol(shipSize);
      randomRow = newRowCol[0];
      randomCol = newRowCol[1];
    }
    gridRows[randomRow][randomCol] = "ship";
      initialState.ships[shipType] = []
      initialState.ships[shipType].push({ x_coord: randomCol, y_coord: randomRow });

    fillRemainingShipSize(randomRow, randomCol, shipSize, shipType, isVertical);
  }

  // Helper function checking whether a ship can be placed
  // on given location with specified ship length
  function shipPlacementValid(row, col, length, isVertical) {
    for(let ship in ships) {
      if(ship in initialState.ships) {
        if (isVertical) {
          for(let currRow = row; currRow <= length; currRow++) {
            if(initialState.ships[ship].indexOf({currRow, col}) >=0) {
              return false;
            }
          }
        } else {
          for(let currCol = col; currCol <= length; currCol++) {
            if(initialState.ships[ship].indexOf({row, currCol}) >=0) {
              return false;
            }
          }
        }
      }
    }
  return true;
  }

  // Helper function that takes head of ship and
  // sets state of remaining squares for length of ship
  function fillRemainingShipSize(row, col, length, shipType, fillVertical) {
    let currRow = row + 1;
    let currCol = col + 1;
    for (let i = 0; i < length - 1; i++) {
      if (fillVertical) {
        gridRows[currRow][col] = "ship";
        initialState.ships[shipType].push({ x_coord: col, y_coord: currRow });
        currRow++;
      } else {
        gridRows[row][currCol] = "ship";
        initialState.ships[shipType].push({ x_coord: currCol, y_coord: row });
        currCol++;
      }
    }
  }

  // Helper function to get random row and column values
  function getRowAndCol(shipSize, isVertical) {
    let rowMax = SIZE_TEN;
    let colMax = SIZE_TEN;
    if (isVertical) {
      rowMax = 9 - shipSize;
    } else {
      colMax = 9 - shipSize;
    }
    let randomRow = getRandomInteger(rowMax);
    let randomCol = getRandomInteger(colMax);
    return [randomRow, randomCol];
  }

  // Helper function that returns a random integer between
  // 0 and a given maxInt
  function getRandomInteger(maxInt) {
    return Math.floor(Math.random() * maxInt);
  }

  initialState.board = gridRows;
  console.log(initialState);
  return initialState;
}

//define a dictionary of ships with respective lengths. 
const ships = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2
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
  return state;
};
