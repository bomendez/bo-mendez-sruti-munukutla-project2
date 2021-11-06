import { initialState } from "./game";
import {BOARD_CLICK} from '../actions/constants';

export const BoardReducer = (state = initialState, action) => {
    if(action.type === BOARD_CLICK 
        && !state.clickedSquares.some(e => e.x_coord === action.payload.x_coord && e.y_coord === action.payload.y_coord)){
        return {
                ...state,
                clickedSquares: state.clickedSquares.concat({x_coord: action.payload.x_coord, y_coord: action.payload.y_coord})
            }
    }
    return state
}