import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'

import { FormGroup, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap';

var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
var logos = require('../../app_root/images/authentication_page_background_image.png');
import './authentication.css';
import { useState } from 'react';
import { UserLogin, User } from '../../proto/gigxRR_pb';
import { i18next, lang } from '../../services/localization_service'
import { DoLoginUserRequest, DoRegisterUserRequest } from '../../controllers/authentication_controller';
// import { DoGetIpAddressRequest } from '../../controllers/ipinfo_controller';

export const Authentication = () => {


  var [fade, setFade] = useState("signup");
  var userLogin = new UserLogin();
  var user = new User();
  // var ipinfo = sessionStorage.getItem("ipinfo") === null ? JSON.parse(JSON.stringify("")) : sessionStorage.getItem("ipinfo")
  // if (ipinfo === "") {
  //   DoGetIpAddressRequest();
  // }

  function login() {
    var response = DoLoginUserRequest(userLogin);
    console.log(response)
  }
  function handleEmailChangeForLogin(e: any) {
    userLogin.setUsername(e.target.value)
  }
  function handlePasswordChangeForLogin(e: any) {
    userLogin.setPassword(e.target.value)
  }
  async function handleUsernameChangeForRegister(e: any) {
    if (e.target.value.length > 0) {
      user.setUsername(e.target.value)
      var response = await DoRegisterUserRequest(user);
      console.log(response.GrpcResponseCode)
      console.log(response.GrpcResponseMessage)
      if (response.GrpcResponseCode == 6) {
        console.log("There is a account for that username: " + user.getUsername())
      } else {
        console.log("olabilir: " + user.getUsername())
      }
    }

  }
  async function handleEmailChangeForRegister(e: any) {
    if (e.target.value.length > 0) {
      user.setEmail(e.target.value)
      var response = await DoRegisterUserRequest(user);
      if (response.GrpcResponseCode == 6) {
        console.log("There is a account for that email: " + user.getEmail())
      } else {
        console.log("olabilir: " + user.getEmail())
      }
    }
  }
  return (
    <div className="wrap">
      <section className="navSection Logos" >
        <div className="nav-wrapper">
          <Nav className="mr-auto">
            <IndexLinkContainer to="/" activeClassName="active">
              <a><img src={logo} className="App-logo" alt="logo" /><img src={logoGignox} alt="logo" /></a>
            </IndexLinkContainer>
          </Nav>
        </div>
      </section>
      <section className="mainSection">
      <section className="leftSection">
        <img src={logos} style={{width: "100%"}}/>
        </section>
        <section className="rightSection">
          <DropdownButton alignRight title="Language" id="dropdown-menu-align-right" variant="warning" style={{ marginRight: "2%", float: "right", marginTop: "1%" }}>
            <Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "en")}>En</Dropdown.Item>
            <Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "tr")}>Tr</Dropdown.Item>
          </DropdownButton>

          <div className="sign-in-up-container">
            <a className="signup-title" onClick={() => setFade("signup")} style={{ fontSize: fade === "signup" ? '25px' : '15px' }}> {i18next.t("authentication_page_sign_up")}</a>|
          <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_sign_in")}</a>
          </div>
          <div className="Signup" style={{ display: fade === "signup" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label>{i18next.t("authentication_page_or")} <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_goto_sign_in")}</a></label>
              <FormGroup>
                <label>{i18next.t("authentication_page_username")}</label>
                <FormControl autoFocus type="text" onChange={handleUsernameChangeForRegister} />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" onChange={handleEmailChangeForRegister} />
              </FormGroup>
              <FormGroup>
                <label>{i18next.t("authentication_page_password")}</label>
                <FormControl
                  type="password"
                />
              </FormGroup>
              {(() => {
                switch (lang) {
                  case 'en':
                    return <label>{i18next.t('authentication_page_terms_start')} {i18next.t('authentication_page_accept_terms')} <a className='signup-title'>{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title'>{i18next.t('authentication_page_privacy_policy')}</a></label>;
                  case 'tr':
                    return <label>{i18next.t('authentication_page_terms_start')} <a className='signup-title' >{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title' >{i18next.t('authentication_page_privacy_policy')} </a> {i18next.t('authentication_page_accept_terms')}</label>;
                  default:
                    return "null";
                }
              })()}
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" onClick={() => setFade("verification")} >
                {i18next.t("authentication_page_sign_up")}
              </Button>
            </form>
          </div>

          <div className="Login" style={{ display: fade === "signin" ? 'block' : 'none' }}>
            <form className="loginForm">
              <FormGroup >
                <label>{i18next.t("authentication_page_username_or_email")}</label>
                <FormControl autoFocus type="email" onChange={handleEmailChangeForLogin} />
              </FormGroup>
              <FormGroup>
                <label>{i18next.t("authentication_page_password")}</label>
                <FormControl type="password" onChange={handlePasswordChangeForLogin} />
              </FormGroup>
              <Button onClick={login} style={{ width: '100%', backgroundColor: '#17a2b8' }} >
                {i18next.t("authentication_page_sign_in")}
              </Button>
              <div className="login-need-help"><a className="forgot-password-link" onClick={() => setFade("reset")}>
                {i18next.t("authentication_page_forgot_password")}</a></div>
            </form>
          </div>

          <div className="reset" style={{ display: fade === "reset" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_password_reset_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_password_reset_info")}<br /></label>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" />
              </FormGroup>
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" >
                {i18next.t("authentication_page_password_reset")}
              </Button>
            </form>
          </div>
          <div className="verification" style={{ display: fade === "verification" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_verification_code_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_verification_code_info")}<br /></label>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" />
              </FormGroup>
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" >
                {i18next.t("authentication_page_verificate_code")}
              </Button>
              <label className="cursor" style={{ marginTop: "2%" }}>{i18next.t("authentication_page_verificate_did_not_get")}</label>
            </form>
          </div>

        </section>
      </section>
    </div>
  );
};
