import * as actions from '../helpers/constants';
// import Machine from "../api/mock/Machine";
import Machine from "../api/actual/Machine";
import {getTime} from "date-fns";


export const loading = (start = true) => ({type: actions.LOAD_MACHINE_PROFILE, start})

export const getMachineProfile = (id, type, token) => dispatch => {
    dispatch({type: actions.LOAD_MACHINE_PROFILE});
    return Machine
        .get(id, type, token)
        .then(({data}) => {
            dispatch({
                type: actions.LOAD_MACHINE_PROFILE_SUCCESS,
                profile: data
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.LOAD_MACHINE_PROFILE_FAILED,
                error
            });
        });
};

export const getMachineDeployments = (id, pagination, token)=> dispatch => {
    dispatch({type: actions.LOAD_MACHINE_DEPLOYMENTS});
    return Machine
        .deployments(id, pagination, token)
        .then(({data}) => {
            dispatch({
                type: actions.LOAD_MACHINE_DEPLOYMENTS_SUCCESS,
                deployments: data
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.LOAD_MACHINE_DEPLOYMENTS_FAILED,
                error
            });
        });
};

export const getMachineIssues = (id, pagination, token)=> dispatch => {
    dispatch({type: actions.LOAD_MACHINE_ISSUES});
    return Machine
        .issues(id, pagination, token)
        .then(({data}) => {
            dispatch({
                type: actions.LOAD_MACHINE_ISSUES_SUCCESS,
                issues: data
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.LOAD_MACHINE_ISSUES_FAILED,
                error
            });
        });
};

export const getMachineLogs = (id, pagination, token)=> dispatch => {
    dispatch({type: actions.LOAD_MACHINE_LOGS});
    return Machine
        .logs(id, pagination, token)
        .then(({data}) => {
            dispatch({
                type: actions.LOAD_MACHINE_LOGS_SUCCESS,
                logs: data
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.LOAD_MACHINE_LOGS_FAILED,
                error
            });
        });
};