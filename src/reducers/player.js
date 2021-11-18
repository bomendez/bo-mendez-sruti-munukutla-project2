import {SWITCH_TURNS, BOARD_CLICK} from '../actions/constants';
let initialState = {
    player_turn: 0
}

export const PlayerReducer = (state=initialState, action) => {
    if(action.type === SWITCH_TURNS){
        console.log("player turn is", state.player_turn);
        return{
            ...state,
            player_turn : action.payload
        }
    }
    if (action.type === BOARD_CLICK) {
        let nextPlayer = 1
        if (action.payload.player_id === 1) {
            nextPlayer = 0
        }
        return{
            ...state,
            player_turn : nextPlayer
        }
    }
    return state;
};