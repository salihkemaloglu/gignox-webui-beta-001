import * as React from 'react';

import { FormGroup, FormControl, Button } from 'react-bootstrap';

// import { grpc } from 'grpc-web-client';
// import { DemService } from '../../proto/dem_pb_service';
// import { HelloRequest } from '../../proto/dem_pb';

import './loginpage.css';
export const Login: React.StatelessComponent<{}> = () => {
  
  return (
    <div className="Login">
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
      <Button
        type="submit"
        style={{width: '30%', backgroundColor: '#17a2b8'}}
      >
        Login
      </Button>
    </form>
  </div>
  );
};
