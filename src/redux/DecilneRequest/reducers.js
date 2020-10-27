const {
  DECLINE_REQUEST_DRIVER,
  DECLINE_REQUEST_DRIVER_FAILED,
  DECLINE_REQUEST_DRIVER_SUCCESS,
} = require('./constants');

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const declineRequestDriverReducer = (state = initialState, action) => {
  switch (action.type) {
    case DECLINE_REQUEST_DRIVER:
      return {
        ...state,
        loading: true,
      };
    case DECLINE_REQUEST_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.res,
      };
    case DECLINE_REQUEST_DRIVER_FAILED:
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

export default declineRequestDriverReducer;
