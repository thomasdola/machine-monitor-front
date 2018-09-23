import Loadable from 'react-loadable';
import PropTypes from "prop-types";
import {Dialog} from "@blueprintjs/core";
import React from "react";

const NewCenter = Loadable({
    loader: () => import('./NewCenter'),
    loading: () => null,
});

const EditCenter = Loadable({
    loader: () => import('./EditCenter'),
    loading: () => null,
});

export const NewCenterDialog = ({history}) => {
    return (
        <Dialog
            backdropClassName="transparent__back"
            style={{width: '350px'}}
            lazy
            onClose={() => history.goBack()}
            hasBackdrop={false}
            canOutsideClickClose={false}
            icon="new-person"
            isOpen title="New User"
        >
            <NewCenter/>
        </Dialog>
    );
};
NewCenterDialog.prototype = {
    history: PropTypes.object.isRequired
};

export const EditCenterDialog = ({history}) => {
    return (
        <Dialog
            backdropClassName="transparent__back"
            style={{width: '350px'}}
            lazy
            onClose={() => history.goBack()}
            hasBackdrop={false}
            canOutsideClickClose={false}
            icon="person"
            isOpen title={"View User"}
        >
            <EditCenter/>
        </Dialog>
    );
};
EditCenterDialog.prototype = {
    history: PropTypes.object.isRequired
};