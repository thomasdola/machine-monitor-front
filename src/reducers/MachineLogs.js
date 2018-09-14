import * as actions from '../helpers/constants';

export const logs = (state = [], action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_LOGS_SUCCESS:
            return action.logs;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_LOGS_SUCCESS:
        case actions.LOAD_MACHINE_LOGS:
            return false;
        case actions.LOAD_MACHINE_LOGS_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_LOGS:
            return true;
        case actions.LOAD_MACHINE_LOGS_SUCCESS:
        case actions.LOAD_MACHINE_LOGS_FAILED:
            return false;
        default:
            return state;
    }
};