import * as actionTypes from '../helpers/constants';

export const region = (state = {}, action) => {
    switch (action.type){
        case actionTypes.SELECT_REGION:
            return action.district;
        default:
            return state;
    }
};

export const district = (state = {}, action) => {
    switch (action.type){
        case actionTypes.SELECT_DISTRICT:
            return action.district;
        default:
            return state;
    }
};

export const page = (state = {}, action) => {
    switch (action.type){
        case actionTypes.SELECT_PAGE:
            return action.page;
        default:
            return state;
    }
};

export const entity = (state = {}, action) => {
    switch (action.type){
        case actionTypes.SELECT_ENTITY:
            return action.entity;
        default:
            return state;
    }
};

export const role = (state = {}, action) => {
    switch (action.type){
        case actionTypes.SELECT_ROLE:
            return action.role;
        default:
            return state;
    }
};