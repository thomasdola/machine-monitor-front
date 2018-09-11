import React from 'react';
import PropTypes from 'prop-types';
import {Classes, Dialog, Intent, ResizeSensor, Tag, Spinner} from '@blueprintjs/core';
import {Cell, Column, Table} from 'fixed-data-table-2';
import {withRouter} from 'react-router-dom';
import {loadMRWLogs} from '../../../../actions/MRWsActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dimensions from 'react-dimensions';
import "../../../Table/index.css";
import "./index.css";

const data = [
    {date: "12/12/2018", user: "NIATECH", action: "Log out"}
];

class Logs extends React.Component {

    state = {
        logsTableDimensions: {width: 460, height: 500}
    };

    componentDidMount(){
        const {match: {params: {mrw}}, loadMRWLogs} = this.props;
        loadMRWLogs(mrw, "name");
    }

    handleResize = (entries) => {
        const {logsTableDimensions} = this.state;
        entries.every(({contentRect: {width, height}}) => this.setState(
            {
                logsTableDimensions: {...logsTableDimensions, width, height}
            })
        );
    };

    render() {
        const {logsTableDimensions: {width, height}} = this.state;
        const {history, match: {params: {mrw}}, MRWLogs: {status, logs}, loadingLogs, loadingLogsFailed} = this.props;
        console.log(logs);
        return (
            <Dialog
                className="Logs"
                isOpen={true}
                icon="person"
                lazy
                canOutsideClickClose={false}
                canEscapeKeyClose={false}
                onClose={() => history.goBack()}
                title={`${mrw} Logs`}
            >
                <div className={`${Classes.DIALOG_BODY} LogsBody`}>
                    {
                        loadingLogs
                            ? (
                                <div className="loadingDiv"><Spinner/></div>
                            )
                            : loadingLogsFailed
                            ? (
                                <div className="power">
                                    <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                                </div>
                            )
                            : [
                                <div className="power" key={'power'}>
                                    {status !== undefined && (
                                        <Tag icon="power" large round intent={status === 'ON' ? Intent.SUCCESS : Intent.DANGER}>
                                            {status}
                                        </Tag>
                                    )}
                                </div>,

                                <ResizeSensor onResize={this.handleResize} key={'logs'}>
                                    <div className="LogsList" style={{width, height}}>
                                        <Table
                                            className="table__wrapper"
                                            rowsCount={data.length}
                                            rowHeight={45}
                                            headerHeight={35}
                                            width={width}
                                            height={height}>
                                            <Column
                                                columnKey="date"
                                                header={<Cell className="table__header">Date</Cell>}
                                                cell={<DateCell className="table__cell" data={logs}/>}
                                                width={150}
                                            />
                                            <Column
                                                columnKey="user"
                                                header={<Cell className="table__header">User</Cell>}
                                                cell={<UserCell className="table__cell" data={logs}/>}
                                                width={200}
                                            />
                                            <Column
                                                columnKey="action"
                                                header={<Cell className="table__header">Action</Cell>}
                                                cell={<ActionCell className="table__cell" data={logs}/>}
                                                width={100}
                                                fixedRight
                                            />
                                        </Table>
                                    </div>
                                </ResizeSensor>
                            ]
                    }

                </div>
            </Dialog>
        );
    }

    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        loadingLogsFailed: PropTypes.bool.isRequired,
        MRWLogs: PropTypes.object.isRequired,
        loadingLogs: PropTypes.bool.isRequired,
        loadMRWLogs: PropTypes.func.isRequired,
    }
}

class UserCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        const value = data[rowIndex][columnKey];
        return (
            <Cell {...props}>
                <Tag minimal intent={Intent.NONE}><span>{value}</span></Tag>
            </Cell>
        );
    }
}

class ActionCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        const value = data[rowIndex][columnKey];
        return (
            <Cell {...props}>
                <Tag minimal intent={value.includes('Out') ? Intent.DANGER : Intent.SUCCESS}><span>{value}</span></Tag>
            </Cell>
        );
    }
}

class DateCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        const value = data[rowIndex][columnKey];
        return (
            <Cell {...props}>
                <Tag minimal intent={Intent.NONE}><span>{value}</span></Tag>
            </Cell>
        );
    }
}

const mapStateToProps = ({loadingLogs, MRWLogs, loadingLogsFailed}) => ({loadingLogs, MRWLogs, loadingLogsFailed});
const mapDispatchToProps = dispatch => bindActionCreators({loadMRWLogs}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((Logs)));