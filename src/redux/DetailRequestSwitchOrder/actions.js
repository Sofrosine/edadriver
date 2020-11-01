import {
  DETAIL_REQUEST_SWITCH_ORDER,
  DETAIL_REQUEST_SWITCH_ORDER_SUCCESS,
  DETAIL_REQUEST_SWITCH_ORDER_FAILED,
} from './constants';
import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';

const getDetailRequestSwitchOrder = () => ({
  type: DETAIL_REQUEST_SWITCH_ORDER,
});

const getDetailRequestSwitchOrderSuccess = (res) => ({
  type: DETAIL_REQUEST_SWITCH_ORDER_SUCCESS,
  payload: {res},
});

const getDetailRequestSwitchOrderFailed = (error) => ({
  type: DETAIL_REQUEST_SWITCH_ORDER_FAILED,
  payload: {error},
});

export const getDetailRequestSwitchOrderAction = (id) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(getDetailRequestSwitchOrder());
    try {
      const apiReq = await api(
        'get',
        `order/detail-request-switch-driver?id=${id}`,
      );
      dispatch(getDetailRequestSwitchOrderSuccess(apiReq.data.data));
      console.log('apih detail', apiReq.data.data);
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('get detail order', error);
      dispatch(getDetailRequestSwitchOrderFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};
