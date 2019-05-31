import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap';
import './nav_menu.css';
import ScreenShare from '@material-ui/icons/ScreenShareOutlined';
import AccessTime from '@material-ui/icons/AccessTime';
import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddBoxOutlined';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined';
import SignOutIcun from '@material-ui/icons/ExitToApp';

import { Progress } from 'semantic-ui-react';


export const NavMenu = () => {

  const now = 60
  let [addToggle, setaddToggle] = React.useState(false);

  function SignOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  }
  return (
    <nav className="float-left" id="floatLeft">
      <div className="mr-auto">
        <div className="leftSideBar">

          <a id="addToggle" onClick={addToggle ? () => setaddToggle(false) : () => setaddToggle(true)} className="leftNavItem" style={{ display: '-webkit-inline-box', cursor: 'pointer' }}><span className="leftNavLinkIcon"> <AddCircleOutlineOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add</span></a>
          <div id="addToggleMenu" style={{ width: '85%', float: 'right', display: addToggle ? 'block' : 'none' }}>
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
              <span><img src="https://banner2.kisspng.com/20180329/bpq/kisspng-avatar-education-professor-user-profile-faculty-boss-5abcab3d64aff2.9884136415223140454124.jpg" alt="logo" width='45px' /></span>
              <span style={{ color: 'white', padding: '7px' }} className='user_name'>omer</span>
            </button>
          </div>
          <IndexLinkContainer to="/" className="leftNavItem sign_out">
            <a onClick={SignOut}><span className="leftNavLinkIcon"><SignOutIcun className="iconsSvg" /></span><span className="leftNavLinkMenu">Sign out</span></a>
          </IndexLinkContainer>

          <div className="leftNavItemStorage" style={{ borderBottom: 'none' }}>
            <div style={{ padding: '15px' }}>
              <label style={{ fontSize: '12px', paddingTop: '10px', paddingBottom: '0', color: 'rgb(145, 145, 145)' }}>Toplam alan: 15 GB - ({`${now}%`})</label>
            </div>
            <Progress percent={now} size='tiny' color="blue" style={{ margin: '3px 0px 0px 0px' }} />
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