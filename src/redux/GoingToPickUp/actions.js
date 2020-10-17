import {Alert} from 'react-native';
import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';

const {
  GOING_TO_PICKUP,
  GOING_TO_PICKUP_SUCCESS,
  GOING_TO_PICKUP_FAILED,
} = require('./constants');

const goingToPickUp = () => ({
  type: GOING_TO_PICKUP,
});

const goingToPickUpSuccess = (res) => ({
  type: GOING_TO_PICKUP_SUCCESS,
  payload: {res},
});

const goingToPickUpFailed = (error) => ({
  type: GOING_TO_PICKUP_FAILED,
  payload: {error},
});

export const goingToPickUpAction = (id, navigation) => {
  return async (dispatch) => {
    Alert.alert(
      'Apakah Anda yakin ingin mengambil order?',
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
            dispatch(goingToPickUp());
            try {
              const apiReq = await api('post', 'order/going-to-pickup', {
                id,
              });
              console.log('res post going to pickup', apiReq);
              dispatch(goingToPickUpSuccess(apiReq.data.data));
              dispatch(setLoadingAction(false));
              navigation.replace('Home');
            } catch (error) {
              console.log('error post going to pickup', error);
              dispatch(goingToPickUpFailed(error));
              dispatch(setLoadingAction(false));
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
};
