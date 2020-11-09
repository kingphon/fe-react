import React, { Component } from 'react'
import {
    Container, Icon, 
    Grid, Segment, Button, Divider,
} from 'semantic-ui-react'

import ProductCategoryTable from '../organisms/ProductCategory/ProductCategoryTable';
import ProductCategoryModal from '../organisms/ProductCategory/ProductCategoryModal';
import Main from '../layouts/Main';

class ProductCategoryTemplate extends Component {

    handleChangePagination = page => this.props.onPaginate(page)

    handleNew = () => this.props.onClickNew()

    handleExecute = (value, items) => this.props.onExecute(value, items)

    handleView = _id => this.props.onClickView(_id)

    handleCreate = productCategory => this.props.onCreate(productCategory)

    handleUpdate = productCategory => this.props.onUpdate(productCategory)

    handleDelete = async _id => this.props.onDelete(_id)

    render() {

        const { productCategoryList, productCategory, loading, totalPage, page } = this.props

        return (
            <Main>
                    
                    <ProductCategoryTable
                        loading={loading}
                        executeLoading={this.props.executeLoading}
                        body={productCategoryList}
                        totalPages={totalPage}
                        defaultActivePage={page}
                        onExecute={this.handleExecute.bind(this)}
                        onView={this.handleView.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                        onChangePagination={this.handleChangePagination.bind(this)}
                    />
                <ProductCategoryModal
                    open={this.props.isOpenModal}
                    productCategory={productCategory}
                    modalAction={this.props.modalAction}
                    onCreate={this.handleCreate.bind(this)}
                    onUpdate={this.handleUpdate.bind(this)}
                    formLoading={this.props.formLoading}
                    onClose={this.props.onModalClose}
                />
            </Main>
        )
    }
}

export default ProductCategoryTemplate;