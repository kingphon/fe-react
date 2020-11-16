import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import ZoneModal from '../../../organisms/Location/Zone/ZoneModal';
import ZoneTable from '../../../organisms/Location/Zone/ZoneTable';
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import ContentHeader from '../../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../../redux/reducers/Location/zoneReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="Zone"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <ZoneTable />
        <ZoneModal />
    </>
)

const Zone = () => {
    const selector = useSelector(({
        zoneReducer: { createButtonLoading }
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
export default Zone