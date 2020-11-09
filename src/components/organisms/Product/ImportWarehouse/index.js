import React, { useState } from "react";
import { Button, Modal, Form, Table } from "semantic-ui-react";
import Price from "../../../atoms/Price";
import Fieldset from "../../../atoms/Fieldset";
import DatePickerModule from "../../../atoms/DatePickerModule";

const Render = ({
    product,
    importProduct: {
        inputPrice,
        inputQuantity,
        sellPrice,
        dateOfManufacture,
        expirationDate
    },
    onPositive,
    onClose,
    onChangeInputQuantity,
    onChangeInputPrice,
    onChangeDateOfManufacture,
    onChangeExpirationDate,
    onChangeSellPrice,
    ...rest
}) => (
    <Modal
        style={{ maxWidth: 600 }}
        size="small"
        closeIcon
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={onClose}
        {...rest}>
        <Modal.Header>Product Import</Modal.Header>
        <Modal.Content>
            <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Product Code</Table.Cell>
                        <Table.Cell>{product.code}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Product Name</Table.Cell>
                        <Table.Cell>
                        {`${product.packageName} ${product.packageQuantity} ${
                            product.unit
                        } ${product.name} ${product.netWeight} ${product.netWeightUnit}`}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Current Quantity</Table.Cell>
                        <Table.Cell>
                        <b>{product.currentQuantity}</b> {product.packageName}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Current Price</Table.Cell>
                        <Table.Cell>
                        <Price value={product.currentPrice} />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Fieldset title="Import Infomation" icon="info circle">
                <Form style={{ boxSizing: "border-box" }}>
                    <Form.Group widths="equal">
                        <Form.Input
                            style={{ maxWidth: 80 }}
                            label="Quantity"
                            value={inputQuantity}
                            placeholder="0"
                            onChange={onChangeInputQuantity}
                        />
                        <Form.Input
                            label="Price"
                            icon="dollar"
                            value={inputPrice}
                            placeholder="0"
                            onChange={onChangeInputPrice}
                        />
                        <Form.Input
                            label="Sell Price"
                            icon="dollar"
                            value={sellPrice}
                            placeholder="0"
                            onChange={onChangeSellPrice}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <DatePickerModule
                            fluid
                            dateFormat="dd/MM/yyyy"
                            label="Date Of Manufacture"
                            value={dateOfManufacture}
                            onChange={onChangeDateOfManufacture}
                        />
                        <DatePickerModule
                            fluid
                            dateFormat="dd/MM/yyyy"
                            label="Expiration Date"
                            value={expirationDate}
                            onChange={onChangeExpirationDate}
                        />
                    </Form.Group>
                </Form>
            </Fieldset>
        </Modal.Content>
        <Modal.Actions>
            <Button
                onClick={onPositive}
                positive
                labelPosition="right"
                icon="checkmark"
                content="Import"
            />
            <Button onClick={onClose} negative>
                Cancel
            </Button>
        </Modal.Actions>
    </Modal>
);

const ImportWarehouse = ({ onPositive, ...rest }) => {
    const [importProduct, setImportProduct] = useState({
        inputQuantity: "",
        inputPrice: "",
        sellPrice: "",
        dateOfManufacture: new Date(2018, 10, 11),
        expirationDate: new Date()
    });

    const renderProps = {
        ...rest,
        importProduct,
        onChangeInputQuantity: (_, input) => setImportProduct({
            ...importProduct,
            inputQuantity: input.value
        }),
        onChangeInputPrice: (_, input) => setImportProduct({
            ...importProduct,
            inputPrice: input.value
        }),
        onChangeSellPrice: (_, input) => setImportProduct({
            ...importProduct,
            sellPrice: input.value
        }),
        onChangeDateOfManufacture: dateOfManufacture => setImportProduct({
            ...importProduct,
            dateOfManufacture
        }),
        onChangeExpirationDate: expirationDate => setImportProduct({
            ...importProduct,
            expirationDate
        }),
        onPositive: _ => onPositive(importProduct)
    };

    return <Render {...renderProps} />;
};

export default ImportWarehouse;
