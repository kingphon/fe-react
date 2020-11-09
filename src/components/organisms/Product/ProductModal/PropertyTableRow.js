import React, { useState } from "react";
import { Table, Button, Input } from "semantic-ui-react";

const PropertyTableRow = ({
	item,
	key,
	onUpdateProperty,
	onRemoveProperty,
	...rest
}) => {
	const [edited, setEdited] = useState(false);
	const [name, setName] = useState(item.productPropertyName);
	const [value, setValue] = useState(item.productPropertyValue);

	const onChange = () => {
		setEdited(true);
	};
	const onUpdate = () => {
		onUpdateProperty(key, name, value);
		setEdited(false);
	};

	return (
		<Table.Row key={key} {...rest}>
			<Table.Cell>
				{edited ? (
				<Input
					fluid
					name="productPropertyName"
					value={name}
					onChange={(_, input) => setName(input.value)}
				/>
				) : (
				<span style={{ padding: "0px 5px" }}>{name}</span>
				)}
			</Table.Cell>
			<Table.Cell>
				{edited ? (
				<Input
					fluid
					value={value}
					onChange={(_, input) => setValue(input.value)}
				/>
				) : (
				<span style={{ padding: "0px 5px" }}>{value}</span>
				)}
			</Table.Cell>
			<Table.Cell textAlign="center">
				{edited ? (
				<>
					<Button
					color="green"
					size="mini"
					icon="check"
					disabled={!name || !value}
					onClick={onUpdate}
					/>
					<Button
					color="orange"
					size="mini"
					icon="close"
					disabled={!name || !value}
					onClick={_ => setEdited(false)}
					/>
				</>
				) : (
				<>
					<Button color="orange" size="mini" icon="edit" onClick={onChange} />
					<Button
					color="red"
					size="mini"
					icon="trash"
					onClick={_ => onRemoveProperty(key)}
					/>
				</>
				)}
			</Table.Cell>
		</Table.Row>
	);
};

export default PropertyTableRow;
