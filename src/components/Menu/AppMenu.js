import React, {Component} from 'react';
import { Link } from "react-router"; 
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    textDecoration: "none"
}
export default class AppMenu extends Component {

 state = { open: false};

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <AppBar
            title="KickBucket"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Link to="/signup" style={style}>
            <MenuItem onClick={this.handleClose}>Sign Up</MenuItem>
          </Link>
          <Link to="/login" style={style}>
            <MenuItem onClick={this.handleClose}>Login</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}