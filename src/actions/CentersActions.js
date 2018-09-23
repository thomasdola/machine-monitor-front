import * as actionTypes from '../helpers/constants';
import CenterApi from '../api/actual/centerApi';
import {getTime} from "date-fns";


export const loadCenters = (token, params) => dispatch => {
    dispatch({type: actionTypes.LOAD_CENTERS});

    return CenterApi
        .list(token, params)
        .then(({data: {centers, meta: {pagination}}}) => {
            dispatch({type: actionTypes.LOAD_CENTERS_SUCCESSFUL, centers, pagination});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_CENTERS_FAILED});
            console.log(error);});
};

export const addCenter = (token, data) => dispatch => {
    dispatch({type: actionTypes.ADD_CENTER});

    return CenterApi
        .add(token, data)
        .then(({data: {added}}) => {
            if(added){
                dispatch({type: actionTypes.ADD_CENTER_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.ADD_CENTER,
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
            dispatch({type: actionTypes.ADD_CENTER_FAILED});
            console.log(error);
        });
};
export const editCenter = (token, center, data, action = null) => dispatch => {
    dispatch({type: actionTypes.EDIT_CENTER});

    return CenterApi
        .edit(token, center, data)
        .then(({data: {updated}}) => {
            if(updated){
                dispatch({type: actionTypes.EDIT_CENTER_SUCCESSFUL});
                action = action ? action : actionTypes.EDIT_CENTER;
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
                action: actionTypes.EDIT_CENTER,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.EDIT_CENTER_FAILED});
            console.log(error);
        });
};
export const deleteCenter = (token, center) => dispatch => {
    dispatch({type: actionTypes.DELETE_CENTER});

    return CenterApi
        .delete(token, center)
        .then(({data: {deleted}}) => {
            if(deleted){
                dispatch({type: actionTypes.DELETE_CENTER_SUCCESSFUL});
                dispatch({
                    type: actionTypes.OPERATION_SUCCESSFUL,
                    action: actionTypes.DELETE_CENTER,
                    timestamp: getTime(Date()),
                    data: {deleted}
                });
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action: actionTypes.DELETE_CENTER,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.DELETE_CENTER_FAILED});
            console.log(error);
        });
};