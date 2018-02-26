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
import '@root/style/reset.scss'
import registerServiceWorker from '@root/registerServiceWorker'
import notFound from '@components/errorPage/notFound'
import routes from '@root/routers'
import stores from '@root/stores'
// import { Provider } from 'mobx-react'

let RoutesConfig = () => (
    // <Provider stores={stores}>
        <Router>
            <Switch>
                {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={ props => {
                            if (props.location.pathname === '/') {
                                return <Redirect to="/test" /> 
                            } else {
                                 return  <route.component {...props} routes={route.routes} />
                            }
                        }}
                    />)}
            </Switch>
        </Router>
    // </Provider>
)
ReactDOM.render(<RoutesConfig />, document.getElementById('root'));
registerServiceWorker();
