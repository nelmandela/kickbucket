import React, { Component } from 'react';
import AppMenu from "./Menu";
import "./App.css";

const App = (props) => (
    <div>
      <AppMenu />
      {props.children}
    </div>
)

export default App;
