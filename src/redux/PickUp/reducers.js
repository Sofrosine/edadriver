import {PICKUP, PICKUP_FAILED, PICKUP_SUCCESS} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const pickUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICKUP:
      return {
        ...state,
        loading: true,
      };
    case PICKUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case PICKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        error: false,
      };

    default:
      return state;
  }
};

export default pickUpReducer;
