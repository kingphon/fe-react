import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Form, Button, Icon, Table, FormInput } from "semantic-ui-react";
import FormSelect from "../../../atoms/FormSelect";
// import ModalModule from '../../../atoms/ModalModule';
import Fieldset from "../../../atoms/Fieldset";
import PropertyTableRow from "./PropertyTableRow";
import ProductOptions from "./ProductOptions";

import { closeModal } from '../../../../redux/reducers/productReducer';
import { formErrorsHandle } from "../../../../commons/utils";
import ModalModule from "../../../molecules/ModalModule";

const options = [
    { key: "1", text: "Car", value: "car" },
    { key: "2", text: "Bike", value: "bike" },
    { key: "3", text: "Other", value: "other" }
];

const Render = ({
    openModal,
    openPackageModal,
    productState: { properties },
    openOptionModal = false,
    productProperty: { productPropertyName, productPropertyValue },
    onChangeProperty,
    onAddProperty,
    onUpdateProperty,
    onRemoveProperty,
    onClose,
    ...rest
}) => (
    <ModalModule title="Create Product" open={openModal} onClose={onClose}>
        <Form>
            <FormInput label="Name: " placeholder="Input name" />
            <Form.Group widths="equal">
                <FormSelect
                    label="Product Category: "
                    options={options}
                    placeholder="-- Select Category --"
                />
                <FormSelect
                    label="Product Type Group: "
                    options={options}
                    placeholder="-- Select Type Group --"
                />
                <FormSelect
                    label="Product Type: "
                    options={options}
                    placeholder="-- Select Product Type --"
                />
            </Form.Group>
            <Form.Group widths="equal">
                <FormSelect
                    label="Made in: "
                    options={options}
                    placeholder="-- Select Product Type Group --"
                />
                <FormSelect
                    label="Brand: "
                    options={options}
                    placeholder="-- Select Product Brand --"
                />
            </Form.Group>
            <Fieldset icon="info circle" title="Summary Product Detail">
                <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ padding: "8px 16px" }}>
                            Property Name
                        </Table.HeaderCell>
                        <Table.HeaderCell style={{ padding: "8px 16px" }}>
                            Property Value
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {properties.map((item, index) => (
                        <PropertyTableRow
                            item={item}
                            key={index}
                            onUpdateProperty={onUpdateProperty}
                            onRemoveProperty={onRemoveProperty}
                        />
                    ))}
                    <Table.Row textAlign="center">
                    <Table.Cell>
                        <FormInput
                            placeholder="Enter Property Name..."
                            name="productPropertyName"
                            onChange={onChangeProperty}
                            value={productPropertyName}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <FormInput
                            placeholder="Enter Property Value..."
                            name="productPropertyValue"
                            onChange={onChangeProperty}
                            value={productPropertyValue}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Button
                            primary
                            size="mini"
                            disabled={!productPropertyName || !productPropertyValue}
                            onClick={onAddProperty}
                        >
                        <Icon name="add" />
                        Add
                        </Button>
                    </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table>
            </Fieldset>
            <Fieldset label="Product Package" icon="box">
                <ProductOptions />
                {/* <OptionModal openOptionModal={true} /> */}
            </Fieldset>
            <Form.TextArea label="Description: " placeholder="Input name.." />
            <Form.Checkbox label="Active" />
        </Form>
    </ModalModule>
);

const ProductModal = () => {
    const selector = useSelector(({
        productReducer: { openModal, modalFormSuccessMessage, formLoading, product, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, product, errors }), shallowEqual)

    const [state, setState] = useState({
        openPackageModal: false,
        productProperty: {
            productPropertyName: '',
            productPropertyValue: ''
        },
        productState: {
            name: '',
            slugName: '',
            productCategoryId: '',
            productTypeGroupId: '',
            productTypeId: '',
            productBrandId: '',
            unit: '',
            quantityUnit: '',
            properties: [],
            packages: [],
            status: 'ACTIVE'
        },
        errors: {}
    });

    const dispatch = useDispatch();

    const renderProps = {
        ...selector,
        ...state,
        onChangeProperty: (_, { name, value}, error) => {
            console.log(name, value)
            setState({
                ...state,
                productProperty: { ...state.productProperty, [name]: value },
                errors: { ...formErrorsHandle(state.errors, name, error) }
            })
        },
        onAddProperty: () => {
            console.log(state.productProperty)
            if (state.productProperty.productPropertyName &&
                    state.productProperty.productPropertyValue) {
                setState({
                    ...state,
                    productProperty: { 
                        productPropertyName: "",
                        productPropertyValue: ""
                    },
                    productState: {
                        ...state.productState,
                        properties: [...state.productState.properties, state.productProperty]
                    }
                });
            }
        },
        onUpdateProperty: (index, productPropertyName, productPropertyValue) => {
            if (productPropertyName && productPropertyValue) {
                state.productState.properties[index] = { productPropertyName, productPropertyValue };
                setState({ ...state });
            }
        },
        onRemoveProperty: index => {
            state.productState.properties.splice(index, 1);
            setState({ ...state });
        },
        onOpenPackageModal: () => setState({
            ...state,
            openPackageModal: false
        }),
        onClose: () => dispatch(closeModal()),
        onClosePackageModal: () => setState({
            ...state,
            openPackageModal: false
        })
    };
    return <Render {...renderProps} />;
    };

export default ProductModal;
