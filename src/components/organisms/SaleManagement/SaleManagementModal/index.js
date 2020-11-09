import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Form } from "semantic-ui-react";
import FormInput from "../../../atoms/FormInput";
import ModalModule from "../../../molecules/ModalModule";
import DatePickerModule from "../../../atoms/DatePickerModule";

import {
  SaleTable,
  TableRow,
  TableCell,
  TableHeaderCell,
  calcCellWidth
} from "../../../atoms/SaleTable";

import {
  doSave,
  closeModal
} from "../../../../redux/reducers/saleManagementReducer";

const listApplyStatus = [
  { key: "ALL", label: "Áp dụng cho tất cả sản phẩm" },
  { key: "CUSTOM", label: "Chọn sản phẩm áp dụng" }
];
const Render = ({
  sale: { saleId, name, code, percent, startDate, endDate, selectedItems },
  applyStatus,
  openModal,
  loading,
  checkAllItem,
  codeStatus,
  formLoading,
  modalFormSuccessMessage,
  onPositive,
  onClose,
  onChangeName,
  onChangeStatusCode,
  onChangeCode,
  onChangeApplyStatus,
  onChangeStartDate,
  onChangeEndDate,
  onChangePercent,
  onClickRandomCode,
  onCheckAllItem,
  onCheckItem,
  selectBox,
  errors = {},
  dataSources,
  ...rest
}) => {
  const cellWidth = calcCellWidth([100], true);

  const TableHeader = () => (
    <>
      <TableHeaderCell width={cellWidth[0]}>Tên Sản Phẩm</TableHeaderCell>
    </>
  );
  return (
    <ModalModule
      size="small"
      title={
        saleId
          ? "Cập nhật chương trình khuyến mãi"
          : "Tạo chương trình khuyến mãi"
      }
      open={openModal}
      onClose={onClose}
      onPositive={onPositive}
      {...rest}
    >
      <Form>
        <FormInput
          label="Tên chương trình: "
          placeholder="Nhập tên chương trình"
          value={name}
          onChange={onChangeName}
          required
        />
        <Form.Group>
          <Form.Field width={12}>
            <FormInput
              label="Mã giảm giá: "
              placeholder="Nhập mã giảm giá"
              style={{ paddingBottom: "10px" }}
              value={code}
              disabled={codeStatus ? false : true}
              onChange={onChangeCode}
            />
            <Form.Group inline={true}>
              <Form.Checkbox
                label="Dùng mã giảm giá"
                checked={codeStatus}
                onChange={onChangeStatusCode}
              />
              <Form.Button
                icon
                size="mini"
                disabled={codeStatus ? false : true}
                onClick={onClickRandomCode}
              >
                Ngẫu nhiên
              </Form.Button>
            </Form.Group>
          </Form.Field>
          <FormInput
            type="number"
            min="1"
            max="100"
            label="Phần trăm: "
            placeholder="%"
            width={4}
            onChange={onChangePercent}
            value={percent}
            required
          />
        </Form.Group>
        <Form.Group widths={2}>
          <DatePickerModule
            label="Thời điểm bắt đầu: "
            onChange={onChangeStartDate}
            onSelected={onChangeStartDate}
            value={startDate}
          />
          <DatePickerModule
            label="Thời điểm kết thúc: "
            onChange={onChangeEndDate}
            onSelected={onChangeEndDate}
            value={endDate}
          />
        </Form.Group>
        <Form.Group>
          {listApplyStatus.map(item => (
            <Form.Radio
              key={item.key}
              label={item.label}
              value={item.key}
              checked={applyStatus === item.key}
              onChange={onChangeApplyStatus}
            />
          ))}
        </Form.Group>
        {applyStatus === "CUSTOM" ? (
          <Form.Field>
            <Form.Group widths={3}>
              <Form.Select
                label="Theo danh mục"
                options={selectBox.categories}
                placeholder="Danh mục"
              />
              <Form.Select
                label="Theo nhóm loại sản phẩm"
                options={selectBox.groupTypes}
                placeholder="Nhóm loại sản phẩm"
              />
              <Form.Select
                label="Theo loại sản phẩm"
                options={selectBox.groups}
                placeholder="Loại sản phẩm"
              />
            </Form.Group>
            <SaleTable
              loading={loading}
              showCheckbox
              header={<TableHeader />}
              currentItems={dataSources.length}
              emptyColSpan={3}
              counter={selectedItems.length}
              checkAllItem={checkAllItem}
              onCheckAllItem={checked => onCheckAllItem(checked)}
            >
              {dataSources.map((item, index) => (
                <TableRow
                  key={index}
                  showCheckbox
                  checked={item.checked}
                  onChange={onCheckItem}
                  onCheckItem={checked => onCheckItem(index, checked)}
                >
                  <TableCell width={cellWidth[0]}>{item.name}</TableCell>
                </TableRow>
              ))}
            </SaleTable>
          </Form.Field>
        ) : (
          ""
        )}
      </Form>
    </ModalModule>
  );
};

const SaleManagementModal = ({ onPositive, ...rest }) => {
  const selector = useSelector(
    ({
      saleManagementReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        sale,
        listItems,
        // loading,
        selectBox,
        errors
      }
    }) => ({
      openModal,
      formLoading,
      modalFormSuccessMessage,
      sale,
      listItems,
      // loading,
      selectBox,
      errors
    }),
    shallowEqual
  );

  const [sale, setSale] = useState(
    Object.keys(selector.sale).length
      ? {
          ...selector.sale
        }
      : {
          name: "",
          code: "",
          percent: "",
          startDate: new Date(),
          endDate: new Date(),
          selectedItems: []
        }
  );

  const [state, setState] = useState({
    checkAllItem: false,
    dataSources: {},
    loading: false,
    applyStatus: "ALL",
    codeStatus: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setState({
      ...state,
      checkAllItem: sale.selectedItems.length === selector.listItems.length ? true : false,
      dataSources: selector.listItems.map(item => {
        let boolean = false;
        sale.selectedItems.forEach(sItem => {
          if (sItem === item.saleId) {
            boolean = true;
          }
        });
        return {
          ...item,
          checked: boolean
        };
      }),
      codeStatus: sale.code ? true : false,
      applyStatus: sale.selectedItems.length === 0 ? "ALL" : "CUSTOM",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.listItems, sale.selectedItems, sale.code]);

  const renderProps = {
    ...rest,
    ...state,
    ...selector,
    sale,
    onChangeName: (_, input) =>
      setSale({
        ...sale,
        name: input.value
      }),

    onChangeStatusCode: (_, checkbox) => setState({...state, codeStatus: checkbox.checked}),

    onChangeCode: (_, input) =>
      setSale({
        ...sale,
        code: input.value
      }),

    onChangePercent: (_, input) =>
      setSale({
        ...sale,
        percent: parseInt(input.value)
      }),

    onChangeStartDate: date =>
      setSale({
        ...sale,
        startDate: date
      }),

    onChangeEndDate: date =>
      setSale({
        ...sale,
        endDate: date
      }),

    onChangeApplyStatus: (_, radio) => setState({...state, applyStatus: radio.value}),

    onClickRandomCode: () =>
      setSale({
        ...sale,
        code: Math.random()
          .toString(36)
          .substring(3)
          .toUpperCase()
      }),
    onCheckItem: (index, checked) => {
      let arr = [];
      state.dataSources[index].checked = checked;
      state.dataSources.forEach(item =>
        item.checked === true ? arr.push(item.saleId) : null
      );
      state.checkAllItem = arr.length === state.dataSources.length;
      setState({ ...state });
      setSale({ ...sale, selectedItems: arr });
    },
    onCheckAllItem: checkAllItem => {
      let selectedItems = [];
      setState({
        ...state,
        checkAllItem,
        dataSources: state.dataSources.map(item => {
          if (checkAllItem) {
            selectedItems.push(item.saleId);
          }
          return {
            ...item,
            checked: item.checked !== checkAllItem ? checkAllItem : item.checked
          };
        })
      });
      setSale({ ...sale, selectedItems });
    },
    onPositive: _ => {
      if (!selector.codeStatus) {
        setSale({ ...sale, code: "" });
      }
      if (selector.applyStatus === "ALL") {
        setSale({ ...sale, selectedItems: [] });
      }
      return dispatch(doSave(sale));
    },
    onClose: _ => dispatch(closeModal())
  };
  return <Render {...renderProps} />;
};

export default SaleManagementModal;
