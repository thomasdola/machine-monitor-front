import DownloadApi from '../api/actual/Download';
import * as actionTypes from '../helpers/constants';
import {getTime} from "date-fns";

export const serverDownload = (token, params, action) => dispatch => {

    return DownloadApi
        .download(token, params)
        .then(({data}) => {
            dispatch({type: actionTypes.EXPORT_LOGS_SUCCESS});
            dispatch({
                type: actionTypes.OPERATION_SUCCESSFUL,
                action,
                timestamp: getTime(Date()),
                data: new Blob([data])
            });
        })
        .catch(error => {
            dispatch({
                type: actionTypes.OPERATION_FAILED,
                action,
                timestamp: getTime(Date()),
                data: {...error}
            });
            dispatch({type: actionTypes.EXPORT_LOGS_FAILED});
            console.log(error);
        });
};

export const browserDownload = (data, filename) => {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
};