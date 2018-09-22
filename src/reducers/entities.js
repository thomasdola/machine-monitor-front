import * as actionTypes from '../helpers/constants';

export const entities = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_ENTITIES_SUCCESSFUL:
            return action.entities;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_ENTITIES:
            return true;
        case actionTypes.LOAD_ENTITIES_SUCCESSFUL:
        case actionTypes.LOAD_ENTITIES_FAILED:
            return false;
        default:
            return state;
    }
};