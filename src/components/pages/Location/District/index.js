import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import DistrictModal from '../../../organisms/Location/District/DistrictModal';
import DistrictTable from '../../../organisms/Location/District/DistrictTable';
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import ContentHeader from '../../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../../redux/reducers/Location/districtReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="District"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <DistrictTable />
        <DistrictModal />
    </>
)

const District = () => {
    const selector = useSelector(({
        districtReducer: { createButtonLoading }
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
export default District