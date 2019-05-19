import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap';
import './nav_menu.css';
import ScreenShare from '@material-ui/icons/ScreenShareOutlined';
import AccessTime from '@material-ui/icons/AccessTime';
import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddBoxOutlined';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined';
import SignOut from '@material-ui/icons/ExitToApp';

import { Progress } from 'semantic-ui-react';


export const NavMenu = () => {

  const now = 60

  function SetAuthentication() {
    sessionStorage.setItem("routingPage", "authentication");
    location.reload();
  }

  var toggleOpen = false;
  var sidebarToggle = "closed";
  var userDropdown = "closed";
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
    var userMenuBar = document.getElementById("dd") as HTMLElement;
    if (userMenu) {
      userMenu.addEventListener('click', function (e: any) {

        if (userDropdown == "closed") {
          userMenuBar.className = "wrapper-dropdown-3 active";
          userDropdown = "opened";
        }
        else {
          userMenuBar.className = "wrapper-dropdown-3";
          userDropdown = "closed";
        }
      });
    }
    window.addEventListener('click', function (e: any) {
      if (e.target.offsetParent != undefined && e.target.offsetParent.id != 'dd') {
        userMenuBar.className = "wrapper-dropdown-3";
        userDropdown = "closed";
      }
    });



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
    <nav className="float-left">
      <div className="mr-auto">
        <div className="leftSideBar">

          <a id="addToggle" className="leftNavItem" style={{ display: '-webkit-inline-box', cursor: 'pointer' }}><span className="leftNavLinkIcon"> <AddCircleOutlineOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add</span></a>
          <div id="addToggleMenu" style={{ width: '85%', float: 'right', display: 'none' }}>
            <IndexLinkContainer to="about" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid rgb(73, 73, 73)' }}>
              <a><span className="leftNavLinkIcon"> <FileCopyOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add File</span></a>
            </IndexLinkContainer>
            <IndexLinkContainer to="help" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid rgb(73, 73, 73)' }}>
              <a><span className="leftNavLinkIcon"> <FolderOpenOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add Folder</span></a>
            </IndexLinkContainer>
          </div>
          <IndexLinkContainer to="help" className="leftNavItem active" style={{ display: '-webkit-inline-box' }}>
            <a><span className="leftNavLinkIcon"> <ScreenShare className="iconsSvg" /></span><span className="leftNavLinkMenu">Shared With Me</span></a>
          </IndexLinkContainer>
          <IndexLinkContainer to="about" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
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

          <div className="leftNavItemStorage" style={{ borderBottom: 'none' }}>
            <div style={{ padding: '15px' }}>
              <label style={{ fontSize: '12px', paddingTop: '10px', paddingBottom: '0', color: 'rgb(145, 145, 145)' }}>Toplam alan: 15 GB - ({`${now}%`})</label>
            </div>
            <Progress percent={now} size='tiny' color="blue" style={{ margin: '3px 0px 0px 0px' }} />

            {/* <label className="storage" style={{ fontSize: '12px', padding: '0', color: '#cccccc' }}>{`${now}%`}</label> */}
          </div>
        </div>
      </div>

      <div className="footer" style={{ position: 'absolute', bottom: '0', textAlign: 'center', width: '250px', marginBottom: '10px' }}>
        <div className="mb1">
          <a className="link" style={{ color: '#929292', marginRight: '30px' }}>All right reserved @2019</a>
        </div>

      </div>
    </nav>
  );
}