import * as actions from '../helpers/constants';
import Auth from "../api/mock/Auth";
import {getTime} from "date-fns";


export const loginSuccessful = user => ({type: actions.LOGIN_SUCCESS, user});

export const login = credentials => dispatch => {
    dispatch({type: actions.LOGIN});
    return Auth
        .login(credentials)
        .then(({user}) => {
            let jsonUser = JSON.stringify(user);
            localStorage.setItem("user", jsonUser);
            dispatch(loginSuccessful(user));
            dispatch({
                type: actions.OPERATION_SUCCESSFUL,
                action: actions.LOGIN,
                timestamp: getTime(Date()),
                data: {user}
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.OPERATION_FAILED,
                action: actions.LOGIN,
                timestamp: getTime(Date()),
                data: {error}
            });
        });
};

export const logoutSuccessful = () => ({type: actions.LOGOUT_SUCCESS});

export const logout = () => dispatch => {
    dispatch({type: actions.LOGOUT});
    return Auth
        .logout()
        .then(({logout}) => {
            localStorage.setItem("user", null);
            dispatch(logoutSuccessful());
            dispatch({
                type: actions.OPERATION_SUCCESSFUL,
                action: actions.LOGOUT,
                timestamp: getTime(Date()),
                data: {logout}
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.OPERATION_FAILED,
                action: actions.LOGOUT,
                timestamp: getTime(Date()),
                data: {error}
            });
        });
};

export const lockSession = () => ({type: actions.LOCK_SESSION});