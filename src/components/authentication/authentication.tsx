import * as React from 'react';
import Done from '@material-ui/icons/Done';
import Cross from '@material-ui/icons/WarningOutlined';
import { Dropdown, Flag, Label, Form, Message, Button } from 'semantic-ui-react'
var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
var logos = require('../../app_root/images/authentication_page_background_image.png');
import './authentication.css';
import { useState } from 'react';
import { UserLogin, User } from '../../proto/gigxRR_pb';
import { i18next, lang } from '../../services/localization_service'
import { DoLoginUserRequest, DoRegisterUserRequest } from '../../controllers/authentication_controller';
import { GeneralResponseModal } from 'src/modals/general_response_modal';
import { grpc } from '@improbable-eng/grpc-web';

export const Authentication = () => {
  let [loader, setLoader] = useState("active");
  var [fade, setFade] = useState("signup");
  let [loginMessageType, setloginMessageType] = useState("info");
  let [loginHeaderNotify, setloginHeaderNotify] = useState("");
  let [loginMessageNotify, setloginMessageNotify] = useState("");

  let [signupMessageType, setsignupMessageType] = useState("info");
  let [signupHeaderNotify, setsignupHeaderNotify] = useState("");
  let [signupMessageNotify, setsignupMessageNotify] = useState("");

  let [alreadyExistUserWarning, setalreadyExistUserWarning] = useState("nonExist");

  var userLogin = new UserLogin();
  var user = new User();

  function login() {
    setloginHeaderNotify("")
    setLoader("loading");
    let username = (document.getElementById("usernameLogin") as HTMLInputElement).value;
    let password = (document.getElementById("passwordLogin") as HTMLInputElement).value;
    if (!username) {
      setloginMessageType("warning");
      setloginMessageNotify(i18next.t("authentication_page_enter_username_or_email"))
      setLoader("active");
    } else if (!password) {
      setloginMessageType("warning");
      setloginMessageNotify(i18next.t("authentication_page_enter_password"))
      setLoader("active");
    } else {
      userLogin.setUsername(username);
      userLogin.setPassword(password);
      DoLoginUserRequest(userLogin, function (userLoginResponse_: UserLogin, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          sessionStorage.setItem("token", userLoginResponse_.getToken());
          sessionStorage.setItem("username", userLoginResponse_.getUsername());
          localStorage.setItem("languageCode", userLoginResponse_.getLanguageCode())
          sessionStorage.setItem("routingPage", "nav_menu");
          window.location.href = '/home'
          setLoader("active");
        } else if (generalResponseModalResponse_.GrpcResponseCode == 16) {

          setloginMessageType("error");
          setloginMessageNotify(i18next.t("authentication_page_invalid_username_or_password"))
          setLoader("active");

        } else {
          setloginMessageType("error")
          setloginMessageNotify(i18next.t("authentication_page_unexpected_error"))
          setLoader("active")
        }
      });
    }
  }

  function signup() {
    if (alreadyExistUserWarning != "exist") {
      setsignupHeaderNotify("")
      setLoader("loading");
        let username = (document.getElementById("username_form") as HTMLInputElement).value;
        let email = (document.getElementById("email_form") as HTMLInputElement).value;
        let password = (document.getElementById("passwordForm") as HTMLInputElement).value;
        if (username && password && email) {
          user.setUsername(username);
          user.setPassword(password);
          user.setEmail(email);

          DoRegisterUserRequest(user, function (userRegisterResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
            if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
              // sessionStorage.setItem("token", userRegisterResponse_.getToken());
              sessionStorage.setItem("username", userRegisterResponse_.getUsername());
              localStorage.setItem("languageCode", userRegisterResponse_.getLanguageCode())
              sessionStorage.setItem("routingPage", "nav_menu");
              window.location.href = '/home'
              setLoader("active");
            } else {
              console.log(generalResponseModalResponse_.GrpcResponseCode)
              console.log(generalResponseModalResponse_.GrpcResponseMessage)
              setLoader("active");
            }
          });

        } else {
          console.log("Fields cannot be empty")
          setsignupMessageType("warning")
          setsignupMessageNotify(i18next.t("authentication_page_sign_up_empty_validation"))
          setLoader("active")
        }

      }
  }
  function handleEmailChangeForLogin(e: any) {
    userLogin.setUsername(e.target.value)
  }
  function handlePasswordChangeForLogin(e: any) {
    userLogin.setPassword(e.target.value)
  }

  function handleUsernameChangeForRegister(e: any) {
    if (e.target.value.length > 0) {
      var validationUsername = document.getElementById('validationUsername') as HTMLElement;
      var usernameLabel = document.getElementById('usernameLabel') as HTMLElement;
      var exist = document.getElementById('userExistDone') as HTMLElement;
      var non_exist = document.getElementById('userExistross') as HTMLElement;

      user.setUsername(e.target.value)
      user.setEmail("")
      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)

          validationUsername.innerText = i18next.t("authentication_page_username_or_email_already_exist")
          validationUsername.style.display = "inline-flex"
          usernameLabel.style.color = 'red'
          exist.style.display = 'none';
          non_exist.style.display = 'block';
          setalreadyExistUserWarning("exist")

        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          validationUsername.style.display = "none"
          usernameLabel.style.color = 'green';
          exist.style.display = 'block';
          non_exist.style.display = 'none';
          setalreadyExistUserWarning("nonExist")
        }
      });
    }
    else {
      var validationUsername2 = document.getElementById('validationUsername') as HTMLElement;
      var usernameLabel2 = document.getElementById('usernameLabel') as HTMLElement;
      var existDone = document.getElementById('userExistDone') as HTMLElement;
      var nonExistCross = document.getElementById('userExistross') as HTMLElement;

      validationUsername2.style.display = "none"
      usernameLabel2.style.color = 'black';
      existDone.style.display = 'none';
      nonExistCross.style.display = 'none';
      setalreadyExistUserWarning("nonExist")
    }
  }

  function handleEmailChangeForRegister(e: any) {
    if (e.target.value.length > 0) {

      var validationEmail = document.getElementById('validationEmail') as HTMLElement;
      var emailLabel = document.getElementById('emailLabel') as HTMLElement;
      var exist = document.getElementById('emailExistDone') as HTMLElement;
      var nonExist = document.getElementById('emailExistCross') as HTMLElement;

      user.setEmail(e.target.value)
      user.setUsername("")

      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)

          validationEmail.innerText = i18next.t("authentication_page_invalid_email_or_received")
          validationEmail.style.color = "red"
          validationEmail.style.display = "inline-flex"
          emailLabel.style.color = 'red'
          exist.style.display = 'none';
          nonExist.style.display = 'block';
          setalreadyExistUserWarning("exist")
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          validationEmail.style.display = "none"
          emailLabel.style.color = 'green'
          exist.style.display = 'block';
          nonExist.style.display = 'none';
          setalreadyExistUserWarning("noneExist")
        }
      });
    }
    else {
      var validationEmail2 = document.getElementById('validationEmail') as HTMLElement;
      var emailLabel2 = document.getElementById('emailLabel') as HTMLElement;
      var existDone = document.getElementById('emailExistDone') as HTMLElement;
      var emailExistCross = document.getElementById('emailExistCross') as HTMLElement;
      validationEmail2.style.display = "none"
      emailLabel2.style.color = 'black';
      existDone.style.display = 'none';
      emailExistCross.style.display = 'none';
      setalreadyExistUserWarning("nonExist")
    }
  }
  
  return (
    <div className="wrap">
      <section className="navSection Logos" >
        <div className="nav-wrapper">
          <div className="mr-auto">
            <a href="/" className="logo_link">
              <img src={logo} className="authentication-app-logo" alt="logo" />
              <img src={logoGignox} className="authentication_logo_word" alt="logo" />
            </a>
          </div>
        </div>
      </section>
      <section className="mainSection">
        <section className="leftSection">
          <img src={logos} style={{ width: "100%" }} />
        </section>
        <section className="rightSection">
          <div style={{ float: 'right', width: '100%', padding: '15px' }}>
            <Dropdown text="Language" icon='language' floating labeled button className='icon language_dropdown'>
              <Dropdown.Menu className="language_box" style={{ marginTop: '0!important' }}>
                <div style={{ padding: '8px', cursor: 'pointer' }}><Flag name='united kingdom' /><Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "en")} text='En' style={{ display: 'block', width: '74%', float: 'right' }} /></div>
                <div style={{ padding: '8px', cursor: 'pointer' }}><Flag name='turkey' /><Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "tr")} text='Tr' style={{ display: 'block', width: '74%', float: 'right' }} /></div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="sign-in-up-container">
            <a className="signup-title" onClick={() => setFade("signup")} style={{ fontSize: fade === "signup" ? '25px' : '15px' }}> {i18next.t("authentication_page_sign_up")}</a>|
          <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_sign_in")}</a>
          </div>
          <div className="Signup" style={{ display: fade === "signup" ? 'block' : 'none', lineHeight: '2', padding: '35px 16px 16px' }}>
            <form className="signupForm">
              <Message color='red' style={{ display: signupMessageType === "error" ? 'block' : 'none' }}>
                <Message.Header>{signupHeaderNotify}</Message.Header>
                <p>{signupMessageNotify}</p>
              </Message>
              <Message warning style={{ display: signupMessageType === "warning" ? 'block' : 'none' }}>
                <Message.Header>{signupHeaderNotify}</Message.Header>
                <p>{signupMessageNotify}</p>
              </Message>
              <label>{i18next.t("authentication_page_or")} <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_goto_sign_in")}</a></label>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label id="usernameLabel" style={{ width: '100%' }}>{i18next.t("authentication_page_username")}</label>

                <Form.Field>
                  <input autoComplete="new-username" className="input_control" placeholder={i18next.t("authentication_page_username")} autoFocus type="text" style={{ width: '100%', float: 'left' }} onChange={handleUsernameChangeForRegister} id="username_form" />
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistDone"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                  <Label id="validationUsername" basic color='red' pointing style={{ display: 'none' }} />
                </Form.Field>
              </div>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label id="emailLabel" style={{ width: '100%' }}>Email</label>
                <Form.Field>
                  <input autoComplete="new-email" className="input_control" placeholder="Email" autoFocus type="email" style={{ width: '100%', float: 'left' }} onChange={handleEmailChangeForRegister} id="email_form" />
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistDone"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistCross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                  <Label id="validationEmail" basic color='red' pointing style={{ display: 'none' }} />
                </Form.Field>
              </div>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label style={{ width: '100%' }}>{i18next.t("authentication_page_password")}</label>
                <input autoComplete="new-password" className="input_control" type="password" placeholder={i18next.t("authentication_page_password")} style={{ width: '100%', float: 'left' }} id="passwordForm" />
              </div>
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
              <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={signup} >
                {i18next.t("authentication_page_sign_up")}
              </Button>
              <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                Loading
                </Button>
            </form>
          </div>

          <div className="Login" style={{ display: fade === "signin" ? 'block' : 'none', lineHeight: '2', padding: '35px 16px 16px' }}>

            <form className="loginForm">
              <Message color='red' style={{ display: loginMessageType === "error" ? 'block' : 'none' }}>
                <Message.Header>{loginHeaderNotify}</Message.Header>
                <p>{loginMessageNotify}</p>
              </Message>
              <Message warning style={{ display: loginMessageType === "warning" ? 'block' : 'none' }}>
                <Message.Header>{loginHeaderNotify}</Message.Header>
                <p>{loginMessageNotify}</p>
              </Message>
              <label>{i18next.t("authentication_page_or")} <a className="signup-title" onClick={() => setFade("signup")} style={{ fontSize: fade === "signup" ? '25px' : '15px' }}>{i18next.t("authentication_page_create_an_account")}</a></label>
              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label>{i18next.t("authentication_page_username_or_email")}</label>
                <input className="input_control" placeholder={i18next.t("authentication_page_username_or_email")} autoFocus id="usernameLogin" onChange={handleEmailChangeForLogin} />
              </div>
              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label>{i18next.t("authentication_page_password")}</label>
                <input className="input_control" placeholder={i18next.t("authentication_page_password")} type="password" id="passwordLogin" onChange={handlePasswordChangeForLogin} />
              </div>

              <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={login} >
                {i18next.t("authentication_page_sign_in")}
              </Button>
              <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                Loading
                </Button>

              <div className="login-need-help"><a href="password_reset" className="forgot-password-link">
                {i18next.t("authentication_page_forgot_password")}</a></div>
            </form>
          </div>

        </section>
      </section>
    </div>
  );
};
