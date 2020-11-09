import React from 'react';
import { useDispatch } from 'react-redux'
import { Grid, Button, Icon } from 'semantic-ui-react'
import { getCreateAction } from '../../../../redux/reducers/productTypeGroupReducer';

const Render = ({ onClickNew }) => {
    return (
        <Grid columns="equal" padded="vertically">
            <Grid.Row>
                <Grid.Column textAlign="left" verticalAlign="middle">
                    <h1>Danh sách</h1>
                </Grid.Column>
                <Grid.Column>
                    <Button icon primary floated="right" labelPosition="left"
                        onClick={onClickNew}>
                        <Icon name="plus" />
                        Thêm mới
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const ProductTypeGroupHeader = () => {
    const dispatch = useDispatch();
    const renderProps = {
        onClickNew: _ => dispatch(getCreateAction())
    }
    return <Render {...renderProps} />
}

export default ProductTypeGroupHeader