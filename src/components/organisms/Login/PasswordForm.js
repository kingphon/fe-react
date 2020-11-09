import React from 'react'
import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import { Telegram, Close } from '@material-ui/icons'

export const PasswordChangeForm = ({ onChangePassword }) => (
    <>
        <h2>Change Password</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="password" 
            required
            label="Password"
        />
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            type="password"
            name="confirmPassword"
            required
            label="Confirm Password"
        />
        <Button
            size="large"
            endIcon={<Telegram /> }
            onClick={onChangePassword}
            content="CONFIRM"
        />
    </>
)


export const ResetPasswordForm = ({
    onSendResetPassword,
    onCancelResetPassword
}) => (
    <>
        <h2>Reset Password</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="phone" 
            required
            label="Your Phone Number"
        />
        <Button
            style={{ marginRight: '8px' }}
            size="large"
            onClick={onSendResetPassword}
            endIcon={<Telegram /> }
            content="SEND"
        />
        <Button
            style={{ marginLeft: '8px' }}
            color="default"
            size="large"
            onClick={onCancelResetPassword}
            endIcon={<Close /> }
            content="CANCEL"
        />
    </>
)

export const ResetPasswordConfirmForm = ({ onConfirmVerifyCode, onCancelResetPassword }) => (
    <>
        <h2>Confirm Reset Password</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="verifyCode" 
            required
            label="Your 6 digi character"
        />
        <Button
            style={{ marginRight: '8px' }}
            size="large"
            onClick={onConfirmVerifyCode}
            endIcon={<Telegram /> }
            content="SEND"
        />
        <Button
            style={{ marginLeft: '8px' }}
            color="default"
            size="large"
            onClick={onCancelResetPassword}
            endIcon={<Close /> }
            content="CANCEL"
        />
    </>
)