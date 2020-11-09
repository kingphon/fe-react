import React from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Form, Select, Button, Icon } from "semantic-ui-react";

import Fieldset from "../../../atoms/Fieldset";
import PageSearch from "../../../molecules/PageSearch";
import FilterStatus from "../../../molecules/FilterStatus";
import { setFilters } from "../../../../redux/reducers/productReducer";

const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" }
];

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
        <Fieldset icon="hand point down outline" title="Actions">
            <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: "flex" }}>
                    <Select style={{ minWidth: 160, marginRight: 8 }} fluid options={options} placeholder="Type" />
                    <Button primary>Execute</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button primary>
                        <Icon name="cloud upload" inverted />Import
                    </Button>
                    <Button primary>
                        <Icon name="cloud download" inverted />Export
                    </Button>
                </div>
            </div>
        </Fieldset>
    </Form>
)

const ProductFilter = () => {
    const selector = useSelector(({ productReducer: { filters } }) => 
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

export default ProductFilter
