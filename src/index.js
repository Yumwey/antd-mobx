import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
  } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import notFound from './components/errorPage/notFound'
import routes from './moduleRouters'

let RoutesConfig = () => (
    <Router>
        <Switch>
            {routes.map((route, index) => 
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={ props => (
                        <route.component {...props} routes={route.routes} />
                    )}
                />)}
            {/* <Route component={notFound}></Route> */}
        </Switch>
    </Router>
)
ReactDOM.render(<RoutesConfig />, document.getElementById('root'));
registerServiceWorker();
