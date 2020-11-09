import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { AddBox } from '@material-ui/icons';
import Button from '../../atoms/Button';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "8px 0px"
    },
    left: {
        alignSelf: "center"
    },
    title: {
        margin:"0px"
    }
}));

const ContentHeader = ({ title, createButtonLoading = false, onOpenCreate, children }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.left}>
                {title && <h2 className={classes.title}>{title}</h2>}                
            </div>
            <div>
                {children}
                <Button
                    icon={<AddBox />}
                    loading={createButtonLoading}
                    content="Create"
                    onClick={onOpenCreate}
                />
            </div>
        </div>
    )
}

export default ContentHeader