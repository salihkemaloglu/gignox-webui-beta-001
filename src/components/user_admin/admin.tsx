import * as React from 'react';
import './admin.css';
import { Nav, Navbar } from 'react-bootstrap';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import { IndexLinkContainer } from 'react-router-bootstrap';

export const Admin = () => {

    var userDropdown = "closed";
    var sidebarToggle = "closed";
    window.onload = () => {

        var tab1 = document.getElementById("tab1") as HTMLElement;
        var tab2 = document.getElementById("tab2") as HTMLElement;
        var tab3 = document.getElementById("tab3") as HTMLElement;

        var latestFilesContent = document.getElementById("latestFilesContent") as HTMLElement;
        var sharedWithMeContent = document.getElementById("sharedWithMeContent") as HTMLElement;
        var starredContent = document.getElementById("starredContent") as HTMLElement;


        // -----------------------User dropdown menu--------------------------
        var userMenu = document.getElementById("user-menu") as HTMLElement;
        var userMenuBar = document.getElementById("dd") as HTMLElement;
        if (userMenu) {
            userMenu.addEventListener('click', function () {
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
        // -----------------------User Tab Menu--------------------------
        if (tab1) {
            if (latestFilesContent != null) {
                tab1.addEventListener('click', function () {
                    tab1.attributes[3].value = "true";
                    tab2.attributes[3].value = "false";
                    tab3.attributes[3].value = "false";

                    latestFilesContent.style.display = "block";
                    sharedWithMeContent.style.display = "none";
                    starredContent.style.display = "none";

                });
            }
        }
        if (tab2) {
            if (sharedWithMeContent != null) {
                tab2.addEventListener('click', function () {
                    tab1.attributes[3].value = "false";
                    tab2.attributes[3].value = "true";
                    tab3.attributes[3].value = "false";

                    latestFilesContent.style.display = "none";
                    sharedWithMeContent.style.display = "block";
                    starredContent.style.display = "none";

                });
            }
        }
        if (tab3) {
            if (starredContent != null) {
                tab3.addEventListener('click', function () {
                    tab1.attributes[3].value = "false";
                    tab2.attributes[3].value = "false";
                    tab3.attributes[3].value = "true";

                    latestFilesContent.style.display = "none";
                    sharedWithMeContent.style.display = "none";
                    starredContent.style.display = "block";

                });
            }
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
    <div>
        <div className="p_left_side_bar" id="left_sidebar">
        <Navbar className="p_float-left">
          <Nav className="p_mr-auto">
            <div className="p_leftSideBar">
            <IndexLinkContainer to="" className="p_leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="p_leftNavLinkIcon"> <FileCopyOutlined className="iconsSvg" /></span><span className="p_leftNavLinkMenu">Your Profile</span></a>
              </IndexLinkContainer>
              <IndexLinkContainer to="" className="p_leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="p_leftNavLinkIcon"> <FileCopyOutlined className="iconsSvg" /></span><span className="p_leftNavLinkMenu">Your Files</span></a>
              </IndexLinkContainer>
              <div className="p_leftNavItem p_profil_item">
                <button type="submit" style={{ backgroundColor: 'transparent', border: 'none', paddingTop: '9px', cursor: 'pointer', display: 'flex' }} onClick={() => sessionStorage.setItem("routingPage", "user_admin")}>
                  <span><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png " alt="logo" width='45px' /></span>
                  <span style={{ color: 'white', padding: '7px' }} className='p_user_name'>omer</span>
                </button>
            </div>
              <IndexLinkContainer to="" className="p_leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="p_leftNavLinkIcon"> <FileCopyOutlined className="iconsSvg" /></span><span className="p_leftNavLinkMenu">Sign out</span></a>
              </IndexLinkContainer>
            </div>
          </Nav>
        </Navbar>
      </div>
        <div className="admin_page">
           <div className="container">
              <div className="wrapper">
                <div className="leftsection">
                    <div className="leftcontainer">
                        <a href="https://placeholder.com"><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png" className="user_image" width="50%" /></a>
                        <div style={{ padding: "15px" }}>
                            <span style={{ fontSize: "20px" }}>Omer Sahin</span>
                            <span style={{ fontSize: "15px" }}> @somer</span>
                        </div>
                        <div style={{ padding: "0" }}>
                            <span style={{ fontSize: "18px", fontWeight: 300 }}>Kullanıcının Konumu</span>
                        </div>
                        <div style={{ padding: "15px" }}>
                            <button type="submit" style={{ width: '70%', border: "none", cursor: "pointer", outline: "none", backgroundColor: "#343a40", color: "white" }}>Edit Profile</button>
                        </div>
                    </div>

                </div>
                <div className="rightsection">
                    <div className="rightcontainer">
                        <div className="tabsection">
                            <div className="jss3739">
                                <button className="jss294 jss3747 jss3750 jss3752 jss3754" id="tab1" type="button" aria-selected="true"><span className="jss3755"><span className="jss3756"><span className="jss3757">My Files</span></span></span></button>
                                <button className="jss294 jss3747 jss3750 jss3754" id="tab2" type="button" aria-selected="false"><span className="jss3755"><span className="jss3756"><span className="jss3757">Shared With Me</span></span></span></button>
                                <button className="jss294 jss3747 jss3750 jss3754" id="tab3" type="button" aria-selected="false"><span className="jss3755"><span className="jss3756"><span className="jss3757">Starred</span></span></span></button>
                            </div>
                        </div>
                        <div id="tabcontainer" style={{ display: "block" }}>
                            <div id="latestFilesContent">
                                <div><span style={{ display: "-webkit-box", padding: "10px" }}>Latest Files</span></div>
                                <div>
                                    <span>Latest Files CONTENT</span>
                                </div>
                            </div>

                            <div id="sharedWithMeContent" style={{ display: "none" }}>
                                <div><span style={{ display: "-webkit-box", padding: "10px" }}>Shared With Me</span></div>
                                <div>
                                    <span>Shared With Me CONTENT</span>
                                </div>
                            </div>

                            <div id="starredContent" style={{ display: "none" }}>
                                <div><span style={{ display: "-webkit-box", padding: "10px" }}>Starred</span></div>
                                <div>
                                    <span>Starred CONTENT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>       
        </div>
        </div>
    );
};


