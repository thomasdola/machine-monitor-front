import Loadable from 'react-loadable';
import {Dialog} from "@blueprintjs/core";
import React from "react";
import PropTypes from "prop-types";
import Loading from '../../Loading';

const NewRole = Loadable({
    loader: () => import('./NewRole'),
    loading: () => <Loading/>,
});

export const EditRole = Loadable({
    loader: () => import('./EditRole'),
    loading: () => <Loading/>,
});

export const NewPolicy = Loadable({
    loader: () => import('./NewPolicy'),
    loading: () => <Loading/>,
});

export const EditPolicy = Loadable({
    loader: () => import('./EditPolicy'),
    loading: () => <Loading/>,
});

export const AddUsers = Loadable({
    loader: () => import('./AddUsersToRole'),
    loading: () => <Loading/>,
});


export const NewRoleDialog = ({history}) => {
    return (
        <Dialog
            backdropClassName="transparent__back"
            style={{width: '350px'}}
            onClose={() => history.goBack()}
            lazy
            icon="key"
            isOpen
            canOutsideClickClose={false}
            canEscapeKeyClose={false}
            title="New User Role"
        >
            <NewRole/>
        </Dialog>
    );
};
NewRoleDialog.prototype = {
    history: PropTypes.object.isRequired
};

export const EditRoleDialog = ({history}) => {
    return (
        <Dialog
            backdropClassName="transparent__back"
            style={{width: '350px'}}
            lazy
            onClose={() => history.goBack()}
            icon="layer"
            isOpen
            canOutsideClickClose={false}
            canEscapeKeyClose={false}
            title={`Edit Role`}
        >
            <EditRole/>
        </Dialog>
    );
};
EditRoleDialog.prototype = {
    history: PropTypes.object.isRequired
};

export const NewPolicyDialog = ({history}) => {
    return (
        <Dialog
            backdropClassName="transparent__back"
            style={{width: '350px'}}
            lazy
            onClose={() => history.goBack()}
            icon="layer"
            isOpen
            canOutsideClickClose={false}
            canEscapeKeyClose={false}
            title="New Policy"
        >
            <NewPolicy/>
        </Dialog>
    );
};
NewPolicyDialog.prototype = {
    history: PropTypes.object.isRequired
};

export const EditPolicyDialog = ({history}) => {
    return (
        <Dialog
            backdropClassName="transparent__back"
            style={{width: '350px'}}
            lazy
            onClose={() => history.goBack()}
            icon="layer"
            isOpen
            canOutsideClickClose={false}
            canEscapeKeyClose={false}
            title="Edit Policy"
        >
            <EditPolicy/>
        </Dialog>
    );
};
EditPolicyDialog.prototype = {
    history: PropTypes.object.isRequired
};

export const AddUsersDialog = ({history}) => {
    return (
        <Dialog
            backdropClassName="transparent__back"
            style={{width: '350px'}}
            lazy
            canOutsideClickClose={false}
            onClose={() => history.goBack()}
            canEscapeKeyClose={false}
            icon="people"
            isOpen
            title={`Add User(s) to ${this.state.role.name || ''} Group`}
        >
            <AddUsers/>
        </Dialog>
    );
};
AddUsersDialog.prototype = {
    history: PropTypes.object.isRequired
};