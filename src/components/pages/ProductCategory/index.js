import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import ProductCategoryTable from '../../organisms/ProductCategory/ProductCategoryTable';
import ProductCategoryModal from '../../organisms/ProductCategory/ProductCategoryModal';
import { fetchWithPaginationAndFilter } from '../../../redux/reducers/productCategoryReducer';
import ContentHeader from '../../organisms/ContentHeader';

const Render = ({ loading, reload, onOpenCreate, productCategoryList, page, totalPages, filters }) => (
    <>
        <ContentHeader title="Product Category" onOpenCreate={onOpenCreate} />
        <ProductCategoryTable
            loading={loading}
            reload={reload}
            filters={filters}
            defaultActivePage={page}
            totalPages={totalPages}
            dataSource={productCategoryList}
        />
        <ProductCategoryModal />
    </>
)

const ProductCategory = () => {
    const selector = useSelector(({
        productCategoryReducer: { productCategoryList, page, totalPages, filters, loading, reload } 
    }) => ({ productCategoryList, loading, page, totalPages, filters, reload }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWithPaginationAndFilter(selector.filters, 1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        ...selector
    }

    return <Render {...renderProps} />
}

export default ProductCategory