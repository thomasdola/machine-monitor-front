import * as actions from '../helpers/constants';
import MRWSApi from '../api/mock/MRWs';

export const loadMRWs = params => dispatch => {
    dispatch({type: actions.LOAD_MRWS});
    return MRWSApi
        .list(params)
        .then(({data}) => {
            dispatch({type: actions.LOAD_MRWS_SUCCESS, mrws: data});
        })
        .catch(error => {
            dispatch({type: actions.LOAD_MRWS_FAILED});
            console.log(error);
        });
};

export const loadMRWInformation = (value, type) => dispatch => {
    dispatch({type: actions.LOAD_MRW_INFORMATION});
    return MRWSApi
        .single(value, type)
        .then(({data}) => {
            dispatch({type: actions.LOAD_MRW_INFORMATION_SUCCESS, mrw: data});
        })
        .catch(error => {
            dispatch({type: actions.LOAD_MRW_INFORMATION_FAILED});
            console.log(error);
        });
};

export const loadMRWLogs = (value, type) => dispatch => {
    dispatch({type: actions.LOAD_MRW_LOGS});
    return MRWSApi
        .logs(value, type)
        .then(({data}) => {
            dispatch({type: actions.LOAD_MRW_LOGS_SUCCESS, mrw: data});
        })
        .catch(error => {
            dispatch({type: actions.LOAD_MRW_LOGS_FAILED});
            console.log(error);
        });
};

export const loadMRWDeployments = (value, type) => dispatch => {
    dispatch({type: actions.LOAD_MRW_DEPLOYMENTS});
    return MRWSApi
        .deployments(value, type)
        .then(({data}) => {
            dispatch({type: actions.LOAD_MRW_DEPLOYMENTS_SUCCESS, mrw: data});
        })
        .catch(error => {
            dispatch({type: actions.LOAD_MRW_DEPLOYMENTS_FAILED});
            console.log(error);
        });
};

export const loadMRWIssues = (value, type) => dispatch => {
    dispatch({type: actions.LOAD_MRW_ISSUES});
    return MRWSApi
        .issues(value, type)
        .then(({data}) => {
            dispatch({type: actions.LOAD_MRW_ISSUES_SUCCESS, mrw: data});
        })
        .catch(error => {
            dispatch({type: actions.LOAD_MRW_ISSUES_FAILED});
            console.log(error);
        });
};