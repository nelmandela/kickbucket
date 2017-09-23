import React from "react";
import {Route} from "react-router";
import App from "./components/App";
import LoginContainer from "./containers/LoginContainer";
import SignUpContainer from "./containers/SignUpContainer";

const Routes = (
    <Route path="/" component={App}>
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignUpContainer} />
    </Route>
)

export default Routes;