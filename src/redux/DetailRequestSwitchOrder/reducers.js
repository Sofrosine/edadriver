import {
  DETAIL_REQUEST_SWITCH_ORDER,
  DETAIL_REQUEST_SWITCH_ORDER_SUCCESS,
  DETAIL_REQUEST_SWITCH_ORDER_FAILED,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const detailRequestSwitchOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_REQUEST_SWITCH_ORDER:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_REQUEST_SWITCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case DETAIL_REQUEST_SWITCH_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default detailRequestSwitchOrderReducer;
