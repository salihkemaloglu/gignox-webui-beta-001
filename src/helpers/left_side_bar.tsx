import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap';
import '../components/nav_menu/nav_menu.css';
import ScreenShare from '@material-ui/icons/ScreenShareOutlined';
import AccessTime from '@material-ui/icons/AccessTime';
import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddBoxOutlined';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined';
import SignOutIcun from '@material-ui/icons/ExitToApp';

import { Progress, Icon } from 'semantic-ui-react';

export default class LeftSideBar extends React.Component<any, any> {


    constructor(props: any) {
        super(props);
 
        this.state = { ProgressNow: this.props.ProgressNow };
    }
       

    SignOut = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
    }
    public render() {
        return (
            <nav className="float-lefts">
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
                        <IndexLinkContainer to="settings" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
                            <a ><span className="leftNavLinkIcon"><Icon name='settings'/></span><span className="leftNavLinkMenu">Settings</span></a>
                        </IndexLinkContainer>
                        <div className="leftNavItem profil_item">
                            <button type="submit" style={{ backgroundColor: 'transparent', border: 'none', paddingTop: '9px', paddingLeft: '2px', cursor: 'pointer', display: 'flex' }} onClick={() => sessionStorage.setItem("routingPage", "user_admin")}>
                                <span><Icon name='user outline' style={{fontSize: '17px', color: 'white', marginTop: '4px'}}/></span>
                                <span style={{ color: '#828189', padding: '3px 0 0 23px', fontSize: '17px' }} className='user_name'>My Account</span>
                            </button>
                        </div>
                        <IndexLinkContainer to="/" className="leftNavItem sign_out">
                            <a onClick={this.SignOut}><span className="leftNavLinkIcon"><SignOutIcun className="iconsSvg" /></span><span className="leftNavLinkMenu">Sign out</span></a>
                        </IndexLinkContainer>

                        <div className="leftNavItemStorage" style={{ borderBottom: 'none' }}>
                            <div style={{ padding: '15px' }}>
                                <label style={{ fontSize: '12px', paddingTop: '10px', paddingBottom: '0', color: 'rgb(145, 145, 145)' }}>Toplam alan: 15 GB - ({`${this.state.ProgressNow}%`})</label>
                            </div>
                            <Progress percent={this.state.ProgressNow} size='tiny' color="blue" style={{ margin: '3px 0px 0px 0px' }} />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
