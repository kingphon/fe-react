import React from 'react'
import ModalModule from '../../../molecules/ModalModule';

const PostViewModal = ({ open = false, content, ...rest }) => (
    <ModalModule
        open={open}
        maxWith="lg"
        showPositiveButton={false}
        negativeButtonLabel="Close"
        {...rest}
    >
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </ModalModule>
)

export default PostViewModal