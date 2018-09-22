import * as actionTypes from '../helpers/constants';

export const users = (state = [], action) => {
    switch (action.type){
        case actionTypes.LOAD_USERS_SUCCESSFUL:
            return action.users;
        default:
            return state;
    }
};

export const pagination = (state = {}, action) => {
    switch (action.type){
        case actionTypes.LOAD_USERS_SUCCESSFUL:
            return action.pagination;
        default:
            return state;
    }
};

// export const groupUsers = (state = [], action) => {
//     switch (action.type){
//         case actionTypes.LOAD_GROUP_USERS_SUCCESS:
//             return action.users;
//         default:
//             return state;
//     }
// };
//
// export const danglingUsers = (state = [], action) => {
//     switch (action.type){
//         case actionTypes.LOAD_DANGLING_USERS_SUCCESS:
//             return action.users;
//         default:
//             return state;
//     }
// };

// export const single = (state = {}, action) => {
//     switch (action.type){
//         case actionTypes.SELECT_USER:
//             return action.user;
//         default:
//             return state;
//     }
// };

export const loading = (state = false, action) => {
    switch (action.type){
        case actionTypes.LOAD_USERS:
            return true;
        case actionTypes.LOAD_USERS_SUCCESSFUL:
        case actionTypes.LOAD_USERS_FAILED:
            return false;
        default:
            return state;
    }
};

export const adding = (state = false, action) => {
    switch (action.type){
        case actionTypes.ADD_USER:
            return true;
        case actionTypes.ADD_USER_SUCCESSFUL:
        case actionTypes.ADD_USER_FAILED:
            return false;
        default:
            return state;
    }
};

// export const loadingDanglingUsers = (state = false, action) => {
//     switch (action.type){
//         case actionTypes.LOADING_DANGLING_USERS:
//             return true;
//         case actionTypes.LOAD_DANGLING_USERS_SUCCESS:
//         case actionTypes.LOAD_DANGLING_USERS_FAILED:
//             return false;
//         default:
//             return state;
//     }
// };

export const editing = (state = false, action) => {
    switch (action.type){
        case actionTypes.EDIT_USER:
            return true;
        case actionTypes.EDIT_USER_SUCCESSFUL:
        case actionTypes.EDIT_USER_FAILED:
            return false;
        default:
            return state;
    }
};

export const deleting = (state = false, action) => {
    switch (action.type){
        case actionTypes.DELETE_USER:
            return true;
        case actionTypes.DELETE_USER_SUCCESSFUL:
        case actionTypes.DELETE_USER_FAILED:
            return false;
        default:
            return state;
    }
};