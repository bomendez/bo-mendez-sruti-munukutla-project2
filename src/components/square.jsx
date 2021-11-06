import React, { Component } from 'react';
import '../square.css';
import {boardClick} from '../actions/board';
import {useDispatch} from 'react-redux';
export function Square(props){
    
    // state = {
    //     HasShip: false,
    //     HitShip: false,
    //     visited: false,
    //     hovered: false
    // }
    const dispatch = useDispatch();

    return(
     <td className="box" id={props.id} onClick={() => dispatch(boardClick(props.x_coord, props.y_coord))}></td>
    )
    
    // makeSquareVisited(){
    //     this.setState({visited: true});
    //     document.getElementById(this.props.id).style.backgroundColor = "coral";
    // }
}
