import React from 'react';
import {Button, Intent} from '@blueprintjs/core';
import Pages from "../../Common/filterRows/Pages";
import Entities from "../../Common/filterRows/Entities";
import Actions from "../../Common/filterRows/Actions";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPolicy} from '../../../actions/policyActions';
import {isFormValid} from "../../../helpers";
import {ADD_POLICY} from "../../../helpers/constants";
import Toaster from "../../Common/Toaster";
import _isEqual from "lodash/isEqual";

class NewPolicy extends React.Component {

    state = {
        page: {},
        entity: {},
        actions: [],
        name: '',
        description: ''
    };

    componentDidUpdate(prevProps) {
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;
        const {OPERATION_SUCCESSFUL, OPERATION_FAILED, history} = this.props;

        const policy = this.state.name.toUpperCase();

        if (!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)) {
            if (OPERATION_SUCCESSFUL.action === ADD_POLICY) {
                history.goBack();
                Toaster.show({
                    message: `${policy} Successfully Added 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick'
                });
            }
        }

        if (!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)) {
            if (OPERATION_FAILED.action === ADD_POLICY) {
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Add ${policy} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
        }
    }

    _handleInputChange = (name, value) => {
        this.setState(() => {
            return {
                [name]: value
            };
        })
    };

    _handleAddPolicy = () => {
        const {name, entity: {id: entityId}, actions} = this.state;
        const actionsId = actions.map(({id}) => id);
        const {authUser: {token}} = this.props;

        let data = new FormData();
        data.append('name', name);
        data.append('entity_id', entityId);
        for (let i = 0; i < actionsId.length; i++) {
            data.append('actions[]', actionsId[i]);
        }

        this.props.addPolicy(token, data);
    };

    _isFormValid = () => {
        const {name, page: {id: pageId}, entity: {id: entityId}, actions} = this.state;
        return isFormValid({name, pageId, entityId, actions});
    };

    render() {
        const {page, actions, description, entity, name} = this.state;
        const {addingPolicy} = this.props;
        const disabledSaveButton = !this._isFormValid();
        return [
            <div className="bp3-dialog-body">
                <label className="bp3-label">
                    Name
                    <input
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        value={name || ''}
                        name={'name'}
                        className="bp3-input bp3-fill"
                        type="text" dir="auto"/>
                </label>
                <label className="bp3-label">
                    Page
                    <Pages
                        value={page || ''}
                        small={false}
                        onChange={({value}) => this._handleInputChange('gate', value)}/>
                </label>
                <label className="bp3-label">
                    Entity
                    <Entities
                        value={entity || ''}
                        small={false}
                        onChange={({value}) => this._handleInputChange('entity', value)}/>
                </label>
                <label className="bp3-label">
                    Actions
                    <Actions
                        onChange={({value}) => this._handleInputChange('actions', value)}
                        values={actions}/>
                </label>
                <label className="bp3-label">
                    Description
                    <textarea
                        name={'description'}
                        value={description || ''}
                        onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                        className="bp3-input bp3-fill" dir="auto"/>
                </label>
            </div>,
            <div className="bp3-dialog-footer">
                <div className="bp3-dialog-footer-actions">
                    <Button
                        disabled={disabledSaveButton}
                        loading={addingPolicy}
                        intent={Intent.PRIMARY}
                        onClick={this._handleAddPolicy}
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
        OPERATION_FAILED: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        addPolicy: PropTypes.func.isRequired,
        addingPolicy: PropTypes.bool.isRequired
    };
}

const mapStateToProps = (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, addingPolicy}) => (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, addingPolicy});
const mapDispatchToProps = dispatch => bindActionCreators({addPolicy}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewPolicy);