import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from '../App';
import { Home, Help } from '../components';

export const AppRouter: React.StatelessComponent<{}> = () => {

    if (localStorage.getItem("hasCodeRunBefore") === "true") {
    localStorage.setItem("set", "authentication");
        localStorage.setItem("hasCodeRunBefore", "false");
    }
  var session = localStorage.getItem("set");
  if (session !== null) { 
    if (session === "navmenu") {
      return (
        <BrowserRouter>
          <div className="container-fluid" style={{ padding: 0, height: '-webkit-fill-available' }}>
            <Route component={App} />
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route path="/help" component={Help} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
    else {
      return (
        <BrowserRouter>
          <div className="container-fluid" style={{ padding: 0, height: '-webkit-fill-available' }}>
            <Route component={App} />
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route path="/help" component={Help} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
  }
  else {
    return (null);
  }
};