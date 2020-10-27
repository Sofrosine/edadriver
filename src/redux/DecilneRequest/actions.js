import {requestOrderAction} from '../RequestOrder/actions';

const {api} = require('../../api');
const {
  DECLINE_REQUEST_DRIVER,
  DECLINE_REQUEST_DRIVER_SUCCESS,
} = require('./constants');

const declineRequestDriver = () => ({
  type: DECLINE_REQUEST_DRIVER,
});

const declineRequestDriverSuccess = (res) => ({
  type: DECLINE_REQUEST_DRIVER_SUCCESS,
  payload: {res},
});

const declineRequestDriverFailed = (error) => ({
  type: DECLINE_REQUEST_DRIVER_SUCCESS,
  payload: {error},
});

export const declineRequestDriverAction = (formData, navigation) => {
  return async (dispatch) => {
    dispatch(declineRequestDriver());
    try {
      const apiReq = await api('post', 'order/request-switch-driver', formData);
      console.log('apireq request driver', apiReq);
      dispatch(declineRequestDriverSuccess(apiReq.data));
      dispatch(requestOrderAction());
      navigation.goBack();
    } catch (error) {
      console.log('error request driver', error);
      dispatch(declineRequestDriverFailed(error));
    }
  };
};
