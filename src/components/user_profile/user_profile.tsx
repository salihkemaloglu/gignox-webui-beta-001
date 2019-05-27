import * as React from 'react';
import { Menu, Loader } from 'semantic-ui-react'
import { matchPath } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { grpc } from '@improbable-eng/grpc-web';
import { DoGetUserRequest } from '../../controllers/user_profile_controller';
import { User } from '../../proto/gigxRR_pb';
import { GeneralResponseModal } from '../../modals/general_response_modal';
import { GetMessageType } from '../../helpers/message_type_helper';
import './user_profile.css';
import { NotFound } from '../not_found';

export const Profile = () => {
    const [activeItem, setActiveItem] = useState("home");
    const [loader, setLoader] = useState("loading");
    const [isUserExist, setIsUserExist] = useState("");
    useEffect(() => {
        const match = matchPath(location.pathname, {
            path: "/:id",
            exact: false,
            strict: false
        });
        DoGetUserRequest(match.params.id, function (user_: User, generalResponseModalResponse_: GeneralResponseModal) {
            var response = GetMessageType(generalResponseModalResponse_);
            console.log(response);
            if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
                setIsUserExist("exist");
                setLoader("passive");
            } else {
                setIsUserExist("notExist")
                setLoader("passive");
            }
        });
    }, []);
    return (
        <div>
            <div style={{ display: loader === "loading" ? 'block' : 'none', marginTop: "10%" }}>
                <Loader active size="massive" inline='centered' />
            </div>
            <div className="admin_page" style={{ display: isUserExist === "exist" ? 'block' : 'none' }}>
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

                    </div>
                </div>
                <Menu className="profileTab" pointing secondary>
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={() => setActiveItem("home")} />
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                        onClick={() => setActiveItem("messages")}
                    />
                    <Menu.Item
                        name='friends'  
                        active={activeItem === 'friends'}
                        onClick={() => setActiveItem("friends")}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={() => setActiveItem("logout")}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
            <div style={{ display: isUserExist === "notExist" ? 'block' : 'none' }}>
                <NotFound />
            </div>
        </div>

    );
};


