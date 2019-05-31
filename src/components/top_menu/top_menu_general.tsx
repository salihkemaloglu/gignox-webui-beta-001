import * as React from 'react';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import './top_menu.css';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Menus from '@material-ui/icons/KeyboardArrowDownOutlined';

var logo = require('../../app_root/images/logo.png');
var logotransparent = require('../../app_root/images/logo_gignox.png');

export const TopMenuGeneral = () => {
    let [toggleLeftSideBar, settoggleLeftSideBar] = React.useState(false);

    return (
        <div>

            <nav className="top_menu">
                <a href="/" className="logo_link">
                    <img src={logo} className="topmenu-app-logo" alt="logo" />
                    <img src={logotransparent} className="topmenu_logo_word" alt="logo" />
                </a>
                <div className="mr-auto-topmenu">
                    <div className="gigx1">
                        <div className="gigx2">
                            <div className="gigx3">
                                <form className="inputForm" style={{ width: '100%', height: '85%' }}>
                                    <input type="text" placeholder="Search on gignox" className="searchBox" />
                                </form>
                            </div>
                            <div className="gigx4">
                                <span><SearchOutlined className="gigx5" /></span>
                            </div>
                        </div>
                        <div className="profil_bar" id="profile_bar_id">

                            <div className="profil_content" style={{ paddingTop: '14px', width: '100%', paddingLeft: '17%' }}>
                                <a href="/" className="ui basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signin")}>Sing in</a>
                                <a href="/" className="ui basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signup")}>Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="toggle_menu" id="toggle_id" onClick={toggleLeftSideBar ? () => settoggleLeftSideBar(false) : () => settoggleLeftSideBar(true)}>
                    <Menus style={{fontSize: '25px'}}/>
                </div>
            </nav>

        
            <div className="toggleLeftSideBar" style={{ display: toggleLeftSideBar ? 'block' : 'none' }}>
                <nav className="float-lefts">
                    <div className="mr-auto">
                        <div className="leftSideBar">
                            <Button.Group style={{display: 'flex'}}>
                            <a href="/" style={{margin: '2px'}} className="ui basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signin")}>Sing in</a>
                            <a href="/" style={{margin: '2px'}} className="ui basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signup")}>Sign up</a>
                            </Button.Group>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}


// <a href="/" className="ui large basic inverted button" style={{ marginLeft: "-40%" }} onClick={() => sessionStorage.setItem("authenticationType", "signin")}>Sing in</a>
// <a href="/" className="ui large basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signup")}>Sign up</a>