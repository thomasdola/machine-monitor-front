import * as actionTypes from '../helpers/constants';

export const centers = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_CENTERS_SUCCESSFUL:
            return action.centers;
        default:
            return state;
    }
};

export const pagination = (state = {}, action) => {
    switch (action.type){
        case actionTypes.LOAD_CENTERS_SUCCESSFUL:
            return action.pagination;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_CENTERS:
            return true;
        case actionTypes.LOAD_CENTERS_SUCCESSFUL:
        case actionTypes.LOAD_CENTERS_FAILED:
            return false;
        default:
            return state;
    }
};

export const adding = (state = false, action) => {
    switch (action.type){
        case actionTypes.ADD_CENTER:
            return true;
        case actionTypes.ADD_CENTER_SUCCESSFUL:
        case actionTypes.ADD_CENTER_FAILED:
            return false;
        default:
            return state;
    }
};

export const editing = (state = false, action) => {
    switch (action.type){
        case actionTypes.EDIT_CENTER:
            return true;
        case actionTypes.EDIT_CENTER_SUCCESSFUL:
        case actionTypes.EDIT_CENTER_FAILED:
            return false;
        default:
            return state;
    }
};

export const deleting = (state = false, action) => {
    switch (action.type){
        case actionTypes.DELETE_CENTER:
            return true;
        case actionTypes.DELETE_CENTER_SUCCESSFUL:
        case actionTypes.DELETE_CENTER_FAILED:
            return false;
        default:
            return state;
    }
};