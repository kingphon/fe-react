import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { setPostType, doSave, closeModal } from '../../../../redux/reducers/postTypeReducer'
import ToggleActive from "../../../atoms/ToggleActive";
import ModalModule from "../../../molecules/ModalModule";
import Input from "../../../atoms/Input";

const Render = ({
    openModal,
    formLoading,
    modalFormSuccessMessage = '',
    postType: { postTypeId, name, slugName, status },
    errors: { formErrors },
    onChangeForm,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="Create Post Type"
        open={openModal}
        loading={formLoading}
        positiveDisabled={!name}
        modalSuccess={modalFormSuccessMessage}
        onPositive={onPositive}
        onClose={onClose}
    >
        <Input
            label="Name"
            required
            autoFocus
            name="name"
            onChange={onChangeForm}
            value={name}
            error={formErrors.name}
        />
        {postTypeId && <Input
            label="SlugName"
            required
            name="slugName"
            onChange={onChangeForm}
            value={slugName}
            error={formErrors.slugName}
        />}
        <ToggleActive
            label="Status"
            checked={status}
            onChange={onChangeForm}
        />
    </ModalModule>
);

export default function PostTypeModal() {
    const selector = useSelector(({
        postTypeReducer: { openModal, modalFormSuccessMessage, formLoading, postType, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, postType, errors }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => dispatch(setPostType({ 
            ...selector.postType, [name]: value 
        })),
        onPositive: _ => dispatch(doSave(selector.postType)),
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
}
