import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ICUploadWhite} from '../../../assets';
import {uploadImageAction} from '../../../redux/actions';
import {colors, fonts} from '../../../utils';
import ImageView from 'react-native-image-view';
import {View} from 'react-native';
import {Button, Gap} from '../../atoms';

const UploadButton = ({type = 'avatar', sectionType}) => {
  const dispatch = useDispatch();
  const [yo, setYo] = useState('');
  const [isDetail, setDetail] = useState(false);
  const {uploadImageReducer} = useSelector((state) => state);
  const {data, dataProductImage} = uploadImageReducer;
  const formData = new FormData();
  const handleUpload = async () => {
    ImagePicker.openCamera({
      cropping: true,
      cropperCircleOverlay: type === 'avatar' ? true : false,
    })
      .then(async (res) => {
        console.log('ress', res);
        await formData.append('image', {
          uri: res.path,
          type: res.mime,
          name: `${new Date().getTime().toString()}.jpg`,
        });
        await formData.append('section', type);
        setYo(res.path);
        dispatch(
          uploadImageAction(
            formData,
            sectionType === 'product-image' ? true : false,
          ),
        );
        // Axios.post('http://178.128.212.200/api/merchant/image/upload', formData)
        //   .then((result) => console.log('results', res))
        //   .catch((e) => console.log('error image', e));
      })
      .catch((err) => console.log('error', err));
  };

  if (sectionType === 'product-image') {
    return (
      <>
        <TouchableOpacity onPress={handleUpload} style={styles.container}>
          {!dataProductImage.url && <ICUploadWhite height={20} width={23} />}
          {dataProductImage.url && (
            <Image source={{uri: dataProductImage.url}} style={styles.image} />
          )}
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      {!data.url && (
        <TouchableOpacity onPress={handleUpload} style={styles.container}>
          <ICUploadWhite height={20} width={23} />
        </TouchableOpacity>
      )}
      {data.url && (
        <View>
          <ImageView
            images={[
              {
                source: {
                  uri: data.url,
                },
                title: 'Foto Upload',
                width: 500,
                height: 220,
              },
            ]}
            imageIndex={0}
            isVisible={isDetail}
            animationType="fade"
            onClose={() => setDetail(false)}
          />
          {!isDetail && (
            <TouchableOpacity onPress={() => setDetail(true)}>
              <Image source={{uri: data.url}} style={styles.image} />
            </TouchableOpacity>
          )}
          <Gap height={16} />
          <Button onPress={handleUpload} type="nude" text="Upload Ulang" />
          {/* <TouchableOpacity onPress={handleUpload}>
            <Text style={styles.p1Secondary}>Upload Ulang</Text>
          </TouchableOpacity> */}
          <Gap height={24} />
        </View>
      )}
    </>
  );
};

export default UploadButton;

const styles = StyleSheet.create({
  container: {
    height: 103,
    borderRadius: 4,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 103,
    borderRadius: 4,
  },
  p1Secondary: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.secondary,
  },
});
