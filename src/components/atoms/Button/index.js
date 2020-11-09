import React from 'react'
import MaterialButton from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const Button = ({
    loading,
    style,
    color = 'primary',
    variant = 'contained',
    iconLabel = false,
    icon,
    content,
    children,
    ...rest
}) => {
    return loading ? <LoadingButton content={content ? content : children} {...rest} /> : (
        <MaterialButton 
            color={color}
            style={color === 'change' ? { backgroundColor: '#f44336', color: '#ccc', ...style } : style }
            variant={variant}
            startIcon={icon}
            {...rest}
        >
            {content ? content : children}
        </MaterialButton>
    )
}

const LoadingButton = ({ content, ...rest }) => (
    <MaterialButton
        disabled
        variant="contained"
        {...rest}
    >
        <CircularProgress size={15} />&nbsp;&nbsp;{content}
    </MaterialButton>
)

export default Button