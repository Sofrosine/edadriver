import {
  SET_LOGIN,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAILED,
  SET_LOGIN_ERROR,
} from './constants';
import {api} from '../../api';
import {storeData} from '../../utils';
import Axios from 'axios';
import {Alert} from 'react-native';
import {setLoadingAction} from '../Loading/actions';
import {setRequestVerificationAction} from '../RequestVerification/actions';

const setLogin = () => ({
  type: SET_LOGIN,
});

const setLoginSuccess = (res) => ({
  type: SET_LOGIN_SUCCESS,
  payload: {res},
});

const setLoginFailed = (error) => ({
  type: SET_LOGIN_FAILED,
  payload: {error},
});

const setLoginError = (errorStatus) => ({
  type: SET_LOGIN_ERROR,
  payload: {errorStatus},
});

export const setLoginAction = (driver_email, password, navigation) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(setLogin());
    try {
      const apiReq = await Axios.post(
        'https://calasteo.tech/api/driver/auth/login',
        {
          driver_email,
          password,
          imei: 'aksjd',
          firebase_token: 'askdj',
        },
      );
      const token = await apiReq.data.data.auth.access_token;
      const user = await apiReq.data.data.user;
      const storeToken = await storeData('@user_token', token);
      const storeUser = await storeData('@user_data', user);
      dispatch(setLoginSuccess(apiReq));
      navigation.replace('Home');
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error', error.message);
      dispatch(setLoginFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

export const setLoginErrorAction = (status) => {
  return async (dispatch) => {
    dispatch(setLoginError(status));
  };
};