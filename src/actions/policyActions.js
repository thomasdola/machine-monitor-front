import * as actionTypes from '../helpers/constants';
import {getTime} from "date-fns";
import PolicyApi from '../api/actual/policyApi';


export const loadPolicies = (token, params = {}) => dispatch => {
    dispatch({type: actionTypes.LOAD_POLICIES});

    return PolicyApi
        .list(token, params)
        .then(policies => {
            dispatch({type: actionTypes.LOAD_POLICIES_SUCCESSFUL, policies});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_POLICIES_FAILED});
            console.log(error);});
};

export const loadRolePolicies = (token, params) => dispatch => {
    dispatch({type: actionTypes.LOAD_ROLE_POLICIES});

    return PolicyApi
        .list(token, params)
        .then(policies => {
            dispatch({type: actionTypes.LOAD_ROLE_POLICIES_SUCCESSFUL, policies});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_ROLE_POLICIES_FAILED});
            console.log(error);});
};

export const addPolicy = (token, data) => dispatch => {
    dispatch({type: actionTypes.ADD_POLICY});

    return PolicyApi
        .add(token, data)
        .then(({added}) => {
            if(added){
                dispatch({type: actionTypes.ADD_POLICY_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.ADD_POLICY,
                    timestamp: getTime(Date()),
                    data: {added}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.ADD_POLICY,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.ADD_POLICY_FAILED});
            console.log(error);});
};

export const editPolicy = (token, policy, data) => dispatch => {
    dispatch({type: actionTypes.EDIT_POLICY});

    return PolicyApi
        .edit(token, policy, data)
        .then(({updated}) => {
            if(updated){
                dispatch({type: actionTypes.EDIT_POLICY_SUCCESSFUL});

                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.EDIT_POLICY,
                    timestamp: getTime(Date()),
                    data: {updated}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.EDIT_POLICY,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.EDIT_POLICY_FAILED});
            console.log(error);});
};

export const deletePolicy = (token, policy) => dispatch => {
    dispatch({type: actionTypes.DELETE_POLICY});

    return PolicyApi
        .delete(token, policy)
        .then(({deleted}) => {
            if(deleted){
                dispatch({type: actionTypes.DELETE_POLICY_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.DELETE_POLICY,
                    timestamp: getTime(Date()),
                    data: {deleted}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.DELETE_POLICY,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.DELETE_POLICY_FAILED});
            console.log(error);});
};