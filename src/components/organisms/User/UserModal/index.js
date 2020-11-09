import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Input from "../../../atoms/Input";
import { closeModal, doSave, setUser } from '../../../../redux/reducers/userReducer';
import ModalModule from "../../../molecules/ModalModule";
import ToggleActive from "../../../atoms/ToggleActive";
import SelectSearch from "../../../atoms/SelectSearch";
import FormGroup from "../../../atoms/FormGroup";

const Render = ({
    openModal,
    formLoading,
    modalFormSuccessMessage,
    user: { userId, firstName, middleName, lastName, email, phone, userGroup, status },
    userGroupList,
    errors: { formErrors },
    onChangeForm,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="Create User"
        open={openModal}
        loading={formLoading}
        modalSuccess={modalFormSuccessMessage}
        minWidth="sm"
        onPositive={onPositive}
        onClose={onClose}
    >
        <FormGroup row>
            <Input
                width="32%"
                required
                label="First Name: "
                name="firstName"
                value={firstName}
                onChange={onChangeForm}
                disabled={!!userId}
                error={formErrors.firstName}
            />
            <Input
                width="32%"
                required
                label="Middle Name: "
                name="middleName"
                value={middleName}
                onChange={onChangeForm}
                disabled={!!userId}
                error={formErrors.middleName}
            />
            <Input
                width="32%"
                required
                label="Last Name: "
                name="lastName"
                value={lastName}
                onChange={onChangeForm}
                disabled={!!userId}
                error={formErrors.lastName}
            />
        </FormGroup>
        <FormGroup row>
            <Input
                width="49%"
                required
                label="Phone: "
                name="phone"
                value={phone}
                onChange={onChangeForm}
                disabled={!!userId}
                error={formErrors.phone}
            />
            <Input
                width="49%"
                required
                label="Email: "
                name="email"
                value={email}
                onChange={onChangeForm}
                disabled={!!userId}
                error={formErrors.email}
            />
        </FormGroup>
        <SelectSearch
            required
            label="User Group"
            options={userGroupList}
            value={userGroup}
            getOptionLabel={option => option.name}
            onChange={(_, value) => onChangeForm(_, { name: 'userGroup', value })}
            error={formErrors.userGroup}
        />
        <ToggleActive
            label="Active"
            checked={status}
            onChange={onChangeForm}
        />
    </ModalModule>
);

const UserModal = () => {
    const selector = useSelector(({
        userReducer: { 
            openModal,
            modalFormSuccessMessage,
            formLoading,
            user,
            userGroupList,
            errors
        }
    }) => ({ 
        openModal,
        modalFormSuccessMessage,
        formLoading,
        user,
        userGroupList,
        errors
    }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => dispatch(setUser({ ...selector.user, [name]: value })),
        onPositive: () => dispatch(doSave(selector.user)),
        onClose: () => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
};

export default UserModal;
