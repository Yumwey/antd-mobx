import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom'
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import routes from './moduleRouters'



let RoutesConfig = () => (
    <Router>
        <div>
            {routes.map((route, index) => 
                <Route
                    key={index}
                    path={route.path}
                    render={ props => (
                        <route.component {...props} routes={route.routes} />
                    )}
                />)}
        </div>
    </Router>
)
ReactDOM.render(<RoutesConfig />, document.getElementById('root'));
registerServiceWorker();
