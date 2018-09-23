import React from 'react';
import Dimensions from 'react-dimensions';
import {Cell, Column, Table} from 'fixed-data-table-2';
import {ActiveCell, TextCell} from '../../Common/Table/Cells';
import PropTypes from 'prop-types';
import '../../Table/index.css';


class TableSection extends React.Component {

    render(){
        const {containerWidth, containerHeight, data} = this.props;

        return (
            <Table
                className="table__wrapper"
                rowsCount={data.length}
                rowHeight={45}
                headerHeight={35}
                width={containerWidth}
                height={containerHeight}>

                <Column
                    columnKey="start_date"
                    header={<Cell className="table__header">Start Date</Cell>}
                    cell={<TextCell className="table__cell" data={data}/>}
                    width={400}
                />
                <Column
                    columnKey="end_date"
                    header={<Cell className="table__header">End Date</Cell>}
                    cell={<TextCell className="table__cell" data={data}/>}
                    width={400}
                />
                <Column
                    columnKey="printers"
                    header={<Cell className="table__header">Number of printers</Cell>}
                    cell={<TextCell className="table__cell" data={data}/>}
                    width={400}
                />
                <Column
                    columnKey="machines"
                    header={<Cell className="table__header">Number of MRWs</Cell>}
                    cell={<TextCell className="table__cell" data={data}/>}
                    width={400}
                />

                <Column
                    columnKey="status"
                    header={<Cell className="table__header">Status</Cell>}
                    cell={<ActiveCell className="table__cell" data={data}/>}
                    fixedRight={true}
                    width={70}
                />

            </Table>
        );
    }

    static propTypes = {
        data: PropTypes.array.isRequired
    };
}


export default Dimensions()(TableSection);