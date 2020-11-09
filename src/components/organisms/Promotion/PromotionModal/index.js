import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../atoms/Input";
import {
  closeModal,
  doSave,
  setPromotion,
  setModalStatus,
  setSelectedFilters
} from "../../../../redux/reducers/promotionReducer";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import ModalModule from "../../../molecules/ModalModule";
import CheckBox from "../../../atoms/CheckBox";
import TableCell from "@material-ui/core/TableCell";
import ListItems from "../../../molecules/ListItems";
import DatePicker from "../../../atoms/DatePicker";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import SelectSearch from "../../../atoms/SelectSearch";
import { ALL, CUSTOM } from "../../../../constants/entites";
import FormGroup from "../../../atoms/FormGroup";

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
  promotion: {
    promotionId,
    promotionName,
    startDate,
    endDate,
    percent,
    listProductId,
    promotionCodes,
    status
  },
  loading,
  productList,
  productFilter,
  selectedFilters,
  modalStatus,
  onChangeCodeStatus,
  onChangeApplyStatus,
  onChangeSelectedFilters,
  onChangeCode,
  onAddCode,
  onRemoveCode,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={promotionId ? "Update Promotion" : "Create Promotion"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    minWidth="650px"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      <Input
        required
        label="Promotion Name: "
        name="promotionName"
        value={promotionName}
        onChange={onChangeForm}
        disabled={!!promotionId}
        error={formErrors.promotionName}
      />
      <CheckBox
        label="Use Promotion Code"
        checked={modalStatus.codeStatus}
        onChange={onChangeCodeStatus}
      />
    </FormGroup>
    {promotionCodes
      ? promotionCodes.map((code, index) => (
          <FormGroup row key={index}>
            <Input
              width="39%"
              required
              label="Promotion Code: "
              name="code"
              value={code.code}
              onChange={(_, input) => onChangeCode(input, index)}
              disabled={!!promotionId}
              error={formErrors.promotionCode}
            />
            <Input
              width="19%"
              required
              label="Percent: "
              name="percent"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 100 } }}
              value={code.percent}
              onChange={(_, input) => onChangeCode(input, index)}
              disabled={!!promotionId}
              error={formErrors.promotionCode}
            />
            <Input
              width="19%"
              required
              label="Amount: "
              name="amount"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={code.amount}
              onChange={(_, input) => onChangeCode(input, index)}
              disabled={!!promotionId}
              error={formErrors.promotionCode}
            />
            <IconButton width="9%" onClick={_ => onAddCode(index)}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              width="9%"
              onClick={_ => onRemoveCode(index)}
              disabled={promotionCodes.length === 1}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </FormGroup>
        ))
      : null}

    <FormGroup row>
      <DatePicker
        style={{ display: "block", width: "32%" }}
        type="date"
        label="Start Date"
        name="startDate"
        value={startDate}
        onChange={onChangeForm}
      />
      <DatePicker
        style={{ display: "block", width: "32%" }}
        type="date"
        label="Start Date"
        name="endDate"
        value={endDate}
        onChange={onChangeForm}
      />
      <Input
        width="32%"
        required
        label="Percent: "
        name="percent"
        type="number"
        InputProps={{ inputProps: { min: 1, max: 100 } }}
        value={percent}
        onChange={onChangeForm}
        disabled={!!promotionId}
        error={formErrors.promotionCode}
      />
    </FormGroup>
    <FormGroup row>
      <RadioGroup
        row
        onChange={({ currentTarget: { value } }) => onChangeApplyStatus(value)}
      >
        {APPLY_STATUS.map(item => (
          <FormControlLabel
            control={<Radio />}
            key={item.key}
            label={item.label}
            value={item.key}
            labelPlacement="end"
            checked={modalStatus.applyStatus === item.key}
          />
        ))}
      </RadioGroup>
    </FormGroup>
    {modalStatus.applyStatus === "CUSTOM" ? (
      <>
        <FormGroup row>
          <SelectSearch
            style={{ display: "block", width: "32%" }}
            label="Category"
            options={productFilter.categories}
            value={selectedFilters.category}
            getOptionLabel={option => option.categoryName}
            onChange={(_, value) =>
              onChangeSelectedFilters(_, { name: "category", value })
            }
            error={formErrors.userGroup}
          />
          <SelectSearch
            style={{ display: "block", width: "32%" }}
            label="Group Type"
            options={productFilter.groupTypes}
            value={selectedFilters.groupType}
            getOptionLabel={option => option.groupTypeName}
            disabled={!selectedFilters.category}
            onChange={(_, value) =>
              onChangeSelectedFilters(_, { name: "groupType", value })
            }
            error={formErrors.userGroup}
          />
          <SelectSearch
            style={{ display: "block", width: "32%" }}
            label="Type"
            options={productFilter.types}
            value={selectedFilters.type}
            disabled={!selectedFilters.groupType}
            getOptionLabel={option => option.typeName}
            onChange={(_, value) =>
              onChangeSelectedFilters(_, { name: "type", value })
            }
            error={formErrors.userGroup}
          />
        </FormGroup>
        <ListItems
          loading={loading}
          selectKey="productId"
          headCells={headCells}
          dataSources={productList}
          row={TableRowModule}
        ></ListItems>
      </>
    ) : (
      ""
    )}
  </ModalModule>
);

const PromotionModal = () => {
  const selector = useSelector(
    ({
      promotionReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        modalStatus,
        promotion,
        loading,
        productList,
        productFilter,
        selectedFilters,
        promotionGroupList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      modalStatus,
      promotion,
      loading,
      productList,
      productFilter,
      selectedFilters,
      promotionGroupList,
      errors
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) =>
      dispatch(setPromotion({ ...selector.promotion, [name]: value })),
    onChangeCode: ({ name, value }, index) => {
      let arrTemp = selector.promotion.promotionCodes;
      arrTemp[index][name] = value;
      dispatch(
        setPromotion({
          ...selector.promotion,
          promotionCodes: arrTemp
        })
      );
    },
    onChangeCodeStatus: (_, checkbox) => {
      dispatch(
        setModalStatus({ ...selector.modalStatus, codeStatus: checkbox })
      );
      if (
        !selector.promotion.promotionCodes ||
        !selector.promotion.promotionCodes.length
      ) {
        dispatch(
          setPromotion({
            ...selector.promotion,
            promotionCodes: [
              {
                code: Math.random()
                  .toString(36)
                  .substring(3)
                  .toUpperCase(),
                percent: "",
                quantity: ""
              }
            ]
          })
        );
      } else {
        dispatch(setPromotion({ ...selector.promotion, promotionCodes: [] }));
      }
    },

    onChangeApplyStatus: status =>
      dispatch(
        setModalStatus({ ...selector.modalStatus, applyStatus: status })
      ),

    onChangeSelectedFilters: (_, { name, value }) => {
      dispatch(
        setSelectedFilters({ ...selector.selectedFilters, [name]: value })
      );
    },

    onAddCode: index => {
      let arrTemp = selector.promotion.promotionCodes;
      arrTemp.splice(++index, 0, {
        code: Math.random()
          .toString(36)
          .substring(3)
          .toUpperCase(),
        percent: "",
        quantity: ""
      });
      dispatch(
        setPromotion({
          ...selector.promotion,
          promotionCodes: arrTemp
        })
      );
    },

    onRemoveCode: index => {
      let arrTemp = selector.promotion.promotionCodes;
      arrTemp.splice(index, 1);
      dispatch(
        setPromotion({
          ...selector.promotion,
          promotionCodes: arrTemp
        })
      );
    },

    onPositive: () => dispatch(doSave(selector.promotion)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default PromotionModal;
