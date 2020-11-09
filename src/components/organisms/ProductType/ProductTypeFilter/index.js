import React from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Form } from "semantic-ui-react";

import PageSearch from "../../../molecules/PageSearch";
import FilterStatus from "../../../molecules/FilterStatus";
import { setFilters } from "../../../../redux/reducers/productTypeReducer";

const sorts = [
    { key: "name,DESC", text: "Name Descending", value: "name,DESC" },
    { key: "name,ASC", text: "Name Ascending", value: "name,ASC" },
    { key: "createDate,DESC", text: "Create Date Descending", value: "createDate,DESC" },
    { key: "createDate,ASC", text: "Create Date Ascending", value: "createDate,ASC" }
];

const listStatus = [
    { key: "", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "SUSPENSION", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
];

const Render = ({ filters, onSearch, onFilterByStatus, onChangeSortValue }) => (
    <Form>
        <PageSearch defaultValue={filters.search} onSearch={onSearch} />
        <FilterStatus
            statusValue={filters.status}
            sortValue={filters.sort}
            listStatus={listStatus}
            listSort={sorts}
            onFilterByStatus={onFilterByStatus}
            onChangeSortValue={onChangeSortValue}
        />
    </Form>
)

const ProductTypeFilter = () => {
    const selector = useSelector(({ productTypeReducer: { filters } }) => 
    ({ filters }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onSearch: search => dispatch(setFilters({ ...selector.filters, search })), 
        onFilterByStatus: status => dispatch(setFilters({ ...selector.filters, status })),
        onChangeSortValue: sort => dispatch(setFilters({ ...selector.filters, sort }))
    }

    return <Render {...renderProps} />
}

export default ProductTypeFilter
