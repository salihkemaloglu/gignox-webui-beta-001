import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Form, FormControl, ProgressBar } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faHome, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie, faBookmark } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined';
import ExitToApp from '@material-ui/icons/ExitToApp';


var json = require('../multi-language/langs/en.json');

var logo = require('../images/logo.png');
var logotransparent = require('../images/logo_transparent.png');
library.add(faEnvelope, faKey, faHome, faBookmark, faFileAlt, faInfoCircle, faQuestionCircle, faUserPlus, faSignInAlt, faClock, faShareSquare, faStar, faPlus, faFolder, faFileUpload, faCog, faUser, faUserTie);

export const NavMenu: React.StatelessComponent<{}> = () => {




  //   function readJSON(path: string = '../multi-language/langs/en.json'): void {
  //     var xhr = new XMLHttpRequest();
  //     xhr.open('GET', path, true);
  //     xhr.responseType = 'blob';
  //     xhr.onload = function(e: any) { 
  //       if (this.status === 200) {
  //           var file = new File([this.response], 'temp');
  //           var fileReader = new FileReader();
  //           fileReader.addEventListener('load', function(){
  //            return null;
  //           });
  //           fileReader.readAsText(file);
  //       } 
  //     }
  //     xhr.send();
  // }


  const now = 60
  var pageRefreshCount = 0;
  if (pageRefreshCount = 0) {
    localStorage.setItem("set", "0");
    pageRefreshCount++;
  }
  function setfalse() { 
    localStorage.setItem("set", "0");
  }

  window.onload = () => {
    var addElement: HTMLElement = document.getElementById('addToggle') as HTMLElement;
    addElement.onmousedown = function () {
      addElement.style.display = 'hidden';
    }
  }
  var toggleOpen = false;
  window.onload = () => {
    var addToggle = document.getElementById("addToggle") as HTMLElement;
    var addToggleMenu = document.getElementById("addToggleMenu") as HTMLElement;

    var userMenu = document.getElementById("user-menu") as HTMLElement;
    var userMenuBar = document.getElementById("dropdown-bar") as HTMLElement;
    if (userMenu) {
      userMenu.addEventListener('mouseover', function () {
        userMenuBar.style.display = "block";
      });
      userMenuBar.addEventListener('mouseover', function () {
        userMenuBar.style.display = "block";
      });
      userMenuBar.addEventListener('mouseleave', function () {
        userMenuBar.style.display = "none";
      });
      userMenu.addEventListener('mouseleave', function () {
        userMenuBar.style.display = "none";
      });
    }

    if (addToggle) {
      addToggle.addEventListener('click', function () {
        if (toggleOpen === false) {
          addToggleMenu.style.display = "block";
          addToggleMenu.style.transition = "all .3s linear 0s";
          addToggleMenu.style.webkitTransition = " all .3s linear 0s";

          toggleOpen = true;
        }
        else {
          addToggleMenu.style.display = "none";
          toggleOpen = false;
        }
      });
    }

  }

  return (
    <div className='main-nav'>
      <Navbar variant="dark" style={{ backgroundColor: 'black', padding: '10px', height: '65px', width: '100%' }}>
        <IndexLinkContainer to="/" activeClassName="active" style={{ width: '256px', padding: '10px' }}>
          <a href="https://placeholder.com"><img src={logo} className="App-logo" alt="logo" width='60px' /><img src={logotransparent} alt="logo" style={{ width: '150px' }} /></a>
        </IndexLinkContainer>
        <div className="mr-auto" style={{ width: '1167px', padding: '16px', margin: '0' }}>
          <div className="gigx1">
            <div className="gigx2">
              <div className="gigx3">
                <Form className="inputForm" inline style={{ width: '100%', height: '85%' }}>
                  <FormControl type="text" placeholder="Search.." className="searchBox" />
                </Form>
              </div>
              <div className="gigx4">
                <span><SearchOutlined className="gigx5" /></span>
              </div>
            </div>
            <div style={{ width: '30%', height: '100%', float: 'left' }}>
              <div style={{ display: '-webkit-box', float: 'right', height: '100%', paddingRight: '60px' }}>
                {/* <IndexLinkContainer to="/" className="navItem" onClick={setfalse}>
                  <Nav.Link ><span className="navLinkIcon"><FontAwesomeIcon icon="user-tie" /></span><span className="navLinkMenu">logout</span></Nav.Link>
                </IndexLinkContainer> */}
                <div id="user-menu">
                  <button style={{ backgroundColor: 'transparent', border: 'none', paddingTop: '9px' }}>
                    <span><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png" alt="logo" width='45px' /></span>
                    <span style={{ color: 'white', padding: '7px' }}>omer</span>
                  </button>
                </div>

              </div>

              <div id="dropdown-bar" style={{ display: 'none' }}>
                <a className="dropdown-item">
                  <div className="dropdown-icon">
                    <span><ExitToApp /></span>
                  </div>
                  <div className="dropdown-row">
                    <IndexLinkContainer to="/" className="navItem" onClick={setfalse}>
                      <Nav.Link ><span className="dropdown-link">{json.hello}</span></Nav.Link>
                    </IndexLinkContainer>
                  </div>
                </a>
                <a className="dropdown-item">
                  <div className="dropdown-icon">
                    <span><ExitToApp /></span>
                  </div>
                  <div className="dropdown-row">
                    <IndexLinkContainer to="/" className="navItem" onClick={setfalse}>
                      <Nav.Link ><span className="dropdown-link">Logout</span></Nav.Link>
                    </IndexLinkContainer>
                  </div>
                </a>
                <a className="dropdown-item">
                  <div className="dropdown-icon">
                    <span><ExitToApp /></span>
                  </div>
                  <div className="dropdown-row">
                    <IndexLinkContainer to="/" className="navItem" onClick={setfalse}>
                      <Nav.Link ><span className="dropdown-link">Logout</span></Nav.Link>
                    </IndexLinkContainer>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Navbar>

      <Navbar variant="dark" className="float-left" style={{ boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0), 0 2px 3px 0 rgba(0, 0, 0, 0.12)', backgroundColor: 'black', padding: '20px', flexDirection: 'column', height: '-webkit-fill-available', width: '282px' }}>
        <Nav className="mr-auto" style={{ padding: '0', flexDirection: 'column' }}>
          <div className="lefSideBar">

            <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a id="addToggle"><span className="leftNavLinkIcon"> <AddCircleOutlineOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add</span></a>
            </IndexLinkContainer>
            <div id="addToggleMenu" style={{ width: '85%', float: 'right', display: 'none' }}>
              <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="leftNavLinkIcon"> <FileCopyOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu" id="addToggle">Add File</span></a>
              </IndexLinkContainer>
              <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="leftNavLinkIcon"> <FolderOpenOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu" id="addToggle">Add Folder</span></a>
              </IndexLinkContainer>
            </div>
            <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a ><span className="leftNavLinkIcon"> <ScreenShare className="iconsSvg" /></span><span className="leftNavLinkMenu">Shared With Me</span></a>
            </IndexLinkContainer>
            <IndexLinkContainer to="openedfiles" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a ><span className="leftNavLinkIcon"><AccessTime className="iconsSvg" /></span><span className="leftNavLinkMenu">Latest</span></a>
            </IndexLinkContainer>
            <IndexLinkContainer to="about" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a ><span className="leftNavLinkIcon"><StarOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Starred</span></a>
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