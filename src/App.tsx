import * as React from 'react';
import { NavMenu, TopMenu } from './components';

export const AppNavMenuLayout = props => {
  return (
    <div className='main-nav'>
      <TopMenu />
      <NavMenu />
      {props.children}
    </div>
  );
};
export const AppAdminLayout = props => {
  return (
    <div className='main-nav'>
      <TopMenu />
      {props.children}
    </div>
  );
};

