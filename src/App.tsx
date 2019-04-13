import * as React from 'react';
import { Authentication, NavMenu, UserAdmin } from './components';

export const App: React.StatelessComponent<{}> = (props) => {

  if (localStorage.getItem("set") === "0"){
    return (
    
      <NavMenu />
    );
  }
  else if (localStorage.getItem("set") === "1"){
    return (
      <Authentication />
    );
  }
  else {
    return (
       <UserAdmin />
    );
  }
 
};
