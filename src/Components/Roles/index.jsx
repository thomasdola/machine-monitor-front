import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ButtonGroup,
    Icon,
    Intent,
    Menu,
    MenuItem,
    Popover,
    Position,
    Spinner,
    Text,
    Tooltip
} from '@blueprintjs/core';
import {Link, Route} from 'react-router-dom';
import {AvailablePolicies, DefaultPolicies, RolesTable, UsersTable} from './Lists';
import {AddUsersDialog, EditPolicyDialog, EditRoleDialog, NewPolicyDialog, NewRoleDialog} from './Modals';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteRole, editRole, loadActions, loadEntities, loadPages, loadRoles} from '../../actions/roleActions';
import {loadUsers} from '../../actions/userActions';
import {deletePolicy, loadPolicies} from '../../actions/policyActions';
import queryString from "query-string";
import Filters, {parseFilters} from '../Common/Filters';
import {parseSort} from "../Common/Table/helpers";
import {Search} from "../Common/Search";
import Toaster from "../Common/Toaster";
import _omit from "lodash/omit";
import _isEqual from "lodash/isEqual";
import _has from "lodash/has";
import {
    ADD_POLICY,
    ADD_ROLE,
    DELETE_POLICY,
    DELETE_ROLE,
    EDIT_POLICY,
    EDIT_ROLE,
    EDIT_ROLE_WITH_POLICIES,
    EDIT_ROLE_WITH_USERS
} from "../../helpers/constants";
import {ConfirmAlert} from "../Common/ConfirmAlert";
import _differenceBy from 'lodash/differenceBy';
import _find from 'lodash/find';

import {ROLES} from '../../api/constants/Pages';
import {POLICY, ROLE} from '../../api/constants/Entities';
import {ADD, DELETE, EDIT} from '../../api/constants/Actions';
import Can from "../../helpers/Can";
import {stringifyFilters} from '../Common/Search/helpers';

import _includes from 'lodash/includes';
import _filter from 'lodash/filter';

import './index.css';

export const OPEN_POLICY = {DEFAULT: 0, AVAILABLE: 1};

class Roles extends React.Component{
    constructor(props){
        super(props);

        this._handleDeleteRoleCancel = this._handleDeleteRoleCancel.bind(this);
        this._handleDeleteRoleConfirm = this._handleDeleteRoleConfirm.bind(this);
        this._applyFilters = this._applyFilters.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._onPerPageChange = this._onPerPageChange.bind(this);
        this._onSearchQueryChange = this._onSearchQueryChange.bind(this);
        this._onClearSearch = this._onClearSearch.bind(this);
        this._onSearch = this._onSearch.bind(this);
        this._onSortChange = this._onSortChange.bind(this);
        this._onDeleteRole = this._onDeleteRole.bind(this);
        this._onDeletePolicy = this._onDeletePolicy.bind(this);
        this._onDenyUserOfRole = this._onDenyUserOfRole.bind(this);
        this._handleShowAllPolicies = this._handleShowAllPolicies.bind(this);
    }

    state = {
        filterRows: [],
        filters: [],
        searchQuery: '',
        colSortDirs: {},
        openPolicies: OPEN_POLICY.DEFAULT,
        viewUsers: false,
        confirmDeleteRole: false,

        selectedRole: {},
        rolePolicies: [],
        usersWithThisAccess: []
    };

    componentDidMount(){
        const {loadRoles, loadPolicies, location: {search}, authUser: {root, token}, loadUsers} = this.props;
        loadUsers(token, {});
        loadPolicies(token, {});

        let params = queryString.parse(search);

        let newFilters = params.f ? parseFilters(params.f) : [];

        params = root ? params : {...params, f: stringifyFilters(newFilters)};

        loadRoles(token, params);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const {location: {search: nextSearch}, roles: nextRoles, policies: nextPolicies, users: nextUsers} = nextProps;
        const {searchQuery: preSearchQuery, colSortDirs: prevColSortDirs, filters: prevFilters,
            selectedRole: prevSelectedRole, rolePolicies: prevRolePolicies, usersWithThisAccess: prevUsersWithThisAccess} = prevState;
        const {q, f, s, role: nextRole} = queryString.parse(nextSearch);
        const nextSearchQuery = q || '';
        const nextSorts = s ? parseSort(s) : {};
        let nextFilters = f ? parseFilters(f) : [];

        const nextSelectedRole = _find(nextRoles, {uuid: nextRole});

        const nextRolePolicies = _filter(nextPolicies, ({roles}) => {
            return _includes(roles, nextSelectedRole.id);
        });

        const nextUsersWithThisAccess = _filter(nextUsers, ({role}) => {
            return nextSelectedRole.id === role.id
        });

        if(_isEqual(preSearchQuery, q)
            && _isEqual(prevColSortDirs, nextSorts)
            && _isEqual(prevFilters, nextFilters)
            && _isEqual(nextSelectedRole, prevSelectedRole)
            && _isEqual(prevUsersWithThisAccess, nextUsersWithThisAccess)
            && _isEqual(prevRolePolicies, nextRolePolicies)){
            return null;
        }

        return {
            searchQuery: nextSearchQuery,
            colSortDirs: nextSorts,
            filters: nextFilters,
            selectedRole: {...nextSelectedRole},
            rolePolicies: nextRolePolicies,
            usersWithThisAccess: nextUsersWithThisAccess
        };
    }

    componentDidUpdate(prevProps, prevState){
        const {location: {search: prevSearch}, OPERATION_SUCCESSFUL: PREV_OPERATION_SUCCESSFUL,
            OPERATION_FAILED: PREV_OPERATION_FAILED} = prevProps;

        const { selectedRole: prevSelectedRole } = prevState;

        const {location: {search}, loadUsers, loadRoles, OPERATION_SUCCESSFUL,
            OPERATION_FAILED, loadPolicies, authUser: {token}} = this.props;

        const params = _omit(queryString.parse(search), 'role');
        const prevParams = _omit(queryString.parse(prevSearch), 'role');
        if(!_isEqual(params, prevParams)){
            loadRoles(params);
        }

        const {selectedRole} = this.state;

        if(!_isEqual(selectedRole, prevSelectedRole)){
            loadUsers(token, {});
        }

        const {name: role} = selectedRole;
        if(!_isEqual(PREV_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)){
            const {action} = OPERATION_SUCCESSFUL;

            if(action === DELETE_ROLE){
                Toaster.show({
                    message: `${role.toUpperCase()} Successfully Deleted 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick' });
            }

            if(action === DELETE_POLICY){
                Toaster.show({
                    message: `Policy Deleted Successfully 😃`,
                    intent: Intent.SUCCESS,
                    icon: 'tick' });
            }

            if(action === DELETE_ROLE
                || action === ADD_ROLE
                || action === EDIT_ROLE
                || action === EDIT_ROLE_WITH_POLICIES
                || action === EDIT_ROLE_WITH_USERS
            ){
                loadRoles(token, params);
            }

            if(action === DELETE_POLICY
                || action === ADD_POLICY
                || action === EDIT_POLICY
                || action === EDIT_ROLE_WITH_POLICIES
            ){
                loadPolicies(token, {});
            }

            if(action === EDIT_ROLE_WITH_USERS){
                loadUsers(token, {});
            }
        }

        if(!_isEqual(PREV_OPERATION_FAILED, OPERATION_FAILED)){
            if(OPERATION_FAILED.action === DELETE_ROLE){
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: `Could Not Delete ${role.toUpperCase()} 😞`,
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }

            if(!_isEqual(PREV_OPERATION_FAILED, OPERATION_FAILED)){
                if(OPERATION_FAILED.action === DELETE_POLICY){
                    console.log(OPERATION_FAILED.data);
                    Toaster.show({
                        message: `Could Not Delete Policy 😞`,
                        intent: Intent.DANGER,
                        icon: 'error'
                    });
                }
            }
        }
    }

    _handleShowAllPolicies(){
        const {location: {search}} = this.props;
        const parsedSearch = queryString.parse(search);
        if(_has(parsedSearch, 'role')){
            const params = _omit(parsedSearch, 'role');
            this.props.history.push(`?${queryString.stringify(params)}`);
        }
    }

    _onDenyUserOfRole({id}){
        const {selectedRole: {uuid}} = this.state;
        const {editRole, authUser: {token}} = this.props;
        let data = new FormData();
        const usersToBeRemoved = [id];
        for(let i = 0; i < usersToBeRemoved.length; i++){
            data.append('users[]', usersToBeRemoved[i]);
        }

        editRole(token, uuid, data, EDIT_ROLE_WITH_USERS);
    }

    _onDeleteRole(){
        const {deleteRole, authUser: {token}} = this.props;
        const {selectedRole: {uuid}} = this.state;
        deleteRole(token, uuid);
        this.setState({confirmDeleteRole: false});
    }

    _handleDeleteRoleCancel(){
        this.setState({deletePolicyAlert: false});
    }
    _handleDeleteRoleConfirm(){
        this.setState({deletePolicyAlert: false});
    }

    _applyFilters(filters){
        const filtersString = filters.map(filter => {
            return `${filter.label}|${filter.value}`;
        }).join();
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {f: filtersString});
        history.push(`/roles?${queryString.stringify(params)}`);
    }

    _clearFilters(){
        const {location: {search}, history} = this.props;
        const params = _omit(queryString.parse(search), 'f');
        history.push(`/roles?${queryString.stringify(params)}`);
    }

    _onSortChange(columnKey, sortDir){
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {s: `${columnKey}|${sortDir}`});
        history.push(`/roles?${queryString.stringify(params)}`);
    }

    _onPerPageChange(value){
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {pp: value});
        history.push(`/roles?${queryString.stringify(params)}`);
    }

    _onSearchQueryChange({target: {value}}){
        this.setState(() => ({searchQuery: value}));
    }

    _onClearSearch(){
        const {location: {search}} = this.props;
        const parsedSearch = queryString.parse(search);
        if(_has(parsedSearch, 'q')){
            const params = _omit(parsedSearch, 'q');
            this.props.history.push(`?${queryString.stringify(params)}`);
        }else{
            this.setState({searchQuery: ''});
        }
    }

    _onSearch(){
        const {location: {search}} = this.props;
        const {searchQuery} = this.state;
        const params = Object.assign({}, queryString.parse(search), {q: searchQuery.trim()});
        searchQuery.trim() &&
        this.props.history.push(`/roles?${queryString.stringify(params)}`);
    }

    _onDeletePolicy({uuid: policyUUID, id}){
        const {selectedRole: {uuid}} = this.state;
        const {deletePolicy, editRole, authUser: {token}} = this.props;
        if(!uuid){
            deletePolicy(token, policyUUID);
        }else{
            let data = new FormData();
            const policiesBeingRemoved = [id];
            for(let i = 0; i < policiesBeingRemoved.length; i++){
                data.append('policies[]', policiesBeingRemoved[i]);
            }
            editRole(token, uuid, data, EDIT_ROLE_WITH_POLICIES);
        }
    }

    render(){

        const {loadingRoles, loadingPolicies, loadingUsers, roles, policies, usersWithThisAccess, authUser,
            rolesPagination: {current_page: currentPage, per_page: perPage, total, total_pages: totalPages},
            location: {search}, usersWithoutAccess} = this.props;

        const addRoleActionAllowed = authUser.root ? true : Can.User(authUser).perform(ADD, ROLE, ROLES);
        const editRoleActionAllowed = authUser.root ? true : Can.User(authUser).perform(EDIT, ROLE, ROLES);
        const deleteRoleActionAllowed = authUser.root ? true : Can.User(authUser).perform(DELETE, ROLE, ROLES);

        const addPolicyActionAllowed = authUser.root ? true : Can.User(authUser).perform(ADD, POLICY, ROLES);
        const editPolicyActionAllowed = authUser.root ? true : Can.User(authUser).perform(EDIT, POLICY, ROLES);

        const {confirmDeleteRole, selectedRole, rolePolicies} = this.state;

        const nextPage = currentPage < totalPages;
        const prevPage = currentPage > 1;

        const queryParams = queryString.parse(search);
        const nextPageSearch = queryString.stringify(Object.assign({}, queryParams, {p: currentPage + 1}));
        const prevPageSearch = queryString.stringify(Object.assign({}, queryParams, {p: currentPage - 1}));

        const policiesToDisplay = selectedRole.uuid ? rolePolicies : policies;
        const availablePolicies = _differenceBy(policies, rolePolicies, 'id');

        const roleMenu = <Menu>
            <Link to={`/roles/${selectedRole.uuid}/edit${search}`}
                  className={`bp3-menu-item bp3-icon-standard bp3-icon-edit 
                  ${!editRoleActionAllowed ? 'bp3-disabled' : ''}`}>Edit Group</Link>
            <MenuItem
                disabled={!deleteRoleActionAllowed}
                onClick={() => this.setState({confirmDeleteRole: true})}
                intent={Intent.DANGER}
                icon={'trash'} text={'Delete Group'}/>
        </Menu>;

        return <div className="roles__wrapper">

            {addRoleActionAllowed && <Route path={`/roles/new`} component={NewRoleDialog}/>}
            {editRoleActionAllowed && <Route path={`/roles/:uuid/edit`} component={EditRoleDialog}/>}
            {addPolicyActionAllowed && <Route path={`/roles/policies/new`} component={NewPolicyDialog}/>}
            {editPolicyActionAllowed && <Route path={`/roles/policies/:uuid/edit`} component={EditPolicyDialog}/>}
            {editRoleActionAllowed && <Route path={`/roles/:uuid/users/new`} component={AddUsersDialog}/>}

            <ConfirmAlert
                open={confirmDeleteRole}
                intent={Intent.DANGER}
                onConfirm={this._onDeleteRole}
                onCancel={() => this.setState({confirmDeleteRole: false})} />

            <div className="roles__toolbar">
                <Search
                    value={this.state.searchQuery || ''}
                    onQueryChange={this._onSearchQueryChange}
                    onQueryClear={this._onClearSearch}
                    onSearch={this._onSearch}/>

                <Filters
                    onClearClick={this._clearFilters}
                    onDoneClick={this._applyFilters}
                    filters={this.state.filters}
                    rows={this.state.filterRows}/>

                <ButtonGroup large={false}>
                    {addPolicyActionAllowed && (
                        <Tooltip disabled={!addPolicyActionAllowed} position={Position.LEFT} content="new policy">
                            <Link 
                                to={`/roles/policies/new${search}`}
                                className={`bp3-button bp3-icon-layer bp3-intent-primary`}/>
                        </Tooltip>
                    )}
                    {addRoleActionAllowed && (
                        <Tooltip position={Position.LEFT} content="new role">
                            <Link
                                to={`/roles/new${search}`}
                                className={`bp3-button bp3-icon-plus bp3-intent-primary`}/>
                        </Tooltip>
                    )}
                </ButtonGroup>
            </div>

            <div className="roles__content">
                <div className="list">
                    <header>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {loadingRoles ? <Spinner className="bp3-small"/> : <Icon icon="key"/>}
                            <Text className="roles__text">
                                Roles <small className="bp3-text-muted">({total})</small>
                            </Text>
                        </div>

                        {(selectedRole.id && (
                            <div className="group__actions">
                                {(usersWithThisAccess.length > 0) || (usersWithoutAccess.length > 0) ? (
                                    <label className="bp3-control bp3-switch bp3-align-right view-users__toggle">
                                        <span style={{marginRight: 10}}>Users</span>
                                        <input
                                            checked={this.state.viewUsers}
                                            onChange={() => this.setState({viewUsers: !this.state.viewUsers})}
                                            type="checkbox" />
                                        <span className="bp3-control-indicator"/>
                                    </label>
                                ) : null}
                                <ButtonGroup>
                                    <Popover content={roleMenu}>
                                        <Button intent={Intent.PRIMARY} className="bp3-small" icon="more"/>
                                    </Popover>
                                </ButtonGroup>
                            </div>
                        ))}
                    </header>
                    <section className="table__section">
                        <RolesTable
                            data={roles}
                            onSortChange={sort => console.log(sort)}
                            colSortDirs={{}}/>
                    </section>
                    <footer>
                        <div className="per-page__wrapper">
                            <div className="bp3-select bp3-minimal bms-small">
                                <select value={perPage || ''}
                                        onChange={({target: {value}}) => this._onPerPageChange(Number.parseInt(value, 10))}>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                </select>
                            </div>
                            <span> per page</span>
                        </div>
                        <div className="bp3-control-group bp3-small">
                            <Link to={`/roles/?${prevPageSearch}`}
                                  className={`bp3-button bp3-icon-chevron-left ${!prevPage && 'bp3-disabled'}`}/>
                            <button className="bp3-button bp3-small bp3-minimal bp3-disabled">
                                {currentPage}
                            </button>
                            <Link to={`/roles/?${nextPageSearch}`}
                                  className={`bp3-button bp3-icon-chevron-right ${!nextPage && 'bp3-disabled'}`}/>
                        </div>

                    </footer>
                </div>
                <div className="single">
                    <header>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {loadingPolicies ? <Spinner className="bp3-small"/> : <Icon icon={'layers'}/>}
                            <span style={{marginLeft: 10}}>Policies
                                <small style={{marginLeft: 5}} className="bp3-text-muted">({policiesToDisplay.length})</small></span>
                            {selectedRole.uuid && (
                                <Text ellipsize style={{marginLeft: 5}}>
                                    <small className="bp3-text-muted">found in </small>
                                    {selectedRole.name} Group
                                </Text>
                            )}
                        </div>
                        {selectedRole.uuid && [
                            <ButtonGroup key="all-policies" className="bp3-small" large={false}>
                                <Tooltip content="all policies">
                                    <Button
                                        intent={Intent.NONE}
                                        className="bp3-small"
                                        onClick={this._handleShowAllPolicies}
                                        icon={'menu-closed'}/>
                                </Tooltip>
                            </ButtonGroup>,

                            editRoleActionAllowed && (
                                <ButtonGroup key="group-policies-editing" className="bp3-small" large={false}>
                                    <Tooltip
                                        disabled={this.state.openPolicies === OPEN_POLICY.AVAILABLE} content="add policy">
                                        <Button
                                            intent={Intent.PRIMARY}
                                            className="bp3-small"
                                            onClick={() => {
                                                const openPolicies = this.state.openPolicies === OPEN_POLICY.DEFAULT
                                                    ? OPEN_POLICY.AVAILABLE
                                                    : OPEN_POLICY.DEFAULT;

                                                this.setState({openPolicies})
                                            }}
                                            icon={this.state.openPolicies === OPEN_POLICY.DEFAULT ? 'plus' : 'undo'}/>
                                    </Tooltip>
                                </ButtonGroup>
                            )
                        ]}
                    </header>
                    <section>
                        <div className="policies">
                            <DefaultPolicies
                                selectedRole={selectedRole}
                                onDeletePolicy={this._onDeletePolicy}
                                open={this.state.openPolicies === OPEN_POLICY.DEFAULT}
                                data={policiesToDisplay}/>

                            <AvailablePolicies
                                selectedRole={selectedRole}
                                onDeletePolicy={this._onDeletePolicy}
                                open={this.state.openPolicies === OPEN_POLICY.AVAILABLE}
                                data={availablePolicies}/>
                        </div>
                        {selectedRole.uuid && this.state.viewUsers && (
                            <div className="users">
                                <div className="users-header">
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        {loadingUsers ? <Spinner className="bp3-small"/> : <Icon icon="people"/>}
                                        <span style={{marginLeft: 10}}>Users</span>
                                    </div>
                                    {usersWithoutAccess.length > 0 && editRoleActionAllowed ? (
                                        <ButtonGroup>
                                            <Tooltip disabled={usersWithoutAccess.length < 1} content="add user">
                                                <Link
                                                    to={`/roles/${selectedRole.uuid}/users/new${search}`}
                                                    className={`${usersWithoutAccess.length < 1 && 'bp3-disabled'}
                                                bp3-button bp3-intent-primary bp3-small bp3-icon-new-person`}/>
                                            </Tooltip>
                                        </ButtonGroup>
                                    ) : null}
                                </div>
                                <div className="users-section">
                                    <UsersTable
                                        onDelete={user => this._onDenyUserOfRole(user)}
                                        deleteAllowed={editRoleActionAllowed}
                                        data={usersWithThisAccess}/>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    }

    static propTypes = {
        authUser: PropTypes.object.isRequired,

        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,

        OPERATION_FAILED: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,

        loadRoles: PropTypes.func.isRequired,
        loadPolicies: PropTypes.func.isRequired,
        loadPages: PropTypes.func.isRequired,
        loadEntities: PropTypes.func.isRequired,
        loadActions: PropTypes.func.isRequired,
        loadUsers: PropTypes.func.isRequired,
        deleteRole: PropTypes.func.isRequired,
        deletePolicy: PropTypes.func.isRequired,
        editRole: PropTypes.func.isRequired,

        loadingUsers: PropTypes.bool.isRequired,
        loadingRoles: PropTypes.bool.isRequired,
        loadingPolicies: PropTypes.bool.isRequired,
        rolesPagination: PropTypes.object.isRequired,

        roles: PropTypes.array.isRequired,
        policies: PropTypes.array.isRequired,
        users: PropTypes.array.isRequired,
        usersWithoutAccess: PropTypes.array.isRequired,
    };
}

const mapStateToProps = (
    {OPERATION_FAILED, OPERATION_SUCCESSFUL, loadingUsers, loadingRoles, loadingPolicies, roles, policies, users,
    rolesPagination, authUser}) => (
    {OPERATION_FAILED, OPERATION_SUCCESSFUL, loadingPolicies, loadingUsers, policies, authUser,
    usersWithoutAccess: () => _filter(users, ({role}) => role === null),
    loadingRoles, users, roles, rolesPagination});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadPages, loadEntities, loadActions, loadRoles, loadPolicies, editRole, loadUsers, deleteRole, deletePolicy},
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Roles);