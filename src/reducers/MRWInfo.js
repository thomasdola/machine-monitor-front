import * as actions from '../helpers/constants';

export const info = (state = {network: {}, applications: [], services: []}, action) => {
    switch (action.type){
        case actions.LOAD_MRW_INFORMATION_SUCCESS:
            return action.mrw;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRW_INFORMATION_SUCCESS:
        case actions.LOAD_MRW_INFORMATION:
            return false;
        case actions.LOAD_MRW_INFORMATION_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRW_INFORMATION:
            return true;
        case actions.LOAD_MRW_INFORMATION_SUCCESS:
        case actions.LOAD_MRW_INFORMATION_FAILED:
            return false;
        default:
            return state;
    }
};