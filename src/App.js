import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Instructions from './components/Instructions.jsx';
import Game from './components/game.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Battleship.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Landing} exact/>
          <Route path='/game-board' component={Game} exact/>
          <Route path='/instructions' component={Instructions} exact />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
