import * as actionTypes from '../helpers/constants';

export const pages = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_PAGES_SUCCESSFUL:
            return action.gates;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_PAGES:
            return true;
        case actionTypes.LOAD_PAGES_SUCCESSFUL:
        case actionTypes.LOAD_PAGES_FAILED:
            return false;
        default:
            return state;
    }
};