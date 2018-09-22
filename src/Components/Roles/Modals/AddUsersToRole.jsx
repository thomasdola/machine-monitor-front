import React from 'react';
import {Button, Intent} from '@blueprintjs/core';
import {withRouter} from 'react-router-dom';
import UsersMultiSelect from "../Lists/UsersMultiSelect";
import PropTypes from "prop-types";
import {editRole} from "../../../actions/roleActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _find from "lodash/find";
import _isEqual from 'lodash/isEqual';
import {isFormValid} from "../../../helpers";
import Toaster from "../../Common/Toaster";
import {EDIT_ROLE_WITH_USERS} from "../../../helpers/constants";

class AddUsersToRole extends React.Component {

    state = {
        users: [],
        role: {}
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {role: oldRole} = prevState;
        const {roles, match: {params: {uuid}}} = nextProps;
        let role = _find(roles, {uuid}) || {};

        if (_isEqual(oldRole, role))
            return null;

        return {role};
    }


    componentDidUpdate(prevProps) {
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;

        const {roles, match: {params: {uuid}}, OPERATION_SUCCESSFUL, OPERATION_FAILED, history} = this.props;

        const role = _find(roles, {uuid}) || {name: ''};

        if (!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)) {
            if (OPERATION_SUCCESSFUL.action === EDIT_ROLE_WITH_USERS) {
                history.goBack();
                Toaster.show({
                    message: `User(s) Added Successfully To ${role.name.toUpperCase()} 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick'
                });
            }
        }

        if (!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)) {
            if (OPERATION_FAILED.action === EDIT_ROLE_WITH_USERS) {
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Add User(s) To ${role.name.toUpperCase()} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
        }
    }

    _formValid = () => {
        const {users} = this.state;
        const required = {users: users.map(({id}) => id)};

        return isFormValid(required);
    };

    _handleInputChange = (name, value) => {
        this.setState({[name]: value});
    };

    _handleEditRole = () => {
        const {users, role: {uuid}} = this.state;
        const {authUser: {token}, editRole} = this.props;
        let data = new FormData();

        const usersId = users.map(({id}) => id);
        for (let i = 0; i < usersId.length; i++) {
            data.append('users[]', usersId[i]);
        }

        editRole(token, uuid, data, EDIT_ROLE_WITH_USERS);
    };

    render() {
        const {editingRole} = this.props;
        const disableSaveButton = !this._formValid();

        return [
            <div className="bp3-dialog-body">
                <label className="bp3-label">
                    Users
                    <UsersMultiSelect
                        onChange={({value}) => this._handleInputChange('users', value)}
                        values={this.state.users}/>
                </label>
            </div>,
            <div className="bp3-dialog-footer">
                <div className="bp3-dialog-footer-actions">
                    <Button
                        disabled={disableSaveButton}
                        loading={editingRole}
                        intent={Intent.PRIMARY}
                        onClick={this._handleEditRole}
                        icon="tick"
                        text="save"
                    />
                </div>
            </div>
        ];
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        authUser: PropTypes.object.isRequired,
        OPERATION_FAILED: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        roles: PropTypes.array.isRequired,
        policies: PropTypes.array.isRequired,
        editRole: PropTypes.func.isRequired,
        editingRole: PropTypes.bool.isRequired,
    }
}

const mapStateTopProps = (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, roles, editingRole, policies}) => (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, roles, editingRole, policies});
const mapDispatchToProps = dispatch => bindActionCreators({editRole}, dispatch);

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(AddUsersToRole));