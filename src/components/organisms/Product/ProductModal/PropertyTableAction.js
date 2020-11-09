import React, { useState } from "react";
import { Table, Form, Button, Icon } from "semantic-ui-react";

const PropertyTableAction = ({ property: { name, value }, onAddProperty }) => {
    const [property, setProperty] = useState({
        name,
        value
    });

    return (
        <Table.Row textAlign="center">
            <Table.Cell>
                <Form.Input
                    placeholder="Enter Property Name..."
                    onChange={(_, { value }) =>
                        setProperty({
                        ...property,
                        name: value
                        })
                    }
                    value={property.name}
                />
            </Table.Cell>
            <Table.Cell>
                <Form.Input
                    placeholder="Enter Property Value..."
                    onChange={(_, { value }) =>
                        setProperty({
                        ...property,
                        value
                        })
                    }
                value={property.value}
                />
            </Table.Cell>
            <Table.Cell>
                <Button
                    primary
                    size="mini"
                    disabled={!property.name || !property.value}
                    onClick={onAddProperty}
                >
                    <Icon name="add" />
                    Add
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};

export default PropertyTableAction
