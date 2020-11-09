import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableModule from "../../../molecules/TableModule";
import { PROMOTION_STATUS, ALL, STOP, UNAVAILABLE, AVAILABLE } from '../../../../constants/entites'
import { formatDateTime } from '../../../../commons/utils'
// REDUX
import FilterStatus from '../../../molecules/FilterStatus';
import StatusLabel from '../../../atoms/StatusLabel';
import { doFilters, getUpdateAction, doDelete } from '../../../../redux/reducers/promotionReducer'
const headCells = [
    { id: "promotionName", label: "Promotion Name" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "percent", label: "%" },
    { id: "listProductId", label: "Products Applied" },
    { id: "promotionCodes", label: "Promotion Codes" },
    { id: "promotionDetails", label: "Promotion Details" },
    { id: "status", label: "Status" }
];

const TableRowModule = ({ promotionName, startDate, endDate, percent, listProductId, promotionCodes, status }) => (
    <>
        <TableCell style={{ maxWidth: '230px' }}>
            <span>{promotionName}</span>
        </TableCell>
        <TableCell>{formatDateTime(startDate)}</TableCell>
        <TableCell>{formatDateTime(endDate)}</TableCell>
        <TableCell>{percent}</TableCell>
        <TableCell>{listProductId.length}</TableCell>
        <TableCell>{promotionCodes.map((code, index) => <p key={index}>{ code.code }</p>)}</TableCell>
        <TableCell>{promotionCodes.map((code, index) => <p key={index}>{ code.percent }% | { code.quantity }</p>)}</TableCell>
        <TableCell>
            <StatusLabel {...PROMOTION_STATUS[status]} />
        </TableCell>
    </>
)

const LIST_STATUS = [
    { key: ALL, label: "All" },
    { key: UNAVAILABLE, label: "Unavailable" },
    { key: AVAILABLE, label: "Available" },
    { key: STOP, label: "Stop" }
]

const Render = ({
    promotionList, loading, filters,
    onChangeStatus,
    onOpenUpdate,
    onDelete
}) => (
    <TableModule
        loading={loading}
        selectKey="promotionId"
        headCells={headCells}
        dataSources={filters.status == ALL ? promotionList :
            promotionList.filter(item => item.status == filters.status)
        }
        row={TableRowModule}
        onDelete={onDelete}
        onOpenUpdate={promotionId => onOpenUpdate(promotionId)}
    >
        <FilterStatus
            statusValue={filters.status}
            listStatus={LIST_STATUS}
            onChangeStatus={onChangeStatus}
        />
    </TableModule> 
)

export default function PromotionTable() {
    const selector = useSelector(({
        promotionReducer: { promotionList, loading, filters } 
    }) => ({ promotionList, loading, filters }), shallowEqual)

    useEffect(() => {
        console.log(selector.promotionList)
    }, [selector.promotionList])

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
        onOpenUpdate: promotionId => dispatch(getUpdateAction(promotionId)),
        onDelete: promotionId => dispatch(doDelete(promotionId)),
    }

    return <Render {...renderProps} />
}