import * as React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { i18next } from '../../services/localization_service';
import { matchPath } from 'react-router-dom';
var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
import './password_reset.css';
const queryString = require('query-string');
export const PasswordReset = () => {

  const parsed = queryString.parse(location.pathname);
  console.log(parsed);
  const match = matchPath(location.pathname, {
    path: "/password_reset/:id",
    exact: true,
    strict: false
  });
  console.log(match);
  var username = "hey";
  function ResetPassword() {
    console.log("target.value")
  }
  function handlePasswordChange(e: any) {
    console.log(e.target.value)
  }
  function handleConfirmPasswordChange(e: any) {
    console.log(e.target.value)
  }
  return (
    <div className="wrap">

      <div className="notfoundback">
        <a><img src={logo} className="App-logo" alt="logo" /><img src={logoGignox} alt="logo" /></a>
        <p className="UserInfo">Change password for <br /><label style={{ marginLeft: "2%" }}>@{username}</label></p>
        <div className="notfound">
          <div className="Login" >
            <form className="loginForm">
              <FormGroup>
                <label className="label">{i18next.t("authentication_page_password")}</label>
                <FormControl type="password" autoComplete="new-password" id="password" onChange={handlePasswordChange} />
              </FormGroup>
              <FormGroup>
                <label className="label">{i18next.t("password_reset_page_password")}</label>
                <FormControl type="password" autoComplete="new-password" id="ConfirmPassword" onChange={handleConfirmPasswordChange} />
              </FormGroup>
              <label >{i18next.t("password_reset_page_change_password_info")}</label>
              <Button onClick={ResetPassword} style={{ width: '100%', backgroundColor: '#17a2b8' }} >
                {i18next.t("password_reset_page_change_password")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};