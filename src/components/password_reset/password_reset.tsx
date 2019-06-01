import * as React from 'react';
import { Button, Form, Message, Grid, Header, Segment, Dimmer, Loader, Progress } from 'semantic-ui-react'
import { i18next } from '../../services/localization_service';
import { grpc } from '@improbable-eng/grpc-web';
import { useState } from 'react';
import { matchPath } from 'react-router-dom';
var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
import './password_reset.css';
import { DoCheckVerificationTokenRequest, DoResetUserPasswordRequest } from '../../controllers/password_reset_controller';
import { GeneralRequest, GeneralResponse } from '../../proto/gigxRR_pb';
import { GeneralResponseModal } from '../../modals/general_response_modal';
import { GetMessageType } from '../../helpers/message_type_helper';
var zxcvbn = require('zxcvbn');
export const PasswordReset = () => {

  const [loader, setLoader] = useState("active");
  const [messageType, setmessageType] = useState("loading");
  const [input, setInput] = useState("off");
  const [messageNotify, setmessageNotify] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [passwordStrenghtWidth, setpasswordStrenghtWidth] = useState("");
  const [passwordStrenghtColor, setpasswordStrenghtColor] = useState("off");
  let generalRequest = new GeneralRequest();
  const match = matchPath(location.pathname, {
    path: "/password_reset/:id",
    exact: true,
    strict: false
  });

  document.addEventListener('DOMContentLoaded', (event) => {
    generalRequest.setEmailType("forgot");
    generalRequest.setForgotPasswordVerificationToken(match.params.id);
    DoCheckVerificationTokenRequest(generalRequest, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
      var response = GetMessageType(generalResponseModalResponse_);
      if (generalResponseModalResponse_.GrpcResponseCode != grpc.Code.OK) {
        sessionStorage.setItem("message", response.Message);
        window.location.href = "/password_reset";
      } else {
        setuserEmail(generalResponse_.getMessage());
        setmessageType("info");
        setInput("on");
      }
    });
  })

  function ResetPassword() {
    setLoader("loading");
    let password = (document.getElementById("password") as HTMLInputElement).value;
    let passwordConfirm = (document.getElementById("passwordConfirm") as HTMLInputElement).value;
    var result = zxcvbn(password);
    if (!password && !passwordConfirm) {
      setmessageNotify(i18next.t("password_resent_page_password_empty_validation"));
      setmessageType("warning");
      setLoader("active");
    } else if (password != passwordConfirm) {
      setmessageNotify(i18next.t("password_resent_page_password_match_validation"));
      setmessageType("warning");
      setLoader("active");
    } else if (result.score < 2) {
      setmessageNotify(i18next.t("password_resent_page_password_strenght_validation_information"));
      setmessageType("warning");
      setLoader("active");
    } else {
      generalRequest.setEmailAddress(userEmail);
      generalRequest.setPassword(password);
      generalRequest.setPasswordConfirm(passwordConfirm);
      generalRequest.setForgotPasswordVerificationToken(match.params.id);
      generalRequest.setEmailType("forgot");
      DoResetUserPasswordRequest(generalRequest, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
        var response = GetMessageType(generalResponseModalResponse_);
        setmessageType(response.MessageType);
        setmessageNotify(response.Message);
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          setmessageType("success");
          setInput("off");
          setLoader("success");
          localStorage.removeItem("loginAttemptCount")
        } else {
          setLoader("active");
        }
      });
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

  function GoBackAuthentication() {
    window.location.href = "/";
  }
  function handleOnKeyPress(e: any) {
    if (e.key === 'Enter') {
      ResetPassword();
    }
  }
  return (
    <div className="wrap">
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450, marginTop: '5%' }}>
          <Header as='h2' color='teal' textAlign='center'>
            <a href="/" className="logo_link">
              <img src={logo} className="password-reset-app-logo" alt="logo" />
              <img src={logoGignox} className="password-reset-logo-word" alt="logo" />
            </a>
          </Header>
          <Message success style={{ display: messageType === "success" ? 'block' : 'none' }}>
            <Message.Header>New password set successfully.</Message.Header>
          </Message>
          <Message warning style={{ display: messageType === "warning" ? 'block' : 'none' }}>
            <p>{messageNotify}</p>
          </Message>
          <Message color='red' style={{ display: messageType === "error" ? 'block' : 'none' }}>
            <p>{messageNotify}</p>
          </Message>
          <Message attached style={{ display: messageType === "info" ? 'block' : 'none' }}>
            <Message.Header>{i18next.t("password_resent_page_change_password_title")}</Message.Header>
            <p>{userEmail}</p>
          </Message><br />
          <div style={{ display: messageType === "loading" ? 'block' : 'none', marginTop: "15%" }}>
            <Dimmer active inverted >
              <Loader size='large'>Loading</Loader>
            </Dimmer>
          </div>

          <Form size='large' style={{ display: input === "on" ? 'block' : 'none' }}>
            <Segment stacked>
              <Form.Input fluid icon='lock' iconPosition='left' type="password" placeholder='Password' id="password" onChange={handlePasswordChange} onKeyPress={handleOnKeyPress} />
              <Form.Input fluid icon='lock' iconPosition='left' type="password" placeholder='Password confirm' id="passwordConfirm" onKeyPress={handleOnKeyPress} />
              <div style={{ display: passwordStrenghtColor === "red" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='red' size='tiny' /></div>
              <div style={{ display: passwordStrenghtColor === "orange" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='orange' size='tiny' /></div>
              <div style={{ display: passwordStrenghtColor === "yellow" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='yellow' size='tiny' /></div>
              <div style={{ display: passwordStrenghtColor === "olive" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='olive' size='tiny' /></div>
              <div style={{ display: passwordStrenghtColor === "green" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='green' size='tiny' /></div>
              <p>{i18next.t("password_reset_page_change_password_info")}</p>
              <Button color='teal' fluid size='large' style={{ display: loader === "active" ? 'block' : 'none' }} onClick={ResetPassword} >
                {i18next.t("password_reset_page_reset_Password")}
              </Button>
              <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none' }} color='teal'>
                Loading
              </Button>
            </Segment>
          </Form>

          <Button color='teal' fluid size='large' style={{ display: loader === "success" ? 'block' : 'none' }} onClick={GoBackAuthentication} >
            {i18next.t("password_reset_page_go_back_authentiocation")}
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};