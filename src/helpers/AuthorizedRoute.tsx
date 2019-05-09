import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, layout, ...rest }) => (
    // tslint:disable-next-line:jsx-alignment
    <Route {...rest} render={props => {
        const currentUser = sessionStorage.getItem("userName");
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            // return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            sessionStorage.setItem("routingPage", "authentication");
            return <Redirect to={{ pathname: '/' }} />
        }

        // check if route is restricted by role
        if (layout === -1) {
            // role not authorised so redirect to home page
            sessionStorage.setItem("routingPage", "authentication");
            return <Redirect to={{ pathname: '/' }} />
        }
        if (Component != null) {
                
            sessionStorage.setItem("routingPage", layout);
            
             <Redirect to={{ pathname: props.location.pathname }} />
        }

        return <Component {...props} />
        
        // tslint:disable-next-line:jsx-alignment
    }} />
)