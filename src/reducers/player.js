import {SWITCH_TURNS, BOARD_CLICK} from '../actions/constants';
let initialState = {
    player_turn: 0
}

export const PlayerReducer = (state=initialState, action) => {
    if(action.type === SWITCH_TURNS){
        console.log("player turn is", state.player_turn);
        return{
            ...state,
            player_turn : action.payload.player_id
        }
    }
    if (action.type === BOARD_CLICK) {
        let nextTurn = 1
        if (state.player_turn === 1) {
            nextTurn = 0
        }
        console.log("changing players in player reducer to", nextTurn);
        return {
            ...state,
            player_turn : nextTurn
        }
    }
    return state;
};