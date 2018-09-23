import React from 'react';
import {
    Card,
    FileInput,
    FormGroup,
    Icon,
    InputGroup,
    Radio,
    RadioGroup,
    Spinner,
    Text,
    Elevation,
    Intent, ButtonGroup, Button
} from '@blueprintjs/core';
import {District, Region} from "../Common/filterRows";
import queryString from "query-string";
import Filters, {parseFilters} from "../Common/Filters";
import {stringifyFilters} from "../Common/Search/helpers";
import {parseSort} from "../Common/Table/helpers";
import _isEqual from "lodash/isEqual";
import {ADD_CENTER, DELETE_CENTER, EDIT_CENTER} from "../../helpers/constants";
import {formatTimeFilter} from "../Common/filterRows/Time";
import _omit from "lodash/omit";
import _has from "lodash/has";
import {Search} from "../Common/Search";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {addCenter, deleteCenter, editCenter, loadCenters} from "../../actions/CentersActions";
import {connect} from "react-redux";
import './index.css';
import Can from "../../helpers/Can";
import {ADD} from "../../api/constants/Actions";
import {CENTER} from "../../api/constants/Entities";
import {CENTERS} from "../../api/constants/Pages";
import {CentersTable, DeploymentTable} from './Table';


class Centers extends React.Component{

    constructor(props){
        super(props);

        this._applyFilters = this._applyFilters.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._onSortChange = this._onSortChange.bind(this);
        this._onPerPageChange = this._onPerPageChange.bind(this);
        this._onSearchQueryChange = this._onSearchQueryChange.bind(this);
        this._onClearSearch = this._onClearSearch.bind(this);
        this._onSearch = this._onSearch.bind(this);
    }

    state = {
        colSortDirs: {},
        filterRows: [
            {
                label: "Region",
                isExpanded: false,
                body: {
                    component: Region,
                    props: { value: '' }
                }
            },
            {
                label: "District",
                isExpanded: false,
                body: {
                    component: District,
                    props: { value: '' }
                }
            }
        ],
        filters: [],
        searchQuery: '',
    };

    componentDidMount(){
        const {loadCenters, location: {search}, authUser: {token, root}} = this.props;
        let params = queryString.parse(search);

        const newFilters = params.f ? parseFilters(params.f) : [];

        params = root ? params : {...params, f: stringifyFilters(newFilters)};

        loadCenters(token, params);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const {location: {search: newSearch}} = nextProps;
        const {searchQuery, colSortDirs, filters} = prevState;
        const {q, f, s} = queryString.parse(newSearch);
        const newQuery = q || '';
        const newSorts = s ? parseSort(s) : {};
        const newFilters = f ? parseFilters(f) : [];

        if(_isEqual(searchQuery, q) && _isEqual(colSortDirs, newSorts) && _isEqual(filters, newFilters)){
            return null;
        }

        return {
            searchQuery: newQuery,
            colSortDirs: newSorts,
            filters: newFilters
        };
    }

    componentDidUpdate(prevProps){
        const {location: {search: oldSearch}} = prevProps;
        const {location: {search: newSearch}, loadCenters, authUser: {token}} = this.props;

        const params = queryString.parse(newSearch);
        if(!_isEqual(queryString.parse(newSearch), queryString.parse(oldSearch))){
            loadCenters(token, params);
        }

        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL} = prevProps;
        const {OPERATION_SUCCESSFUL} = this.props;

        if(!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)){
            const {action} = OPERATION_SUCCESSFUL;

            if(action === ADD_CENTER
                || action === EDIT_CENTER
                || action === DELETE_CENTER){
                loadCenters(token, params);
            }
        }
    }

    _applyFilters(filters){
        const filtersString = filters.map(filter => {
            if(filter.label.startsWith('clock')) return formatTimeFilter(filter);
            return `${filter.label}|${filter.value}`;
        }).join();
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {f: filtersString});
        history.push(`/centers?${queryString.stringify(params)}`);
    }

    _clearFilters(){
        const {location: {search}, history} = this.props;
        const params = _omit(queryString.parse(search), 'f');
        history.push(`/centers?${queryString.stringify(params)}`);
    }

    _onSortChange(columnKey, sortDir){
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {s: `${columnKey}|${sortDir}`});
        history.push(`/centers?${queryString.stringify(params)}`);
    }

    _onPerPageChange(value){
        const {location: {search}, history} = this.props;
        const params = Object.assign({}, queryString.parse(search), {pp: value});
        history.push(`/centers?${queryString.stringify(params)}`);
    }

    _onSearchQueryChange({target: {value}}){
        this.setState(() => ({searchQuery: value}));
    }

    _onSearch(){
        const {location: {search}} = this.props;
        const {searchQuery} = this.state;
        const params = Object.assign({}, queryString.parse(search), {q: searchQuery.trim()});
        searchQuery.trim() &&
        this.props.history.push(`/centers?${queryString.stringify(params)}`);
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

    render(){

        const {loadingCenters, centers,
            centersPagination: {current_page: currentPage, per_page: perPage, total, total_pages: totalPages},
            location: {search}, authUser} = this.props;

        const addActionAllowed = authUser.root ? true : Can.User(authUser).perform(ADD, CENTER, CENTERS);

        const nextPage = currentPage < totalPages;
        const prevPage = currentPage > 1;

        const nextPageSearch = queryString.stringify(Object.assign({}, queryString.parse(search), {p: currentPage + 1}));
        const prevPageSearch = queryString.stringify(Object.assign({}, queryString.parse(search), {p: currentPage - 1}));

        return (
            <div className="Centers__Page">

                <div className="centers__toolbar">
                    <Search
                        value={this.state.searchQuery || ''}
                        onQueryChange={this._onSearchQueryChange}
                        onQueryClear={this._onClearSearch}
                        onSearch={this._onSearch}/>

                    <Filters
                        rows={this.state.filterRows}
                        filters={this.state.filters}
                        onDoneClick={this._applyFilters}
                        onClearClick={this._clearFilters}/>

                    <Link
                        to="/centers/new"
                        className="bp3-button bp3-intent-primary bp3-icon-plus"/>

                </div>

                <div className="centers__content">
                    <Card className={"List"}>
                        <header className="Header">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {loadingCenters ? <Spinner className="bp3-small"/> : <Icon icon="map-marker"/>}
                                <Icon icon="blank"/>
                                <Text className="devices__text">
                                    Centers <small className="bp3-text-muted">({total})</small>
                                </Text>
                            </div>
                            <div className="per-page__wrapper">
                                <div className="bp3-select bms-small">
                                    <select value={perPage || ''}
                                            onChange={({target: {value}}) => this._onPerPageChange(Number.parseInt(value, 10))}>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                    </select>
                                </div>
                                <span>per page</span>
                            </div>

                            <div className="bp3-control-group bp3-small">
                                <Link to={`/centers/?${prevPageSearch}`}
                                      className={`bp3-button bp3-icon-chevron-left ${!prevPage && 'bp3-disabled'}`}/>
                                <button className="bp3-button bp3-small bp3-minimal bp3-disabled">
                                    {currentPage}
                                </button>
                                <Link to={`/centers/?${nextPageSearch}`}
                                      className={`bp3-button bp3-icon-chevron-right ${!nextPage && 'bp3-disabled'}`}/>
                            </div>
                        </header>
                        <div className="Table__Content">
                            <CentersTable data={centers}
                                          onSortChange={this._onSortChange}
                                          colSortDirs={this.state.colSortDirs}/>
                        </div>
                    </Card>
                    <Card className={"Details"}>
                        <header className="Header">
                            <span>Center Name</span>
                            <ButtonGroup>
                                <Button icon={"edit"} />
                                <Button icon={"trash"} intent={Intent.DANGER} />
                            </ButtonGroup>
                        </header>
                        <div className="Content">

                            <section className="Basics">
                                <header className="Header">Basic Information</header>
                                <section className="Content__Simple">

                                    <div className={'mm-input-group'}>
                                        <label className={"mm-label"} htmlFor={"name"}> Name </label>
                                        <InputGroup className={"mm-input"} value={"Center Name"} readonly={true} id="name" placeholder="Placeholder text" />
                                    </div>

                                    <div className={'mm-input-group'}>
                                        <label className={"mm-label"} htmlFor={"code"}> Code </label>
                                        <InputGroup className={"mm-input"} value={"Center Code"} readonly={true} id="code" placeholder="Placeholder text" />
                                    </div>

                                </section>
                            </section>

                            <section className="Location">
                                <header className="Header">Location</header>
                                <section className="Content__Simple">
                                    <div className={"Column"}>
                                        <div className={'mm-input-group'}>
                                            <label className={"mm-label"} htmlFor={"gpgps"}> Ghana Post GPS </label>
                                            <InputGroup className={"mm-input"}
                                                        id="gpgps"
                                                        placeholder="Placeholder text" />
                                        </div>

                                        <div className={'mm-input-group'}>
                                            <label className={"mm-label"} htmlFor={"long"}> Longitude </label>
                                            <InputGroup className={"mm-input"}
                                                        id="long"
                                                        placeholder="Placeholder text" />
                                        </div>

                                        <div className={'mm-input-group'}>
                                            <label className={"mm-label"} htmlFor={"lat"}> Latitude </label>
                                            <InputGroup className={"mm-input"}
                                                        id="lat"
                                                        placeholder="Placeholder text" />
                                        </div>

                                        <div className={'mm-input-group'}>
                                            <label className={"mm-label"} htmlFor={"sketch"}> Arrangement Sketch </label>
                                            <FileInput id={"sketch"}
                                                       className={"mm-input"}
                                                       text="Choose file..."
                                                       onInputChange={files => console.log(files)} />
                                        </div>
                                    </div>

                                    <div className="Column">
                                        <Card elevation={Elevation.ONE} className={"Location__Sketch__Preview"}>
                                            img
                                        </Card>
                                    </div>
                                </section>
                            </section>

                            <section className="Contact">
                                <header className="Header">Contact Person</header>
                                <section className="Content__Simple">
                                    <div className={'mm-input-group'}>
                                        <label className={"mm-label"} htmlFor={"contact-name"}> Full name </label>
                                        <InputGroup className={"mm-input"}
                                                    id="contact-name"
                                                    placeholder="Placeholder text" />
                                    </div>

                                    <div className={'mm-input-group'}>
                                        <label className={"mm-label"} htmlFor={"contact-number"}> Phone number </label>
                                        <InputGroup className={"mm-input"}
                                                    id="contact-number"
                                                    placeholder="Placeholder text" />
                                    </div>
                                </section>
                            </section>

                            <section className="Recommendations">
                                <header className="Header">Site survey recommendation</header>
                                <section className="Content__Simple">
                                    <div className="Column">

                                        <div className={'mm-input-group'}>
                                            <label className={"mm-label"} htmlFor={"preferred-network"}> Preferred Network </label>
                                            <InputGroup className={"mm-input"}
                                                        id="preferred-network"
                                                        placeholder="Placeholder text" />
                                        </div>
                                    </div>

                                    <div className="Column">
                                        <div className={'mm-input-group'}>
                                            <label className={"mm-label"} htmlFor={"backup-network"}> Backup Network </label>
                                            <InputGroup className={"mm-input"}
                                                        id="backup-network"
                                                        placeholder="Placeholder text" />
                                        </div>

                                        <FormGroup
                                            inline={true}
                                            label="Recommended for registration"
                                            labelFor="recommended"
                                        >
                                            <RadioGroup
                                                inline={true}
                                                onChange={e => console.log(e)}
                                                selectedValue={"1"}
                                            >
                                                <Radio label="Yes" value="1" />
                                                <Radio label="No" value="0" />
                                            </RadioGroup>
                                        </FormGroup>
                                    </div>
                                </section>
                            </section>

                            <Card elevation={Elevation.TWO} className="Deployment">
                                <header className="Header">
                                    <span>Deployment Information</span>

                                    <Link
                                        to="/centers/deployment/update"
                                        className="bp3-button bp3-intent-primary bp3-icon-plus"/>
                                </header>
                                <div className="Table__Content">
                                    <DeploymentTable data={[]}/>
                                </div>
                            </Card>

                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    static propTypes = {
        authUser: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,

        centersPagination: PropTypes.object.isRequired,

        loadCenters: PropTypes.func.isRequired,
        addCenter: PropTypes.func.isRequired,
        editCenter: PropTypes.func.isRequired,
        deleteCenter: PropTypes.func.isRequired,

        loadingCenters: PropTypes.bool.isRequired,
        addingCenter: PropTypes.bool.isRequired,
        editingCenter: PropTypes.bool.isRequired,
        deletingCenter: PropTypes.bool.isRequired,

        centers: PropTypes.array.isRequired
    };
}

const mapStateToProps = ({OPERATION_SUCCESSFUL, OPERATION_FAILED, centers, centersPagination, authUser, addingCenter,
                             editingCenter, loadingCenters, deletingCenter}) => ({OPERATION_SUCCESSFUL, OPERATION_FAILED,
    addingCenter, editingCenter, loadingCenters, authUser, deletingCenter, centers, centersPagination});
const mapDispatchToProps = dispatch => bindActionCreators({loadCenters, addCenter, editCenter, deleteCenter}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Centers));