import * as React from 'react';
import { Button, Form, Message, Grid, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
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
export const PasswordReset = () => {

  let [loader, setLoader] = useState("active");
  let [messageType, setmessageType] = useState("loading");
  let [input, setInput] = useState("off");
  let [headerNotify, setheaderNotify] = useState("");
  let [messageNotify, setmessageNotify] = useState("");
  let [userEmail, setuserEmail] = useState("");
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
    if (!password && !passwordConfirm) {
      setheaderNotify("Password fields can not be empty");
      setmessageNotify("");
      setmessageType("warning");
      setLoader("active");
    } else if (password != passwordConfirm) {
      setheaderNotify("Password confirmation doesn't match the password");
      setmessageNotify("");
      setmessageType("warning");
      setLoader("active");
    } else {
      generalRequest.setEmailAddress(userEmail);
      generalRequest.setPassword(password);
      generalRequest.setPasswordConfirm(passwordConfirm);
      generalRequest.setForgotPasswordVerificationToken(match.params.id);
      generalRequest.setEmailType("forgot");
      DoResetUserPasswordRequest(generalRequest, function (generalResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.NotFound) {
          setheaderNotify("We can't find your account");
          setmessageNotify("please check your email and resent");
          setmessageType("error");
          setLoader("active");
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          setheaderNotify("Email can not be empty");
          setmessageNotify("please check your email and resent");
          setmessageType("warning");
          setLoader("active");
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          setmessageType("success");
          setInput("off");
          setLoader("success");
        } else {
          setheaderNotify("Email could not be sended ");
          setmessageNotify("Service is not avaible now,please tyr later.");
          setmessageType("error");
          setLoader("active");
        }
      });
    }

  }
  function handlePasswordChange(e: any) {
    console.log(e.target.value)
  }
  function handleConfirmPasswordChange(e: any) {
    console.log(e.target.value)
  }
  function GoBackAuthentication() {
    window.location.href = "/";
  }
  return (
    <div className="wrap">
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450, marginTop: '5%' }}>
          <Header as='h2' color='teal' textAlign='center'>
            <a href="/home" className="active"><img src={logo} className="App-logo" alt="logo"/><img src={logoGignox} alt="logo"/></a>
          </Header>
          <Message success style={{ display: messageType === "success" ? 'block' : 'none' }}>
            <Message.Header>New password set successfully.</Message.Header>
          </Message>
          <Message warning style={{ display: messageType === "warning" ? 'block' : 'none' }}>
            <Message.Header>{headerNotify}</Message.Header>
            <p>{messageNotify}</p>
          </Message>
          <Message color='red' style={{ display: messageType === "error" ? 'block' : 'none' }}>
            <Message.Header>{headerNotify}</Message.Header>
            <p>{messageNotify}</p>
          </Message>
          <Message attached style={{ display: messageType === "info" ? 'block' : 'none' }}>
            <Message.Header>Change password for</Message.Header>
            <p>{userEmail}</p>
          </Message><br />
          <div style={{ display: messageType === "loading" ? 'block' : 'none', marginTop: "15%" }}>
            <Dimmer active inverted >
              <Loader size='large'>Loading</Loader>
            </Dimmer>
          </div>

          <Form size='large' style={{ display: input === "on" ? 'block' : 'none' }}>
            <Segment stacked>
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' id="password" onChange={handlePasswordChange} />
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password confirm' id="passwordConfirm" onChange={handleConfirmPasswordChange} />
              <Button color='teal' fluid size='large' style={{ display: loader === "active" ? 'block' : 'none' }} onClick={ResetPassword} >
                {i18next.t("password_reset_page_reset_Password")}
              </Button>
              <Button loading fluid style={{ display: loader === "loading" ? 'block' : 'none' }} color='teal'>
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