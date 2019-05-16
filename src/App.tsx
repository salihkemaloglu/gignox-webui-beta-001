import * as React from 'react';
import { NavMenu, TopMenu } from './components';

export const AppNavMenuLayout = props => {
  return (
    <div className='main-nav'>
      <TopMenu />
      <div className="left_side_bar" id="left_sidebar">
        <NavMenu />
        {props.children}
      </div>
      
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
