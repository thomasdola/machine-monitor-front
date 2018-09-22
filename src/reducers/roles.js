import * as actionTypes from '../helpers/constants';

export const roles = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_ROLE_POLICIES_SUCCESSFUL:
            return action.groups;
        default:
            return state;
    }
};

export const pagination = (state = {}, action) => {
    switch (action.type){
        case actionTypes.LOAD_ROLES_SUCCESSFUL:
            return action.pagination;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_ROLES:
            return true;
        case actionTypes.LOAD_ROLES_SUCCESSFUL:
        case actionTypes.LOAD_ROLES_FAILED:
            return false;
        default:
            return state;
    }
};

export const adding = (state = false, action) => {
    switch (action.type){
        case actionTypes.ADD_ROLE:
            return true;
        case actionTypes.ADD_ROLE_SUCCESSFUL:
        case actionTypes.ADD_ROLE_FAILED:
            return false;
        default:
            return state;
    }
};

export const editing = (state = false, action) => {
    switch (action.type){
        case actionTypes.EDIT_ROLE:
            return true;
        case actionTypes.EDIT_ROLE_FAILED:
        case actionTypes.EDIT_ROLE_SUCCESSFUL:
            return false;
        default:
            return state;
    }
};

export const deleting = (state = false, action) => {
    switch (action.type){
        case actionTypes.DELETE_ROLE:
            return true;
        case actionTypes.DELETE_ROLE_SUCCESSFUL:
        case actionTypes.DELETE_ROLE_FAILED:
            return false;
        default:
            return state;
    }
};