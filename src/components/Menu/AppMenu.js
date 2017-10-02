import React, {Component} from 'react';
import { Link, browserHistory } from "react-router";
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

  handleLogout = () => {
    const token = localStorage.removeItem("kickbucket_token");
    if (!token) {
      // token has been removed, redirect to login
      this.setState({open: false });
      browserHistory.push("/login");
    }
  }

  render() {
    const notAuthLinks = [ <Link to="/signup" style={style}>
        <MenuItem onClick={this.handleClose}>Sign Up</MenuItem>
      </Link>,
      <Link to="/login" style={style}>
        <MenuItem onClick={this.handleClose}>Login</MenuItem>
      </Link>
    ];
    const authLinks = [
      <Link to="/dashboard" style={style} key="link_1">
        <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
      </Link>,
      <Link style={style} key="link_2">
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Link>
    ]
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
        {/* user not logged in */}
          {!this.props.authenticated &&
            notAuthLinks
          }
          {this.props.authenticated &&
            authLinks
          }
        </Drawer>
      </div>
    );
  }
}
