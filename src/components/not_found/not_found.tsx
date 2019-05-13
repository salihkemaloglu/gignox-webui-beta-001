import * as React from 'react';

var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
import './not_found.css';
export const NotFound = () => {
  return (
    <div >
      <div id="notfound">
      <a><img src={logo} className="App-logo" alt="logo" /><img src={logoGignox} alt="logo" /></a>
        <div className="notfound">
          <div className="notfound-404">
            <h1>4<span>0</span>4</h1>
          </div>
          <p className="notfoundp">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
          <a href="/" className="notfounda">home page</a>
        </div>
      </div>
    </div>
  );
};