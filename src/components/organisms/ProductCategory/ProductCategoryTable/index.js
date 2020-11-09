import React from 'react'
import { useDispatch } from 'react-redux'

import Slug from '../../../atoms/Slug';

import { DEFAULT_STATUS } from '../../../../constants/entites'
// REDUX
import {
    fetchWithPaginationAndFilter, getUpdateAction
} from '../../../../redux/reducers/productCategoryReducer';
import { formatDateTime } from '../../../../commons/utils';
import TableModule from '../../../molecules/TableModule';
import { TableCell, Chip } from '@material-ui/core';

const headCells = [
    { id: "name", label: "Name" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Create Date" }
];

const TableRowModule = ({ name, slugName, createDate, updateDate, status }) => (
    <>
        <TableCell>
            {name}
            <Slug>{slugName}</Slug>
        </TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <Chip
                style={{ color: "#fff", backgroundColor: DEFAULT_STATUS[status].color }}
                label={DEFAULT_STATUS[status].text} 
            />
        </TableCell>
    </>
);

const Render = ({
    dataSource, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {

    return (
        <TableModule
            headCells={headCells}
            dataSources={dataSource}
            row={TableRowModule}
        />
    )
}

const ProductCategoryTable = ({ loading, reload,
    dataSource = [], filters = {}, defaultActivePage, totalPages }) => {

    const dispatch = useDispatch();

    const renderProps = {
        dataSource,
        loading,
        defaultActivePage,
        totalPages,
        onChangePage: pageValue => dispatch(fetchWithPaginationAndFilter(filters, pageValue)),
        onChange: productCategoryId => dispatch(getUpdateAction(productCategoryId))
    }

    return <Render {...renderProps} />
}

export default ProductCategoryTable