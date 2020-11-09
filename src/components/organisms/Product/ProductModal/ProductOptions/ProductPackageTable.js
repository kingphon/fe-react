import React from "react";
import { Table } from "semantic-ui-react";

const ProductPackageTable = ({
    children
}) => (
    <Table celled selectable>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Package Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Images</Table.HeaderCell>
                <Table.HeaderCell>Active</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {children}
        </Table.Body>
    </Table>
);

export default ProductPackageTable;
