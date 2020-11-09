import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableModule from "../../../molecules/TableModule";

import { DEFAULT_STATUS, ALL, ACTIVE, SUSPENSION } from '../../../../constants/entites'
import { formatDateTime } from '../../../../commons/utils'
// REDUX
import Slug from '../../../atoms/Slug';
import FilterStatus from '../../../molecules/FilterStatus';
import StatusLabel from '../../../atoms/StatusLabel';
import { doFilters, getUpdateAction, doDelete } from '../../../../redux/reducers/postTypeReducer'

const headCells = [
    { id: "name", label: "Name" },
    { id: "total", label: "Total" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Status" }
];

const TableRowModule = ({ name, slugName, totalPost, createDate, updateDate, status }) => (
    <>
        <TableCell style={{ maxWidth: '230px' }}>
            <span>{name}</span>
            <Slug>{slugName}</Slug>
        </TableCell>
        <TableCell>{totalPost}</TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const LIST_STATUS = [
    { key: ALL, label: "All" },
    { key: ACTIVE, label: "Active" },
    { key: SUSPENSION, label: "Hidden" }
]

const Render = ({
    postTypeList, loading, filters,
    onChangeStatus,
    onOpenUpdate,
    onDelete
}) => (
    <TableModule
        loading={loading}
        selectKey="postTypeId"
        headCells={headCells}
        dataSources={filters.status === ALL ? postTypeList :
            postTypeList.filter(item => item.status === filters.status)
        }
        row={TableRowModule}
        onDelete={onDelete}
        onOpenUpdate={onOpenUpdate}
    >
        <FilterStatus
            statusValue={filters.status}
            listStatus={LIST_STATUS}
            onChangeStatus={onChangeStatus}
        />
    </TableModule>
)

export default function PostTypeTable() {
    const selector = useSelector(({
        postTypeReducer: { postTypeList, loading, filters } 
    }) => ({ postTypeList, loading, filters }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
        onOpenUpdate: postTypeId => dispatch(getUpdateAction(postTypeId)),
        onDelete: postTypeId => dispatch(doDelete(postTypeId)),
    }

    return <Render {...renderProps} />
}