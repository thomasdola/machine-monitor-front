import React from 'react';
import Dimensions from 'react-dimensions';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {TextCell, UserLinkCell, ActiveCell, UserRoleCell, SortHeaderCell} from '../../Common/Table/Cells';
import PropTypes from 'prop-types';
import '../../Table/index.css';


class TableSection extends React.Component {

    render(){
        const {containerWidth, containerHeight, onSortChange, colSortDirs, data} = this.props;
        const sortAscIcon = "sort-alphabetical";
        const sortDescIcon = "sort-alphabetical-desc";

        return (
            <Table
                className="table__wrapper"
                rowsCount={data.length}
                rowHeight={45}
                headerHeight={35}
                width={containerWidth}
                height={containerHeight}>

                <Column
                    columnKey="name"
                    header={
                        <SortHeaderCell
                            descIcon={sortDescIcon}
                            ascIcon={sortAscIcon}
                            className="table__header table__sort__header"
                            onSortChange={onSortChange}
                            sortDir={colSortDirs.name}>
                            Center Name
                        </SortHeaderCell>
                    }
                    cell={<TextCell className="table__cell" data={data}/>}
                    width={400}
                />
                <Column
                    columnKey="username"
                    header={<Cell className="table__header">Center Code</Cell>}
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
        data: PropTypes.array.isRequired,
        onSortChange: PropTypes.func.isRequired,
        colSortDirs: PropTypes.object.isRequired
    };
}


export default Dimensions()(TableSection);