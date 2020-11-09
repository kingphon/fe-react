import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import UserGroupModal from '../../organisms/UserGroup/UserGroupModal';
import UserGroupTable from '../../organisms/UserGroup/UserGroupTable';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/userGroupReducer';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader 
            title="User Group" 
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <UserGroupTable />
        <UserGroupModal />
    </>
)

const UserGroup = () => {
    const selector = useSelector(({
        userGroupReducer: { createButtonLoading } 
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
export default UserGroup