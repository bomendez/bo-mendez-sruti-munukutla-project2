import { BOARD_CLICK, RESTART, SET_GAME_TYPE } from "../actions/constants";
import { AIRCRAFT_CARRIER, SIZE_TEN } from "../components/constants";

function initialStateFunc() {
  console.log("calling initial state func")
  const initialState = {
    //gameType: '',
    gameType: {
      freePlay: false,
    },
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

  console.log(initialState.player_zero.ships)
  console.log(initialState.player_one.ships)
  putShipsOnBoard();

  function putShipsOnBoard() {
    for(let ship in ships){
      placeOneShip(ship, ships[ship], initialState.player_zero)
      placeOneShip(ship, ships[ship], initialState.player_one)
    }
  }

  // Helper function to place one ship on board
  function placeOneShip(shipType, shipSize, player_no) {
    let isVertical = getRandomInteger(2);
    // let [randomRow, randomCol] = getRowAndCol(shipSize, isVertical);
    // check whether ship placement is valid before placing ship
    
    // console.log("current ships", player_no.ships);
    let newRowCol = getRowAndCol(shipSize, isVertical);
    let randomRow = newRowCol[0];
    let randomCol = newRowCol[1];
    fillShip(randomRow, randomCol, shipSize, shipType, player_no,isVertical);
    while (!shipPlacementValid(shipType, player_no)) {
      newRowCol = getRowAndCol(shipSize, isVertical);
      randomRow = newRowCol[0];
      randomCol = newRowCol[1];
      fillShip(randomRow, randomCol, shipSize, shipType, player_no, isVertical);
    }
    // initialState.ships.push({ x_coord: randomCol, y_coord: randomRow });

  }

  // Validates whether the ship overlaps an existing ship in the given player's
  // ship attribute
  function shipPlacementValid(ship, player_no) {
    // check each ship
    for (let shipType in player_no.ships) {
      // check every ship other than current ship
      if (!(shipType === ship)) {
        // iterate through each coordinate
        for (let testShip of player_no.ships[shipType]) {
          if (player_no.ships[ship].find(obj => obj.y_coord === testShip.y_coord && obj.x_coord === testShip.x_coord)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // Adds the row/col of each ship to the given player's ships attribute
  function fillShip(row, col, length, shipType, player_no, fillVertical) {
    player_no.ships[shipType] = []
    let currRow = row;
    let currCol = col;
    for (let i = 0; i < length; i++) {
      if (fillVertical) {
        player_no.ships[shipType].push({ x_coord: col, y_coord: currRow });

        console.log("add vertical ship at", col, currRow)
        currRow++;
      } else {
        player_no.ships[shipType].push({ x_coord: currCol, y_coord: row });
        console.log("add horizontal ship at", currCol, row)
        currCol++;
      }
    }
  }

  // Helper function checking whether a ship can be placed
  // on given location with specified ship length
  // function shipPlacementValid(row, col, ship, length, player_no, isVertical) {
  //   console.log("Validate", ship, "player:", player_no.ships, isVertical)
  //   if (ship in player_no.ships) {
  //     if (isVertical) {
  //       for (let currRow = row; currRow <= length; currRow++) {
  //         debugger
  //         for (let i=0; i < player_no.ships[ship].length; i++) {
  //           let testShip = player_no.ships[ship][i]
  //           if (testShip.x_coord === currRow && testShip.y_coord === col) {
  //             console.log("return false")
  //             return false;
  //           }
  //         }

  //         // if (player_no.ships[ship].find(obj => obj.y_coord === currRow && obj.x_coord === col)) {
  //         // // if(player_no.ships[ship].indexOf({currRow, col}) >=0) {
  //         //   console.log("return false")
  //         //   return false;
  //         // }
  //       }
  //     } else {
        
  //       for (let currCol = col; currCol <= length; currCol++) {
  //         for (let testShip of player_no.ships[ship]) {
  //           if (testShip.x_coord === row && testShip.y_coord === currCol) {
  //             console.log("return false")
  //             return false;
  //           }
  //         }

  //         // if(player_no.ships[ship].find(obj => obj.y_coord === row && obj.x_coord === currCol)) {
  //         //   console.log("return false")
  //         //   return false;
  //         // }
  //       }
  //     }
  //   }
  //   console.log("return true")
  //   return true;
  // }

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

  if(action.type === SET_GAME_TYPE){
    return {
    ...state,
    gameType : {
      ...state.gameType,
      freePlay: action.payload.gameType === "free"? true: false
    }
    }
  }
  return state;
};
