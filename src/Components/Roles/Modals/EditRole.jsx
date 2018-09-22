import React from 'react';
import PropTypes from 'prop-types';
import {Button, Intent} from '@blueprintjs/core';
import {withRouter} from 'react-router-dom';
import _find from 'lodash/find';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editRole} from '../../../actions/roleActions';
import _isEqual from 'lodash/isEqual';
import {isFormValid} from "../../../helpers";
import {EDIT_ROLE} from "../../../helpers/constants";
import Toaster from "../../Common/Toaster";

class EditRole extends React.Component {

    state = {
        role: {level: {type: '', id: ''}, name: '', description: '', policies: []},
        roleBuffer: {},

        name: '',
        description: '',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {role: oldRole} = prevState;
        const {roles, match: {params: {uuid}}} = nextProps;
        let role = _find(roles, {uuid});

        if (_isEqual(oldRole, role))
            return null;

        const {name, description} = role;

        return {
            role,
            roleBuffer: {
                name,
                description
            },
            name,
            description
        };
    }

    componentDidUpdate(prevProps) {
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;
        const {OPERATION_SUCCESSFUL, OPERATION_FAILED, history} = this.props;

        const role = this.state.role.name && this.state.role.name.toUpperCase();

        if (!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)) {
            if (OPERATION_SUCCESSFUL.action === EDIT_ROLE) {
                history.goBack();
                Toaster.show({
                    message: `Role Successfully Updated 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick'
                });
            }
        }

        if (!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)) {
            if (OPERATION_FAILED.action === EDIT_ROLE) {
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Update ${role} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
        }
    }

    _isFormValid = () => {
        const {role: {name}} = this.state;
        return isFormValid({name});
    };

    _handleInputChange = (name, value) => {
        this.setState(() => ({...this.state, [name]: value}));
    };

    _handleEditRole = () => {
        const {name, description, role: {uuid}} = this.state;

        let data = new FormData();
        data.append('name', name);
        data.append('description', description);

        this.props.editRole(this.props.authUser.token, uuid, data);
    };

    render() {

        const {roleBuffer, name, description} = this.state;
        const {editingRole} = this.props;

        const disabledSaveButton = !this._isFormValid()
            || _isEqual({name, description}, roleBuffer);

        return [
            <div className="pt-dialog-body">
                <label className="pt-label">
                    Name
                    <input
                        value={name || ''}
                        name={'name'}
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        className="pt-input pt-fill"
                        type="text" dir="auto"/>
                </label>
                <label className="pt-label">
                    Description
                    <textarea
                        name={'description'}
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        value={description}
                        className="pt-input pt-fill" dir="auto"/>
                </label>
            </div>,
            <div className="pt-dialog-footer">
                <div className="pt-dialog-footer-actions">
                    <Button
                        disabled={disabledSaveButton}
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
        authUser: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        OPERATION_FAILED: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        roles: PropTypes.array.isRequired,
        editRole: PropTypes.func.isRequired,
        editingRole: PropTypes.bool.isRequired,
    }
}

const mapStateTopProps = (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, roles, editingRole}) => (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, roles, editingRole});
const mapDispatchToProps = dispatch => bindActionCreators({editRole}, dispatch);

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(EditRole));