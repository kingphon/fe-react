import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Form } from 'semantic-ui-react'

import ToggleActive from '../../../atoms/ToggleActive';
import { ACTIVE, SUSPENSION } from '../../../../constants/entites';
import ModalModule from '../../../molecules/ModalModule';
import {
    doSave, getCreateAction, closeModal, initialState 
} from '../../../../redux/reducers/productCategoryReducer';
import FormInputSlug from '../../../atoms/FormInputSlug';
import { formErrorsHandle, isFormError } from '../../../../commons/utils';

const Render = ({ 
    productCategory: { productCategoryId, name, slugName, status },
    error,
    openModal, onClose, formLoading, modalFormSuccessMessage,
    onPositive, onChangeName, onChangeStatus, onContinue, onChangeSlugValue,
    errors = {},
    ...rest
}) => (
    <ModalModule
        size="mini"
        title={ productCategoryId ? 'Update' : 'Create' }
        open={openModal}
        onClose={onClose}
        actionDisable={isFormError(errors)}
        modalSuccessMessage={modalFormSuccessMessage}
        actionLoading={formLoading}
        onPositive={onPositive}
        onContinue={onContinue}
        {...rest}
    >
        <Form loading={formLoading}>
            <FormInputSlug
                tabIndex={0}
                fluid
                type="text"
                name="name"
                label="Product Category Name: " 
                required
                defaultValue={name}
                defaultSlugValue={slugName}
                valueError={errors.name}
                slugValueError={errors.slugName}
                onChange={onChangeName}
                onChangeSlugValue={onChangeSlugValue} />
            <ToggleActive
                tabIndex={2}
                checked={status === ACTIVE} 
                onChange={onChangeStatus} />
        </Form>
    </ModalModule>
)

const ProductCategoryModal = () => {
    const selector = useSelector(({
        productCategoryReducer: { openModal, modalFormSuccessMessage, formLoading, productCategory, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, productCategory, errors }), shallowEqual)

    const [productCategory, setProductCategory] = useState({ ...initialState.productCategory })
    const [errors, setErrors] = useState({ ...initialState.errors })

    const dispatch = useDispatch()

    useEffect(() => {
        setProductCategory({ ...selector.productCategory })
    }, [selector.productCategory, selector.openModal, selector.modalFormSuccessMessage])

    useEffect(() => {
        setErrors({ ...selector.errors })
    }, [selector.errors])

    const renderProps = {
        ...selector,
        errors,
        productCategory,
        onChangeName: (_, input, error) => {
            setProductCategory({ 
                ...productCategory,
                [input.name]: input.value
            })
            if (!error) {
                delete errors['slugName']
            }
            setErrors({ ...formErrorsHandle(errors, input.name, error) })
        },
        onChangeSlugValue: (slugName, error) => {
            setProductCategory({ 
                ...productCategory,
                slugName
            })
            setErrors({ ...formErrorsHandle(errors, 'slugName', error) })
        },
        onChangeStatus: status => setProductCategory({ 
            ...productCategory,
            status: status ? ACTIVE : SUSPENSION
        }),
        onPositive: _ => dispatch(doSave(productCategory)),
        onContinue: _ => dispatch(getCreateAction()),
        onClose: _ => dispatch(closeModal())
    }

    return <Render {...renderProps} />
}

export default ProductCategoryModal