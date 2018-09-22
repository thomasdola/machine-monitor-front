import React from 'react';
import {Alert, Intent} from "@blueprintjs/core";


export const ConfirmAlert = ({open, onCancel, onConfirm, intent, message}) => {
    message = message ? message : "Are You Sure ?";
    return (<Alert
        cancelButtonText="No"
        confirmButtonText="Yes"
        intent={intent || Intent.SUCCESS}
        isOpen={open}
        onCancel={onCancel}
        onConfirm={onConfirm}>
        <p>{message}</p>
    </Alert>)
};