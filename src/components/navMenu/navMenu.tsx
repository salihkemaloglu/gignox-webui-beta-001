import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Form, FormControl, ProgressBar, DropdownButton, Dropdown } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navMenu.css';
// import { FlexDirectionProperty, TextAlignProperty } from 'csstype';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

library.add(faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie );

export const NavMenu: React.StatelessComponent<{}> = () => {
  const now = 60
  function setfalse() {
    localStorage.setItem("set", "false");
  }  
  return (

    <div className='main-nav'>
      <Navbar variant="dark" style={{ backgroundColor: '#244B5A', paddingBottom: '6px', paddingTop: '6px' }}>
        <IndexLinkContainer to="/" activeClassName="active">
          <a href="https://placeholder.com"><img src="https://via.placeholder.com/205x50" /></a>
        </IndexLinkContainer>
        <Nav className="mr-auto" style={{ width: '80%', paddingLeft: '20px' }}>

          <Form inline style={{ width: '70%' }}>
            <FormControl type="text" placeholder="Search.." className="searchBox"  style={{ width: '95%' }}/>
          </Form>
          <ul style={{display: 'flex', paddingLeft: '165px', margin: '0'}}>
          {/* <li style={{listStyleType: 'none'}}>
          <IndexLinkContainer to="loginMenu" className="navItem">
            <Nav.Link ><span className="navLinkIcon"><FontAwesomeIcon icon="info-circle" /></span></Nav.Link>
          </IndexLinkContainer>
          </li>
          <li style={{listStyleType: 'none'}}>
          <IndexLinkContainer to="help" className="navItem">
            <Nav.Link ><span className="navLinkIcon"><FontAwesomeIcon icon="cog" /></span></Nav.Link>
          </IndexLinkContainer>
          </li> */}
          <IndexLinkContainer to="/" className="navItem" onClick={setfalse}>
          <Nav.Link ><span className="navLinkIcon"><FontAwesomeIcon icon="user-tie" /></span><span className="navLinkMenu">logout</span></Nav.Link>
        </IndexLinkContainer>
        
          <IndexLinkContainer to="help" className="navItem">
          <Nav.Link ><span className="navLinkIcon"><FontAwesomeIcon icon="user-tie" /></span><span className="navLinkMenu">Omer</span></Nav.Link>
        </IndexLinkContainer>
          </ul>

         

       
        </Nav>
      </Navbar>

      <Navbar variant="dark" className="float-left" style={{ backgroundColor: '#244B5A', padding: '20px', flexDirection: 'column', height: '-webkit-fill-available', width: '224px' }}>
        <Nav className="mr-auto" style={{ width: '100px', flexDirection: 'column' }}>
          <DropdownButton id="dropdown-basic-button" title="Yeni" variant="outline-light" >
            <Dropdown.Item href="#/action-1" style={{fontSize: '13px', fontWeight: '400', lineHeight: '1', display: '-webkit-box'}}><span style={{fontSize: '30px', color: '#495057', padding: '6px'}}><FontAwesomeIcon icon="folder" /></span><span className="leftNavLinkMenu">Dosya Yükle</span></Dropdown.Item>
            <Dropdown.Item href="#/action-2" style={{fontSize: '13px', fontWeight: '400', lineHeight: '1', display: '-webkit-box'}}><span style={{fontSize: '30px', color: '#495057', padding: '10px'}}><FontAwesomeIcon icon="file-upload" /></span><span className="leftNavLinkMenu">Klasör Yükle</span></Dropdown.Item>
          </DropdownButton>
          {/* <IndexLinkContainer to="/" style={styles.leftNavItem} exact activeClassName="active" >
            <Nav.Link><span style={styles.leftNavLinkIcon}><FontAwesomeIcon icon="plus" /></span><span style={styles.leftNavLinkMenu}>Yeni</span></Nav.Link>
          </IndexLinkContainer> */}
          <IndexLinkContainer to="/help" className="leftNavItem" >
            <Nav.Link ><span className="leftNavLinkIcon"><FontAwesomeIcon icon="share-square" /></span><span className="leftNavLinkMenu">Benimle Paylaşılanlar</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="openedfiles" className="leftNavItem">
            <Nav.Link ><span className="leftNavLinkIcon"><FontAwesomeIcon icon="clock" /></span><span className="leftNavLinkMenu">En son</span></Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="about" className="leftNavItem">
            <Nav.Link ><span className="leftNavLinkIcon"><FontAwesomeIcon icon="star" /></span><span className="leftNavLinkMenu">Yıldızlı</span></Nav.Link>
          </IndexLinkContainer>
          <div className="leftNavItem">
            <span className="leftNavLinkMenu">Depolama</span>
            <ProgressBar now={now} label={`${now}%`} style={{height: '12px'}} />
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}