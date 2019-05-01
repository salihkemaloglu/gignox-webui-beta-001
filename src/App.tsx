import * as React from 'react';
import { Authentication, NavMenu, Admin, TopMenu } from './components';

export const App = () => {

  
  if (sessionStorage.getItem("routingPage") === "nav_menu") {
    return (
      <div className='main-nav'>
        <TopMenu />
        <NavMenu />
      </div>
    );
  }
  else if (sessionStorage.getItem("routingPage") === "user_admin") {
    return (
      <div className='main-nav'>
        <TopMenu />
        <Admin />
      </div>
    );
  }
  else {
    return (
      <Authentication />
    );

  }
};
