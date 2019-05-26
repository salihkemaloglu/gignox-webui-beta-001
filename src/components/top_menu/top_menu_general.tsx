import * as React from 'react';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import './top_menu.css';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

var logo = require('../../app_root/images/logo.png');
var logotransparent = require('../../app_root/images/logo_gignox.png');

export const TopMenuGeneral = () => {

    return (
        <nav className="top_menu">
            <a href="/" className="logo_link">
                <img src={logo} className="topmenu-app-logo" alt="logo" />
                <img src={logotransparent} className="topmenu_logo_word" alt="logo" />
            </a>
            <div className="mr-auto-topmenu" style={{width: '73%'}}>
                <div className="gigx1">
                    <div className="gigx2" style={{width: '75%'}}>
                        <div className="gigx3">
                            <form className="inputForm" style={{ width: '100%', height: '85%' }}>
                                <input type="text" placeholder="Search on gignox" className="searchBox" />
                            </form>
                        </div>
                        <div className="gigx4">
                            <span><SearchOutlined className="gigx5" /></span>
                        </div>
                    </div>
                </div>
            </div>
            <Button.Group>
                <Button basic color='grey' style={{margin: '2px'}}>
                     Sign in
                 </Button>
                <Button basic color='grey' style={{margin: '2px'}}>
                    Sign up
                </Button>
            </Button.Group>
            {/* <div>
                <a href="/" className="ui large basic inverted button" style={{ marginLeft: "-40%" }} onClick={() => sessionStorage.setItem("authenticationType", "signin")}>Sing in</a>
                <a href="/" className="ui large basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signup")}>Sign up</a>
            </div> */}
        </nav>
    );
}


