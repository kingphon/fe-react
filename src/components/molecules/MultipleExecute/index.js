import React, { useState } from 'react'
import { Button, Select } from 'semantic-ui-react'

const MultipleExecute = ({ options, disabled = false, onExecute, loading = false }) => {
    const [dropDownValue, setDropDownValue] = useState('')

    return (
        <div style={{ display: "flex" }}>
            <Select style={{ minWidth: 160, marginRight: 8 }} fluid
                options={options}
                defaultValue={dropDownValue}
                disabled={disabled || loading}
                placeholder="-- Select an action --"
                onChange={(_, select) => setDropDownValue(select.value)}
            />
            <Button
                primary
                loading={loading}
                disabled={disabled || loading || !dropDownValue}
                onClick={_ => onExecute(dropDownValue)}>Execute</Button>
        </div>
    )
}

export default MultipleExecute