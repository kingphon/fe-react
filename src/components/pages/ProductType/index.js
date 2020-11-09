import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ProductTypeModal from '../../organisms/ProductType/ProductTypeModal';
import ProductTypeTable from '../../organisms/ProductType/ProductTypeTable';
import ProductTypeFilter from '../../organisms/ProductType/ProductTypeFilter';
import ProductTypeAction from '../../organisms/ProductType/ProductTypeAction';
import ProductTypeHeader from '../../organisms/ProductType/ProductTypeHeader';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';

const ProductType = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ProductTypeHeader/>
            <ProductTypeFilter />
            <ProductTypeAction />
            <ProductTypeTable />
            <ProductTypeModal />
        </>
    )
}
export default ProductType