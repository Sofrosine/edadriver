import {
  GOING_TO_PICKUP,
  GOING_TO_PICKUP_FAILED,
  GOING_TO_PICKUP_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const goingToPickUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOING_TO_PICKUP:
      return {
        ...state,
        loading: true,
      };
    case GOING_TO_PICKUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GOING_TO_PICKUP_SUCCESS:
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

export default goingToPickUpReducer;
