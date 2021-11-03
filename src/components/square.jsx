import React, { Component } from 'react';
import '../square.css';

class Square extends React.Component {
    constructor(props){
        super(props)
        this.makeSquareVisited = this.makeSquareVisited.bind(this);
    }
    
    state = {
        ship: false,
        Hit: false,
        visited: false
    }
    render(){
        console.log(this.state);
        return <td className="box" id={this.props.id} onClick={this.makeSquareVisited}></td>
    }
    
    makeSquareVisited(){
        this.setState({visited: true});
        document.getElementById(this.props.id).style.backgroundColor = "coral";
    }
}
 
export default Square;