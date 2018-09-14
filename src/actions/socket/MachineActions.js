import * as actions from "../../helpers/constants";
import {getTime} from "date-fns";

export const startListening = (
        {channel,
            listeners: {onNetworkChanged, onUserActivityChanged, onLocationChanged, onServiceStatusChanged,
                onApplicationStatusChanged, onPasswordChangeDone}
        }
    ) => {
    channel.on(actions.NETWORK_STATUS_CHANGED, data => onNetworkChanged(data));
    channel.on(actions.USER_ACTIVITY_CHANGED, data => onUserActivityChanged(data));
    channel.on(actions.LOCATION_STATUS_CHANGED, data => onLocationChanged(data));
    channel.on(actions.SERVICE_STATUS_CHANGED, data => onServiceStatusChanged(data));
    channel.on(actions.APPLICATION_STATUS_CHANGED, data => onApplicationStatusChanged(data));
    channel.on(actions.CHANGE_PASSWORD_DONE, data => onPasswordChangeDone(data));
};

export const stopListening = (channel) => {
    channel.leave();
};

/*actions*/

export const startApplication = (params, channel, {onOk, onError, onTimeout}) => {
    perform(actions.START_APPLICATION, channel, params, onOk, onError, onTimeout);
};

export const stopApplication = (params, channel, {onOk, onError, onTimeout}) => {
    perform(actions.STOP_APPLICATION, channel, params, onOk, onError, onTimeout);
};

export const startService = (params, channel, {onOk, onError, onTimeout}) => {
    perform(actions.START_SERVICE, channel, params, onOk, onError, onTimeout);
};

export const stopService = (params, channel, {onOk, onError, onTimeout}) => {
    perform(actions.STOP_SERVICE, channel, params, onOk, onError, onTimeout);
};

export const changePassword = (params, channel, {onOk, onError, onTimeout}) => {
    perform(actions.CHANGE_PASSWORD, channel, params, onOk, onError, onTimeout);
};

export const powerOff = (params, channel, {onOk, onError, onTimeout}) => {
    perform(actions.SHUT_DOWN, channel, params, onOk, onError, onTimeout);
};

export const reboot = (params, channel, {onOk, onError, onTimeout}) => {
    perform(actions.RESTART, channel, params, onOk, onError, onTimeout);
};

function perform(event, channel, params, onOk, onError, onTimeout) {
    channel.push(event, params)
        .receive("ok", () => onOk(event))
        .receive("error", () => onError(event))
        .receive("timeout", () => onTimeout(event))
}


/*channel listeners*/
export const onOk = (action) => ({
    type: actions.OPERATION_SUCCESSFUL,
    action,
    timestamp: getTime(Date()),
    data: {}
});

export const onError = (action) => ({
    type: actions.OPERATION_FAILED,
    action,
    timestamp: getTime(Date()),
    data: {}
});

export const onTimeout = (action) => ({
    type: actions.OPERATION_TIMEOUT,
    action,
    timestamp: getTime(Date()),
    data: {}
});


/*events listeners*/
export const onNetworkChanged = data => ({
    type: actions.NETWORK_STATUS_CHANGED,
    data
});

export const onUserActivityChanged = data => ({
    type: actions.USER_ACTIVITY_CHANGED,
    data
});

export const onLocationChanged = data => ({
    type: actions.LOCATION_STATUS_CHANGED,
    data
});

export const onServiceStatusChanged = data => ({
    type: actions.SERVICE_STATUS_CHANGED,
    data
});

export const onApplicationStatusChanged = data => ({
    type: actions.APPLICATION_STATUS_CHANGED,
    data
});

export const onPasswordChangeDone = data => ({
    type: actions.CHANGE_PASSWORD_DONE,
    data
});