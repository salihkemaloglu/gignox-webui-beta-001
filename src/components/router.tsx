import * as React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AppNavMenuLayout, AppAdminLayout } from '../App';
import { Home, Help, PasswordReset } from '../components';
import { About } from './about/about';
import { Admin } from './user_admin';
import { Authentication } from './authentication';
import { NotFound } from './not_found';
import { AppRoute, AuthenticaitonRoute } from '../helpers/route_helper';
import { PasswordResetSendMail } from './password_reset';
import { Settings } from './settings';

export const AppRouter = () => {
  function WaitingComponent(Component: any) {
    return props => (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </React.Suspense>
    );
  } 
  return (
    <BrowserRouter>
      <div className="container-fluid" style={{ padding: 0, height: '-webkit-fill-available' }}>

        <Switch>
          <AppRoute path="/home" layout={AppNavMenuLayout} component={WaitingComponent(Home)} />
          <AppRoute path="/help" layout={AppNavMenuLayout} component={WaitingComponent(Help)} />
          <AppRoute path="/profile" layout={AppAdminLayout} component={WaitingComponent(Admin)} />
          <AppRoute path="/settings" layout={AppAdminLayout} component={WaitingComponent(Settings)} />
          <AuthenticaitonRoute exact path="/"  component={WaitingComponent(Authentication)} />
          <Route path="/about" component={About} />
          <Route exact path="/password_reset" component={WaitingComponent(PasswordResetSendMail)} />
          <Route exact path="/password_reset/:id" component={WaitingComponent(PasswordReset)} />
          <Route path="*" component={WaitingComponent(NotFound)} />
        </Switch>

        
      </div>
    </BrowserRouter >
  );
};