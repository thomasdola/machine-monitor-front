import * as actions from '../helpers/constants';

const USER_TEMPLATE = {
    uuid: "",
    username: "",
    full_name: "",
    password_updated: true,
    pin: '',
    role: {
        name: '',
        gates: [],
        entities: []
    },
    channel: '',
    token: ''
};

export const user = (state = USER_TEMPLATE, action) => {
    switch (action.type){
        case actions.LOGIN_SUCCESS:
            return action.user;
        case actions.LOGOUT_SUCCESS:
            return USER_TEMPLATE;
        default:
            return state;
    }
};

export const locked = (state = false, action) => {
    switch (action.type){
        case actions.LOGIN_SUCCESS:
            return false;
        case actions.LOGOUT_SUCCESS:
        case actions.LOCK_SESSION:
            return true;
        default:
            return state;
    }
};

export const loadingLogin = (state = false, action) => {
    switch (action.type){
        case actions.LOGIN_SUCCESS:
            return false;
        case actions.LOGIN:
            return true;
        default:
            return state;
    }
};

export const loadingLogout = (state = false, action) => {
    switch (action.type){
        case actions.LOGOUT_SUCCESS:
            return false;
        case actions.LOGOUT:
            return true;
        default:
            return state;
    }
};

export const authenticated = (state = false, action) => {
    switch (action.type){
        case actions.LOGIN_SUCCESS:
            return true;
        case actions.LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
};