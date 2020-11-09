import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import UserModal from '../../organisms/User/UserModal';
import UserTable from '../../organisms/User/UserTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/userReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="User"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <UserTable />
        <UserModal />
    </>
)

const User = () => {
    const selector = useSelector(({
        userReducer: { createButtonLoading } 
    }) => ({ createButtonLoading }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        dispatch(fetchAll())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        ...selector,
        onOpenCreate: () => dispatch(getCreateAction())
    }

    return <Render {...renderProps} />
}
export default User