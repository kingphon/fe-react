import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableModule from "../../../../molecules/TableModule";
import { PROMOTION_STATUS, ALL, STOP, UNAVAILABLE, AVAILABLE } from '../../../../../constants/entites'
import { formatDateTime } from '../../../../../commons/utils'
// REDUX
import FilterStatus from '../../../../molecules/FilterStatus';
import StatusLabel from '../../../../atoms/StatusLabel';
import { doFilters, getUpdateAction, doDelete } from '../../../../../redux/reducers/Location/zoneReducer'
const headCells = [
    { id: "zoneName", label: "Zone Name" },
    { id: "zoneSlugName", label: "Zone Slug Name" },
    { id: "districtId", label: "District Id" },
];

const TableRowModule = ({ zoneName, zoneSlugName, districtId }) => (
    <>
        <TableCell>
            <span>{zoneName}</span>
        </TableCell>
        <TableCell>
            <span>{zoneSlugName}</span>
        </TableCell>
        <TableCell>
            <span>{districtId}</span>
        </TableCell>
    </>
)



const Render = ({
    zoneList,
    loading,
    onOpenUpdate,
    onDelete
}) => (
        <TableModule
            loading={loading}
            selectKey="zoneId"
            headCells={headCells}
            dataSources={zoneList}
            row={TableRowModule}
            onDelete={onDelete}
            onOpenUpdate={zoneId => onOpenUpdate(zoneId)}
        >
        </TableModule>
    )

export default function ZoneTable() {
    const selector = useSelector(({
        zoneReducer: { zoneList, loading }
    }) => ({ zoneList, loading }), shallowEqual)

    useEffect(() => {
        console.log(selector.zoneList)
    }, [selector.zoneList])

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onOpenUpdate: zoneId => dispatch(getUpdateAction(zoneId)),
        onDelete: zoneId => dispatch(doDelete(zoneId)),
    }

    return <Render {...renderProps} />
}