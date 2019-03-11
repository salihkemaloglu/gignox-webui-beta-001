import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from '../App';
import { Home, About, OpenedFiles, Signup, Login, Help } from '../components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <BrowserRouter>
      <div className="container-fluid" style={{padding: 0}}>
        <Route component={App} />
        <Switch>
          <Route exact  path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Route path="/openedfiles" component={OpenedFiles} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};