import * as React from 'react';
import { grpc } from '@improbable-eng/grpc-web';
import { useState } from 'react';
import { Button, Form, Message, Grid, Header, Segment } from 'semantic-ui-react'
import { GeneralRequest, GeneralResponse } from '../../proto/gigxRR_pb';
import { i18next } from '../../services/localization_service';
import { DoSendEmailRequest } from '../../controllers/password_reset_controller';
import { GeneralResponseModal } from '../../modals/general_response_modal';
import { ValidateEmail } from '../../helpers/email_validation_helper';
import './password_reset.css';
import { GetMessageType } from 'src/helpers/message_type_helper';
var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
export const PasswordResetSendMail = () => {

  let [loader, setLoader] = useState("active");
  let [messageType, setmessageType] = useState("info");
  let [input, setInput] = useState("on");
  let [headerNotify, setheaderNotify] = useState("");
  let [messageNotify, setmessageNotify] = useState("");
  let generalRequest = new GeneralRequest();

  document.addEventListener('DOMContentLoaded', (event) => {
    let message = sessionStorage.getItem("message") == null ? JSON.parse(JSON.stringify("null")) : sessionStorage.getItem("message");
    if (message != "null") {
      setmessageType("error");
      setheaderNotify(message);
      setmessageNotify("Please check your email and  try again")
      sessionStorage.removeItem("message");
    }
  })

  function SendPasswordResetEmail() {
    setLoader("loading");
    let emailValue = (document.getElementById("emailReserPassword") as HTMLInputElement).value;
    if (!emailValue) {
      setheaderNotify("Email can not be empty");
      setmessageNotify("Please check your email and  try again");
      setmessageType("warning");
      setLoader("active");
    } else if (!ValidateEmail(emailValue)) {
      setheaderNotify("Email address is not valid");
      setmessageNotify("Please check your email and  try again");
      setmessageType("warning");
      setLoader("active");
    } else {
      generalRequest.setEmailAddress(emailValue);
      generalRequest.setEmailType("forgot")
      DoSendEmailRequest(generalRequest, function (userResponse_: GeneralResponse, generalResponseModalResponse_: GeneralResponseModal) {
        var response = GetMessageType(generalResponseModalResponse_);
        setmessageType(response.MessageType);
        setmessageNotify(response.Message);
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.NotFound) {
          setheaderNotify("We can't find your account");
          setLoader("active");
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          setheaderNotify("Email can not be empty");
          setLoader("active");
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          setmessageType("success");
          setInput("off");
          setLoader("success");
        }
      });
    }

  }
  function GoBackAuthentication() {
    window.location.href = "/";
  }
  return (
    <div className="wrap">
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450, marginTop: '5%' }}>
          <Header as='h2' color='teal' textAlign='center'>
            <a href="/home" className="active"><img src={logo} className="App-logo" alt="logo" /><img src={logoGignox} alt="logo" style={{ marginBottom: '8px' }} /></a>
          </Header>
          <Message success style={{ display: messageType === "success" ? 'block' : 'none' }}>
            <Message.Header>Password reset email successfuly sended</Message.Header>
            <p>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
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
            <Message.Header>Change your password</Message.Header>
            <p>Enter your email address and we will send you a link to reset your password.</p>
          </Message><br />
          <Form size='large' style={{ display: input === "on" ? 'block' : 'none' }}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' id="emailReserPassword" />
              <Button color='teal' fluid size='large' style={{ display: loader === "active" ? 'block' : 'none' }} onClick={SendPasswordResetEmail} >
                {i18next.t("password_reset_page_send_password_reset_email")}
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