import * as React from 'react';
import { NavMenu, TopMenuGeneral, TopMenuPrivate } from './components';

export const AppNavMenuLayout = props => {
  return (
    <div className='main-nav'>
      <TopMenuPrivate />
      <div className="left_side_bar" id="left_sidebar">
        <NavMenu />
        {props.children}
      </div>

    </div>
  );
};
export const AppGeneralLayout = props => {
  return (
    <div className='main-nav'>
      <TopMenuGeneral />
      {props.children}
    </div>
  );
};

export const AppPrivateLayout = props => {
  return (
    <div className='main-nav'>
      <TopMenuPrivate />
      <div>
        {props.children}
      </div>
    </div>
  );
};