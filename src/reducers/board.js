import { initialState } from "./gameState";
import {BOARD_CLICK, ADD_SHIPS} from '../actions/constants';

export const BoardReducer = (state = initialState, action) => {
    if(action.type === BOARD_CLICK 
        //avoid already clicked squares being added to the list of visited squares
        && !state.clickedSquares.some(e => e.x_coord === action.payload.x_coord && e.y_coord === action.payload.y_coord)){
        return {
                ...state,
                clickedSquares: state.clickedSquares.concat({x_coord: action.payload.x_coord, y_coord: action.payload.y_coord})
            }
    }
    if(action.type === ADD_SHIPS) {
        return {
            ...state,
            ships: state.ships.concat([{x_coord: action.payload.x_coord, y_coord: action.payload.y_coord}])
        }
    }
    return state
}