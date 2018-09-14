import * as actions from '../helpers/constants';

export const deployments = (state = [], action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_DEPLOYMENTS_SUCCESS:
            return action.deployments;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_DEPLOYMENTS_SUCCESS:
        case actions.LOAD_MACHINE_DEPLOYMENTS:
            return false;
        case actions.LOAD_MACHINE_DEPLOYMENTS_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINE_DEPLOYMENTS:
            return true;
        case actions.LOAD_MACHINE_DEPLOYMENTS_SUCCESS:
        case actions.LOAD_MACHINE_DEPLOYMENTS_FAILED:
            return false;
        default:
            return state;
    }
};