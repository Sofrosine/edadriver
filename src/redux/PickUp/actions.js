import Axios from 'axios';
import {Alert, ToastAndroid} from 'react-native';
import {api} from '../../api';
import {getData} from '../../utils';
import {getOrderActiveAction} from '../GetOrder/actions';
import {setLoadingAction} from '../Loading/actions';
import {resetUploadImageAction} from '../UploadImage/actions';

const {PICKUP, PICKUP_SUCCESS, PICKUP_FAILED} = require('./constants');

const pickUp = () => ({
  type: PICKUP,
});

const pickUpSuccess = (res) => ({
  type: PICKUP_SUCCESS,
  payload: {res},
});

const pickUpFailed = (error) => ({
  type: PICKUP_FAILED,
  payload: {error},
});

const getUser = async () => {
  const token = await getData('@user_token');
  const location = await getData('@user_location');
  const phone = await getData('@user_phone');
  return {
    token,
    location,
    phone,
  };
};

export const pickUpAction = (formData, navigation, CommonActions) => {
  return async (dispatch) => {
    console.log('ini form', formData);
    const dataUser = await getUser();
    Alert.alert(
      'Apakah Anda yakin sudah mengambil barang?',
      '',
      [
        {
          text: 'Tidak',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            dispatch(setLoadingAction(true));
            dispatch(pickUp());
            try {
              const apiReq = await Axios.post(
                'https://calasteo.tech/api/driver/order/pickup',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${dataUser.token}`,
                  },
                },
              );
              console.log('res post pickup', apiReq);
              dispatch(pickUpSuccess(apiReq.data.data));
              dispatch(setLoadingAction(false));
              dispatch(resetUploadImageAction());
              navigation.replace('Home');
              // navigation.reset(
              //   CommonActions.reset({
              //     index: 0,
              //     routes: [{name: 'Home'}],
              //   }),
              // );
              setTimeout(() => {
                dispatch(getOrderActiveAction());
              }, 1000);
              ToastAndroid.show('Berhasil mengambil barang', 2000);
            } catch (error) {
              console.log('error post pickup', error);
              dispatch(pickUpFailed(error));
              dispatch(setLoadingAction(false));
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
};

export const completeAction = (formData, navigation) => {
  return async (dispatch) => {
    console.log('ini form', formData);
    const dataUser = await getUser();
    Alert.alert(
      'Apakah Anda yakin sudah mengambil barang?',
      '',
      [
        {
          text: 'Tidak',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            dispatch(setLoadingAction(true));
            dispatch(pickUp());
            try {
              const apiReq = await Axios.post(
                'https://calasteo.tech/api/driver/order/complete',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${dataUser.token}`,
                  },
                },
              );
              console.log('res post complete', apiReq);
              dispatch(pickUpSuccess(apiReq.data.data));
              dispatch(setLoadingAction(false)); 
              dispatch(resetUploadImageAction());
              navigation.replace('Home');
              ToastAndroid.show('Berhasil menyelesaikan order', 2000);
              setTimeout(() => {
                dispatch(getOrderActiveAction());
              }, 1000);
            } catch (error) {
              console.log('error post complete', error);
              dispatch(pickUpFailed(error));
              dispatch(setLoadingAction(false));
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
};
