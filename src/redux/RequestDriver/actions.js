const {api} = require('../../api');
const {
  REQUEST_DRIVER,
  REQUEST_DRIVER_SUCCESS,
  REQUEST_DRIVER_FAILED,
} = require('./constants');

const requestDriver = () => ({
  type: REQUEST_DRIVER,
});

const requestDriverSuccess = (res) => ({
  type: REQUEST_DRIVER_SUCCESS,
  payload: {res},
});

const requestDriverFailed = (error) => ({
  type: REQUEST_DRIVER_FAILED,
  payload: {error},
});

export const requestDriverAction = (formData) => {
  return async (dispatch) => {
    dispatch(requestDriver());
    try {
      const apiReq = await api('post', 'order/request-switch-driver', formData);
      console.log('apireq request driver', apiReq);
      dispatch(requestDriverSuccess(apiReq.data));
    } catch (error) {
      console.log('error request driver', error);
      dispatch(requestDriverFailed(error));
    }
  };
};
