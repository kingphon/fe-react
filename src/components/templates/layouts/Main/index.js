import React, { useState, useEffect } from 'react'
import cookie from 'js-cookie'
import faker from "faker";
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { ROUTE_USER_PROFILE, ROUTE_USER_LOGOUT, ROUTE_LOGIN } from '../../../../routes'

import Pusher from 'pusher-js'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import HorizontalSidebar from '../../../organisms/HorizontalSidebar';
import { reload, resetSystemErrors, openSystemPopup, doLogout } from '../../../../redux/reducers/rootReducer';
import { ReportProblemOutlined, Close } from '@material-ui/icons';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Image from '../../../atoms/Image';
import { USER_AUTH } from '../../../../constants';

// const trigger = (
//     <span>
//         <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
//     </span>
// )

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    menuItem: {
        color: '#000',
        textDecoration: 'none'
    }
}))


const Render = ({
    navOpen,
    setNavOpen,
    children,
    systemPopup = {},
    systemErrors,
    onCloseSystemErrors,
    onSystemPopupClose,
    onLogout,
    ...rest
}) => {
    const statusNav = navOpen ? "open" : "close";
    return(
        <>
            <div className="main-layout">
                <HorizontalSidebar
                    navOpen={navOpen}
                    setNavOpen={setNavOpen}
                    statusNav={statusNav} />
                <div className={`main-layout--body ${statusNav}-nav`}>
                    <div className="main-layout--body---header">
                        <img
                            src="http://localhost:3000/images/logo.png"
                            alt="logo"
                            style={{ height: 36 }}
                        />
                        {/* <UserdropDownMenu
                            userAuth={cookie.getJSON(USER_AUTH)}
                            onLogout={onLogout}
                        /> */}
                    </div>
                    <div className="main-layout--body---content">
                        <div className="main-layout--body---main-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {
                systemErrors.message &&
                <div className="error-system">
                    <span></span>
                    <span>
                        <ReportProblemOutlined />
                        &nbsp;{systemErrors.message}
                    </span>
                    <Close name="close" className="error-system--close-icon" onClick={onCloseSystemErrors} />
                </div>
            }
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key="top,center"
                autoHideDuration={3000}
                open={systemPopup.open}
                TransitionComponent={Slide}
                onClose={onSystemPopupClose}
            >
                <Alert
                    variant="filled"
                    severity={systemPopup.type}
                    onClose={onSystemPopupClose} 
                >{systemPopup.message}</Alert>
            </Snackbar>
        </>
    )
}

// const UserdropDownMenu = ({ userAuth: { avatar, fullName }, onLogout }) => {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//     const anchorRef = React.useRef(null);
    
//     const handleToggle = () => {
//         setOpen(prevOpen => !prevOpen);
//     };
    
//     const handleClose = event => {
//         if (anchorRef.current && anchorRef.current.contains(event.target)) {
//         return;
//         }
    
//         setOpen(false);
//     };
    
//     function handleListKeyDown(event) {
//         if (event.key === 'Tab') {
//         event.preventDefault();
//         setOpen(false);
//         }
//     }
    
//     // // return focus to the button when we transitioned from !open -> open
//     const prevOpen = React.useRef(open);
//     // React.useEffect(() => {
//     //     if (prevOpen.current === true && open === false) {
//     //     anchorRef.current.focus();
//     //     }
    
//     //     prevOpen.current = open;
//     // }, [open])

//     return(
//         <div>
//             <Button
//                 ref={anchorRef}
//                 aria-controls={open ? 'menu-list-grow' : undefined}
//                 aria-haspopup="true"
//                 onClick={handleToggle}
//             >
//                 <Image
//                     width="36px"
//                     height="36px"
//                     circle
//                     src={avatar}
//                 />
//             </Button>
//             <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//                 {({ TransitionProps, placement }) => (
//                     <Grow
//                         {...TransitionProps}
//                         style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//                     >
//                     <Paper>
//                         <ClickAwayListener onClickAway={handleClose}>
//                             <MenuList
//                                 autoFocusItem={open}
//                                 onKeyDown={handleListKeyDown}
//                             >
//                                 <MenuItem>
//                                     <b>{fullName}</b>
//                                 </MenuItem>
//                                 <MenuItem>
//                                     <Link
//                                         className={classes.menuItem}
//                                         to={ROUTE_USER_PROFILE}>My Account
//                                     </Link>
//                                 </MenuItem>
//                                 <MenuItem onClick={onLogout}>Logout</MenuItem>
//                             </MenuList>
//                         </ClickAwayListener>
//                     </Paper>
//                     </Grow>
//                 )}
//             </Popper>
//         </div>
//     )
// }

const Main = ({ children }) => {
    const selector = useSelector(({
        rootReducer: { systemPopup, systemErrors } 
    }) => ({ systemPopup, systemErrors }), shallowEqual)

    const [navOpen, setNavOpen] = useState(true)

    const dispatch = useDispatch()

    const history = useHistory()

    // useEffect(() => {
    //     const pusher = new Pusher('7853616a98fac75c9b66', {
	// 		cluster: 'ap3',
	// 		encrypted: true
	// 	});
	// 	const channel = pusher.subscribe('spring_reactjs-development');
	// 	channel.bind('RELOAD', pageName => {
	// 		dispatch(reload(pageName))
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const renderProps = {
        navOpen,
        setNavOpen,
        children,
        ...selector,
        onCloseSystemErrors: () => dispatch(resetSystemErrors()),
        onSystemPopupClose: () => dispatch(openSystemPopup(false)),
        onLogout: () => dispatch(doLogout(() => history.push(ROUTE_LOGIN) ))
    }

    return <Render {...renderProps} />
}

export default Main