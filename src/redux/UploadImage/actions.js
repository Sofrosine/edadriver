import Axios from 'axios';
import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILED,
  UPLOAD_IMAGE_SUCCESS,
  RESET_UPLOAD_IMAGE,
  SET_UPLOAD_IMAGE,
  UPLOAD_PRODUCT_IMAGE_SUCCESS,
} from './constants';
import {setLoadingAction} from '../Loading/actions';
import {errorHandler, getData} from '../../utils';

const uploadImage = () => ({
  type: UPLOAD_IMAGE,
});

const uploadImageSuccess = (res) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: {res},
});

const uploadProductImageSuccess = (res) => ({
  type: UPLOAD_PRODUCT_IMAGE_SUCCESS,
  payload: {res},
});

const uploadImageFailed = (error) => ({
  type: UPLOAD_IMAGE_FAILED,
  payload: {error},
});

const resetUploadImage = () => ({
  type: RESET_UPLOAD_IMAGE,
});

const setUploadImage = (url, id) => ({
  type: SET_UPLOAD_IMAGE,
  payload: {url, id},
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

export const uploadImageAction = (formData, isProductImage) => {
  return async (dispatch) => {
    const dataUser = await getUser();
    dispatch(setLoadingAction(true));
    console.log('formdatahh', formData);
    dispatch(uploadImage());
    try {
      const apiReq = await Axios.post(
        'https://calasteo.tech/api/driver/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${dataUser.token}`,
          },
        },
      );
      console.log('apiReqq photo', apiReq);
      isProductImage
        ? dispatch(uploadProductImageSuccess(apiReq.data.data))
        : dispatch(uploadImageSuccess(apiReq.data.data));
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error image', error);
      dispatch(uploadImageFailed(error));
      dispatch(setLoadingAction(false));
      errorHandler(error);
    }
  };
};

export const resetUploadImageAction = () => {
  return async (dispatch) => {
    dispatch(resetUploadImage());
  };
};

export const setUploadImageAction = (url, id) => {
  return async (dispatch) => {
    dispatch(setUploadImage(url, id));
  };
};
