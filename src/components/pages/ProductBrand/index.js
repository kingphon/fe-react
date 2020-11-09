import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import ProductBrandModal from '../../organisms/ProductBrand/ProductBrandModal';
import ProductBrandTable from '../../organisms/ProductBrand/ProductBrandTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/productBrandReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="Product Brand"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <ProductBrandTable />
        <ProductBrandModal />
    </>
)

const ProductBrand = () => {
    const selector = useSelector(({
        productBrandReducer: { createButtonLoading } 
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
export default ProductBrand