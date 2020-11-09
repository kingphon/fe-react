import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { setUserGroup, closeModal, doSave } from "../../../../redux/reducers/userGroupReducer";
import ModalModule from "../../../molecules/ModalModule";
import Input from "../../../atoms/Input";
import ToggleActive from "../../../atoms/ToggleActive";
import { Table, TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import CheckBox from "../../../atoms/CheckBox";

const Render = ({
    formLoading,
    openModal,
    userGroup: { name, userGroupFeatures = [], status },
    modalFormSuccessMessage,
    errors: { formErrors },
    onChangeForm,
    onChangePermision,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="User Group Modal"
        minWidth="600px"
        loading={formLoading}
        modalSuccess={modalFormSuccessMessage}
        positiveDisabled={!name}
        open={openModal}
        onClose={onClose}
        onPositive={onPositive}
    >
        <Input
            required
            name="name"
            label="User Group Name: "
            value={name}
            onChange={onChangeForm}
            error={formErrors.name}
        />
        <Table size="small" stickyHeader style={{ marginTop: '8px', marginBottom: '8px' }}>
            <TableHead>
                <TableRow textAlign="center">
                    <TableCell textAlign="left">Feature Name</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Create</TableCell>
                    <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {userGroupFeatures.map(({ featureName, read, create, update, delete: deletePermission }, index) => (
                <TableRow key={index} textAlign="center">
                    <TableCell textAlign="left">{featureName}</TableCell>
                    <TableCell>
                        <CheckBox
                            value="read"
                            checked={read}
                            onChange={e => onChangePermision(index, e.target)}
                        />
                    </TableCell>
                    <TableCell>
                        <CheckBox
                            value="create"
                            disabled={!read}
                            checked={create}
                            onChange={e => onChangePermision(index, e.target)}
                        />
                    </TableCell>
                    <TableCell>
                        <CheckBox
                            value="update"
                            disabled={!read}
                            checked={update}
                            onChange={e => onChangePermision(index, e.target)}
                        />
                    </TableCell>
                    <TableCell>
                        <CheckBox
                            value="delete"
                            disabled={!read}
                            checked={deletePermission}
                            onChange={e => onChangePermision(index, e.target)}
                        />
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <ToggleActive
            label="Active"
            name="status"
            checked={status}
            onChange={onChangeForm}
        />
    </ModalModule>
);

const UserGroupModal = () => {
    const selector = useSelector(({
        userGroupReducer: { openModal, formLoading, modalFormSuccessMessage, userGroup, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, userGroup, errors }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => dispatch(setUserGroup({
            ...selector.userGroup,
            [name]: value
        })),
        onChangePermision: (index, { value, checked }) => {
            selector.userGroup.userGroupFeatures[index][value] = checked;
            if (value === 'read' && !checked) {
                selector.userGroup.userGroupFeatures[index].create = checked;
                selector.userGroup.userGroupFeatures[index].update = checked;
                selector.userGroup.userGroupFeatures[index].delete = checked;
            }
            dispatch(setUserGroup({...selector.userGroup}))
        },
        onPositive: () => dispatch(doSave(selector.userGroup)),
        onClose: () => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
};

export default UserGroupModal;
