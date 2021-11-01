import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Instructions from './components/Instructions.jsx';
// import './board.css';
import Board from './components/board.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Battleship.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Landing} exact/>
          <Route path='/game-board' component={Board} exact/>
          <Route path='/instructions' component={Instructions} exact />
        </Switch>
      {/* <h1>Battleship</h1>
      <div className="col-md-3 col-md-6 col-md-3">
        <div className="ships">
          <img src="../public/5x_ship.png"></img>
        </div>
        <Board/>
      </div> */}
      </Router>
    </div>
  );
}

export default App;
