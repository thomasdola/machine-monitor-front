import * as actions from '../helpers/constants';

export const profile = (state = {network: [], applications: [], services: []}, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_PROFILE_SUCCESS:
            return {...state, ...action.profile};
        case actions.APPLICATION_STATUS_CHANGED:
        case actions.APPLICATIONS_STATUS:
            return {...state, applications: action.data}
        case actions.SERVICE_STATUS_CHANGED:
        case actions.SERVICES_STATUS:
            return {...state, services: action.data}
        case actions.NETWORK_STATUS_CHANGED:
        case actions.NETWORK_STATUS:
            console.log(action.data);
            return {...state, network: action.data}
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
            return action.start ? action.start : true;
        case actions.LOAD_MACHINE_PROFILE_SUCCESS:
        case actions.LOAD_MACHINE_PROFILE_FAILED:
            return false;
        default:
            return state;
    }
};