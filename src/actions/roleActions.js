import * as actionTypes from '../helpers/constants';
import {getTime} from "date-fns";
import RoleApi from '../api/actual/roleApi';
import RoleDependenciesApi from '../api/actual/roleDependencyApi';

export const selectPage = page => ({type: actionTypes.SELECT_PAGE, page});

export const selectRole = role => ({type: actionTypes.SELECT_ROLE, role});

export const selectEntity = entity => ({type: actionTypes.SELECT_ENTITY, entity});

export const loadRoles = (token, params) => dispatch => {
    dispatch({type: actionTypes.LOAD_ROLES});

    return RoleApi
        .list(token, params)
        .then(({data: {roles, meta: {pagination}}}) => {
            dispatch({type: actionTypes.LOAD_ROLES_SUCCESSFUL, roles, pagination});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_ROLES_FAILED});
            console.log(error);
        });
};

export const addRole = (token, data) => dispatch => {
    dispatch({type: actionTypes.ADD_ROLE});

    return RoleApi
        .add(token, data)
        .then(({data: {added}}) => {
            if(added){
                dispatch({type: actionTypes.ADD_ROLE_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.ADD_ROLE,
                    timestamp: getTime(Date()),
                    data: {added}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.ADD_ROLE,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.ADD_ROLE_FAILED});
            console.log(error);});
};

export const editRole = (token, role, data, action = null) => dispatch => {
    dispatch({type: actionTypes.EDIT_ROLE});

    return RoleApi
        .edit(token, role, data)
        .then(({data: {updated}}) => {
            if(updated){
                dispatch({type: actionTypes.EDIT_ROLE_SUCCESSFUL});
                action = action ? action : actionTypes.EDIT_ROLE;
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
                action: actionTypes.EDIT_ROLE,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.EDIT_ROLE_FAILED});
            console.log(error);});
};

export const deleteRole = (token, role) => dispatch => {
    dispatch({type: actionTypes.DELETE_ROLE});

    return RoleApi
        .delete(token, role)
        .then(({data: {deleted}}) => {
            if(deleted){
                dispatch({type: actionTypes.DELETE_ROLE_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.DELETE_ROLE,
                    timestamp: getTime(Date()),
                    data: {deleted}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.DELETE_ROLE,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.DELETE_ROLE_FAILED});
            console.log(error);});
};



export const loadPages = (token) => dispatch => {
    dispatch({type: actionTypes.LOAD_PAGES});

    return RoleDependenciesApi
        .pages(token)
        .then(gates => {
            dispatch({type: actionTypes.LOAD_PAGES_SUCCESSFUL, gates});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_PAGES_FAILED});
            console.log(error);});
};

export const loadEntities = (token, params) => dispatch => {
    dispatch({type: actionTypes.LOAD_ENTITIES});

    return RoleDependenciesApi
        .entities(token, params)
        .then(entities => {
            dispatch({type: actionTypes.LOAD_ENTITIES_SUCCESSFUL, entities});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_ENTITIES_FAILED});
            console.log(error);});
};

export const loadActions = (token, params) => dispatch => {
    dispatch({type: actionTypes.LOAD_ACTIONS});

    return RoleDependenciesApi
        .actions(token, params)
        .then(actions => {
            dispatch({type: actionTypes.LOAD_ACTIONS_SUCCESSFUL, actions});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_ACTIONS_FAILED});
            console.log(error);});
};