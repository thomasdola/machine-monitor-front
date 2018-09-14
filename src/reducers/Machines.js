import * as actions from '../helpers/constants';
import _reject from 'lodash/reject';
import _sortBy from 'lodash/sortBy';

export const list = (state = [], action) => {
    switch (action.type){
        case actions.MACHINES_UPDATED:
        case actions.LOAD_MACHINES_SUCCESS:
            return action.machines;
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINES_SUCCESS:
        case actions.LOAD_MACHINES:
            return false;
        case actions.LOAD_MACHINES_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MACHINES:
            return true;
        case actions.LOAD_MACHINES_SUCCESS:
        case actions.LOAD_MACHINES_FAILED:
            return false;
        default:
            return state;
    }
};