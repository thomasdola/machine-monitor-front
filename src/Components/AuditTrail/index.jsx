import React from 'react';
import {
    Button,
    ButtonGroup,
    Icon,
    Intent,
    Popover,
    PopoverInteractionKind,
    Spinner,
    Text,
    Tooltip
} from '@blueprintjs/core';
import Filters, {parseFilters} from "../Common/Filters";
import {DateTime as DateFilter} from "../Common/filterRows";
import {LogsTable} from './Table';
import {exportLogs, loadLogs} from '../../actions/AuditTrail';
import {browserDownload, serverDownload} from '../../actions/downloadActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import queryString from "query-string";
import {Link} from "react-router-dom";
import {parseSort} from "../Common/Table/helpers";
import _isEqual from "lodash/isEqual";
import _omit from "lodash/omit";
import {formatDateFilter} from "../Common/filterRows/Date";
import {DOWNLOAD_FILE, EXPORT_LOGS, OPERATION_SUCCESSFUL} from "../../helpers/constants";
import Toaster from "../Common/Toaster";
import {LOGS} from '../../api/constants/Pages';
import {LOG} from '../../api/constants/Entities';
import {EXPORT} from '../../api/constants/Actions';
import Can from "../../helpers/Can";
import format from "date-fns/format";
import {Operating} from "../Common/Operating";
import './index.css';

class Logs extends React.Component{

    constructor(props){
        super(props);

        this._onSortChange = this._onSortChange.bind(this);
        this._applyFilters = this._applyFilters.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._onPerPageChange = this._onPerPageChange.bind(this);
        this._handleExportLogs = this._handleExportLogs.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    state = {
        colSortDirs: {},
        filterRows: [
            {
                label: "Date",
                isExpanded: false,
                body: {
                    component: DateFilter,
                    props: { value: format(new Date(), 'X'), operator: 'lessThan', rightValue: format(new Date(), 'X')}
                }
            }
        ],
        filters: [],
        exportFilename: ''
    };

    componentDidMount(){
        const {loadLogs, location: {search}, authUser: {token}} = this.props;

        const params = queryString.parse(search);
        loadLogs(token, params);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const {location: {search: newSearch}} = nextProps;
        const {searchQuery, colSortDirs, filters} = prevState;
        const {q, f, s} = queryString.parse(newSearch);
        const newQuery = q || '';
        const newSorts = s ? parseSort(s) : {};
        const newFilters = f ? parseFilters(f) : [];

        if(_isEqual(searchQuery, q) && _isEqual(colSortDirs, newSorts)
            && _isEqual(filters, newFilters)){
            return null;
        }

        return {
            searchQuery: newQuery,
            colSortDirs: newSorts,
            filters: newFilters
        };
    }

    componentDidUpdate(prevProps){
        const {location: {search: oldSearch}, OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL,
            OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;
        const {location: {search: newSearch}, loadLogs, OPERATION_SUCCESSFUL, OPERATION_FAILED, authUser: {token}} = this.props;

        if(!_isEqual(queryString.parse(newSearch), queryString.parse(oldSearch))){
            const params = queryString.parse(newSearch);
            loadLogs(token, params);
        }

        if(!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)){
            const {action, data} = OPERATION_SUCCESSFUL;
            if(action === EXPORT_LOGS){
                Toaster.show({
                    message: "Logs Export Ready 😃",
                    timeout: 0,
                    intent: Intent.SUCCESS,
                    action: {
                        onClick: () => this._onDownloadLogs(data),
                        icon: 'cloud-download',
                        text: 'download'
                    },
                    icon: 'tick' });
            }

            if(action === DOWNLOAD_FILE){
                browserDownload(data, `${this.state.exportFilename}.pdf`);
            }
        }

        if(!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)){
            if(OPERATION_FAILED.action === EXPORT_LOGS){
                console.log(OPERATION_FAILED.data);
                Toaster.show({
                    message: "Operation Failed 😞",
                    intent: Intent.DANGER,
                    icon: 'error'
                });
            }
        }
    }

    _onDownloadLogs = ({path}) => {
        const {authUser: {token}, serverDownload} = this.props;
        serverDownload(token, {path})
    };

    _applyFilters(filters){
        const filtersString = filters.map(filter => {
            if(filter.label.startsWith('date')) return formatDateFilter(filter);
            return `${filter.label}|${filter.value}`;
        }).join();
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {f: filtersString});
        history.push(`/audit-trail?${queryString.stringify(params)}`);
    }

    _clearFilters(){
        const {location: {search}, history} = this.props;
        const params = _omit(queryString.parse(search), 'f');
        history.push(`/audit-trail?${queryString.stringify(params)}`);
    }

    _onSortChange(columnKey, sortDir){
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {s: `${columnKey}|${sortDir}`});
        history.push(`/audit-trail?${queryString.stringify(params)}`);
    }

    _onPerPageChange(value){
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {pp: value});
        history.push(`/audit-trail?${queryString.stringify(params)}`);
    }

    _onKeyPress({keyCode}){
        if(keyCode === 13){
            this._handleExportLogs();
        }
    }

    _handleExportLogs(){
        if(this.state.exportFilename.trim()){
            const {location: {search}, exportLogs, authUser: {token}} = this.props;
            const params = queryString.parse(search);
            exportLogs(token, {...params, filename: this.state.exportFilename});
        }
    }

    render(){
        const {loadingLogs, exportingLogs, logs, authUser, OPERATION_FAILED,
            logsPagination: {current_page: currentPage, per_page: perPage, total, total_pages: totalPages},
            location: {search}} = this.props;

        const exportActionAllowed = authUser.root ? true : Can.User(authUser).perform(EXPORT, LOG, LOGS);

        const nextPage = currentPage < totalPages;
        const prevPage = currentPage > 1;
        const nextPageSearch = queryString.stringify(Object.assign({}, queryString.parse(search), {p: currentPage + 1}));
        const prevPageSearch = queryString.stringify(Object.assign({}, queryString.parse(search), {p: currentPage - 1}));

        return <div className="logs__wrapper">

            <Operating
                content={"Exporting... 😃"}
                intent={Intent.NONE}
                on={exportingLogs || OPERATION_SUCCESSFUL.action === DOWNLOAD_FILE}/>

            <div className="logs__toolbar">

                <Filters
                    onClearClick={this._clearFilters}
                    onDoneClick={this._applyFilters}
                    filters={this.state.filters}
                    rows={this.state.filterRows}/>

                {(total && exportActionAllowed) ? (
                    <ButtonGroup>
                        <Popover
                            disabled={!total}
                            hasBackdrop
                            interactionKind={PopoverInteractionKind.CLICK}>
                            <Tooltip disabled={!total} content={'export'}>
                                <Button
                                    disabled={!total}
                                    intent={Intent.PRIMARY} icon="export"/>
                            </Tooltip>
                            <div style={{padding: 3}}>
                                <div style={{width: 350}} className="bp3-input-group">
                                    <input
                                        type="text"
                                        value={this.state.exportFilename || ''}
                                        onChange={({target: {value}}) => this.setState({exportFilename: value})}
                                        onKeyDown={this._onKeyPress}
                                        className="bp3-input"
                                        placeholder="Filename" />
                                    <Button
                                        loading={exportingLogs}
                                        intent={Intent.PRIMARY}
                                        onClick={this._handleExportLogs}
                                        icon={'tick'}
                                        className=""/>
                                </div>
                            </div>
                        </Popover>
                    </ButtonGroup>
                ) : null}

            </div>

            <div className="logs__content">
                <section>
                    <header>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {loadingLogs ? <Spinner className="bp3-small"/> : <Icon icon="history"/>}
                            <Text className="logs__text">
                                Logs <small className="bp3-text-muted">({total})</small>
                            </Text>
                        </div>

                        <div className="per-page__wrapper">
                            <div className="bp3-select bms-small">
                                <select value={perPage || ''}
                                        onChange={({target: {value}}) => this._onPerPageChange(Number.parseInt(value, 10))}>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                            <span>per page</span>
                        </div>

                        <div className="bp3-control-group bms-small">
                            <Link to={`/audit-trail/?${prevPageSearch}`}
                                  className={`bp3-button bp3-icon-chevron-left bp3-small ${!prevPage && 'bp3-disabled'}`}/>
                            <button className="bp3-button bp3-small bp3-minimal bp3-disabled">
                                {currentPage}
                            </button>
                            <Link to={`/audit-trail/?${nextPageSearch}`}
                                  className={`bp3-button bp3-icon-chevron-right bp3-small ${!nextPage && 'bp3-disabled'}`}/>
                        </div>

                    </header>
                    <section>
                        <LogsTable
                            data={logs}
                            onSortChange={this._onSortChange}
                            colSortDirs={this.state.colSortDirs}
                        />
                    </section>
                </section>

            </div>
        </div>
    }

    static propTypes = {
        authUser: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        logsPagination: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        OPERATION_FAILED: PropTypes.object.isRequired,

        loadLogs: PropTypes.func.isRequired,
        exportLogs: PropTypes.func.isRequired,
        serverDownload: PropTypes.func.isRequired,

        loadingLogs: PropTypes.bool.isRequired,
        exportingLogs: PropTypes.bool.isRequired,

        logs: PropTypes.array.isRequired,
    };
}

const mapStateToProps = (
    {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, systemLogsPagination, loadingSystemLogs, exportingSystemLogs, systemLogs}) => (
        {authUser, OPERATION_FAILED, OPERATION_SUCCESSFUL, logsPagination: systemLogsPagination,
            loadingLogs: loadingSystemLogs, exportingLogs: exportingSystemLogs, logs: systemLogs});

const mapDispatchToProps = dispatch => bindActionCreators({loadLogs, exportLogs, serverDownload}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Logs);