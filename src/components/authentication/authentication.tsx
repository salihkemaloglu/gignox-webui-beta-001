import * as React from 'react';
import Done from '@material-ui/icons/Done';
import Cross from '@material-ui/icons/WarningOutlined';
import { Dropdown, Flag, Label, Form, Message, Button, Progress } from 'semantic-ui-react';
var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
// var logos = require('../../app_root/images/authentication_page_background_image.png');
import './authentication.css';
import { useState } from 'react';
import { UserLogin, User, GeneralResponse } from '../../proto/gigxRR_pb';
import { i18next, lang } from '../../services/localization_service'
import { DoLoginUserRequest, DoRegisterUserRequest, DoCheckUserToRegisterRequest } from '../../controllers/authentication_controller';
import { GeneralResponseModal } from 'src/modals/general_response_modal';
import { grpc } from '@improbable-eng/grpc-web';
import { Container, Divider, Grid, Header, Image, List, Menu, Responsive, Segment, Sidebar, Icon } from 'semantic-ui-react'
import { GetMessageType } from 'src/helpers/message_type_helper';
import { ValidateUsername, ValidateEmail } from 'src/helpers/validation_helper';
var zxcvbn = require('zxcvbn');

export const Authentication = () => {
  const [loader, setLoader] = useState("active");
  const [fade, setFade] = useState("signup");
  const [loginMessageType, setloginMessageType] = useState("info");
  const [loginHeaderNotify, setloginHeaderNotify] = useState("");
  const [loginMessageNotify, setloginMessageNotify] = useState("");
  const [signupMessageType, setsignupMessageType] = useState("info");
  const [signupHeaderNotify, setsignupHeaderNotify] = useState("");
  const [signupMessageNotify, setsignupMessageNotify] = useState("");
  const [alreadyExistUserWarning, setalreadyExistUserWarning] = useState("nonExist");
  const [passwordStrenghtWidth, setpasswordStrenghtWidth] = useState("");
  const [passwordStrenghtColor, setpasswordStrenghtColor] = useState("off");
  const [sidebarOpened, setsidebarOpened] = React.useState(false)
  const [loginScreenOpened, setloginScreenOpened] = React.useState(false)
  const [signupScreenOpened, setsignupScreenOpened] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState("home")
  let [loginForm, setLoginForm] = React.useState("active")
  let loginAttempCount = 0;
  function sidebarScreenBack() {
    setloginScreenOpened(false)
    setsignupScreenOpened(false)
    setsidebarOpened(true)
  }
  function orSignin() {
    setloginScreenOpened(true)
    setsignupScreenOpened(false)
  }
  var userLogin = new UserLogin();
  var user = new User();
  document.addEventListener('DOMContentLoaded', (event) => {
    const windowsWidth = Responsive.onlyTablet.minWidth
    let authenticationType = sessionStorage.getItem("authenticationType") == null ? JSON.parse(JSON.stringify("null")) : sessionStorage.getItem("authenticationType");
    var count = localStorage.getItem("loginAttemptCount") == null ? JSON.parse(JSON.stringify("0")) : localStorage.getItem("loginAttemptCount");
    loginAttempCount = parseInt(count, 10);
    if (loginAttempCount > 20) {
      setloginMessageType("warning");
      setLoginForm("active");
      setloginMessageNotify(i18next.t("authentication_page_user_login_attemps"))
    }

    if (authenticationType != "null") {
      if (windowsWidth != undefined && windowsWidth < 991) {
        if (authenticationType == "signin") {
          setsidebarOpened(true)
          setloginScreenOpened(true)
        } else if (authenticationType == "signup") {
          setsidebarOpened(true)
          setsignupScreenOpened(true)
        }
        sessionStorage.removeItem("authenticationType");
      }
      else {
        if (authenticationType == "signin") {
          setFade("signin");
        } else if (authenticationType == "signup") {
          setFade("signup");
        }
        sessionStorage.removeItem("authenticationType");
      }

    }
  })

  function getWidth() {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }
  function Login() {
    const isSSR = typeof window === 'undefined'
    const windowsWidth = isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    let username = ""
    let password = ""
    setloginHeaderNotify("")
    setLoader("loading");
    var count = localStorage.getItem("loginAttemptCount") == null ? JSON.parse(JSON.stringify("0")) : localStorage.getItem("loginAttemptCount");
    let loginAttempCount = parseInt(count, 10);
    if (windowsWidth != undefined && windowsWidth < 991) {
      username = (document.getElementById("usernameLoginMob") as HTMLInputElement).value;
      password = (document.getElementById("passwordLoginMob") as HTMLInputElement).value;
    }
    else {
      username = (document.getElementById("usernameLogin") as HTMLInputElement).value;
      password = (document.getElementById("passwordLogin") as HTMLInputElement).value;
    }

    if (loginAttempCount >= 20) {
      if (loginForm == "active") {
        setLoginForm("passive");
        setTimeout(function () {
          localStorage.removeItem("loginAttemptCount"), setLoginForm("active"), setloginMessageNotify(""), setloginMessageType("")
        }, 600000);
      }
      setloginMessageNotify(i18next.t("authentication_page_user_login_attemps"))
      setloginMessageType("warning");
      setLoader("active");
    } else if (!username || !getWidth) {
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
        var response = GetMessageType(generalResponseModalResponse_);
        setloginMessageType(response.MessageType);
        setloginMessageNotify(response.Message);
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          localStorage.setItem("token", userLoginResponse_.getToken());
          localStorage.setItem("username", userLoginResponse_.getUsername());
          localStorage.setItem("languagecode", userLoginResponse_.getLanguageCode())
          localStorage.removeItem("loginAttemptCount")
          window.location.href = '/home'
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.Unauthenticated) {
          if (loginAttempCount < 20) {
            loginAttempCount = loginAttempCount + 1;
            localStorage.setItem("loginAttemptCount", loginAttempCount.toString());
          }
          setloginMessageNotify(i18next.t("authentication_page_invalid_username_or_password"))
          setLoader("active");
        } else {
          setLoader("active")
        }
      });
    }
  }

  function Signup() {
    setLoader("loading");
    setsignupHeaderNotify("");

    const isSSR = typeof window === 'undefined'
    const windowsWidth = isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    let username = ""
    let email = ""
    let password = ""
    if (windowsWidth != undefined && windowsWidth < 991) {
      username = (document.getElementById("usernameRegisterMob") as HTMLInputElement).value;
      email = (document.getElementById("emailRegisterMob") as HTMLInputElement).value;
      password = (document.getElementById("passwordRegisterMob") as HTMLInputElement).value;
    }
    else {
      username = (document.getElementById("usernameRegister") as HTMLInputElement).value;
      email = (document.getElementById("emailRegister") as HTMLInputElement).value;
      password = (document.getElementById("passwordRegister") as HTMLInputElement).value;
    }

    var result = zxcvbn(password);
    if (alreadyExistUserWarning == "exist") {
      setsignupMessageType("warning")
      setsignupMessageNotify(i18next.t("authentication_page_sign_up_empty_validation"))
      setLoader("active")
    } else if (!username || !email || !password) {
      setsignupMessageType("warning")
      setsignupMessageNotify(i18next.t("authentication_page_sign_up_empty_validation"))
      setLoader("active");
    } else if (result.score < 2) {
      setsignupMessageType("warning")
      setsignupMessageNotify(i18next.t("authentication_page_sign_up_register_password_strenght_validation_information"));
      setLoader("active");
    } else {
      user.setUsername(username);
      user.setEmail(email);
      user.setPassword(password);
      DoRegisterUserRequest(user, function (userRegisterResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
        var response = GetMessageType(generalResponseModalResponse_);
        setsignupMessageType(response.MessageType);
        setsignupMessageNotify(response.Message);
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          if (userRegisterResponse_.getIsOperationSuccess) {
            if (userRegisterResponse_.getIsTokenSuccess) {
              localStorage.setItem("token", userRegisterResponse_.getToken());
              localStorage.setItem("username", username);
              window.location.href = '/home'
            } else {
              window.location.href = '/'
            }
          } else {
            setLoader("active");
          }
        } else {
          setLoader("active");
        }
      });
    }
  }
  function handleUsernameChangeForRegister(e: any) {

    const isSSR = typeof window === 'undefined'
    const windowsWidth = isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    var validationUsername
    var usernameLabel
    var exist
    var nonExist
    if (windowsWidth != undefined && windowsWidth < 991) {
      validationUsername = document.getElementById('validationUsernameMob') as HTMLElement;
      usernameLabel = document.getElementById('usernameLabelMob') as HTMLElement;
      exist = document.getElementById('userExistDoneMob') as HTMLElement;
      nonExist = document.getElementById('userExistCrossMob') as HTMLElement;
    }
    else {
      validationUsername = document.getElementById('validationUsername') as HTMLElement;
      usernameLabel = document.getElementById('usernameLabel') as HTMLElement;
      exist = document.getElementById('userExistDone') as HTMLElement;
      nonExist = document.getElementById('userExistCross') as HTMLElement;
    }
    if (e.target.value.length > 0) {
      user.setUsername(e.target.value)
      user.setEmail("")
      if (!ValidateUsername(e.target.value)) {
        validationUsername.innerText = i18next.t("authentication_page_invalid_username")
        validationUsername.style.color = "red"
        validationUsername.style.display = "inline-flex"
        usernameLabel.style.color = 'red'
        exist.style.display = 'none';
        nonExist.style.display = 'block';
        setalreadyExistUserWarning("exist")
      } else {
        DoCheckUserToRegisterRequest(user, function (userResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
          var response = GetMessageType(generalResponseModalResponse_);
          if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
            validationUsername.innerText = i18next.t("authentication_page_username_or_email_already_exist")
            validationUsername.style.display = "inline-flex"
            usernameLabel.style.color = 'red'
            exist.style.display = 'none';
            nonExist.style.display = 'block';
            setalreadyExistUserWarning("exist")

          } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
            validationUsername.style.display = "none"
            usernameLabel.style.color = 'green';
            exist.style.display = 'block';
            nonExist.style.display = 'none';
            setalreadyExistUserWarning("nonExist")
          } else {
            setsignupMessageType(response.MessageType);
            setsignupMessageNotify(response.Message);
          }
        });
      }
    }
    else {

      validationUsername.style.display = "none"
      usernameLabel.style.color = 'black';
      exist.style.display = 'none';
      nonExist.style.display = 'none';
      setalreadyExistUserWarning("nonExist")
    }
  }

  function handleEmailChangeForRegister(e: any) {
    const isSSR = typeof window === 'undefined'
    const windowsWidth = isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    var validationEmail
    var emailLabel
    var exist
    var nonExist
    if (windowsWidth != undefined && windowsWidth < 991) {
      validationEmail = document.getElementById('validationEmailMob') as HTMLElement;
      emailLabel = document.getElementById('emailLabelMob') as HTMLElement;
      exist = document.getElementById('emailExistDoneMob') as HTMLElement;
      nonExist = document.getElementById('emailExistCrossMob') as HTMLElement;

    }
    else {
      validationEmail = document.getElementById('validationEmail') as HTMLElement;
      emailLabel = document.getElementById('emailLabel') as HTMLElement;
      exist = document.getElementById('emailExistDone') as HTMLElement;
      nonExist = document.getElementById('emailExistCross') as HTMLElement;

    }


    if (e.target.value.length > 0) {

      user.setEmail(e.target.value)
      user.setUsername("")
      if (!ValidateEmail(e.target.value)) {
        validationEmail.innerText = i18next.t("authentication_page_invalid_email_or_received")
        validationEmail.style.color = "red"
        validationEmail.style.display = "inline-flex"
        emailLabel.style.color = 'red'
        exist.style.display = 'none';
        nonExist.style.display = 'block';
        setalreadyExistUserWarning("exist")
      } else {
        DoCheckUserToRegisterRequest(user, function (userResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
          var response = GetMessageType(generalResponseModalResponse_);
          if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
            validationEmail.innerText = i18next.t("authentication_page_invalid_email_or_received")
            validationEmail.style.color = "red"
            validationEmail.style.display = "inline-flex"
            emailLabel.style.color = 'red'
            exist.style.display = 'none';
            nonExist.style.display = 'block';
            setalreadyExistUserWarning("exist")
          } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
            validationEmail.style.display = "none"
            emailLabel.style.color = 'green'
            exist.style.display = 'block';
            nonExist.style.display = 'none';
            setalreadyExistUserWarning("noneExist")
          } else {
            setsignupMessageType(response.MessageType);
            setsignupMessageNotify(response.Message);
          }
        });
      }
    } else {

      validationEmail.style.display = "none"
      emailLabel.style.color = 'black';
      exist.style.display = 'none';
      nonExist.style.display = 'none';
      setalreadyExistUserWarning("nonExist")
    }
  }
  function handlePasswordChange(e: any) {
    if (!e.target.value) {
      setpasswordStrenghtColor("");
    } else {
      var result = zxcvbn(e.target.value);
      switch (result.score) {
        case 0:
          setpasswordStrenghtWidth("20%");
          setpasswordStrenghtColor("red");
          break;
        case 1:
          setpasswordStrenghtWidth("40%");
          setpasswordStrenghtColor("orange");
          break;
        case 2:
          setpasswordStrenghtWidth("60%");
          setpasswordStrenghtColor("yellow");
          break;
        case 3:
          setpasswordStrenghtWidth("80%");
          setpasswordStrenghtColor("olive");
          break;
        case 4:
          setpasswordStrenghtWidth("100%");
          setpasswordStrenghtColor("green");
          break;
        default:
          setpasswordStrenghtWidth("0%");
          setpasswordStrenghtColor("none");
          break;
      }
    }
  }
  function handleOnKeyPress(e: any) {
    if (e.key === 'Enter') {
      if (fade == "signin") {
        Login();
      } else if (fade == "signup") {
        Signup();
      }
    }
  }

  return (
    <div className="wrap">
      <section className="navSection Logos" style={{ width: '65%' }}>
        {/* <div className="mr-auto">
            <a href="/" className="logo_link">
              <img src={logo} className="authentication-app-logo" alt="logo" />
              <img src={logoGignox} className="authentication_logo_word" alt="logo" />
            </a>
          </div> */}
        <Segment
          textAlign='center'
          vertical
          style={{ padding: '0' }}
        >
          <Menu size='small' inverted borderless>
            <Menu.Item as='div'>
              <a href="/" className="logo_link">
                <img src={logo} className="authentication-app-logo" alt="logo" />
                <img src={logoGignox} className="authentication_logo_word" alt="logo" />
              </a>
            </Menu.Item>
            <Menu.Item as='div' borderless style={{ left: '50px' }}>
              <Menu.Item as='a' className={activeMenu == "home" ? "activeMenu" : ""} onClick={() => setActiveMenu("home")} style={{ color: 'white' }}>Home</Menu.Item>
              <Menu.Item as='a' className={activeMenu == "about" ? "activeMenu" : ""} onClick={() => setActiveMenu("about")} style={{ color: 'white' }}>About</Menu.Item>
              <Menu.Item as='a' className={activeMenu == "contact" ? "activeMenu" : ""} onClick={() => setActiveMenu("contact")} style={{ color: 'white' }}>Contact</Menu.Item>
              <Menu.Item as='a' className={activeMenu == "donation" ? "activeMenu" : ""} onClick={() => setActiveMenu("donation")} style={{ color: 'white' }}>Donation</Menu.Item>
            </Menu.Item>
          </Menu>
        </Segment>

      </section>
      <section className="mainSection">
        <section className="leftSection">
          {/* <img src={logos} style={{ width: "100%" }} /> */}
          <div style={{ marginTop: '27%', textAlign: 'center' }}>
            <div>
              <Container text>
                <Header
                  as='h1'
                  content='Imagine-a-Company'
                  inverted
                  style={{
                    fontSize: '2em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '1.5em',
                  }}
                />
                <Header
                  as='h2'
                  content='Do whatever you want when you want to.'
                  inverted
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 'normal',
                    marginTop: '0.5em',
                  }}
                />
                <Button primary size='huge'>
                  Get Started
</Button>
              </Container>
            </div>
          </div>
        </section>
        <section className="rightSection">
          <div style={{ float: 'right', width: '100%', padding: '15px' }}>
            <Dropdown text="Language" icon='globe' floating labeled button className='icon language_dropdown'>
              <Dropdown.Menu className="language_box" style={{ marginTop: '0!important' }}>
                <div style={{ padding: '8px', cursor: 'pointer' }}><Flag name='united kingdom' /><Dropdown.Item href="." onClick={() => localStorage.setItem("languagecode", "en")} text='En' style={{ display: 'block', width: '74%', float: 'right' }} /></div>
                <div style={{ padding: '8px', cursor: 'pointer' }}><Flag name='turkey' /><Dropdown.Item href="." onClick={() => localStorage.setItem("languagecode", "tr")} text='Tr' style={{ display: 'block', width: '74%', float: 'right' }} /></div>
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
                  <input autoComplete="new-username" className="input_control" placeholder={i18next.t("authentication_page_username")} autoFocus type="text" style={{ width: '100%', float: 'left' }} id="usernameRegister" onChange={handleUsernameChangeForRegister} onKeyPress={handleOnKeyPress} />
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistDone"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistCross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                  <Label id="validationUsername" basic color='red' pointing style={{ display: 'none' }} />
                </Form.Field>
              </div>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label id="emailLabel" style={{ width: '100%' }}>Email</label>
                <Form.Field>
                  <input autoComplete="new-email" className="input_control" placeholder="Email" autoFocus type="email" style={{ width: '100%', float: 'left' }} id="emailRegister" onChange={handleEmailChangeForRegister} onKeyPress={handleOnKeyPress} />
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistDone"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistCross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                  <Label id="validationEmail" basic color='red' pointing style={{ display: 'none' }} />
                </Form.Field>
              </div>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label style={{ width: '100%' }}>{i18next.t("authentication_page_password")}</label>
                <input autoComplete="new-password" className="input_control" type="password" placeholder={i18next.t("authentication_page_password")} style={{ width: '100%', float: 'left' }} id="passwordRegister" onChange={handlePasswordChange} onKeyPress={handleOnKeyPress} />
              </div>
              <div>
                <div style={{ display: passwordStrenghtColor === "red" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='red' size='tiny' /></div>
                <div style={{ display: passwordStrenghtColor === "orange" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='orange' size='tiny' /></div>
                <div style={{ display: passwordStrenghtColor === "yellow" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='yellow' size='tiny' /></div>
                <div style={{ display: passwordStrenghtColor === "olive" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='olive' size='tiny' /></div>
                <div style={{ display: passwordStrenghtColor === "green" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='green' size='tiny' /></div>
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
              <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={Signup} >
                {i18next.t("authentication_page_sign_up")}
              </Button>
              <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                Loading
                </Button>
            </form>
          </div>

          <div className="Login" style={{ display: fade === "signin" ? 'block' : 'none', lineHeight: '2', padding: '35px 16px 16px' }}>
            <div style={{ display: loginForm === "passive" ? 'block' : 'none' }}>
              <Message warning style={{ display: loginMessageType === "warning" ? 'block' : 'none' }}>
                <Message.Header>{loginHeaderNotify}</Message.Header>
                <p>{loginMessageNotify}</p>
              </Message>
            </div>
            <form className="loginForm" style={{ display: loginForm === "active" ? 'block' : 'none' }}>
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
                <input className="input_control" type="text" placeholder={i18next.t("authentication_page_username_or_email")} autoFocus id="usernameLogin" onKeyPress={handleOnKeyPress} />
              </div>
              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label>{i18next.t("authentication_page_password")}</label>
                <input className="input_control" placeholder={i18next.t("authentication_page_password")} type="password" id="passwordLogin" onKeyPress={handleOnKeyPress} />
              </div>
              <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={Login} >
                {i18next.t("authentication_page_sign_in")}
              </Button>
              <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                Loading
                </Button>
              <div className="login-need-help"><a href="password_reset" className="forgot-password-link">
                {i18next.t("authentication_page_forgot_password")}</a></div>
            </form>
            <div style={{ display: loginForm === "passive" ? 'block' : 'none' }} className="login-need-help"><a href="password_reset" className="forgot-password-link">{i18next.t("authentication_page_forgot_password")}</a></div>
          </div>

        </section>
      </section>
      <section className="about" style={{ height: '-webkit-fill-available', backgroundColor: 'red' }}>
        <div>
          <span>About</span>
        </div>
      </section>
      <section className="contact" style={{ height: '-webkit-fill-available', backgroundColor: 'blue' }}>
        <div>
          <span>Contact</span>
        </div>
      </section>
      <section className="donation" style={{ height: '-webkit-fill-available', backgroundColor: 'yellow' }}>
        <div>
          <span>Donation</span>
        </div>
      </section>
      <Responsive
        as={Sidebar.Pushable}
        getWidth={() => (getWidth ? window.innerWidth : 0)}
        maxWidth={Responsive.onlyTablet.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={() => setsidebarOpened(false)}
          vertical
          visible={sidebarOpened}
        >

          <a href="/" className="logo_link" style={{ display: 'inherit' }}>
            <img src={logo} className="authentication-app-logo" alt="logo" />
            <img src={logoGignox} className="authentication_logo_word" alt="logo" />
          </a>
          <Menu.Item as='a' active>Home</Menu.Item>
          <Menu.Item as='a'>About</Menu.Item>
          <Menu.Item as='a'>Contact</Menu.Item>
          <Menu.Item as='a' onClick={() => setloginScreenOpened(true)}>Sign in</Menu.Item>
          <Menu.Item as='a' onClick={() => setsignupScreenOpened(true)}>Sign Up</Menu.Item>
        </Sidebar>


        {/******* Login screen **********/}
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={() => setloginScreenOpened(false)}
          vertical
          visible={loginScreenOpened}
          style={{ backgroundColor: 'white', width: '100%' }}
        >

          <Menu.Item as='a' style={{ marginBottom: '10px', paddingBottom: '15px', backgroundColor: '#2B2F43', minHeight: '50px' }} onClick={sidebarScreenBack}><Icon name='chevron circle left' style={{ color: 'white', float: 'left', fontSize: '25px' }} /></Menu.Item>
          <Menu.Item as='a'>
            <div className="Login" style={{ lineHeight: '2', padding: '0' }}>
              <div style={{ display: loginForm === "passive" ? 'block' : 'none' }}>
                <Message warning style={{ display: loginMessageType === "warning" ? 'block' : 'none' }}>
                  <Message.Header>{loginHeaderNotify}</Message.Header>
                  <p>{loginMessageNotify}</p>
                </Message>
              </div>
              <form className="loginForm" style={{ display: loginForm === "active" ? 'block' : 'none' }}>
                <Message color='red' style={{ display: loginMessageType === "error" ? 'block' : 'none' }}>
                  <Message.Header>{loginHeaderNotify}</Message.Header>
                  <p>{loginMessageNotify}</p>
                </Message>
                <Message warning style={{ display: loginMessageType === "warning" ? 'block' : 'none' }}>
                  <Message.Header>{loginHeaderNotify}</Message.Header>
                  <p>{loginMessageNotify}</p>
                </Message>
                <label style={{ color: 'black' }}>{i18next.t("authentication_page_or")} <a className="signup-title" onClick={() => setsignupScreenOpened(true)} style={{ fontSize: '15px' }}>{i18next.t("authentication_page_create_an_account")}</a></label>
                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                  <label style={{ color: 'black' }}>{i18next.t("authentication_page_username_or_email")}</label>
                  <input className="input_control" placeholder={i18next.t("authentication_page_username_or_email")} autoFocus id="usernameLoginMob" />
                </div>
                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                  <label style={{ color: 'black' }}>{i18next.t("authentication_page_password")}</label>
                  <input className="input_control" placeholder={i18next.t("authentication_page_password")} type="password" id="passwordLoginMob" />
                </div>
                <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={Login} >
                  {i18next.t("authentication_page_sign_in")}
                </Button>
                <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                  Loading
                </Button>
                <div className="login-need-help"><a href="password_reset" className="forgot-password-link">
                  {i18next.t("authentication_page_forgot_password")}</a></div>
              </form>
              <div style={{ display: loginForm === "passive" ? 'block' : 'none' }} className="login-need-help"><a href="password_reset" className="forgot-password-link">{i18next.t("authentication_page_forgot_password")}</a></div>

            </div>
          </Menu.Item>
        </Sidebar>

        {/******* Sign up screen **********/}
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={() => setsignupScreenOpened(false)}
          vertical
          visible={signupScreenOpened}
          style={{ backgroundColor: 'white', width: '100%' }}
        >
          <Menu.Item as='a' style={{ marginBottom: '10px', paddingBottom: '15px', backgroundColor: '#2B2F43', minHeight: '50px' }} onClick={sidebarScreenBack}><Icon name='chevron circle left' style={{ color: 'white', float: 'left', fontSize: '25px' }} /></Menu.Item>

          <Menu.Item as='a'>
            <div className="Signup" style={{ lineHeight: '2' }}>
              <form className="signupForm">
                <Message color='red' style={{ display: signupMessageType === "error" ? 'block' : 'none' }}>
                  <Message.Header>{signupHeaderNotify}</Message.Header>
                  <p>{signupMessageNotify}</p>
                </Message>
                <Message warning style={{ display: signupMessageType === "warning" ? 'block' : 'none' }}>
                  <Message.Header>{signupHeaderNotify}</Message.Header>
                  <p>{signupMessageNotify}</p>
                </Message>
                <label style={{ color: 'black' }}>{i18next.t("authentication_page_or")} <a className="signin-title" onClick={orSignin} style={{ fontSize: '15px' }}>{i18next.t("authentication_page_goto_sign_in")}</a></label>

                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                  <label id="usernameLabelMob" style={{ width: '100%', color: 'black' }}>{i18next.t("authentication_page_username")}</label>

                  <Form.Field>
                    <input autoComplete="new-username" className="input_control" placeholder={i18next.t("authentication_page_username")} autoFocus type="text" style={{ width: '100%', float: 'left' }} id="usernameRegisterMob" onChange={handleUsernameChangeForRegister} onKeyPress={handleOnKeyPress} />
                    <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistDoneMob"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                    <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistCrossMob"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                    <Label id="validationUsernameMob" basic color='red' pointing style={{ display: 'none' }} />
                  </Form.Field>
                </div>

                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                  <label id="emailLabelMob" style={{ width: '100%', color: 'black' }}>Email</label>
                  <Form.Field>
                    <input autoComplete="new-email" className="input_control" placeholder="Email" autoFocus type="email" style={{ width: '100%', float: 'left' }} onChange={handleEmailChangeForRegister} id="emailRegisterMob" />
                    <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistDoneMob"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                    <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistCrossMob"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                    <Label id="validationEmailMob" basic color='red' pointing style={{ display: 'none' }} />
                  </Form.Field>
                </div>

                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                  <label style={{ width: '100%', color: 'black' }}>{i18next.t("authentication_page_password")}</label>
                  <input autoComplete="new-password" className="input_control" type="password" onChange={handlePasswordChange} placeholder={i18next.t("authentication_page_password")} style={{ width: '100%', float: 'left' }} id="passwordRegisterMob" />
                </div>
                <div>
                  <div style={{ display: passwordStrenghtColor === "red" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='red' size='tiny' /></div>
                  <div style={{ display: passwordStrenghtColor === "orange" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='orange' size='tiny' /></div>
                  <div style={{ display: passwordStrenghtColor === "yellow" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='yellow' size='tiny' /></div>
                  <div style={{ display: passwordStrenghtColor === "olive" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='olive' size='tiny' /></div>
                  <div style={{ display: passwordStrenghtColor === "green" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='green' size='tiny' /></div>
                </div>
                {(() => {
                  switch (lang) {
                    case 'en':
                      return <label style={{ color: 'black' }}>{i18next.t('authentication_page_terms_start')} {i18next.t('authentication_page_accept_terms')} <a className='signup-title'>{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title'>{i18next.t('authentication_page_privacy_policy')}</a></label>;
                    case 'tr':
                      return <label style={{ color: 'black' }}>{i18next.t('authentication_page_terms_start')} <a className='signup-title' >{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title' >{i18next.t('authentication_page_privacy_policy')} </a> {i18next.t('authentication_page_accept_terms')}</label>;
                    default:
                      return "null";
                  }
                })()}
                <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={Signup} >
                  {i18next.t("authentication_page_sign_up")}
                </Button>
                <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                  Loading
                </Button>
              </form>
            </div>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item style={{ marginLeft: '0', width: '240px' }}>
                  <a href="/" className="logo_link" style={{ display: 'inherit' }}>
                    <img src={logo} className="authentication-app-logo" alt="logo" />
                    <img src={logoGignox} className="authentication_logo_word" alt="logo" style={{ height: '30px', marginTop: '5px' }} />
                  </a>
                </Menu.Item>
                <Menu.Item onClick={() => setsidebarOpened(true)} style={{ marginBottom: '10px', fontSize: '23px', marginLeft: 'auto' }}>
                  <Icon name='sidebar' />
                </Menu.Item>
              </Menu>
            </Container>
            {/*************** HomepageHeading ******************/}
            <Container text>
              <Header
                as='h1'
                content='Imagine-a-Company'
                inverted
                style={{
                  fontSize: '2em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '1.5em',
                }}
              />
              <Header
                as='h2'
                content='Do whatever you want when you want to.'
                inverted
                style={{
                  fontSize: '1.5em',
                  fontWeight: 'normal',
                  marginTop: '0.5em',
                }}
              />
              <Button primary size='huge'>
                Get Started
</Button>
            </Container>
            {/*************** /HomepageHeading ******************/}
          </Segment>

          {/*************** children ******************/}
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as='h3' style={{ fontSize: '2em' }}>
                    We Help Companies and Companions
</Header>
                  <p style={{ fontSize: '1.33em' }}>
                    We can give your company superpowers to do things that they never thought possible.
                    Let us delight your customers and empower your needs... through pure data analytics.
</p>
                  <Header as='h3' style={{ fontSize: '2em' }}>
                    We Make Bananas That Can Dance
</Header>
                  <p style={{ fontSize: '1.33em' }}>
                    Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                    bioengineered.
</p>
                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                  <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Button size='huge'>Check Them Out</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2em' }}>
                    "What a Company"
</Header>
                  <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2em' }}>
                    "I shouldn't have gone with their competitor."
</Header>
                  <p style={{ fontSize: '1.33em' }}>
                    <Image avatar src='/images/avatar/large/nan.jpg' />
                    <b>Nan</b> Chief Fun Officer Acme Toys
</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Breaking The Grid, Grabs Your Attention
</Header>
              <p style={{ fontSize: '1.33em' }}>
                Instead of focusing on content creation and hard work, we have learned how to master the
                art of doing nothing by providing massive amounts of whitespace and generic content that
                can seem massive, monolithic and worth your attention.
</p>
              <Button as='a' size='large'>
                Read More
</Button>
              <Divider
                as='h4'
                className='header'
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
              >
                <a href='#'>Case Studies</a>
              </Divider>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Did We Tell You About Our Bananas?
</Header>
              <p style={{ fontSize: '1.33em' }}>
                Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                it's really true. It took years of gene splicing and combinatory DNA research, but our
                bananas can really dance.
</p>
              <Button as='a' size='large'>
                I'm Still Quite Interested
</Button>
            </Container>
          </Segment>
          <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='About' />
                    <List link inverted>
                      <List.Item as='a'>Sitemap</List.Item>
                      <List.Item as='a'>Contact Us</List.Item>
                      <List.Item as='a'>Religious Ceremonies</List.Item>
                      <List.Item as='a'>Gazebo Plans</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Services' />
                    <List link inverted>
                      <List.Item as='a'>Banana Pre-Order</List.Item>
                      <List.Item as='a'>DNA FAQ</List.Item>
                      <List.Item as='a'>How To Access</List.Item>
                      <List.Item as='a'>Favorite X-Men</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Header as='h4' inverted>
                      Footer Header
</Header>
                    <p>
                      Extra space for a call to action inside the footer that could help re-engage users.
</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
          {/*************** /children ******************/}


        </Sidebar.Pusher>
      </Responsive>
    </div>
  );
};
