import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '../../atoms/Button';
import { Close, Check } from '@material-ui/icons';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        // pointerEvents: "none"
    },
    bottom: {
        padding: "8px",
        paddingTop: "24px",
        borderTop: "1px solid rgba(0,0,0,0.12)",
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        padding: "0px 8px"
    },
    positiveButotn: {
        marginRight: "8px"
    },
    content: {
        position: 'relative',
        padding: "8px"
    },
    backdrop: {
        position: 'absolute',
        zIndex: 999,
        opacity: '0.3 !important',
        color: '#fff',
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
}));

export default function FormModule({
    title,
    children,
    formSuccess = '',
    loading = false,
    maxWidth = '100%',
    positiveDisabled = false,
    style = {},
    showNegativeButton = true,
    positiveLabel = "OK",
    negativeLabel = "Cancel",
    onPositive,
    onClose,
    onLoaded = false,
    ...rest
}) {
    const classes = useStyles()

    return (
        <div
            style={{ maxWidth, ...style }}
            className={classes.root}
            {...rest}
        >
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.content}>
                {children}
                {formSuccess && <FormSuccess message={formSuccess} />}
                <Backdrop
                    className={classes.backdrop}
                    open={loading || onLoaded}
                >
                    {onLoaded && <CircularProgress />}
                </Backdrop>
            </div>
            <div className={classes.bottom}>
                <Button
                    className={classes.positiveButotn}
                    loading={loading}
                    disabled={positiveDisabled}
                    icon={<Check />}
                    onClick={onPositive}
                    content={positiveLabel}
                />
                {showNegativeButton && <Button
                    icon={<Close />}
                    color="default"
                    disabled={loading}
                    onClick={onClose}
                    content={negativeLabel}
                />}
            </div>
        </div>
    );
}

const FormSuccess = ({ message }) => (
    <Alert severity="success">
        {message}
    </Alert>
)