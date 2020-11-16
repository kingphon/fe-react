import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableModule from "../../../../molecules/TableModule";
import { PROMOTION_STATUS, ALL, STOP, UNAVAILABLE, AVAILABLE } from '../../../../../constants/entites'
import { formatDateTime } from '../../../../../commons/utils'
// REDUX
import FilterStatus from '../../../../molecules/FilterStatus';
import StatusLabel from '../../../../atoms/StatusLabel';
import { doFilters, getUpdateAction, doDelete } from '../../../../../redux/reducers/Location/districtReducer'
const headCells = [
    { id: "districtName", label: "District Name" },
    { id: "districtSlugName", label: "District Slug Name" },
    { id: "provinceId", label: "Province Id" },
];

const TableRowModule = ({ districtName, districtSlugName, provinceId }) => (
    <>
        <TableCell>
            <span>{districtName}</span>
        </TableCell>
        <TableCell>
            <span>{districtSlugName}</span>
        </TableCell>
        <TableCell>
            <span>{provinceId}</span>
        </TableCell>
    </>
)



const Render = ({
    districtList,
    loading,
    onOpenUpdate,
    onDelete
}) => (
        <TableModule
            loading={loading}
            selectKey="districtId"
            headCells={headCells}
            dataSources={districtList}
            row={TableRowModule}
            onDelete={onDelete}
            onOpenUpdate={districtId => onOpenUpdate(districtId)}
        >
        </TableModule>
    )

export default function DistrictTable() {
    const selector = useSelector(({
        districtReducer: { districtList, loading }
    }) => ({ districtList, loading }), shallowEqual)

    useEffect(() => {
        console.log(selector.districtList)
    }, [selector.districtList])

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onOpenUpdate: districtId => dispatch(getUpdateAction(districtId)),
        onDelete: districtId => dispatch(doDelete(districtId)),
    }

    return <Render {...renderProps} />
}