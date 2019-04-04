import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from '../App';
import { Home, Help } from '../components';


export const AppRouter: React.StatelessComponent<{}> = () => {

  return (
    <BrowserRouter> 
      <div className="container-fluid" style={{padding: 0, height: '-webkit-fill-available'}}>
        <Route component={App} />
        <Switch>  
          <Route exact path="/home" component={Home} />
          <Route path="/help" component={Help} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};