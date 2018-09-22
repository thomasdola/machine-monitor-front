import React from 'react';
import {Button, Intent} from '@blueprintjs/core';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteUser, editUser} from '../../../actions/userActions';
import _isEqual from 'lodash/isEqual';
import RolesSelect from "../Table/RolesSelect";
import {USERS} from "../../../api/constants/Pages";
import {DELETE, EDIT} from "../../../api/constants/Actions";
import _find from 'lodash/find';
import {USER} from "../../../api/constants/Entities";
import {isFormValid} from "../../../helpers";
import {ConfirmAlert} from "../../Common/ConfirmAlert";
import {DELETE_USER, EDIT_USER} from "../../../helpers/constants";
import Toaster from "../../Common/Toaster";
import Can from "../../../helpers/Can";

class ViewUser extends React.Component{

    constructor(props){
        super(props);

        this._handleEditUser = this._handleEditUser.bind(this);
        this._handleDeleteUser = this._handleDeleteUser.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleBlockUser = this._handleBlockUser.bind(this);
    }

    state = {
        user: {},
        userBuffer: {},
        userRaw: {},
        confirmDelete: false
    };

    static getDerivedStateFromProps(nextProps, prevState){
        const {userRaw: oldUserRaw} = prevState;
        const {users, match: {params: {uuid}}} = nextProps;
        let userRaw = _find(users, {uuid}) || {role: {}};
        const user = {...userRaw, role: userRaw.role ? userRaw.role.id : null};

        if(_isEqual(oldUserRaw, userRaw))
            return null;

        return {user: user, userBuffer: {...user}, userRaw};
    }

    componentDidUpdate(prevProps){
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;
        const {OPERATION_SUCCESSFUL, OPERATION_FAILED, history} = this.props;

        if(!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)){
            const user = this.state.user.name.toUpperCase();
            if(OPERATION_SUCCESSFUL.action === EDIT_USER){
                history.goBack();
                Toaster.show({
                    message: `${user} Successfully Updated 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick' });
            }

            if(OPERATION_SUCCESSFUL.action === DELETE_USER){
                history.goBack();
                Toaster.show({
                    message: `${user} Successfully Deleted 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick' });
            }
        }

        if(!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)){
            const user = this.state.user.name.toUpperCase();
            if(OPERATION_FAILED.action === EDIT_USER){
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Update ${user} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
            if(OPERATION_FAILED.action === DELETE_USER){
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Delete ${user} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
        }
    }

    _handleInputChange(name, value){
        this.setState(() => {
            return {
                user: {...this.state.user, [name]: value}
            }
        });
    }

    _handleBlockUser(){}

    _handleDeleteUser(){
        this.props.deleteUser(this.state.user.uuid);
        this.setState({confirmDelete: false})
    }

    _handleEditUser(){
        const {editUser, authUser: {token}} = this.props;
        const {user: {name, username, role, status}, userRaw: {uuid}} = this.state;

        let data = new FormData();

        data.append('full_name', name);
        data.append('username', username);
        data.append('role_id', role);
        const active = status === "active" ? "1" : "0";
        data.append('status', active);

        editUser(token, uuid, data);
    }

    _isFormValid(){
        const {user: {name, username, role}} = this.state;

        let required = {name, username, role};

        return isFormValid(required);
    }

    render(){
        const {history, editingUser, roles, deletingUser, authUser} = this.props;
        const {user: {name, username, role, status}, userBuffer, user, confirmDelete, userRaw} = this.state;
        const disableSaveButton = !this._isFormValid() || _isEqual(user, userBuffer);
        const userNotFound = !userRaw.uuid;

        const editActionAllowed = authUser.root ? true : Can.User(authUser).perform(EDIT, USER, USERS);
        const deleteActionAllowed = authUser.root ? true : Can.User(authUser).perform(DELETE, USER, USERS);

        return [
            <div className="bp3-dialog-body">

                <ConfirmAlert
                    open={confirmDelete}
                    intent={Intent.DANGER}
                    onConfirm={this._handleDeleteUser}
                    onCancel={() => this.setState({confirmDelete: false})} />

                <label className="bp3-label">
                    Full Name
                    <input
                        value={name || ''}
                        name={'name'} onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        className="bp3-input bp3-fill" type="text" dir="auto" />
                </label>
                <label className="bp3-label">
                    Username
                    <input
                        value={username || ''}
                        name={'username'} onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        className="bp3-input bp3-fill" type="email" dir="auto" />
                </label>
                <label className="bp3-label">
                    Role
                    <RolesSelect
                        small={false}
                        roles={roles}
                        onChange={({value}) => this._handleInputChange('role', value)}
                        value={role || ''}/>
                </label>
                <label style={{display: 'flex', marginRight: 0}} className="bp3-control bp3-inline bp3-align-right bp3-switch">
                    <input
                        name={'status'}
                        checked={status === 'active'}
                        onChange={({target: {name}}) => this._handleInputChange(name, status === 'active' ? 'inactive' : 'active')}
                        type="checkbox" />
                    <span className="bp3-control-indicator"/>
                    <span>Active</span>
                </label>
            </div>,
            <div className="bp3-dialog-footer">
                <div className="bp3-dialog-footer-actions">
                    {userNotFound && (
                        <Button
                            intent={Intent.PRIMARY}
                            onClick={() => history.goBack()}
                            icon="undo"
                            text="Go Back"
                        />
                    )}
                    <Button
                        disabled={deletingUser || editingUser || userNotFound || !deleteActionAllowed}
                        loading={deletingUser}
                        onClick={() => this.setState({confirmDelete: true})}
                        intent={Intent.DANGER}
                        text={'delete'}
                        icon="trash" />
                    <Button
                        disabled={disableSaveButton || deletingUser || userNotFound || !editActionAllowed}
                        loading={editingUser}
                        intent={Intent.PRIMARY}
                        onClick={this._handleEditUser}
                        icon="tick"
                        text="save"
                    />
                </div>
            </div>
        ];
    }

    static propTypes = {
        history: PropTypes.object.isRequired,
        authUser: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        OPERATION_FAILED: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        editUser: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        editingUser: PropTypes.bool.isRequired,
        deletingUser: PropTypes.bool.isRequired,
        roles: PropTypes.array.isRequired,
        users: PropTypes.array.isRequired,
        policies: PropTypes.array.isRequired
    };
}

const mapStateToProps = (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, editingUser, deletingUser, roles, policies, users}) => (
        {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, editingUser, deletingUser, roles, policies, users});
const mapDispatchToProps = dispatch => bindActionCreators({deleteUser, editUser}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewUser));