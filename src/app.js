import React, {Component} from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Home from "./home/home";
import SearchResults from "./results/results";

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HashRouter>
                <Route exact path="/" component={Home}/>
                <Route path="/results" component={SearchResults}/>
          </HashRouter>
        </header>
      </div>
    );
  }
}

export default App;
