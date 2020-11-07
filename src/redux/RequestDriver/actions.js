import {CommonActions} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import {
  getOrderActiveAction,
  getOrderInactiveAction,
} from '../GetOrder/actions';
import {setLoadingAction} from '../Loading/actions';

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

export const requestDriverAction = (formData, navigation) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(requestDriver());
    try {
      const apiReq = await api('post', 'order/request-switch-driver', formData);
      console.log('apireq request driver', apiReq);
      dispatch(requestDriverSuccess(apiReq.data));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
      dispatch(getOrderActiveAction());
      dispatch(getOrderInactiveAction());
      ToastAndroid.show('Berhasil mengalihkan order', 2000);
    } catch (error) {
      console.log('error request driver', error);
      dispatch(requestDriverFailed(error));
    }
    dispatch(setLoadingAction(false));
  };
};
