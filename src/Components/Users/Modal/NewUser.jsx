import React from 'react';
import {Button, InputGroup, Intent} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUser} from '../../../actions/userActions';
import RolesSelect from "../Table/RolesSelect";
import {isFormValid} from "../../../helpers";
import Toaster from "../../Common/Toaster";
import {ADD_USER} from "../../../helpers/constants";
import _isEqual from "lodash/isEqual";

class NewUser extends React.Component{

    state = {
        name: '',
        username: '',
        role: '',
        password: '',
        passwordConfirmation: ''
    };

    componentDidUpdate(prevProps){
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;
        const {OPERATION_SUCCESSFUL, OPERATION_FAILED, history} = this.props;

        const user = this.state.name.toUpperCase();

        if(!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)){
            if(OPERATION_SUCCESSFUL.action === ADD_USER){
                history.goBack();
                Toaster.show({
                    message: `${user} Successfully Added 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick' });
            }
        }

        if(!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)){
            if(OPERATION_FAILED.action === ADD_USER){
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Add ${user} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
        }
    }

    _handleInputChange = (name, value) => {
        this.setState({[name]: value});
    };

    _handleAddUser = () => {
        const {addUser, authUser: {token}} = this.props;
        const {name, username, role, password} = this.state;

        let data = new FormData();

        data.append('full_name', name);
        data.append('username', username);
        data.append('password', password);
        data.append('role_id', role);

        addUser(token, data)
    };

    _isFormValid(){
        const {name, username, role, password, passwordConfirmation} = this.state;

        let required = {name, username, role, password, passwordConfirmation};

        return isFormValid(required) && _isEqual(password, passwordConfirmation);
    }

    render(){
        const {addingUser, roles} = this.props;
        const {name, role, username, password, passwordConfirmation} = this.state;
        const disableSaveButton = !this._isFormValid();

        return [
            <div className="bp3-dialog-body">
                <label className="bp3-label">
                    Full Name
                    <input
                        value={name}
                        name={'name'} onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        className="bp3-input bp3-fill" type="text" dir="auto" />
                </label>
                <label className="bp3-label">
                    Username
                    <input
                        value={username}
                        name={'username'} onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        className="bp3-input bp3-fill" dir="auto" />
                </label>
                <label className="bp3-label">
                    Role
                    <RolesSelect
                        small={false}
                        roles={roles}
                        onChange={({value}) => this._handleInputChange('role', value)}
                        value={role}/>
                </label>
                <label className="bp3-label">
                    Password
                    <InputGroup
                        name={'password'}
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        type={'password'}
                        required={true} value={password} placeholder={"Password"}/>
                </label>
                <label className="bp3-label">
                    Confirm Password
                    <InputGroup
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        type={'password'}
                        required={true} value={passwordConfirmation} placeholder={"Re-type Password"}/>
                </label>
            </div>,
            <div className="bp3-dialog-footer">
                <div className="bp3-dialog-footer-actions">
                    <Button
                        disabled={disableSaveButton}
                        loading={addingUser}
                        intent={Intent.PRIMARY}
                        onClick={this._handleAddUser}
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
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        OPERATION_FAILED: PropTypes.object.isRequired,
        addUser: PropTypes.func.isRequired,
        addingUser: PropTypes.bool.isRequired,
        roles: PropTypes.array.isRequired,
        policies: PropTypes.array.isRequired,
    };
}

const mapStateToProps = (
    {OPERATION_SUCCESSFUL, OPERATION_FAILED, addingUser, roles, policies, authUser}) => (
        {OPERATION_SUCCESSFUL, OPERATION_FAILED, addingUser, roles, policies, authUser});

const mapDispatchToProps = dispatch => bindActionCreators({addUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);