import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { DEFAULT_STATUS } from '../../../../constants/entites'
import { formatDateTime } from '../../../../commons/utils';
import StatusLabel from '../../../atoms/StatusLabel';
import FilterStatus from '../../../molecules/FilterStatus';
import { TableCell } from '@material-ui/core';
import TableModule from '../../../molecules/TableModule';
import { getUpdateAction, doDelete } from '../../../../redux/reducers/userGroupReducer';
// REDUX

const listStatus = [
    { key: "", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "SUSPENSION", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
]

const headCells = [
    { id: "name", label: "Full Name" },
    { id: "totalUser", label: "Total User", align: "center" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Status" }
];

const TableRowModule = ({ name, totalUser, createDate, updateDate, status }) => (
    <>
        <TableCell>{name}</TableCell>
        <TableCell align="center">{totalUser}</TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const Render = ({
    userGroupList,
    loading,
    onOpenUpdate,
    onDelete
}) => (
    <TableModule
        loading={loading}
        selectKey="userGroupId"
        headCells={headCells}
        dataSources={userGroupList}
        row={TableRowModule}
        onDelete={onDelete}
        onOpenUpdate={onOpenUpdate}
    >
        <FilterStatus listStatus={listStatus} onChangeFilter />
    </TableModule>
)

const UserGroupTable = () => {
    const selector = useSelector(({
        userGroupReducer: { userGroupList, page, totalPage: totalPages, filters, loading } 
    }) => ({ userGroupList, loading, page, totalPages, filters }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onOpenUpdate: userGroupId => dispatch(getUpdateAction(userGroupId)),
        onDelete: userGroupId => dispatch(doDelete(userGroupId)),
    }

    return <Render {...renderProps} />
}

export default UserGroupTable