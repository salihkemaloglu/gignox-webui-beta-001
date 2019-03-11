import * as React from 'react';

import { FormGroup, FormControl, Button } from 'react-bootstrap';

import './signup.css';

export const Signup: React.StatelessComponent<{}> = () => {
  
  return (
    <div className="Signup" style={{display: 'flow-root'}}>
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
      <Button
        style={{width: '30%', backgroundColor: '#17a2b8'}}
        type="submit"
      >
        Signup
      </Button>
    </form>
  </div>
  );
};