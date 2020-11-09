import React, { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { setLoginForm, doLogin } from '../../../redux/reducers/rootReducer'
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { Telegram } from '@material-ui/icons';
import { ResetPasswordForm } from './PasswordForm';

const Render = ({
    forgotPassword,
    ...rest
}) => (
    <div className="login-screen">
        <div className="login-form">
            {!forgotPassword ? <LoginForm {...rest} /> : <ResetPasswordForm {...rest} />}
        </div>
    </div>
)

const LoginForm = ({
    loginForm: { userName, password },
    onChangeForm,
    formLoading,
    onClickForgotPassword,
    onLogin
}) => (
    <>
        <h2>DASHBOARD LOGIN</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="userName" 
            required
            label="Phone"
            disabled={formLoading}
            value={userName}
            onChange={onChangeForm}
        />
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            type="password"
            name="password"
            required
            value={password}
            label="Password"
            disabled={formLoading}
            onChange={onChangeForm}
        />
        <span
            className="forgot-password" 
            onClick={onClickForgotPassword}
        >Forgot password?</span>
        <Button
            loading={formLoading}
            size="large"
            endIcon={<Telegram /> }
            onClick={onLogin}
            content="LOGIN"
        />
    </>
)

export function Login() {
    const selector = useSelector(({
        rootReducer: { loginForm, formLoading, formSuccessMessage, errors } 
    }) => ({ loginForm, formLoading, formSuccessMessage, errors }), shallowEqual)

    const [forgotPassword, setForgotPassword] = useState(false)

    const dispatch = useDispatch()

    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } }

    const renderProps = {
        ...selector,
        forgotPassword,
        onChangeForm: (_, { name, value }) => dispatch(setLoginForm({
            ...selector.loginForm,
            [name]: value
        })),
        onLogin: () => dispatch(doLogin(selector.loginForm, () => history.replace(from))),
        onClickForgotPassword: () => setForgotPassword(true),
        onCancelResetPassword: () => setForgotPassword(false)
    }

    return <Render {...renderProps} />
}