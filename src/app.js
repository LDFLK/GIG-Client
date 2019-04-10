import React, {Component} from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Header from "./shared/header";
import SearchResults from "./results/results";
import ViewResult from "./view/view"

import './app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      searchResults: [],
      loadedEntity: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value) {
    this.setState({[key]: value});
  }

  getSearchResults(searchKey) {
    if (searchKey.length > 2) {
      fetch(process.env.REACT_APP_SERVER_URL + 'api/search?for=' + searchKey, {
        method: 'GET'
      }).then(results => {
        return results.json();
      }).then(data => {
        this.handleChange("searchResults", data);
        console.log(this);
      });
    }
  }

  getEntity(id) {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + id, {
      method: 'GET'
    }).then(results => {
      return results.json();
    }).then(data => {
      this.handleChange("loadedEntity", data);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HashRouter>
            <Route path="/"
                   render={(props) => <Header {...props}
                                              searchKey={this.state.searchKey}
                                              handleChange={this.handleChange}
                                              getSearchResults={this.getSearchResults}
                   />}
            />
            <Route path="/search/:searchKey"
                   render={(props) => <SearchResults {...props}
                                                     searchKey={this.state.searchKey}
                                                     handleChange={this.handleChange}
                                                     searchResults={this.state.searchResults}
                   />}
            />
            <Route path="/content/:title/:id"
                   render={(props) => <ViewResult {...props}
                                                  getEntity={this.getEntity}
                                                  loadedEntity={this.state.loadedEntity}
                                                  handleChange={this.handleChange}
                   />}
            />
          </HashRouter>
        </header>
      </div>
    );
  }
}

export default App;
