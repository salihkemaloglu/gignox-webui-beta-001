import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FlexDirectionProperty } from 'csstype';

library.add(faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt);

const styles = {
  navItem: {
  color: 'white',
  alignItems: 'center',
  display: 'flex',
  lineHeight: '1',
 padding: '10px',
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
  },
  mainnav: {
    height: '100%',
    float: 'left',
    clear: 'both',
  },

};

export const AdminNavMenu: React.StatelessComponent<{}> = () => {

  return (
    <div className='mainnav float-left'>
      <Navbar variant="dark" style={{backgroundColor: '#16697a', flexDirection: 'column', height: '-webkit-fill-available'}}>

        <IndexLinkContainer to="/" activeClassName="active" style={{padding: '12px'}}>
          {/* <Navbar.Brand >ChainPass</Navbar.Brand> */}
          <a href="https://placeholder.com"><img src="https://via.placeholder.com/170x40"/></a>
        </IndexLinkContainer>

        <Nav className="mr-auto" style={{width: '90%', flexDirection: 'column'}}>

          <IndexLinkContainer to="/" style={styles.navItem} activeClassName="active" >
            <Nav.Link ><span style={styles.navLinkMenu}>Home</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="openedfiles" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkMenu}>Opened Files</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="about" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkMenu}>About</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="help" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkMenu}>Help</span></Nav.Link>
          </IndexLinkContainer>


        </Nav>
      </Navbar>
    </div>
  );
}