import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/styles';
import Button from '../../atoms/Button';
import { Close, Check } from '@material-ui/icons';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        // pointerEvents: "none"
    },
    bottom: {
        padding: "16px 24px"
    },
    content: {
        position: 'relative',
        padding: "16px 24px 8px"
    },
    backdrop: {
        position: 'absolute',
        zIndex: 999,
        opacity: '0.3 !important',
        color: '#fff',
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
}));

export default function ModalModule({
    title,
    children,
    modalSuccess = '',
    modalError = '',
    loading = false,
    minWidth = "320px",
    positiveDisabled = false,
    showPositiveButton = true,
    positiveButtonLabel = "Ok",
    negativeButtonLabel = "Cancel",
    onPositive,
    onClose,
    onLoaded = false,
    ...rest
}) {
    const classes = useStyles()

    const handleClose = (_, reason) => {
        if (reason !== 'backdropClick' || reason !== 'escapeKeyDown') {
            onClose()
        }
        return false
    }

    return (
        <Dialog
            className={classes.root}
            TransitionComponent={Transition}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            {...rest}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers className={classes.content} style={{ boxSizing: 'border-box', minWidth }}>
                {children}
                {modalSuccess && <ModalSuccess message={modalSuccess} />}
                {modalError && <ModalError message={modalError} />}
                <Backdrop
                    className={classes.backdrop}
                    open={loading || onLoaded}
                >
                    {onLoaded && <CircularProgress />}
                </Backdrop>
            </DialogContent>
            <DialogActions 
                className={classes.bottom}
            >
                {showPositiveButton && <Button
                    loading={loading}
                    disabled={positiveDisabled}
                    icon={<Check />}
                    onClick={onPositive}
                    content={positiveButtonLabel}
                />}
                <Button
                    icon={<Close />}
                    color="default"
                    disabled={loading}
                    onClick={handleClose}
                    content={negativeButtonLabel}
                />
            </DialogActions>
        </Dialog>
    );
}

const ModalSuccess = ({ message }) => (
    <Alert severity="success">
        {message}
    </Alert>
)

const ModalError = ({ message }) => (
    <Alert severity="error">
        {message}
    </Alert> 
)