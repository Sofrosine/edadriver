import {Alert} from 'react-native';
import {
  getOrderActiveAction,
  getOrderInactiveAction,
} from '../GetOrder/actions';
import {setLoadingAction} from '../Loading/actions';
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
    dispatch(setLoadingAction(true));
    dispatch(declineRequestDriver());
    try {
      const apiReq = await api('post', 'order/request-switch-driver', formData);
      console.log('apireq request driver', apiReq);
      dispatch(declineRequestDriverSuccess(apiReq.data));
      dispatch(requestOrderAction());
      dispatch(getOrderActiveAction());
      dispatch(getOrderInactiveAction());
      navigation.goBack();
    } catch (error) {
      console.log('error request driver', error);
      dispatch(declineRequestDriverFailed(error));
      Alert.alert('Terjadi kesalahan, silahkan mencoba beberapa saat lagi');
    }
    dispatch(setLoadingAction(false));
  };
};
