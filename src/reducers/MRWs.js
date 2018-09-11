import * as actions from '../helpers/constants';
import _reject from 'lodash/reject';
import _sortBy from 'lodash/sortBy';

export const list = (state = [], action) => {
    switch (action.type){
        case actions.LOAD_MRWS_SUCCESS:
            return action.mrws;
        case actions.MRW_UPDATED:
            const {mrw: {name}, mrw} = action;
            const currentMrws = _reject(state, {name});
            const updatedMrws = [...currentMrws, mrw];
            return [..._sortBy(updatedMrws, ['name', 'status'])];
        default:
            return state;
    }
};

export const failed = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRWS_SUCCESS:
        case actions.LOAD_MRWS:
            return false;
        case actions.LOAD_MRWS_FAILED:
            return true;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actions.LOAD_MRWS:
            return true;
        case actions.LOAD_MRWS_SUCCESS:
        case actions.LOAD_MRWS_FAILED:
            return false;
        default:
            return state;
    }
};