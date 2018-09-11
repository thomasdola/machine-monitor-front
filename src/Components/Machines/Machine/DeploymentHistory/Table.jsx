import React from 'react';
import Dimensions from 'react-dimensions';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {Intent, Tag, Text} from "@blueprintjs/core";
import PropTypes from "prop-types";

class TableSection extends React.Component{

    render(){

        const {containerWidth, containerHeight, deployments: history} = this.props;

        return (
            <Table
                className="table__wrapper"
                rowsCount={history.length}
                rowHeight={45}
                headerHeight={35}
                width={containerWidth}
                height={containerHeight}>
                <Column
                    columnKey="center"
                    header={<Cell className="table__header">Center</Cell>}
                    cell={<UserCell className="table__cell" data={history}/>}
                    width={300}
                />
                <Column
                    columnKey="start_date"
                    header={<Cell className="table__header">Start Date</Cell>}
                    cell={<StartDateCell className="table__cell" data={history}/>}
                    fixedRight={true}
                    width={125}
                />
                <Column
                    columnKey="end_date"
                    header={<Cell className="table__header">End Date</Cell>}
                    cell={<EndDateCell className="table__cell" data={history}/>}
                    fixedRight={true}
                    width={125}
                />
            </Table>
        );
    }

    static propTypes = {
        deployments: PropTypes.array.isRequired,
    }
}

class UserCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        const value = data[rowIndex][columnKey];
        return (
            <Cell {...props}>
                <Tag minimal intent={Intent.NONE}><span>
                    <Text ellipsize={true}>
                        {value}
                    </Text>
                </span></Tag>
            </Cell>
        );
    }
}

class EndDateCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        const value = data[rowIndex][columnKey];
        return (
            <Cell {...props}>
                <Tag minimal intent={Intent.DANGER}><span>{value}</span></Tag>
            </Cell>
        );
    }
}

class StartDateCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        const value = data[rowIndex][columnKey];
        return (
            <Cell {...props}>
                <Tag minimal intent={Intent.SUCCESS}><span>{value}</span></Tag>
            </Cell>
        );
    }
}

export default Dimensions()(TableSection);