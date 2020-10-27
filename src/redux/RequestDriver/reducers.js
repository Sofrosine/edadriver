const {
  REQUEST_DRIVER,
  REQUEST_DRIVER_FAILED,
  REQUEST_DRIVER_SUCCESS,
} = require('./constants');

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const requestDriverReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DRIVER:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.res,
      };
    case REQUEST_DRIVER_FAILED:
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

export default requestDriverReducer;
