import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from '../App';
import { Home, Help } from '../components';
import { PrivateRoute } from 'src/helpers/AuthorizedRoute';
import { About } from './about/about';
import { Admin } from './user_admin';
import { Authentication } from './authentication';

export const AppRouter = () => {
 
      return (
        <BrowserRouter>
          <div className="container-fluid" style={{ padding: 0, height: '-webkit-fill-available' }}>
            <Route component={App} />
            <Switch>
            <PrivateRoute path="/home" layout="nav_menu" component={Home} />
            <PrivateRoute path="/help" layout="nav_menu" component={Help} />
            <PrivateRoute path="/about" layout="nav_menu" component={About} />
            
            <PrivateRoute path="/profile" layout="user_admin" component={Admin} />
            <PrivateRoute path="/" layout="authentication" component={Authentication} />
            </Switch>
          </div>
        </BrowserRouter>
  
      );
};