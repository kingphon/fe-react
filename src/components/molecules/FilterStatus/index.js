import React from 'react'
import Fieldset from '../../atoms/Fieldset'
import { Radio, FormGroup, RadioGroup, FormControlLabel } from '@material-ui/core';
import { ALL } from '../../../constants/entites';

const FilterStatus = ({
    children,
    statusValue = ALL,
    listStatus = [],
    onChangeStatus,
    ...rest
}) => (
    <Fieldset icon="sort content descending" title="Status" {...rest}>
        {children}
        <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <FormGroup row>
                <RadioGroup row
                    onChange={({ currentTarget: { value }}) => onChangeStatus(value)}
                >
                    {listStatus.map(item => (
                        <FormControlLabel
                            control={<Radio />}
                            key={item.key}
                            label={item.label}
                            value={item.key}
                            labelPlacement="end"
                            checked={statusValue === item.key}
                        />
                    ))}
                </RadioGroup>
            </FormGroup>
        </div>
    </Fieldset>
)

export default FilterStatus