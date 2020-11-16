import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import ProvinceModal from '../../../organisms/Location/Province/ProvinceModal';
import ProvinceTable from '../../../organisms/Location/Province/ProvinceTable';
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import ContentHeader from '../../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../../redux/reducers/Location/provinceReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="Province"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <ProvinceTable />
        <ProvinceModal />
    </>
)

const Province = () => {
    const selector = useSelector(({
        provinceReducer: { createButtonLoading }
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
export default Province