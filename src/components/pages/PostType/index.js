import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import PostTypeModal from '../../organisms/PostType/PostTypeModal';
import PostTypeTable from '../../organisms/PostType/PostTypeTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/postTypeReducer';

const Render = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="Post Type" onOpenCreate={onOpenCreate} />
        <PostTypeTable />
        <PostTypeModal />
    </>
)

const PostType = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        dispatch(fetchAll())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        onOpenCreate: () => dispatch(getCreateAction())
    }
    
    return <Render {...renderProps} />
}
export default PostType