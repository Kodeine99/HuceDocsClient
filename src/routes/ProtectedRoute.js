import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, Route } from "react-router-dom";
import {Base64} from "js-base64";

export default function ProtectedRoute({
       component: Component,
       ...rest
    }) {
    const [ cookies ] = useCookies();
    return (<>
        <Route {...rest} render={(props) => (
            cookies['access_token'] && JSON.parse(Base64.decode(cookies['access_token'].split(".")[1])).typ === 'Admin'
                ? <Component {...props} />
                : <Redirect to="/home" />
        )} />
    </>);
}
