import axios from "../axios";
import { REDUX_API_URL } from "../../constants/redux-actions";
import { ACTIVE } from "../../constants/entites";
import {
  handleErrors,
  resetSystemErrors,
  openSystemPopup
} from "./rootReducer";

const prefix = "PRODUCT_BRAND_";
// API
const PATH_API = `http://localhost:5000/product/brand`;
const createAction = action => `${prefix}${action}`;

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  modalFormSuccessMessage: "",
  filters: {},
  openModal: false,
  productBrandList: [],
  productBrand: {
    status: ACTIVE
  },
  modalStatus: {
    slugBasedOnName: true
  },
  errors: {
    formErrors: {},
    errorMessage: ""
  }
};

const LIST_LOADING = createAction("LIST_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const RELOAD = createAction("RELOAD");
const PREPARE_DATA = createAction("PREPARE_DATA");
const UPDATE_FILTERS = createAction("UPDATE_FILTERS");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const MODAL_FORM_GET_CREATE_ACTION = createAction(
  "MODAL_FORM_GET_CREATE_ACTION"
);
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS");
const SET_PRODUCT_BRAND = createAction("SET_PRODUCT_BRAND");
const SET_MODAL_STATUS = createAction("SET_MODAL_STATUS");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const SET_UPDATE_PRODUCT_BRAND_MODAL = createAction(
  "SET_UPDATE_PRODUCT_BRAND_MODAL"
);
const HANDLE_ERRORS = createAction("HANDLE_ERRORS");
const SET_ERRORS = createAction("SET_ERRORS");

const listLoading = loading => ({ type: LIST_LOADING, loading });
const createButtonLoading = loading => ({
  type: CREATE_BUTTON_LOADING,
  loading
});
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading });
const prepareData = data => ({
  type: PREPARE_DATA,
  productBrandList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setProductBrand = productBrand => ({
  type: SET_PRODUCT_BRAND,
  productBrand
});

export const setModalStatus = modalStatus => ({
  type: SET_MODAL_STATUS,
  modalStatus
});

export const closeModal = () => ({ type: CLOSE_MODAL });
export const fetchAll = () => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  return axios
    .get(PATH_API)
    .then(response => {
      dispatch(prepareData(response.data));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = productBrand => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const { productBrandId, image, name, slugName, status } = productBrand;
  const params = { productBrandId, image, name, slugName, status };
  if (!productBrandId) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, productBrandId }));
  }
};
export const getCreateAction = () => dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(createButtonLoading(true));
  dispatch({
    type: MODAL_FORM_GET_CREATE_ACTION
  });
  dispatch(createButtonLoading(false));
};

export const getUpdateAction = productBrandId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/${productBrandId}`)
    .then(response => {
      dispatch({
        type: SET_UPDATE_PRODUCT_BRAND_MODAL,
        productBrand: response.data
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = productBrand => async dispatch => {
  const params = JSON.stringify(productBrand);
    axios.post(`${PATH_API}`, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        modalFormSuccessMessage("ProductBrand is created successfully!!")
      );
      dispatch(setProductBrand(initialState.productBrand));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = productBrand => async dispatch => {
  const params = JSON.stringify(productBrand);
  console.log(productBrand
  )
  return axios
    .patch(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        modalFormSuccessMessage("ProductBrand is update successfully!!")
      );
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = productBrandId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  return axios
    .delete(`${PATH_API}/${productBrandId}`)
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        openSystemPopup(
          true,
          `Delete ProductBrand #${productBrandId} success!!`
        )
      );
    })
    .catch(errors => dispatch(handleErrors(errors, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters });

export default function(state = initialState, action) {
  // console.log(action.type)
  try {
    switch (action.type) {
      case LIST_LOADING:
        return { ...state, loading: action.loading };
      case CREATE_BUTTON_LOADING:
        return { ...state, createButtonLoading: action.loading };
      case RELOAD:
        return { ...state, reload: true };
      case MODAL_FORM_UPDATE_SUCCESS:
        return { ...state, modalFormSuccessMessage: action.message };
      case OPEN_MODAL:
        return { ...state, openModal: action.openModal };
      case MODAL_FORM_LOADING:
        return {
          ...state,
          formLoading: action.loading,
          errors: action.loading ? initialState.errors : state.errors
        };
      case PREPARE_DATA:
        return {
          ...state,
          productBrandList: action.productBrandList,
          loading: false
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case MODAL_FORM_GET_CREATE_ACTION:
        return {
          ...state,
          productBrand: initialState.productBrand,
          openModal: true,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_PRODUCT_BRAND:
        return {
          ...state,
          productBrand: action.productBrand,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_MODAL_STATUS:
        return {
          ...state,
          modalStatus: action.modalStatus,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_UPDATE_PRODUCT_BRAND_MODAL:
        return {
          ...state,
          productBrand: {
            ...action.productBrand
          },
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case CLOSE_MODAL:
        return {
          ...state,
          openModal: false,
          listLoading: false,
          productBrand: initialState.productBrand,
          formLoading: initialState.formLoading,
          errors: initialState.errors
        };
      case SET_ERRORS:
        return {
          ...state,
          errors: {
            ...initialState.errors,
            ...action.errors
          }
        };
      case HANDLE_ERRORS:
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.errors.response.data
          }
        };
      default:
        return { ...state };
    }
  } catch (error) {
    console.log(error);
  } finally {
  }

  return state;
}
