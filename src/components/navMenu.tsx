import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexDirectionProperty } from 'csstype';

library.add(faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt);

const styles = {
  navItem: {
  color: 'white',
  alignItems: 'center',
  display: 'flex',
  lineHeight: '1',
  paddingRight: '1.5rem',
  paddingTop: '0',
  paddingBottom: '0',    
  flexDirection: 'column' as FlexDirectionProperty,
  ':hover': {
    backgroundColor: 'red',
    cursor: 'cell'
    },
    '@media (max-width: 700px)': {
      backgroundColor: '#ff0000'
    }
  },
  navLinkIcon: {
    fontSize: '23px', 
    paddingBottom: '4px', 
    color: '#9bd8e1',
  },
  navLinkMenu: {
    display: 'block', 
    fontSize: '13px',
    fontWeight: 300,
  }

};

export const NavMenu: React.StatelessComponent<{}> = () => {

  return (

    <div className='main-nav'>
      <Navbar variant="dark" style={{backgroundColor: '#16697a'}}>
        <IndexLinkContainer to="/" activeClassName="active">
          {/* <Navbar.Brand >ChainPass</Navbar.Brand> */}
          <a href="https://placeholder.com"><img src="https://via.placeholder.com/170x40"/></a>
        </IndexLinkContainer>

        <Nav className="mr-auto" style={{width: '80%', paddingLeft: '20px'}}>
          <IndexLinkContainer to="/" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="home"/></span><span style={styles.navLinkMenu}>Home</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="openedFiles" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="file-alt"/></span><span style={styles.navLinkMenu}>Opened Files</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="about" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="info-circle"/></span><span style={styles.navLinkMenu}>About</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="help" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="question-circle"/></span><span style={styles.navLinkMenu}>Help</span></Nav.Link>
          </IndexLinkContainer>

          <Form inline style={{width: '60%'}}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{marginLeft: 70, width: '85%'}}/>
              {/* <Button variant="outline-info">Search</Button> */}
          </Form>

        </Nav>

        <IndexLinkContainer to="login" activeClassName="active" style={styles.navItem}>
          <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="sign-in-alt"/></span><span style={styles.navLinkMenu}>Login</span></Nav.Link>
        </IndexLinkContainer>|
        <IndexLinkContainer to="signup" activeClassName="active" style={styles.navItem}>
          <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="user-plus"/></span><span style={styles.navLinkMenu}>Signup</span></Nav.Link>
        </IndexLinkContainer>
      </Navbar>
    </div>
  );
}