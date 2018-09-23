import * as actionTypes from '../helpers/constants';

export const districts = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_DISTRICTS_SUCCESSFUL:
            return action.districts;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_DISTRICTS:
            return true;
        case actionTypes.LOAD_DISTRICTS_SUCCESSFUL:
        case actionTypes.LOAD_DISTRICTS_FAILED:
            return false;
        default:
            return state;
    }
};