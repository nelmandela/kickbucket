import React, { Component } from 'react';
import AppMenu from "./Menu";
import "./App.css";
const token = localStorage.getItem("kickbucket_token");

const authenticated = (token === null || token === "" || token === undefined) ? false : true;

const App = (props) => (
    <div>
      <AppMenu
        authenticated={authenticated}/>
      {props.children}
    </div>
)

export default App;
