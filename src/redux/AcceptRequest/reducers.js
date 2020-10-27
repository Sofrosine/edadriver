const {
  ACCEPT_REQUEST_DRIVER,
  ACCEPT_REQUEST_DRIVER_FAILED,
  ACCEPT_REQUEST_DRIVER_SUCCESS,
} = require('./constants');

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const acceptRequestDriverReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_REQUEST_DRIVER:
      return {
        ...state,
        loading: true,
      };
    case ACCEPT_REQUEST_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.res,
      };
    case ACCEPT_REQUEST_DRIVER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      };

    default:
      return state;
  }
};

export default acceptRequestDriverReducer;
