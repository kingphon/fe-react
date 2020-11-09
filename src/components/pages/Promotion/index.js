import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import PromotionModal from '../../organisms/Promotion/PromotionModal';
import PromotionTable from '../../organisms/Promotion/PromotionTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/promotionReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="Promotion"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <PromotionTable />
        <PromotionModal />
    </>
)

const Promotion = () => {
    const selector = useSelector(({
        promotionReducer: { createButtonLoading } 
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
export default Promotion