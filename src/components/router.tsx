import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from '../App';
import { Home, Help } from '../components';
import { About } from './about/about';

export const AppRouter: React.StatelessComponent<{}> = () => {
 
      return (
        <BrowserRouter>
          <div className="container-fluid" style={{ padding: 0, height: '-webkit-fill-available' }}>
            <Route component={App} />
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </BrowserRouter>
  
      );
};