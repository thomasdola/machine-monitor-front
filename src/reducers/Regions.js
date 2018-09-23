import * as actionTypes from '../helpers/constants';

export const regions = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_REGIONS_SUCCESSFUL:
            return action.regions;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_REGIONS:
            return true;
        case actionTypes.LOAD_REGIONS_SUCCESSFUL:
        case actionTypes.LOAD_REGIONS_FAILED:
            return false;
        default:
            return state;
    }
};