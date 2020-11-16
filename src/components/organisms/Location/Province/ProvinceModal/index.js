import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../../atoms/Input";
import {
  closeModal,
  doSave,
  setProvince,
  setModalStatus,
  setSelectedFilters
} from "../../../../../redux/reducers/Location/provinceReducer";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import ModalModule from "../../../../molecules/ModalModule";
import FormInputSlug from "../../../../atoms/FormInputSlug";
import CheckBox from "../../../../atoms/CheckBox";
import TableCell from "@material-ui/core/TableCell";
import ListItems from "../../../../molecules/ListItems";
import DatePicker from "../../../../atoms/DatePicker";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import SelectSearch from "../../../../atoms/SelectSearch";
import { ALL, CUSTOM } from "../../../../../constants/entites";
import FormGroup from "../../../../atoms/FormGroup";

const headCells = [{ id: "productName", label: "Product Name" }];
const TableRowModule = ({ productName }) => (
  <>
    <TableCell style={{ maxWidth: "230px" }}>
      <span>{productName}</span>
    </TableCell>
  </>
);

const APPLY_STATUS = [
  { key: ALL, label: "Apply on all product" },
  { key: CUSTOM, label: "Custom" }
];

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  province: {
    provinceId,
    provinceName,
    provinceSlugName
  },
  customizeSlug,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
    <ModalModule
      title={provinceId ? "Update Province" : "Create Province"}
      open={openModal}
      loading={formLoading}
      modalSuccess={modalFormSuccessMessage}
      minWidth="500px"
      onPositive={onPositive}
      onClose={onClose}
    >
      <FormGroup row>
        {/* <FormInputSlug
          tabIndex={0}
          fluid
          type="text"
          name="name"
          label="Province Name: "
          required
          defaultValue={provinceName}
          defaultSlugValue={provinceSlugName}
          valueError={errors.provinceName}
          slugValueError={errors.provinceSlugName}
          onChange={onChangeForm}
          onChangeSlugValue={onChangeForm} /> */}
      </FormGroup>
    </ModalModule>
  );

const ProvinceModal = () => {
  const selector = useSelector(
    ({
      provinceReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        province,
        customizeSlug,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      province,
      customizeSlug,
      errors
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) =>
      dispatch(setProvince({ ...selector.province, [name]: value })),

    onPositive: () => dispatch(doSave(selector.province)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProvinceModal;
