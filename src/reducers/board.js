import { BOARD_CLICK, RESTART } from "../actions/constants";
import { AIRCRAFT_CARRIER, SIZE_TEN } from "../components/constants";

function initialStateFunc() {
  const initialState = {
    player_zero : {
      clickedSquares: [], // rename to boardSquares
      ships: {},
      isActive: true,
      score: 17,
      declareWinner: false
      //same between both boards:
      // ships -> my ships: Since ships has state Hit/Unselected, we would know which ones have been hit or Unselected
    },
    player_one : {
      clickedSquares: [], // rename to boardSquares
      ships: {},
      isActive: false,
      score: 17,
      declareWinner: false
      //same between both boards:
      // ships -> my ships: Since ships has state Hit/Unselected, we would know which ones have been hit or Unselected
    }
  }

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
      placeOneShip(ship, ships[ship], initialState.player_zero)
      placeOneShip(ship, ships[ship], initialState.player_one)
    }
  }

  // Helper function to place one ship on board
  function placeOneShip(shipType, shipSize, player_no) {
    let isVertical = getRandomInteger(2);
    let [randomRow, randomCol] = getRowAndCol(shipSize,isVertical);
    // check whether ship placement is valid before placing ship
    while (!shipPlacementValid(randomRow, randomCol, shipSize, player_no,isVertical)) {
      let newRowCol = getRowAndCol(shipSize);
      randomRow = newRowCol[0];
      randomCol = newRowCol[1];
    }
    gridRows[randomRow][randomCol] = "ship";
    // initialState.ships.push({ x_coord: randomCol, y_coord: randomRow });
    player_no.ships[shipType] = []
    player_no.ships[shipType].push({ x_coord: randomCol, y_coord: randomRow });
    // console.log("updated ships:", shipsOnBoard);

    fillRemainingShipSize(randomRow, randomCol, shipSize, shipType, player_no,isVertical);
  }

  // Helper function checking whether a ship can be placed
  // on given location with specified ship length
  function shipPlacementValid(row, col, length, player_no,isVertical) {
    for(let ship in ships){
      if(ship in player_no.ships){
        if (isVertical) {
          for(let currRow = row; currRow <= length; currRow++) {
            if(player_no.ships[ship].indexOf({currRow, col}) >=0) {
              return false;
            }
          }
        } else {
        for(let currCol = col; currCol <= length; currCol++){
          if(player_no.ships[ship].indexOf({row, currCol}) >=0){
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
  function fillRemainingShipSize(row, col, length, shipType,player_no, fillVertical) {
    let currRow = row + 1;
    let currCol = col + 1;
    for (let i = 0; i < length - 1; i++) {
      if (fillVertical) {
        gridRows[currRow][col] = "ship";
        player_no.ships[shipType].push({ x_coord: col, y_coord: currRow });
        currRow++;
      } else {
        gridRows[row][currCol] = "ship";
        player_no.ships[shipType].push({ x_coord: currCol, y_coord: row });
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

  //initialState.board = gridRows;
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
  let player_no;
  let opponent_player;
  //if board is clicked,
  if (action.type === BOARD_CLICK){
    //get the current player
    if(action.payload.player_id === '0'){
      player_no = state.player_one;
      //get the opponent player since their state/squares need to be changed
      opponent_player = state.player_zero;
    }else{
      player_no = state.player_zero;
      opponent_player = state.player_one;
    }
    //avoid already clicked squares being added to the list of visited squares
    //change this later
    if(!opponent_player.clickedSquares.some(
      (e) =>
        e.x_coord === action.payload.x_coord &&
        e.y_coord === action.payload.y_coord
    )){
    if(action.payload.player_id === '0'){
      //if player is player_zero, need to update the clicked squares of player one
      // and the score of player_zero if a shit has been hit
      return {
          ...state,
          player_zero:{
            ...state.player_zero,
            clickedSquares : state.player_zero.clickedSquares.concat(
              {
                x_coord: action.payload.x_coord,
                y_coord: action.payload.y_coord,
              }
            ),
            score: action.payload.hitShip ? state.player_zero.score - 1 :  state.player_zero.score
          }
        }
    }else{
        return {
        ...state,
        player_one:{
          ...state.player_one,
          clickedSquares : state.player_one.clickedSquares.concat(
            {
              x_coord: action.payload.x_coord,
              y_coord: action.payload.y_coord,
            }
          ),
          score: action.payload.hitShip ? state.player_one.score - 1 :  state.player_one.score
        }
      }
    }
  }
}
  if (action.type === RESTART) {
    return initialStateFunc();
  }
  return state;
};
