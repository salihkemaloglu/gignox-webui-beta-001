import * as React from 'react';
import { Authentication, NavMenu, Admin, TopMenu } from './components';

export const App: React.StatelessComponent<{}> = (props) => {
  window.onload = () => {
  if (localStorage.getItem("hasCodeRunBefore") === "true") {
    localStorage.setItem("set", "navmenu");
        localStorage.setItem("hasCodeRunBefore", "false");
    }
  }
  if (localStorage.getItem("set") === "useradmin") {
    return (
      <div className='main-nav'>
        <TopMenu />
        <NavMenu />
      </div>
    );
  }
  else if (localStorage.getItem("set") === "authentication") {
    return (
      <Authentication />
    );
  }
  else {
    return (
      <div className='main-nav'>
        <TopMenu />
        <Admin />
      </div>
    );
  }
};
