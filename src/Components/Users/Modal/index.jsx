import Loadable from 'react-loadable';
import PropTypes from "prop-types";
import {Dialog} from "@blueprintjs/core";
import React from "react";

const NewUser = Loadable({
    loader: () => import('./NewUser'),
    loading: () => null,
});

const ViewUser = Loadable({
    loader: () => import('./ViewUser'),
    loading: () => null,
});

export const NewUserDialog = ({history}) => {
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
            <NewUser/>
        </Dialog>
    );
};
NewUserDialog.prototype = {
    history: PropTypes.object.isRequired
};

export const ViewUserDialog = ({history}) => {
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
            <ViewUser/>
        </Dialog>
    );
};
ViewUserDialog.prototype = {
    history: PropTypes.object.isRequired
};