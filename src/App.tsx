import * as React from 'react';
import { Authentication, NavMenu, UserAdmin, TopMenu } from './components';

export const App: React.StatelessComponent<{}> = (props) => {

  if (localStorage.getItem("set") === "navmenu") {
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
        <UserAdmin />
      </div>
    );
  }
};
