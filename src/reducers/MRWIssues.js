import * as actions from '../helpers/constants';

export const issues = (state = {status: undefined, issues: []}, action) => {
    switch (action.type){
        case actions.LOAD_MRW_ISSUES_SUCCESS:
            return action.mrw;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRW_ISSUES_SUCCESS:
        case actions.LOAD_MRW_ISSUES:
            return false;
        case actions.LOAD_MRW_ISSUES_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRW_ISSUES:
            return true;
        case actions.LOAD_MRW_ISSUES_SUCCESS:
        case actions.LOAD_MRW_ISSUES_FAILED:
            return false;
        default:
            return state;
    }
};