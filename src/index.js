import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import Routes from "./routes";

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={browserHistory} routes={Routes} />
    </MuiThemeProvider>, document.getElementById('root'));

injectTapEventPlugin();
registerServiceWorker();
