import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ProductTable from '../../organisms/Product/ProductTable';
import ProductHeader from '../../organisms/Product/ProductHeader';
import ProductFilter from '../../organisms/Product/ProductFilter';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ProductModal from '../../organisms/Product/ProductModal';

const Product = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ProductHeader/>
            <ProductFilter />
            <ProductTable />
            <ProductModal />
        </>
    )
}
export default Product