import React, { useState, useEffect } from "react";
import { Table, Checkbox, Button } from 'semantic-ui-react'
import styles from "./styles.module.css";
import ProductPackageTableRow from "./ProductPackageTableRow";
import TableRowEmpty from "../../../../atoms/TableRowEmpty";
import ProductPackageTable from "./ProductPackageTable";
import { formErrorsHandle } from "../../../../../commons/utils";
import FormInput from "../../../../atoms/FormInput";
import ImageUploads from "../../../../atoms/ImageUploads";

const Render = ({
    productPackage: {
        name, quantity, images, active
    },
    productPackages,
    onChangeFormData,
    onCreate,
    onChangeFormDataActive,
    onRemove
}) => {
    useEffect(() => {
        console.log(name)
    }, [name])
    return (
        <>
            <ProductPackageTable
                onChangeFormData={onChangeFormData}
                onCreate={onCreate}
            >
                {productPackages.map((productPackage, index) => (
                    <ProductPackageTableRow
                        productPackage={productPackage}
                        key={index}
                        index={index}
                        styles={styles}
                        onRemove={_ => onRemove(index)}
                    />
                ))}
                {productPackages.length <= 0 && <TableRowEmpty />}
                <Table.Row>
                    <Table.Cell>
                        <FormInput
                            name="name"
                            placeholder="Package Type..."
                            value={name}
                            onChange={onChangeFormData}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <FormInput
                            name="quantity"
                            placeholder="Package Quantity..."
                            value={quantity}
                            onChange={onChangeFormData}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <ImageUploads
                            width="50px"
                            height="70px"
                            dataSources={images}
                            onChange={items => console.log(items)}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        <Checkbox checked={active} onChange={onChangeFormDataActive} />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        <Button size="small" icon="plus" color="blue" onClick={onCreate} />
                    </Table.Cell>
                </Table.Row>
            </ProductPackageTable>
        </>
    );
};

const ProductProductPackages = ({ onChange }) => {

    const [state, setState] = useState({
        productPackage: {
            name: "",
            quantity: 1,
            images: [],
            active: true
        },
        productPackages: [],
        errors: {}
    });

    const renderProps = {
        ...state,
        onCreate: () => {
            setState({
                ...state,
                productPackages: [ ...state.productPackages, state.productPackage ],
                productPackage: {
                    name: "",
                    quantity: 1,
                    images: [],
                    active: true
                },
            })
        },
        onUpdate: (index, productPackage) => {
            state.productPackages[index] = { ...productPackage }
            setState({ ...state })
        },
        onChangeFormData: (_, { name, value }, error) => {
            setState({
                ...state,
                productPackage: {
                    ...state.productPackage,
                    [name]: value
                },
                errors: { ...formErrorsHandle(state.errors, name, error) }
            });
        },
        onChangeFormDataActive: (_, checkbox) => {
            setState({
                ...state,
                productPackage: {
                    ...state.productPackage,
                    active: checkbox.checked
                }
            });
        },
        onRemove: index => {
            state.productPackages.splice(index, 1);
            setState({ ...state });
        }
    };

    return <Render {...renderProps} />;
};

export default ProductProductPackages;
