import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Instructions from './components/Instructions.jsx';
import Game from './components/game.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Battleship.css';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Landing} exact/>
          <Route path='/game-board' component={Game} exact/>
          <Route path='/instructions' component={Instructions} exact />
        </Switch>

      </Router>
    </div>
    </Provider>
  );
}

export default App;
