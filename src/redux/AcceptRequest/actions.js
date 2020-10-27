import {requestOrderAction} from '../RequestOrder/actions';

const {api} = require('../../api');
const {
  ACCEPT_REQUEST_DRIVER,
  ACCEPT_REQUEST_DRIVER_SUCCESS,
  ACCEPT_REQUEST_DRIVER_FAILED,
} = require('./constants');

const acceptRequestDriver = () => ({
  type: ACCEPT_REQUEST_DRIVER,
});

const acceptRequestDriverSuccess = (res) => ({
  type: ACCEPT_REQUEST_DRIVER_SUCCESS,
  payload: {res},
});

const acceptRequestDriverFailed = (error) => ({
  type: ACCEPT_REQUEST_DRIVER_FAILED,
  payload: {error},
});

export const acceptRequestDriverAction = (formData, navigation) => {
  return async (dispatch) => {
    dispatch(acceptRequestDriver());
    try {
      const apiReq = await api('post', 'order/accept-switch-driver', formData);
      console.log('apireq request driver', apiReq);
      dispatch(acceptRequestDriverSuccess(apiReq.data));
      dispatch(requestOrderAction());
      navigation.goBack();
    } catch (error) {
      console.log('error request driver', error);
      dispatch(acceptRequestDriverFailed(error));
    }
  };
};
