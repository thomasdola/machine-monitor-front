import React from 'react';
import {Button, Intent} from '@blueprintjs/core';
import Policies from "../../Common/filterRows/Policies";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addRole} from '../../../actions/roleActions';
import {isFormValid} from "../../../helpers";
import Toaster from "../../Common/Toaster";
import _isEqual from "lodash/isEqual";
import {ADD_ROLE} from "../../../helpers/constants";

class NewRole extends React.Component {

    state = {
        name: '',
        description: '',

        policies: []
    };

    componentDidUpdate(prevProps) {
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;
        const {OPERATION_SUCCESSFUL, OPERATION_FAILED, history} = this.props;

        const role = this.state.name.toUpperCase();

        if (!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)) {
            if (OPERATION_SUCCESSFUL.action === ADD_ROLE) {
                history.goBack();
                Toaster.show({
                    message: `${role} Successfully Added 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick'
                });
            }
        }

        if (!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)) {
            if (OPERATION_FAILED.action === ADD_ROLE) {
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Add ${role} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
        }
    }

    _handleInputChange = (name, value) => this.setState(() => ({...this.state, [name]: value}));

    _handleAddRole = () => {
        const {name, description, policies} = this.state;

        let pagesIds = policies.map(({gate: {id}}) => id);
        const policiesIds = policies.map(({id}) => id);

        let data = new FormData();

        for (let i = 0; i < pagesIds.length; i++) {
            data.append('pages[]', pagesIds[i]);
        }
        for (let i = 0; i < policiesIds.length; i++) {
            data.append('policies[]', policiesIds[i]);
        }
        data.append('name', name);
        data.append('description', description);

        this.props.addRole(data);
    };

    _isFormValid = () => {
        const {name, policies} = this.state;

        let required = {name, policies: policies.map(({id}) => id)};

        return isFormValid(required);
    };

    render() {
        const {addingRole} = this.props;

        const disableSaveButton = !this._isFormValid();

        return [
            <div className="bp3-dialog-body">
                <label className="bp3-label">
                    Name
                    <input
                        value={this.state.name || ''}
                        name={'name'}
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        className="bp3-input bp3-fill"
                        type="text" dir="auto"/>
                </label>
                <label className="bp3-label">
                    Policies
                    <Policies
                        onChange={({value}) => this._handleInputChange('policies', value)}
                        values={this.state.policies}/>
                </label>
                <label className="bp3-label">
                    Description
                    <textarea
                        name={'description'}
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        value={this.state.description}
                        className="bp3-input bp3-fill" dir="auto"/>
                </label>
            </div>,
            <div className="bp3-dialog-footer">
                <div className="bp3-dialog-footer-actions">
                    <Button
                        disabled={disableSaveButton}
                        loading={addingRole}
                        intent={Intent.PRIMARY}
                        onClick={this._handleAddRole}
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
        addRole: PropTypes.func.isRequired,
        addingRole: PropTypes.bool.isRequired
    };
}

const mapStateToProps = (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, addingRole}) => (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, addingRole});
const mapDispatchToProps = dispatch => bindActionCreators({addRole}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewRole);