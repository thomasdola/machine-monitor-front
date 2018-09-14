import * as actions from '../helpers/constants';

export const issues = (state = [], action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_ISSUES_SUCCESS:
            return action.issues;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_ISSUES_SUCCESS:
        case actions.LOAD_MACHINE_ISSUES:
            return false;
        case actions.LOAD_MACHINE_ISSUES_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_ISSUES:
            return true;
        case actions.LOAD_MACHINE_ISSUES_SUCCESS:
        case actions.LOAD_MACHINE_ISSUES_FAILED:
            return false;
        default:
            return state;
    }
};