import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';



export const NavMenu: React.StatelessComponent<{}> = () => {

  return (
    <div className='main-nav'>
      <Navbar variant="dark" style={{backgroundColor: '#16697a'}}>
        <IndexLinkContainer to="/" activeClassName="active">
          {/* <Navbar.Brand >ChainPass</Navbar.Brand> */}
          <a href="https://placeholder.com"><img src="https://via.placeholder.com/170x40"/></a>
        </IndexLinkContainer>

        <Nav className="mr-auto" style={{width: '80%', paddingLeft: '20px'}}>
          <IndexLinkContainer to="/" activeClassName="active" style={{color: 'white'}}>
            <Nav.Link >Home</Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="openedFiles" style={{color: 'white'}}>
            <Nav.Link >Opened Files</Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="about" style={{color: 'white'}}>
            <Nav.Link >About</Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="help" style={{color: 'white'}}>
            <Nav.Link >Help</Nav.Link>
          </IndexLinkContainer>

          <Form inline style={{width: '60%'}}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{marginLeft: 70, width: '85%'}}/>
              {/* <Button variant="outline-info">Search</Button> */}
          </Form>

        </Nav>

        <IndexLinkContainer to="login" activeClassName="active" style={{color: 'white'}}>
          <Nav.Link >Login</Nav.Link>
        </IndexLinkContainer>|
        <IndexLinkContainer to="signup" activeClassName="active" style={{color: 'white'}}>
          <Nav.Link >Signup</Nav.Link>
        </IndexLinkContainer>
      </Navbar>
    </div>
  );
}