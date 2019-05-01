import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, ProgressBar } from 'react-bootstrap';
import './nav_menu.css';
import ScreenShare from '@material-ui/icons/ScreenShareOutlined';
import AccessTime from '@material-ui/icons/AccessTime';
import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddBoxOutlined';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined';
import SignOut from '@material-ui/icons/ExitToApp';


export const NavMenu = () => {

  const now = 60

  function SetAuthentication() {
    sessionStorage.setItem("routingPage", "authentication");
    location.reload();
}
  
  var toggleOpen = false;
  var sidebarToggle = "closed";
  window.onload = () => {
    var addElement: HTMLElement = document.getElementById('addToggle') as HTMLElement;
    addElement.onmousedown = function () {
      addElement.style.display = 'hidden';
    } 


  // ---------Dropdown menu in Add menu of left side bar menu----------------
    var addToggle = document.getElementById("addToggle") as HTMLElement;
    var addToggleMenu = document.getElementById("addToggleMenu") as HTMLElement;
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

// -----------------------User dropdown menu--------------------------
    var userMenu = document.getElementById("user-menu") as HTMLElement;
    var userMenuBar = document.getElementById("dropdown-bar") as HTMLElement;
    if (userMenu) {
      userMenu.addEventListener('click', function () {
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

// ----Left side bar menu open and close action in mobile and tablet size------
    var leftSidebarToggle = document.getElementById("toggle_id") as HTMLElement;
    var leftSidebar = document.getElementById("left_sidebar") as HTMLElement;
    if (leftSidebarToggle) {
      leftSidebarToggle.addEventListener('click', function () {
        if (sidebarToggle == "closed") {
          leftSidebar.style.display = "block";
          sidebarToggle = "opened";
        }
        else {
          leftSidebar.style.display = "none";
          sidebarToggle = "closed";
        }
      });

    }
  }

  return (
    <div className="left_side_bar" id="left_sidebar">
      <Navbar variant="dark" className="float-left">
        <Nav className="mr-auto">
          <div className="lefSideBar">

              <a id="addToggle" className="leftNavItem" style={{display: '-webkit-inline-box', cursor: 'pointer'}}><span className="leftNavLinkIcon"> <AddCircleOutlineOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add</span></a>
            <div id="addToggleMenu" style={{ width: '85%', float: 'right', display: 'none' }}>
              <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="leftNavLinkIcon"> <FileCopyOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add File</span></a>
              </IndexLinkContainer>
              <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="leftNavLinkIcon"> <FolderOpenOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add Folder</span></a>
              </IndexLinkContainer>
            </div>
            <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a><span className="leftNavLinkIcon"> <ScreenShare className="iconsSvg" /></span><span className="leftNavLinkMenu">Shared With Me</span></a>
            </IndexLinkContainer>
            <IndexLinkContainer to="openedfiles" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a ><span className="leftNavLinkIcon"><AccessTime className="iconsSvg" /></span><span className="leftNavLinkMenu">Latest</span></a>
            </IndexLinkContainer>
            <IndexLinkContainer to="about" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a ><span className="leftNavLinkIcon"><StarOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Starred</span></a>
            </IndexLinkContainer> 
            <div className="leftNavItem profil_item">
                <button type="submit" style={{ backgroundColor: 'transparent', border: 'none', paddingTop: '9px', cursor: 'pointer', display: 'flex' }} onClick={() => sessionStorage.setItem("routingPage", "user_admin")}>
                  <span><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png" alt="logo" width='45px' /></span>
                  <span style={{ color: 'white', padding: '7px' }} className='user_name'>omer</span>
                </button>
            </div>
            <IndexLinkContainer to="/" className="leftNavItem sign_out">
              <a onClick={SetAuthentication}><span className="leftNavLinkIcon"><SignOut className="iconsSvg" /></span><span className="leftNavLinkMenu">Sign out</span></a>
            </IndexLinkContainer>
            <div className="leftNavItemStorage">
              <span className="leftNavLinkMenu">Storage</span>
              <ProgressBar now={now} label={`${now}%`} style={{ height: '17px', border: '1px solid #add4ff', backgroundColor: 'white' }} />
            </div>
        
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}