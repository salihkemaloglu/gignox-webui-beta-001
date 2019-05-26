import * as React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AppNavMenuLayout, AppGeneralLayout, AppPrivateLayout } from '../App';
import { Home, Help, PasswordReset, Profile, Authentication, NotFoundPage } from '../components';
import { About } from './about/about';
import { AppRoute, AppAuthenticatedRoute, AppPublic, AppAuthenticatedTopMenu } from '../helpers/route_helper';
import { PasswordResetSendMail } from './password_reset';

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
          <AppAuthenticatedRoute exact path="/"  component={WaitingComponent(Authentication)} />
          <AppRoute exact path="/home" layout={AppNavMenuLayout} component={WaitingComponent(Home)} />
          <AppRoute exact  path="/help" layout={AppNavMenuLayout} component={WaitingComponent(Help)} />
          <AppRoute exact  path="/about" layout={AppNavMenuLayout} component={WaitingComponent(About)} />
          <Route exact path="/password_reset" component={WaitingComponent(PasswordResetSendMail)} />
          <Route path="/password_reset/:id" component={WaitingComponent(PasswordReset)} />
          <AppAuthenticatedTopMenu   path="/:id" layoutPublic={AppGeneralLayout} layoutPrivate={AppPrivateLayout} component={WaitingComponent(Profile)} />
          <AppPublic path="*" layout={AppGeneralLayout} component={WaitingComponent(NotFoundPage)} />
        </Switch>
      </div>
    </BrowserRouter >
  );
};