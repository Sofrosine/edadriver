import {api} from '../../api';

const {
  GET_AVAILABLE_DRIVER,
  GET_AVAILABLE_DRIVER_SUCCESS,
  GET_AVAILABLE_DRIVER_FAILED,
  SELECT_AVAILABLE_DRIVER,
} = require('./contants');

const getAvailableDriver = () => ({
  type: GET_AVAILABLE_DRIVER,
});

const getAvailableDriverSuccess = (res) => ({
  type: GET_AVAILABLE_DRIVER_SUCCESS,
  payload: {res},
});

const getAvailableDriverFailed = (error) => ({
  type: GET_AVAILABLE_DRIVER_FAILED,
  payload: {error},
});

export const getAvailableDriverAction = () => {
  return async (dispatch) => {
    dispatch(getAvailableDriver());
    try {
      const apiReq = await api('get', 'order/available-driver');
      console.log('apireq available driver', apiReq);
      dispatch(getAvailableDriverSuccess(apiReq.data.data));
    } catch (error) {
      console.log('error get available driver', error);
      dispatch(getAvailableDriverFailed(error));
    }
  };
};

const selectAvailableDriver = (selectedDriver) => ({
  type: SELECT_AVAILABLE_DRIVER,
  payload: {selectedDriver},
});

export const selectAvailableDriverAction = (data, navigation) => {
  return async (dispatch) => {
    dispatch(selectAvailableDriver(data));
    navigation.goBack();
  };
};
