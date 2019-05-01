import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'

import { FormGroup, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap';

// import { grpc } from 'grpc-web-client';
// import { DemService } from '../../proto/dem_pb_service';
// import { HelloRequest } from '../../proto/dem_pb';
var logo = require('../../app_root/images/logo.png');
// var test = require('../images/test.png');

var logoGignox = require('../../app_root/images/logo_gignox.png');
import './authentication.css';
import { useState } from 'react';
// import { LoginUserRequest, UserLogin, LoginUserResponse } from '../../proto/gigxRR_pb';
// import { GigxRRService } from '../../proto/gigxRR_pb_service';
// import { grpc } from '@improbable-eng/grpc-web';
import { i18next, lang } from '../../services/localization'
export const Authentication = () => {

  var [fade, setFade] = useState("signup");
  var logos = require('../../app_root/images/authentication_page_backgroung_image.png');

  function login() {
    sessionStorage.setItem("routingPage", "nav_menu");  
    location.reload();
    // const req = new LoginUserRequest();  
    // var user = new UserLogin();

    // user.setUsername("somer1");
    // user.setPassword("pass")
    // req.setUser(user);

    // grpc.invoke(GigxRRService.Login, {
    //   request: req,
    //   host: "https://dev-rr.gignox.com:8901",
    //   metadata: new grpc.Metadata({ "language": "en" }),
    //   onHeaders: (headers: grpc.Metadata) => {
    //     console.log("onHeaders", headers);
    //   },
    //   onMessage: (message: LoginUserResponse) => {
    //     user = message.getUser() === null ? JSON.parse("null") : message.getUser();
    //     sessionStorage.setItem("token", user.getToken());
    //     sessionStorage.setItem("userName", user.getUsername());
    //     sessionStorage.setItem("routingPage", "nav_menu");  
    //     location.reload();
    //   },
    //   onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
    //     if (code === grpc.Code.OK) {
    //       console.log('all ok');
    //     } else {
    //       console.log('hit an error', code, msg, trailers);
    //     }
    //   }
    // });
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
            <a className="signup-title" onClick={() => setFade("signup")} style={{ fontSize: fade === "signup" ? '25px' : '15px' }}> {i18next.t("authentication_page_sign_up")}</a><span>|</span>
          <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_sign_in")}</a>
          </div>
          <div className="Signup" style={{ display: fade === "signup" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label>{i18next.t("authentication_page_or")} <a className="signin-title" href="#" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_goto_sign_in")}</a></label>
              <FormGroup>
                <label>{i18next.t("authentication_page_username")}</label>
                <FormControl autoFocus type="text" />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" />
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
                    return <label>{i18next.t('authentication_page_terms_start')} {i18next.t('authentication_page_accept_terms')} <a href='#'>{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a href='#'>{i18next.t('authentication_page_privacy_policy')}</a></label>;
                  case 'tr':
                    return <label>{i18next.t('authentication_page_terms_start')} <a className='signup-title' href='#'>{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title' href='#'>{i18next.t('authentication_page_privacy_policy')} </a> {i18next.t('authentication_page_accept_terms')}</label>;
                  default:
                    return "null";
                }
              })()}

              <Button style={{ width: '98%', backgroundColor: '#17a2b8' }} type="button" >
                {i18next.t("authentication_page_sign_up")}
              </Button>

            </form>
          </div>

          <div className="Login" style={{ display: fade === "signin" ? 'block' : 'none' }}>
            <form className="loginForm">
              <FormGroup>
                <label>{i18next.t("authentication_page_username_or_email")}</label>
                <FormControl
                  autoFocus
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <label>{i18next.t("authentication_page_password")}</label>
                <FormControl
                  type="password"
                />
              </FormGroup>
              <Button onClick={login} style={{ width: '100%', backgroundColor: '#17a2b8' }} >
                {i18next.t("authentication_page_sign_in")}
              </Button>
              <div className="login-need-help"><a className="forgot-password-link" onClick={() => setFade("reset")} href="#">
                {i18next.t("authentication_page_forgot_password")}</a></div>
            </form>
          </div>

          <div className="Signup" style={{ display: fade === "reset" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <code className="codeColor"><h3> {i18next.t("authentication_page_password_reset_title")}</h3></code>
              <code className="codeColor">{i18next.t("authentication_page_password_reset_info")}<br /></code>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" />
              </FormGroup>
              <Button style={{ width: '98%', backgroundColor: '#17a2b8' }} type="button" >
                {i18next.t("authentication_page_password_reset_button")}
              </Button>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
};
