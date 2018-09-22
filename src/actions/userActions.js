import * as actionTypes from '../helpers/constants';
import UserApi from '../api/actual/userApi';
import {getTime} from "date-fns";


export const loadUsers = (token, params) => dispatch => {
    dispatch({type: actionTypes.LOAD_USERS});

    return UserApi
        .list(token, params)
        .then(({data, meta: {pagination}}) => {
            dispatch({type: actionTypes.LOAD_USERS_SUCCESSFUL, users: data, pagination});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_USERS_FAILED});
            console.log(error);});
};

export const addUser = (token, data) => dispatch => {
    dispatch({type: actionTypes.ADD_USER});

    return UserApi
        .add(token, data)
        .then(({added}) => {
            if(added){
                dispatch({type: actionTypes.ADD_USER_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.ADD_USER,
                    timestamp: getTime(Date()),
                    data: {added}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.ADD_USER,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.ADD_USER_FAILED});
            console.log(error);
        });
};
export const editUser = (token, user, data, action = null) => dispatch => {
    dispatch({type: actionTypes.EDIT_USER});

    return UserApi
        .edit(token, user, data)
        .then(({updated}) => {
            if(updated){
                dispatch({type: actionTypes.EDIT_USER_SUCCESSFUL});
                action = action ? action : actionTypes.EDIT_USER;
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action,
                    timestamp: getTime(Date()),
                    data: {updated}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.EDIT_USER,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.EDIT_USER_FAILED});
            console.log(error);
        });
};
export const deleteUser = (token, user) => dispatch => {
    dispatch({type: actionTypes.DELETE_USER});

    return UserApi
        .delete(token, user)
        .then(({deleted}) => {
            if(deleted){
                dispatch({type: actionTypes.DELETE_USER_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.DELETE_USER,
                    timestamp: getTime(Date()),
                    data: {deleted}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.DELETE_USER,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.DELETE_USER_FAILED});
            console.log(error);
        });
};