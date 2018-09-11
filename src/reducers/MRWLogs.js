import * as actions from '../helpers/constants';

export const logs = (state = {status: undefined, logs: []}, action) => {
    switch (action.type){
        case actions.LOAD_MRW_LOGS_SUCCESS:
            return action.mrw;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRW_LOGS_SUCCESS:
        case actions.LOAD_MRW_LOGS:
            return false;
        case actions.LOAD_MRW_LOGS_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRW_LOGS:
            return true;
        case actions.LOAD_MRW_LOGS_SUCCESS:
        case actions.LOAD_MRW_LOGS_FAILED:
            return false;
        default:
            return state;
    }
};