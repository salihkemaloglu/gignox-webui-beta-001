import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'

import { FormGroup, FormControl, Button, Nav } from 'react-bootstrap';

// import { grpc } from 'grpc-web-client';
// import { DemService } from '../../proto/dem_pb_service';
// import { HelloRequest } from '../../proto/dem_pb';
var logo = require('../images/logo.png');
var logotransparent = require('../images/logo_transparent.png');
import './authentication.css';
import { useState } from 'react';
import { LoginUserRequest, UserLogin, LoginUserResponse } from '../../proto/gigxRR_pb';
import { GigxRRService } from '../../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';


export const Authentication = () => {

  var [fade, setFade] = useState(false);

  function set() {
    localStorage.setItem("set", 'navmenu');
  }

function login() {
  const req = new LoginUserRequest();
  // req.setMessage('Is RR service working?');
  var user = new UserLogin();
  user.setUsername("somer1");
  // user.setEmail("somer4500@gmail.com")
  user.setPassword("pas2s")

  req.setUser(user);

  grpc.invoke(GigxRRService.Login, {
    request: req,
    host: "https://dev-rr.gignox.com:8901",
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      console.log("onHeaders", headers);
    },
    onMessage: (message: LoginUserResponse) => {
      user = message.getUser() === null ? JSON.parse("null") : message.getUser();
      console.log(user.getUsername() + ":" + user.getToken());
    },
    onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
      if (code === grpc.Code.OK) {
        console.log('all ok');
      } else {
        console.log('hit an error', code, msg, trailers);
      }
    }
  });
}

  return (

    <div className="wrap">
             <button onClick={login}>test</button>
      <section className="navSection">
        <div className="nav-wrapper">
          <Nav className="mr-auto">
            <IndexLinkContainer to="/" activeClassName="active">
              <a href="https://placeholder.com"><img src={logo} className="App-logo" alt="logo" /><img src={logotransparent}  alt="logo" /></a>
            </IndexLinkContainer>
          </Nav>
        </div>
      </section>
      <section className="mainSection">
        <section className="leftSection">first</section>

        <section className="rightSection">
        <div className="sign-in-up-container">
              <a className="signin-title" onClick={() => setFade(false)} style={{fontSize: fade === false ? '25px' : '15px'}}>Sign in  </a>|
              <a className="signup-title" onClick={() => setFade(true)} style={{fontSize: fade === true ? '25px' : '15px'}}> Sign up</a>
            </div>

          <div className="Login" style={{display: fade === false ? 'block' : 'none'}}>
            <form className="loginForm">
              <FormGroup>
                <label>Username or Email</label>
                <FormControl
                  autoFocus
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <FormControl
                  type="password"
                />
              </FormGroup>
          

              <Button type="submit" style={{ width: '100%', backgroundColor: '#17a2b8' }} onClick={set}>
                Login
               </Button>
      
               <div className="login-need-help"><a className="forgot-password-link" href="/forgot?email_from_login=">Forgot your password?</a></div>
            </form>
          </div>


          <div className="Signup" style={{display: fade === true ? 'block' : 'none', paddingTop: '60px'}}>
            <form className="signupForm">
              <FormGroup>
                <label>Username</label>
                <FormControl autoFocus type="text" />
              </FormGroup>
    
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" />
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <FormControl
                  type="password"
                />
              </FormGroup>
             
              <Button style={{ width: '98%', backgroundColor: '#17a2b8' }} type="button" >
                Signup
      </Button>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
};
