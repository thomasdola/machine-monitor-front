import * as actions from '../helpers/constants';

export const profile = (state = {network: {}, applications: [], services: []}, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_PROFILE_SUCCESS:
            return action.profile;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_PROFILE_SUCCESS:
        case actions.LOAD_MACHINE_PROFILE:
            return false;
        case actions.LOAD_MACHINE_PROFILE_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_PROFILE:
            return true;
        case actions.LOAD_MACHINE_PROFILE_SUCCESS:
        case actions.LOAD_MACHINE_PROFILE_FAILED:
            return false;
        default:
            return state;
    }
};