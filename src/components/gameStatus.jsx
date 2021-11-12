import React from "react";
import { useSelector } from 'react-redux';

function GameStatus() {
    const isUserNext = useSelector(state => state.BoardReducer.userTurn);
    const winner = useSelector(state => state.BoardReducer.winner)

    let text = ""
    if (winner !== "") {
        text = "Winner: " + winner;
    }
    else {
        text = "Next player: " + (isUserNext ? "You" : "Computer");
    }
    return (
        <h3>{text}</h3>
    )
}

export default GameStatus;