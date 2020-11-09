import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import FormModule from '../../molecules/FormModule';
import Input from '../../atoms/Input';
import { setChangePasswordForm, doChangePassword, resetSettingForm } from '../../../redux/reducers/settingReducer';
import { ROUTE_LOGIN } from '../../../routes'

const Render = ({
    formLoading,
    formSuccessMessage,
    changePasswordForm: { oldPassword, newPassword, confirmPassword },
    errors: { formErrors },
    onChangeForm,
    onPositive
}) => (
    <FormModule
        title="Change Password"
        maxWidth="320px"
        style={{ paddingLeft: '16px', paddingRight: '16px' }}
        showNegativeButton={false}
        loading={formLoading}
        formSuccess={formSuccessMessage}
        positiveLabel="Update"
        onPositive={onPositive}
    >
        <Input 
            required
            margin="dense"
            name="oldPassword"
            label="Old Password"
            value={oldPassword}
            onChange={onChangeForm}
            error={formErrors.oldPassword}
        />
        <Input 
            required
            margin="dense"
            name="newPassword"
            label="New Password"
            value={newPassword}
            onChange={onChangeForm}
            error={formErrors.newPassword}
        />
        <Input 
            required
            margin="dense"
            name="confirmPassword"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={onChangeForm}
            error={formErrors.confirmPassword}
        />
    </FormModule>
)

const ChangePassword = () => {
    
    const selector = useSelector(({
        settingReducer: {
            changePasswordForm,
            formLoading,
            formSuccessMessage,
            errors
        } 
    }) => ({
        changePasswordForm,
        formLoading,
        formSuccessMessage,
        errors
    }), shallowEqual)

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {
        dispatch(resetSettingForm())
    }, [])

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => {
            dispatch(setChangePasswordForm({
                ...selector.changePasswordForm,
                [name]: value
            }))
        },
        onPositive: () => dispatch(
            doChangePassword(
                selector.changePasswordForm,
                () => history.push(ROUTE_LOGIN)
            )
        )
    }

    return <Render {...renderProps} />
}

export default ChangePassword