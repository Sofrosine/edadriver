import {Alert, ToastAndroid} from 'react-native';
import {
  getOrderActiveAction,
  getOrderInactiveAction,
} from '../GetOrder/actions';
import {setLoadingAction} from '../Loading/actions';
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
    dispatch(setLoadingAction(true));
    dispatch(acceptRequestDriver());
    try {
      const apiReq = await api('post', 'order/accept-switch-driver', formData);
      console.log('apireq request driver', apiReq);
      dispatch(acceptRequestDriverSuccess(apiReq.data));
      dispatch(requestOrderAction());
      dispatch(getOrderActiveAction());
      dispatch(getOrderInactiveAction());
      navigation.goBack();
    } catch (error) {
      console.log('error request driver', error);
      dispatch(acceptRequestDriverFailed(error));
      Alert.alert('Terjadi kesalahan, silahkan mencoba beberapa saat lagi');
    }
    dispatch(setLoadingAction(false));
  };
};
