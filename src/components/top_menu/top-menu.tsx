import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/icons/Menu';
import './top_menu.css';

var logo = require('../../app_root/images/logo.png');
var logotransparent = require('../../app_root/images/logo_gignox.png');

export const TopMenu: React.StatelessComponent<{}> = () => {

    function setfalse() {
        sessionStorage.setItem("routingPage", "nav_menu");
    }
    function setUserAdmin() {
        sessionStorage.setItem("routingPage", "user_admin");
        location.reload();
    }



    return (
        <Navbar variant="dark" style={{ backgroundColor: 'black', padding: '10px', height: '65px', width: '100%' }}>
            <IndexLinkContainer className="logo_link" to="/home" onClick={() => sessionStorage.setItem("routingPage", "nav_menu")}>
                <a href="https://placeholder.com"><img src={logo} className="App-logo" alt="logo" /><img src={logotransparent} className="logo_word" alt="logo"/></a>
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
                    <div className="profil_bar">
                        <div className="profil_content">
                            <div id="user-menu">
                                <button style={{ backgroundColor: 'transparent', border: 'none', paddingTop: '9px', outline: 'none', cursor: 'pointer' }}>
                                    <span><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png" alt="logo" width='45px' /></span>
                                    <span style={{ color: 'white', padding: '7px' }}>omer</span>
                                </button>
                            </div>

                        </div>

                        <div id="dropdown-bar" style={{ display: 'none' }}>
                            <a href="/login" className="dropdown-item" onClick={setfalse}>
                                <div className="dropdown-icon">
                                    <span><ExitToApp /></span>
                                </div>
                                <div className="dropdown-row">
                                <a className="navItem" onClick={setfalse}>nav menu</a>
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div className="dropdown-icon">
                                    <span><ExitToApp /></span>
                                </div>
                                <div className="dropdown-row">
                                <a className="navItem" onClick={setUserAdmin}>User Admin</a>
                                
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
            <div className="toggle_menu" id="toggle_id">
            <Menu/>
            </div>
        </Navbar>
    );
}


