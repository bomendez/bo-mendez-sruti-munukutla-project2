import { initialState } from "./game";
import {BOARD_CLICK} from '../actions/constants';

export const BoardReducer = (state = initialState, action) => {
    if(action.type === BOARD_CLICK){
        return {
            ...state,
            board: {
                ...state.board,
                x_coord: action.payload.x_coord,
                y_coord: action.payload.y_coord
            }
        }
    }
    return state
}