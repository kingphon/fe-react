import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableModule from "../../../../molecules/TableModule";
import { PROMOTION_STATUS, ALL, STOP, UNAVAILABLE, AVAILABLE } from '../../../../../constants/entites'
import { formatDateTime } from '../../../../../commons/utils'
// REDUX
import FilterStatus from '../../../../molecules/FilterStatus';
import StatusLabel from '../../../../atoms/StatusLabel';
import { doFilters, getUpdateAction, doDelete } from '../../../../../redux/reducers/Location/provinceReducer'
const headCells = [
    { id: "provinceName", label: "Province Name" },
    { id: "provinceSlugName", label: "Province Slug Name" },
];

const TableRowModule = ({ provinceName, provinceSlugName }) => (
    <>
        <TableCell>
            <span>{provinceName}</span>
        </TableCell>
        <TableCell>
            <span>{provinceSlugName}</span>
        </TableCell>
    </>
)



const Render = ({
    provinceList, 
    loading,
    onOpenUpdate,
    onDelete
}) => (
        <TableModule
            loading={loading}
            selectKey="provinceId"
            headCells={headCells}
            dataSources={provinceList}
            row={TableRowModule}
            onDelete={onDelete}
            onOpenUpdate={provinceId => onOpenUpdate(provinceId)}
        >
        </TableModule>
    )

export default function ProvinceTable() {
    const selector = useSelector(({
        provinceReducer: { provinceList, loading }
    }) => ({ provinceList, loading }), shallowEqual)

    useEffect(() => {
        console.log(selector.provinceList)
    }, [selector.provinceList])

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onOpenUpdate: provinceId => dispatch(getUpdateAction(provinceId)),
        onDelete: provinceId => dispatch(doDelete(provinceId)),
    }

    return <Render {...renderProps} />
}