import {Link} from 'react-router-dom';
function Landing(){
    return(
        <div class="container">
        <h1>Welcome to Battleship</h1>
        <p>Please choose your game type</p>
        <div class="game_mode">
            <Link to="/game-board"><button class="buttons game">Normal Game</button></Link>
            <Link to="/game-board"><button class="buttons game">Free Play</button></Link>
        </div>
        <Link to="/instructions"><button class="buttons bottom_button">Instructions >>> </button></Link>
    </div>
    )
} 

export default Landing;