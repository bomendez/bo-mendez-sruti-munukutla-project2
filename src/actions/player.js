import { SWITCH_TURNS } from "./constants"

export const switchTurns= (player_id) => {
    return {
        type: SWITCH_TURNS,
        payload: player_id
    }
}