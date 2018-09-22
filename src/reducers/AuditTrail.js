import * as actionTypes from '../helpers/constants';

export const logs = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_LOGS_SUCCESS:
            return action.logs;
        default:
            return state;
    }
};

export const pagination = (state = {}, action) => {
    switch (action.type){
        case actionTypes.LOAD_LOGS_SUCCESS:
            return action.pagination;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_LOGS:
            return true;
        case actionTypes.LOAD_LOGS_SUCCESS:
        case actionTypes.LOAD_LOGS_FAILED:
            return false;
        default:
            return state;
    }
};

export const exporting = (state = false, action) => {
    switch (action.type){
        case actionTypes.EXPORT_LOGS:
            return true;
        case actionTypes.EXPORT_LOGS_SUCCESS:
        case actionTypes.EXPORT_LOGS_FAILED:
            return false;
        default:
            return state;
    }
};