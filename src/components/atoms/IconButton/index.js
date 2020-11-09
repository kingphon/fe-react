import React from 'react'
import MaterialIconButton from '@material-ui/core/IconButton';
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
    return loading ? <LoadingButton content={content ? content : children} /> : (
        <MaterialIconButton 
            color={color}
            style={color === 'change' ? { backgroundColor: '#f44336', color: '#ccc', ...style } : style }
            variant={variant}
            startIcon={icon}
            {...rest}
        >
            {content ? content : children}
        </MaterialIconButton>
    )
}

const LoadingButton = ({ content }) => (
    <MaterialIconButton
        disabled
        variant="contained"
    >
        <CircularProgress size={15} />&nbsp;&nbsp;{content}
    </MaterialIconButton>
)

export default Button