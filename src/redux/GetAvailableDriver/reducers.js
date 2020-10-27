const {
  GET_AVAILABLE_DRIVER,
  GET_AVAILABLE_DRIVER_SUCCESS,
  GET_AVAILABLE_DRIVER_FAILED,
  SELECT_AVAILABLE_DRIVER,
} = require('./contants');

const initialState = {
  loading: false,
  data: [],
  selectedDriver: {}, 
  error: false,
};

const getAvailableDriverReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABLE_DRIVER:
      return {
        ...state,
        loading: true,
      };
    case GET_AVAILABLE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.res,
      };
    case GET_AVAILABLE_DRIVER_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.error,
      };
    case SELECT_AVAILABLE_DRIVER:
      return {
        ...state,
        selectedDriver: action.payload.selectedDriver,
      };
    default:
      return state;
  }
};

export default getAvailableDriverReducer;
