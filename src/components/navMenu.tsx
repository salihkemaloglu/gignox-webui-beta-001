import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Form, FormControl, ProgressBar, DropdownButton, Dropdown } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexDirectionProperty, TextAlignProperty } from 'csstype';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

library.add(faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie );

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
    color: '#e3e3e3',
  },
  navLinkMenu: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 300,
  },
  leftNavItem: {
    color: 'white',
    borderBottom: '1px solid rgba(255,255,255, .4)',
    fontSize: '12px',
    verticalAlign: 'middle',
    width: '100px',
    alignItems: 'center',
    display: 'block',
    lineHeight: '1',
    textAlign: 'center' as TextAlignProperty,
    padding: '10px 0 13px',
    flexDirection: 'column' as FlexDirectionProperty,
    ':hover': {
      backgroundColor: '#0074d9'
    },
    '@media (max-width: 700px)': {
      backgroundColor: '#ff0000'
    }
  },
  leftNavLinkMenu: {
    display: 'block',
    padding: '6px',
    fontSize: '13px',
    fontWeight: 400,
    fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    lineHeight: '1.3'
  },
  leftNavLinkIcon: {
    fontSize: '30px',
    color: '#e3e3e3',
  },
  searchBox: {
    marginLeft: 33,
    width: '95%',
    height: '120%',
    backgroundColor: 'white',
    '::-webkit-input-placeholder': {
      color: 'white!important',
    }
  }
};

export const NavMenu: React.StatelessComponent<{}> = () => {
  const now = 60
  return (

    <div className='main-nav'>

      <Navbar variant="dark" style={{ backgroundColor: '#244B5A', paddingBottom: '6px', paddingTop: '6px' }}>
        <IndexLinkContainer to="/" activeClassName="active">
          <a href="https://placeholder.com"><img src="https://via.placeholder.com/205x50" /></a>
        </IndexLinkContainer>
        <Nav className="mr-auto" style={{ width: '80%', paddingLeft: '20px' }}>

          <Form inline style={{ width: '70%' }}>
            <FormControl type="text" placeholder="Search.." className="mr-sm-2" style={styles.searchBox} />
          </Form>
          <ul style={{display: 'flex', paddingLeft: '165px', margin: '0'}}>
          <li style={{listStyleType: 'none'}}>
          <IndexLinkContainer to="about" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="info-circle" /></span></Nav.Link>
          </IndexLinkContainer>
          </li>
          <li style={{listStyleType: 'none'}}>
          <IndexLinkContainer to="help" style={styles.navItem}>
            <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="cog" /></span></Nav.Link>
          </IndexLinkContainer>
          </li>
          </ul>
        </Nav>

        <IndexLinkContainer to="login" activeClassName="active" style={styles.navItem}>
          <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="user-tie" /></span><span style={styles.navLinkMenu}>Omer</span></Nav.Link>
        </IndexLinkContainer>
        {/* <IndexLinkContainer to="signup" activeClassName="active" style={styles.navItem}>
          <Nav.Link ><span style={styles.navLinkIcon}><FontAwesomeIcon icon="user-plus" /></span><span style={styles.navLinkMenu}>Signup</span></Nav.Link>
        </IndexLinkContainer> */}
      </Navbar>

      <Navbar variant="dark" className="float-left" style={{ backgroundColor: '#244B5A', padding: '20px', flexDirection: 'column', height: '-webkit-fill-available', width: '224px' }}>
        <Nav className="mr-auto" style={{ width: '100px', flexDirection: 'column', position: 'absolute' }}>
          <DropdownButton id="dropdown-basic-button" title="Yeni" variant="outline-light" >
            <Dropdown.Item href="#/action-1" style={{fontSize: '13px', fontWeight: '400', lineHeight: '1', display: '-webkit-box'}}><span style={{fontSize: '30px', color: '#495057', padding: '6px'}}><FontAwesomeIcon icon="folder" /></span><span style={styles.leftNavLinkMenu}>Dosya Yükle</span></Dropdown.Item>
            <Dropdown.Item href="#/action-2" style={{fontSize: '13px', fontWeight: '400', lineHeight: '1', display: '-webkit-box'}}><span style={{fontSize: '30px', color: '#495057', padding: '10px'}}><FontAwesomeIcon icon="file-upload" /></span><span style={styles.leftNavLinkMenu}>Klasör Yükle</span></Dropdown.Item>
          </DropdownButton>
          {/* <IndexLinkContainer to="/" style={styles.leftNavItem} exact activeClassName="active" >
            <Nav.Link><span style={styles.leftNavLinkIcon}><FontAwesomeIcon icon="plus" /></span><span style={styles.leftNavLinkMenu}>Yeni</span></Nav.Link>
          </IndexLinkContainer> */}
          <IndexLinkContainer to="/" style={styles.leftNavItem} >
            <Nav.Link ><span style={styles.leftNavLinkIcon}><FontAwesomeIcon icon="share-square" /></span><span style={styles.leftNavLinkMenu}>Benimle Paylaşılanlar</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="openedfiles" style={styles.leftNavItem}>
            <Nav.Link ><span style={styles.leftNavLinkIcon}><FontAwesomeIcon icon="clock" /></span><span style={styles.leftNavLinkMenu}>En son</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="about" style={styles.leftNavItem}>
            <Nav.Link ><span style={styles.leftNavLinkIcon}><FontAwesomeIcon icon="star" /></span><span style={styles.leftNavLinkMenu}>Yıldızlı</span></Nav.Link>
          </IndexLinkContainer>
          <div style={styles.leftNavItem}>
            <span style={styles.leftNavLinkMenu}>Depolama</span>
            <ProgressBar now={now} label={`${now}%`} style={{height: '12px'}} />
          </div>
        </Nav>
      </Navbar>


    </div>
  );
}