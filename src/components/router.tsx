import * as React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AppNavMenuLayout, AppAdminLayout } from '../App';
import { Home, Help } from '../components';
import { About } from './about/about';
import { Admin } from './user_admin';
import { Authentication } from './authentication';
import { NotFound } from './not_found';
import { AppRoute } from '../helpers/app_route_helper';

export const AppRouter = () => {

  return (
    <BrowserRouter>
      <div className="container-fluid" style={{ padding: 0, height: '-webkit-fill-available' }}>
        <Switch>
          <AppRoute path="/home" layout={AppNavMenuLayout} component={Home} />
          <AppRoute path="/help" layout={AppNavMenuLayout} component={Help} />
          <AppRoute path="/about" layout={AppNavMenuLayout} component={About} />
          <AppRoute path="/profile" layout={AppAdminLayout} component={Admin} />
          <Route exact path="/" component={Authentication} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter >

  );
};