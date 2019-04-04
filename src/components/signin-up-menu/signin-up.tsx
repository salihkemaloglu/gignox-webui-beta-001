import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'

import { FormGroup, FormControl, Button, Nav } from 'react-bootstrap';

// import { grpc } from 'grpc-web-client';
// import { DemService } from '../../proto/dem_pb_service';
// import { HelloRequest } from '../../proto/dem_pb';

import './signin-up.css';
import { useState } from 'react';


export const SignInUp = () => {

  var [fade, setFade] = useState(true);

  function set() {
    localStorage.setItem("set", "true");
  }
  return (

    <div className="wrap">
      <section className="navSection">
        <div className="nav-wrapper">
          <Nav className="mr-auto">
            <IndexLinkContainer to="/" activeClassName="active">
              <a href="https://placeholder.com"><img src="https://via.placeholder.com/205x50" /></a>
            </IndexLinkContainer>
          </Nav>
        </div>
      </section>
      <section className="mainSection">
        <section className="leftSection">first</section>

        <section className="rightSection">
        <div className="sign-in-up-container">
              <a className="signin-title" onClick={() => setFade(true)} style={{fontSize: fade ? '25px' : '15px'}}>Sign in  </a>|
              <a className="signup-title" onClick={() => setFade(false)} style={{fontSize: fade === false ? '25px' : '15px'}}> Sign up</a>
            </div>

          <div className="Login" style={{display: fade ? 'block' : 'none'}}>
            <form className="loginForm">
              <FormGroup>
                <label>Email</label>
                <FormControl
                  autoFocus
                  placeholder="Enter Email"
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <FormControl
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <div>
                <input type="checkbox" name="remember_me" aria-checked="true" value="on" />
                <label className="checkbox_label"><span>Remember me</span></label>
              </div>

              <Button type="submit" style={{ width: '100%', backgroundColor: '#17a2b8' }} onClick={set}>
                Login
               </Button>
               <div className="login-need-help"><a className="forgot-password-link" href="/forgot?email_from_login=">Forgot your password?</a></div>
            </form>
          </div>


          <div className="Signup" style={{display: fade === false ? 'block' : 'none', paddingTop: '60px'}}>
            <form className="signupForm">
              <FormGroup>
                <label>Name</label>
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <label>Surname</label>
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="Surname"
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <FormControl
                  autoFocus
                  type="email"
                  placeholder="Enter Email"
                />
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <FormControl
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <label>Confirm</label>
                <FormControl
                  type="password"
                  placeholder="Confirm Password"
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
