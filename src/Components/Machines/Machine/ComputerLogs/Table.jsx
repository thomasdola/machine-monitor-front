import React from 'react';
import Dimensions from 'react-dimensions';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {Intent, Tag} from "@blueprintjs/core";
import PropTypes from "prop-types";

class TableSection extends React.Component{

    render(){

        const {containerWidth, containerHeight, logs} = this.props;

        return (
            <Table
                className="table__wrapper"
                rowsCount={logs.length}
                rowHeight={45}
                headerHeight={35}
                width={containerWidth}
                height={containerHeight}>
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
        );
    }

    static propTypes = {
        logs: PropTypes.array.isRequired,
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

export default Dimensions()(TableSection);