import * as actionTypes from '../helpers/constants';
import LogApi from '../api/actual/AuditTrail';
import {getTime} from "date-fns";

export const loadLogs = (token, params) => dispatch => {
    dispatch({type: actionTypes.LOAD_LOGS});

    return LogApi
        .list(token, params)
        .then(({data, meta: {pagination}}) => {
            dispatch({type: actionTypes.LOAD_LOGS_SUCCESS, logs: data, pagination});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_LOGS_FAILED});
            console.log(error);
        });
};

export const exportLogs = (token, params) => dispatch => {
    dispatch({type: actionTypes.EXPORT_LOGS});

    return LogApi
        .export(token, params)
        .then(({scheduled}) => {
            dispatch({type: actionTypes.EXPORT_LOGS_SUCCESS});
            dispatch({
                type: actionTypes.OPERATION_SUCCESSFUL,
                action: actionTypes.EXPORT_LOGS,
                timestamp: getTime(Date()),
                data: {scheduled}
            });
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.EXPORT_LOGS,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.EXPORT_LOGS_FAILED});
            console.log(error);
        });
};