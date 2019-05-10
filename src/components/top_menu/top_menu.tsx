import * as React from 'react';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/icons/Menu';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Settings from '@material-ui/icons/SettingsOutlined';
import './top_menu.css';

var logo = require('../../app_root/images/logo.png');
var logotransparent = require('../../app_root/images/logo_gignox.png');

export const TopMenu = () => {
    var toggleOpen = false;

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
    // ----Left side bar menu open and close action in mobile and tablet size------
    //   var sidebarToggle = "closed";
    //   var leftSidebarToggle = document.getElementById("toggle_id") as HTMLElement;
    //   var leftSidebar = document.getElementById("left_sidebar") as HTMLElement;
    //   if (leftSidebarToggle) {
    //     leftSidebarToggle.addEventListener('click', function () {
    //       if (sidebarToggle == "closed") {
    //         leftSidebar.style.display = "block";
    //         sidebarToggle = "opened";
    //       }
    //       else {
    //         leftSidebar.style.display = "none";
    //         sidebarToggle = "closed";
    //       }
    //     });
    //   }

    function SignOut() {
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("token");
    }
    return (
        <Navbar variant="dark" className="top_menu">
            <div style={{ width: '15%' }}>
                <a href="/home"><img src={logo} className="App-logo" alt="logo" /><img src={logotransparent} className="logo_word" alt="logo" /></a>
            </div>
            <div className="mr-auto-topmenu">
                <div className="gigx1">
                    <div className="gigx2">
                        <div className="gigx3">
                            <Form className="inputForm" inline style={{ width: '100%', height: '85%' }}>
                                <FormControl type="text" placeholder="Search on gignox" className="searchBox" />
                            </Form>
                        </div>
                        <div className="gigx4">
                            <span><SearchOutlined className="gigx5" /></span>
                        </div>
                    </div>
                    <div className="profil_bar" id="profile_bar_id">

                        <div className="profil_content">
                            <div id="dd" className="wrapper-dropdown-3">
                                <div id="user-menu" style={{ textAlign: 'center' }}>
                                    <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}>
                                        <span><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png" alt="logo" width='45px' /></span>
                                        <span style={{ color: 'white', padding: '7px' }}>omer</span>
                                    </button>
                                </div>
                                <ul className="dropdown">
                                    <li><a href="profile" ><PermIdentity /> Profil</a></li>
                                    <li><a href=""><Settings /> Ayarlar</a></li>
                                    <li><a href="/" onClick={SignOut}><ExitToApp /> Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="toggle_menu" id="toggle_id">
                <Menu />
            </div>
        </Navbar>
    );
}


