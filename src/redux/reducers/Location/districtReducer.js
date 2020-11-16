import axios from "axios";
import { REDUX_API_URL } from "../../../constants/redux-actions";
import { ALL, STOP, UNAVAILABLE, AVAILABLE } from "../../../constants/entites";
import {
  handleErrors,
  resetSystemErrors,
  openSystemPopup
} from "../rootReducer";

const prefix = "PROMOTION_";
// API
const PATH_API = `http://localhost:12345/district`;
const createAction = action => `${prefix}${action}`;

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  modalFormSuccessMessage: "",
  filters: {
    status: ALL
  },
  openModal: false,
  districtList: [],
  modalStatus: {
    codeStatus: false,
    applyStatus: ALL
  },
  district: {
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
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const MODAL_FORM_GET_CREATE_ACTION = createAction(
  "MODAL_FORM_GET_CREATE_ACTION"
);
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCCESS");
const SET_DISTRICT = createAction("SET_DISTRICT");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const SET_UPDATE_PROMOTION_MODAL = createAction("SET_UPDATE_PROMOTION_MODAL");
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
  districtList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setDistrict = district => ({ type: SET_DISTRICT, district });

export const closeModal = () => ({ type: CLOSE_MODAL });

export const fetchAll = () => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  return axios
    .get(PATH_API, { timeout: 5000 })
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = district => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const {
    districtId,
    districtName,
    districtSlugName,
  } = district;
  const params = {
    districtName,
    districtSlugName,
  };
  if (!districtId) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, districtId }));
  }
};
export const getCreateAction = () => dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(createButtonLoading(true));
  dispatch({
    type: MODAL_FORM_GET_CREATE_ACTION,
  });
  dispatch(createButtonLoading(false));
};


export const getUpdateAction = districtId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/${districtId}`, { timeout: 5000 })
    .then(response => {
      dispatch({
        type: SET_UPDATE_PROMOTION_MODAL,
        district: response.data.district,
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = district => async dispatch => {
  const params = JSON.stringify(district);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(modalFormSuccessMessage("District is created successfully!!"));
      dispatch(setDistrict(initialState.district));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = district => async dispatch => {
  const params = JSON.stringify(district);
  return axios
    .patch(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(modalFormSuccessMessage("District is update successfully!!"));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = districtId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  return axios
    .delete(`${PATH_API}/${districtId}`)
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        openSystemPopup(true, `Delete District #${districtId} success!!`)
      );
    })
    .catch(errors => dispatch(handleErrors(errors, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export default function (state = initialState, action) {
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
          districtList: action.districtList,
          loading: false
        };
      case MODAL_FORM_GET_CREATE_ACTION:
        return {
          ...state,
          district: initialState.district,
          openModal: true,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_DISTRICT:
        console.log(action);
        return {
          ...state,
          district: action.district,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_UPDATE_PROMOTION_MODAL:
        return {
          ...state,
          district: {
            ...action.district,
            district: action.districtList.find(
              item =>
                item.districtId === action.district.districtId
            )
          },
          districtList: action.districtList,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case CLOSE_MODAL:
        return {
          ...state,
          openModal: false,
          listLoading: false,
          district: initialState.district,
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
