import React from "react";
import { Table, Image, Checkbox, Button } from "semantic-ui-react";

const ProductPackageTableRow = ({
    productPackage: { name, quantity, images, active },
    index,
    styles,
    onChangeOptionActive,
    onOpenChangeModal,
    onRemove
}) => (
    <Table.Row>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>
        <Table.Cell className={styles.imageCell}>
            {images.map((image, key) => (
                <Image
                key={key}
                className={`${styles.tableImage}${
                    image.active ? ` ${styles.tableImageActive}` : ``
                }`}
                src={image.src}
                />
            ))}
        </Table.Cell>
        <Table.Cell textAlign="center">
            <Checkbox
                checked={active}
                onChange={(_, checkbox) =>
                    onChangeOptionActive(index, checkbox.checked)
                }
            />
        </Table.Cell>
        <Table.Cell textAlign="center">
            <Button
                size="small"
                onClick={onOpenChangeModal}
                icon="edit"
                color="orange"
            />
            <Button size="small" icon="trash" color="red" onClick={onRemove} />
        </Table.Cell>
    </Table.Row>
);

export default ProductPackageTableRow;
