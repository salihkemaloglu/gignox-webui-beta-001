import * as React from 'react';
import {  SignInUp, NavMenu } from './components';

export const App: React.StatelessComponent<{}> = (props) => {

  if (localStorage.getItem("set") === "true"){
    return (
    
      <NavMenu />
    );
  }
  else{
    return (
      <SignInUp />
    );
  }
 
};
