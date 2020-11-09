import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ProductTypeGroupModal from '../../organisms/ProductTypeGroup/ProductTypeGroupModal';
import ProductTypeGroupTable from '../../organisms/ProductTypeGroup/ProductTypeGroupTable';
import ProductTypeGroupFilter from '../../organisms/ProductTypeGroup/ProductTypeGroupFilter';
import ProductTypeGroupHeader from '../../organisms/ProductTypeGroup/ProductTypeGroupHeader';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';

const ProductTypeGroup = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ProductTypeGroupHeader/>
            <ProductTypeGroupFilter />
            <ProductTypeGroupTable />
            <ProductTypeGroupModal />
        </>
    )
}
export default ProductTypeGroup