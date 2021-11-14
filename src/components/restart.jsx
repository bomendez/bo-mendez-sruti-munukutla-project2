import React from "react";
import {restart} from '../actions/restart';
import { useDispatch } from 'react-redux';

export function Restart() {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(restart());

    }
    return (
        <button onClick={handleClick}>Restart</button>
    )
}

export default Restart;