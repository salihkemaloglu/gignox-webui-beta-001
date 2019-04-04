import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Form, FormControl, ProgressBar } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './nav-menu.css';
// import { FlexDirectionProperty, TextAlignProperty } from 'csstype';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// Material icons library
import ScreenShare from '@material-ui/icons/ScreenShareOutlined';
import AccessTime from '@material-ui/icons/AccessTime';
import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddBoxOutlined';

// import { MultiLanguage } from '../multi-language/lang';
// import t from '../multi-language/langs/tr/tr-TR'

var logo = require('../images/logo.png');
library.add(faEnvelope, faKey, faHome, faBookmark, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie);

export const NavMenu: React.StatelessComponent<{}> = () => {
  const now = 60
  var pageRefreshCount = 0;
  if (pageRefreshCount = 0) {
    localStorage.setItem("set", "false");
    pageRefreshCount++;
  }
  function setfalse() {
    localStorage.setItem("set", "false");
  }

  
  // const lang = new MultiLanguage();

  return (

    <div className='main-nav'>
    
          <Navbar variant="dark" style={{ backgroundColor: 'black', paddingBottom: '6px', paddingTop: '16px', height: '65px' }}>
        <IndexLinkContainer to="/" activeClassName="active">
          <a href="https://placeholder.com"><img src={logo} className="App-logo" alt="logo" /></a>
        </IndexLinkContainer>
        <Nav className="mr-auto" style={{ width: '80%', paddingLeft: '37px' }}>
          <div className="gigx1">
            <div className="gigx2">
              <div className="gigx3">
                <Form inline style={{ width: '100%' }}>
                  <FormControl type="text" placeholder="Search.." className="searchBox" style={{ width: '100%', border: '1px solid #8fbce9' }} />
                </Form>
              </div>
              <div className="gigx4">
                <span><SearchOutlined className="gigx5" /></span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', paddingLeft: '165px', margin: '0' }}>
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

            {/* <IndexLinkContainer to="help" className="navItem">
          <Nav.Link ><span className="navLinkIcon"><FontAwesomeIcon icon="user-tie" /></span><span className="navLinkMenu">Omer</span></Nav.Link>
        </IndexLinkContainer> */}
          </div>
        </Nav>
      </Navbar>

      <Navbar variant="dark" className="float-left" style={{ boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0), 0 2px 3px 0 rgba(0, 0, 0, 0.12)', backgroundColor: 'black', padding: '20px', flexDirection: 'column', height: '-webkit-fill-available', width: '18%' }}>
        <Nav className="mr-auto" style={{ padding: '15px', flexDirection: 'column' }}>

          {/* <DropdownButton id="dropdown-basic-button" title="Yeni" variant="outline-light" >
            <Dropdown.Item href="#/action-1" style={{ fontSize: '13px', fontWeight: '400', lineHeight: '1', display: '-webkit-box' }}><span style={{ fontSize: '30px', color: '#495057', padding: '6px' }}><FontAwesomeIcon icon="folder" /></span><span className="leftNavLinkMenu">Dosya Yükle</span></Dropdown.Item>
            <Dropdown.Item href="#/action-2" style={{ fontSize: '13px', fontWeight: '400', lineHeight: '1', display: '-webkit-box' }}><span style={{ fontSize: '30px', color: '#495057', padding: '10px' }}><FontAwesomeIcon icon="file-upload" /></span><span className="leftNavLinkMenu">Klasör Yükle</span></Dropdown.Item>
          </DropdownButton> */}
          {/* <IndexLinkContainer to="/" style={styles.leftNavItem} exact activeClassName="active" >
            <Nav.Link><span style={styles.leftNavLinkIcon}><FontAwesomeIcon icon="plus" /></span><span style={styles.leftNavLinkMenu}>Yeni</span></Nav.Link>
          </IndexLinkContainer> */}
          <div className="lefSideBar">

            <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
                <Nav.Link ><span className="leftNavLinkIcon"> <AddCircleOutlineOutlined className="iconsSvg"/></span><span className="leftNavLinkMenu active">Add</span></Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <Nav.Link ><span className="leftNavLinkIcon"> <ScreenShare className="iconsSvg"/></span><span className="leftNavLinkMenu active">Shared With Me</span></Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to="openedfiles" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <Nav.Link ><span className="leftNavLinkIcon"><AccessTime className="iconsSvg"/></span><span className="leftNavLinkMenu">Lastest</span></Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to="about" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <Nav.Link ><span className="leftNavLinkIcon"><StarOutlined className="iconsSvg"/></span><span className="leftNavLinkMenu">Starred</span></Nav.Link>
            </IndexLinkContainer>
            <div className="leftNavItemStorage">
              <span className="leftNavLinkMenu">Depolama</span>
              <ProgressBar now={now} label={`${now}%`} style={{ height: '17px', border: '1px solid #add4ff', backgroundColor: 'white' }} />
            </div>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}