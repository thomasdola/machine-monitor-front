import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import configureStore from './store/configStore';
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Can from "./helpers/Can";
import {loginSuccessful, logout} from "./actions/authActions";
import Login from "./Components/Login";

export const AuthorizedRoute = ({ component: Component, user: {root}, user, page, ...rest }) => {
    const can = root || Can.User(user).access(page);
    return (
        <Route
            {...rest}
            render={props =>
                can ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={"/unauthorized"} />
                )
            }
        />
    )
};

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to={"/auth/login"} />
            )
        }
    />
);

export const idleLogout = (timeout, callback) => {
    let t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  // catches touchscreen presses as well
    window.ontouchstart = resetTimer; // catches touchscreen swipes as well
    window.onclick = resetTimer;      // catches touchpad clicks as well
    window.onkeypress = resetTimer;
    window.addEventListener('scroll', resetTimer, true); // improved; see comments

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(callback, timeout);  // time is in milliseconds
    }
};

let isAuthenticated = false;
const store = configureStore();
const authUser = localStorage.getItem("user");
if(authUser !== null){
    store.dispatch(loginSuccessful(JSON.parse(authUser)));
    // idleLogout(10000, () => store.dispatch(logout()));
    isAuthenticated = true;
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route extact={true} key={"Login"} path={"/auth/login"} component={Login}/>
                <PrivateRoute path={"/"} component={App} isAuthenticated={isAuthenticated}/>
            </Switch>
        </Router>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
