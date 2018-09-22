import * as actionTypes from '../helpers/constants';

export const actions = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_ACTIONS_SUCCESSFUL:
            return action.actions;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_ACTIONS:
            return true;
        case actionTypes.LOAD_ACTIONS_SUCCESSFUL:
        case actionTypes.LOAD_ACTIONS_FAILED:
            return false;
        default:
            return state;
    }
};