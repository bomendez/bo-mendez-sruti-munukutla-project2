import React, { Component } from 'react';
import '../square.css';
import {boardClick} from '../actions/board';
import { useDispatch, useSelector } from 'react-redux';
export function Square(props){
    
    // state = {
    //     HasShip: false,
    //     HitShip: false,
    //     visited: false,
    //     hovered: false
    // }
    const dispatch = useDispatch();
    const listVisitedSquares = useSelector(state => state.BoardReducer.clickedSquares);
    let colorClass = 'box';
    //change this to onhover event next
    if(listVisitedSquares.some(e => e.x_coord === props.x_coord && e.y_coord === props.y_coord)){
           colorClass  = 'clickedBox';
    }

    function handleClick() {
        dispatch(boardClick(props.x_coord, props.y_coord));

    }

    return(
     <td className={colorClass} id={props.id} onClick={handleClick}></td>
    )
    
    // makeSquareVisited(){
    //     this.setState({visited: true});
    //     document.getElementById(this.props.id).style.backgroundColor = "coral";
    // }
}
