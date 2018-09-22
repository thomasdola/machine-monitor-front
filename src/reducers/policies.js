import * as actionTypes from '../helpers/constants';

export const policies = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_POLICIES_SUCCESSFUL:
            return action.policies;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_POLICIES:
            return true;
        case actionTypes.LOAD_POLICIES_SUCCESSFUL:
        case actionTypes.LOAD_POLICIES_FAILED:
            return false;
        default:
            return state;
    }
};

export const adding = (state = false, action) => {
    switch (action.type){
        case actionTypes.ADD_POLICY:
            return true;
        case actionTypes.ADD_POLICY_SUCCESSFUL:
        case actionTypes.ADD_POLICY_FAILED:
            return false;
        default:
            return state;
    }
};

export const editing = (state = false, action) => {
    switch (action.type){
        case actionTypes.EDIT_POLICY:
            return true;
        case actionTypes.EDIT_POLICY_SUCCESSFUL:
        case actionTypes.EDIT_POLICY_FAILED:
            return false;
        default:
            return state;
    }
};

export const deleting = (state = false, action) => {
    switch (action.type){
        case actionTypes.DELETE_POLICY:
            return true;
        case actionTypes.DELETE_POLICY_SUCCESSFUL:
        case actionTypes.DELETE_POLICY_FAILED:
            return false;
        default:
            return state;
    }
};