import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'

import { FormGroup, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap';

var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
var logos = require('../../app_root/images/authentication_page_background_image.png');
import './authentication.css';
import { useState } from 'react';
import { UserLogin, User, Email, GeneralResponse } from '../../proto/gigxRR_pb';
import { i18next, lang } from '../../services/localization_service'
import { DoLoginUserRequest, DoRegisterUserRequest, DoSendEmailRequest, DoCheckVerificationCodeRequest } from '../../controllers/authentication_controller';
import { GeneralResponseModal } from '../../modals/general_response_modal';
import { grpc } from '@improbable-eng/grpc-web';
// import { DoGetIpAddressRequest } from '../../controllers/ipinfo_controller';

export const Authentication = () => {
  var [fade, setFade] = useState("signup");
  var userLogin = new UserLogin();
  var user = new User();
  var email = new Email();

  // var ipinfo = sessionStorage.getItem("ipinfo") === null ? JSON.parse(JSON.stringify("")) : sessionStorage.getItem("ipinfo")
  // if (ipinfo === "") {
  //   DoGetIpAddressRequest();
  // }

  function login() {
    if (!userLogin.getUsername() || !user.getPassword()) {
      let username = (document.getElementById("usernameLogin") as HTMLInputElement).value;
      let password = (document.getElementById("passwordLogin") as HTMLInputElement).value;
      if (username && password) {
        userLogin.setUsername(username);
        userLogin.setPassword(password);
        DoLoginUserRequest(userLogin, function (userLoginResponse_: UserLogin, generalResponseModalResponse_: GeneralResponseModal) {
          if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
            sessionStorage.setItem("token", userLoginResponse_.getToken());
            sessionStorage.setItem("userName", userLoginResponse_.getUsername());
            localStorage.setItem("languageCode", userLoginResponse_.getLanguageCode())
            sessionStorage.setItem("routingPage", "true");
            location.reload();
          } else {
            console.log(generalResponseModalResponse_.GrpcResponseCode)
            console.log(generalResponseModalResponse_.GrpcResponseMessage)
          }
        });
      } else {
        console.log("username and password can not be null")
      }
    } else {
      DoLoginUserRequest(userLogin, function (userLoginResponse_: UserLogin, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          sessionStorage.setItem("token", userLoginResponse_.getToken());
          sessionStorage.setItem("userName", userLoginResponse_.getUsername());
          localStorage.setItem("languageCode", userLoginResponse_.getLanguageCode())
          sessionStorage.setItem("routingPage", "nav_menu");
          location.reload();
        } else {
          console.log(generalResponseModalResponse_.GrpcResponseCode)
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        }
      });
    }
  }
  function Register() {
    if (!user.getUsername()) {
      console.log("username can not be empty")
    } else if (!user.getEmail()) {
      console.log("email can not be empty")
    } else if (!user.getPassword()) {
      console.log("password can not be empty")
    } else {
      DoRegisterUserRequest(user, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          if (generalResponse_.getIsEmailSuccess()) {
            setFade("verification")
          } else {
            console.log(generalResponse_.getMessage())
          }
        } else {
          console.log(generalResponseModalResponse_.GrpcResponseCode)
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        }
      });
    }
  }
  function SendEmailForRegister() {
    if (!email.getEmailAddress()) {
      console.log("email can not be empty")
    } else {
      DoSendEmailRequest(email, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
            console.log("ok")
        } else {
          console.log(generalResponseModalResponse_.GrpcResponseCode)
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        }
      });
    }
  }
  function SendEmailForForgotPassword() {
    setFade("reset")
    if (!email.getEmailAddress()) {
      console.log("email can not be empty")
    } else {
      DoSendEmailRequest(email, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          console.log("ok")
        } else {
          console.log(generalResponseModalResponse_.GrpcResponseCode)
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        }
      });
    }
  }
  function CheckVerificationCodeForRegister() {
    email.setEmailType("register")
    DoCheckVerificationCodeRequest(email, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
      if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
        console.log("ok")
      } else {
        console.log(generalResponseModalResponse_.GrpcResponseCode)
        console.log(generalResponseModalResponse_.GrpcResponseMessage)
      }
    });
  }
  function CheckVerificationCodeForForgotPassword() {
    email.setEmailType("forgot")
    DoCheckVerificationCodeRequest(email, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
      if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
        console.log("ok")
      } else {
        console.log(generalResponseModalResponse_.GrpcResponseCode)
        console.log(generalResponseModalResponse_.GrpcResponseMessage)
      }
    });
  }

  function handleEmailChangeForLogin(e: any) {
    userLogin.setUsername(e.target.value)
  }
  function handlePasswordChangeForLogin(e: any) {
    userLogin.setPassword(e.target.value)
  }
  function handleUsernameChangeForRegister(e: any) {
    if (e.target.value.length > 0) {
      user.setUsername(e.target.value)
      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          console.log("ok")
        }
      });
    }
  }

  function handleEmailChangeForRegister(e: any) {
    if (e.target.value.length > 0) {
      user.setEmail(e.target.value)
      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          console.log("ok")
        }
      });
    }
  }
  function handlePasswordChangeForRegister(e: any) {
    user.setPassword(e.target.value)
  }
  function handleResetPasswordChangeForLogin(e: any) {
    email.setEmailAddress(e.target.value);
  }
  function handleVerificationAccountChange(e: any) {
    user.setPassword(e.target.value)
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
          <img src={logos} style={{ width: "100%" }} />
        </section>
        <section className="rightSection">
          <DropdownButton alignRight title="Language" id="dropdown-menu-align-right" variant="warning" style={{ marginRight: "2%", float: "right", marginTop: "1%" }}>
            <Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "en")}>En</Dropdown.Item>
            <Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "tr")}>Tr</Dropdown.Item>
          </DropdownButton>

          <div className="sign-in-up-container">

            {/* user sign-up forms */}
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
                <FormControl autoComplete="new-email" type="email" onChange={handleEmailChangeForRegister} />
              </FormGroup>
              <FormGroup>
                <label>{i18next.t("authentication_page_password")}</label>
                <FormControl autoComplete="new-password" type="password" onChange={handlePasswordChangeForRegister} />
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
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" onClick={Register} >
                {i18next.t("authentication_page_sign_up")}
              </Button>
            </form>
          </div>

          {/* verification user Forms */}
          <div className="verification" style={{ display: fade === "verification" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_verification_code_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_verification_code_info")}<br /></label>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" onChange={handleVerificationAccountChange} />
              </FormGroup>
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" onClick={CheckVerificationCodeForRegister}>
                {i18next.t("authentication_page_verificate_code")}
              </Button>
              <a className="cursor" style={{ marginTop: "2%" }} onClick={SendEmailForRegister} >{i18next.t("authentication_page_verificate_did_not_get")}</a>
            </form>
          </div>

          {/* user sign-in forms */}
          <div className="Login" style={{ display: fade === "signin" ? 'block' : 'none' }}>
            <form className="loginForm">
              <FormGroup >
                <label>{i18next.t("authentication_page_username_or_email")}</label>
                <FormControl autoFocus type="email" id="usernameLogin" onChange={handleEmailChangeForLogin} />
              </FormGroup>
              <FormGroup>
                <label>{i18next.t("authentication_page_password")}</label>
                <FormControl type="password" id="passwordLogin" onChange={handlePasswordChangeForLogin} />
              </FormGroup>
              <Button onClick={login} style={{ width: '100%', backgroundColor: '#17a2b8' }} >
                {i18next.t("authentication_page_sign_in")}
              </Button>
              <div className="login-need-help"><a className="forgot-password-link" onClick={SendEmailForForgotPassword}>
                {i18next.t("authentication_page_forgot_password")}</a></div>
            </form>
          </div>
          {/* reset Password Forms */}
          <div className="reset" style={{ display: fade === "reset" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_password_reset_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_password_reset_info")}<br /></label>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" onChange={handleResetPasswordChangeForLogin} />
              </FormGroup>
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" onClick={CheckVerificationCodeForForgotPassword}>
                {i18next.t("authentication_page_password_reset")}
              </Button>
            </form>
          </div>



        </section>
      </section>
    </div>
  );
};
