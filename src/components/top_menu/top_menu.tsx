import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
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

    function SignOut() {
        sessionStorage.setItem("routingPage", "authentication");
        location.reload();
    }
    function Profile() {
        sessionStorage.setItem("routingPage", "user_admin");
        location.reload();
    }



    return (
        <Navbar variant="dark" style={{ backgroundColor: 'black', padding: '10px', height: '65px', width: '100%' }}>
            <IndexLinkContainer className="logo_link" to="/home" onClick={() => sessionStorage.setItem("routingPage", "nav_menu")}>
                <a href="https://placeholder.com"><img src={logo} className="App-logo" alt="logo" /><img src={logotransparent} className="logo_word" alt="logo" /></a>
            </IndexLinkContainer>
            <div className="mr-auto-topmenu">
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
                    <div className="profil_bar" id="profile_bar_id">
                        <div className="profil_content">
                            <div id="dd" className="wrapper-dropdown-3">
                                <div id="user-menu" style={{textAlign: 'center'}}>
                                    <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}>
                                        <span><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png" alt="logo" width='45px' /></span>
                                        <span style={{ color: 'white', padding: '7px' }}>omer</span>
                                    </button>
                                </div>
                                <ul className="dropdown">
                                    <li><a href="#" onClick={Profile}><PermIdentity /> Profil</a></li>
                                    <li><a href="#"><Settings /> Ayarlar</a></li>
                                    <li><a href="#" onClick={SignOut}><ExitToApp /> Sign out</a></li>
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


