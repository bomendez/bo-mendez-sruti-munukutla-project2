import {ADD_SHIPS} from './constants'

export const addShip= (x_coord, y_coord) => {
    return {
        type: ADD_SHIPS,
        payload: {
            x_coord: x_coord,
            y_coord: y_coord
        }
    }
}