import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { DEFAULT_STATUS } from '../../../../constants/entites'
// REDUX
import FilterStatus from '../../../molecules/FilterStatus';
import { TableCell } from '@material-ui/core';
import TableModule from '../../../molecules/TableModule';
import StatusLabel from '../../../atoms/StatusLabel';
import { getUpdateAction, doDelete } from '../../../../redux/reducers/userReducer';

const listStatus = [
    { key: "", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "SUSPENSION", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
]

const headCells = [
    { id: "fullName", label: "Full Name" },
    { id: "phone", label: "Phone" },
    { id: "email", label: "Email" },
    { id: "userGroupName", label: "User Group" },
    { id: "status", label: "Status" }
];

const TableRowModule = ({ fullName, phone, email, userGroupName, status }) => (
    <>
        <TableCell>{fullName}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{userGroupName}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const Render = ({
    userList, loading,
    onOpenUpdate,
    onDelete
}) => (
    <TableModule
        selectKey="userId"
        loading={loading}
        headCells={headCells}
        dataSources={userList}
        row={TableRowModule}
        onOpenUpdate={onOpenUpdate}
        onDelete={onDelete}
    >
        <FilterStatus listStatus={listStatus} onChangeFilter />
    </TableModule>
)

export default function UserTable() {
    const selector = useSelector(({
        userReducer: { userList, page, totalPage: totalPages, filters, loading } 
    }) => ({ userList, loading, page, totalPages, filters }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onOpenUpdate: userId => dispatch(getUpdateAction(userId)),
        onDelete: userId => dispatch(doDelete(userId)),
    }

    return <Render {...renderProps} />
}