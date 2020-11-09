import React from "react";
import { useDispatch } from 'react-redux'
import { Form } from "semantic-ui-react";

import PageSearch from "../../../molecules/PageSearch";
import FilterBar from "../../../molecules/FilterBar";
import { setFilters } from "../../../../redux/reducers/productCategoryReducer";

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

const Render = ({ filters = {}, onSearch, onFilterByStatus, onChangeSortValue }) => (
    <Form>
        <PageSearch defaultValue={filters.search} onSearch={onSearch} />
        <FilterBar
            statusValue={filters.status}
            sortValue={filters.sort}
            listStatus={listStatus}
            listSort={sorts}
            onFilterByStatus={onFilterByStatus}
            onChangeSortValue={onChangeSortValue}
        />
    </Form>
)

const ProductCategoryFilter = ({ filters = {} }) => {
    const dispatch = useDispatch()

    const renderProps = {
        filters,
        onSearch: search => dispatch(setFilters({ ...filters, search })),
        onFilterByStatus: status => dispatch(setFilters({ ...filters, status })),
        onChangeSortValue: sort => dispatch(setFilters({ ...filters, sort }))
    }

    return <Render {...renderProps} />
}

export default ProductCategoryFilter
