import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import UserList from "../../containers/UserList";
//import UserDetail from "../../containers/UserDetail";
import Create from "../../containers/UserCreate/index.js";
import Home from "../../containers/UsersList";
import Update from "../../containers/UserUpdate";
import Error from "../../containers/Error"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
            exact={true}
            path="/"
            component={Home}
            />
            <Route
            exact={true}
            path="/create"
            component={Create}
            />
            <Route
            exact={true}
            path="/edit/:id"
            component={Update}
            />
            <Route
            exact={true}
            path="/errorPage"
            component={Error}
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};

export default App;