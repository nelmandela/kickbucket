import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import LoginContainer from "./containers/LoginContainer";
import SignUpContainer from "./containers/SignUpContainer";
import DashBoardContainer from "./containers/DashBoardContainer";

const redirectIfAuthenticated = (nextProps, replace) => {
    const token = localStorage.getItem("kickbucket_token");
    if(token !== null){
        replace({
            pathname: "/dashboard"
        })
    }
}

const redirectIfNotAuthenticated = (nextProps, replace) => {
    const token = localStorage.getItem("kickbucket_token");
    if(token === null || token === "" || token === undefined){
        replace({
            pathname: "/login"
        })
    }
}

const Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={DashBoardContainer} />    
        // public routes     
        <Route path="/login" onEnter={redirectIfAuthenticated} component={LoginContainer} />
        <Route path="/signup" onEnter={redirectIfAuthenticated} component={SignUpContainer} />
        
        // protected routes
        <Route path="/dashboard" onEnter={redirectIfNotAuthenticated} component={DashBoardContainer} />
        <Route path="/bucketlists/:bucket_id" onEnter={redirectIfNotAuthenticated} component={DashBoardContainer} />

    </Route>
)

export default Routes;