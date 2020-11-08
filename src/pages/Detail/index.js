import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-view';
import {useDispatch, useSelector} from 'react-redux';
import {IMGMenuBackground} from '../../assets';
import {
  Badge,
  Button,
  Gap,
  Input,
  ListDetailOrder,
  Navbar,
  NotificationAlert,
  UploadButton,
} from '../../components';
import {
  getDetailOrderAction,
  resetUploadImageAction,
} from '../../redux/actions';
import {goingToPickUpAction} from '../../redux/GoingToPickUp/actions';
import {completeAction, pickUpAction} from '../../redux/PickUp/actions';
import {colors, fonts, useForm} from '../../utils';

const Detail = ({route, navigation}) => {
  const [isMore, setMore] = useState(false);
  const [itemForm, setItemForm] = useForm({
    nominal: '',
    description: '',
  });
  const [isDetail, setDetail] = useState(false);
  const {id} = route.params;
  const {uploadImageReducer} = useSelector((state) => state);
  const {data} = useSelector((state) => state.detailOrderReducer);
  const [update, setUpdate] = useState(false);
  const {details} = data;
  const dispatch = useDispatch();
  const {showNotificationAlert, notificationTitle} = useSelector(
    (state) => state.showNotificationAlertReducer,
  );

  const openMap = () => {
    var scheme =
      Platform.OS === 'ios'
        ? 'http://maps.apple.com/maps?daddr='
        : 'http://maps.google.com/maps?daddr=';
    var url =
      scheme +
      `${Number(data.sender_latitude)},${Number(data.sender_longitude)}`;
    console.log('urur', url);
    Linking.openURL(url);
  };

  const handlePickUp = () => {
    if (isMore) {
      if (itemForm.nominal.length < 1 && Number(itemForm.nominal) < 1000) {
        return Alert.alert('Nominal wajib diisi dan harus lebih dari 1000');
      }
      if (itemForm.description.length < 1) {
        return Alert.alert('Deskripsi barang wajib diisi');
      }
      if (!uploadImageReducer.data.url) {
        return Alert.alert('Foto wajib diupload');
      }
      if (!uploadImageReducer.dataProductImage.url) {
        return Alert.alert('Foto wajib diupload');
      } else {
        const formData = new FormData();
        console.log('uplaododod', uploadImageReducer);
        formData.append('id', id);
        formData.append('image_id', uploadImageReducer.data.id);
        formData.append('hasMoreItem', isMore ? 1 : 0);
        formData.append('description', itemForm.description);
        formData.append('nominal', itemForm.nominal);
        formData.append(
          'product_image_id',
          uploadImageReducer.dataProductImage.id,
        );
        dispatch(pickUpAction(formData, navigation, CommonActions));
      }
    } else {
      if (!uploadImageReducer.data.url) {
        return Alert.alert('Foto wajib diupload');
      } else {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image_id', uploadImageReducer.data.id);
        formData.append('hasMoreItem', 0);
        dispatch(pickUpAction(formData, navigation));
      }
    }
  };

  const handleComplete = () => {
    if (!uploadImageReducer.data.url) {
      return Alert.alert('Foto wajib diupload');
    } else {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('image_id', uploadImageReducer.data.id);
      dispatch(completeAction(formData, navigation));
    }
  };

  useEffect(() => {
    dispatch(getDetailOrderAction(id));
    console.log('apapa', data);
    const yo = setTimeout(() => {
      setUpdate(!update);
    }, 1000);
    () => {
      clearTimeout(yo);
    };
  }, []);

  return (
    <>
      {showNotificationAlert && <NotificationAlert title={notificationTitle} />}

      <SafeAreaView style={styles.pages}>
        <Navbar
          onPress={() => {
            dispatch(resetUploadImageAction());
            navigation.navigate('Home');
          }}
          title="Detail Order"
          type="back"
        />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Gap height={24} />
            <View style={styles.rowCenterBetween}>
              {data.details && details && (
                <>
                  <View style={{opacity: 0}}>
                    <Badge status={data.order_status} />
                  </View>
                  <Text style={styles.p2GrayRegular}>{data.created_at}</Text>
                  <Badge status={data.order_status} />
                </>
              )}
            </View>
            <Gap height={24} />
            <View style={[styles.rowCenter, styles.avatarContainer]}>
              <Image source={IMGMenuBackground} style={styles.avatar} />
              <Gap width={8} />
              <View>
                <Text style={styles.p2GrayRegular}>Nama Pengirim</Text>
                <Gap height={4} />
                <Text style={styles.p1Bold}>{data.sender_name}</Text>
              </View>
            </View>
            <Gap height={16} />
            <ListDetailOrder
              title="Nama Penerima"
              subtitle={data.receiver_name}
            />
            <Gap height={16} />
            <ListDetailOrder
              title="Nomor Handphone"
              subtitle={data.receiver_phone}
            />
            <Gap height={16} />
            <ListDetailOrder
              title="Alamat Penerima"
              subtitle={data.receiver_address}
            />
            <Gap height={16} />
            <Button onPress={openMap} type="nude" text="Lihat Lokasi" />
            <Gap height={16} />
            <ListDetailOrder
              title="Nama Barang"
              subtitle={details && details[0].product_name}
            />
            <Gap height={16} />
            <ListDetailOrder
              title="Deskripsi Barang"
              subtitle={details && details[0].product_description}
            />
            <Gap height={16} />
            <ListDetailOrder
              title="Harga"
              subtitle={details && details[0].price}
            />
            <Gap height={16} />
            <Text style={styles.p2GrayRegular}>Foto Barang</Text>
            <Gap height={8} />
            <ImageView
              images={[
                {
                  source: {
                    uri: details && details[0].image.url,
                  },
                  title: 'Foto Upload',
                  width: 500,
                  height: 240,
                },
              ]}
              imageIndex={0}
              isVisible={isDetail}
              animationType="fade"
              onClose={() => setDetail(false)}
            />
            {!isDetail && (
              <TouchableOpacity onPress={() => setDetail(true)}>
                <Image
                  source={
                    details
                      ? {uri: details[0].image.url}
                      : {
                          uri:
                            'https://d2l12sz4ewcavz.cloudfront.net/assets/boxes/oversized_items/oversized_02-155efcabd68291d16f8fbb2376dea0dd69219898688e934490e21f6cb50eba30.jpg',
                        }
                  }
                  style={styles.image}
                />
              </TouchableOpacity>
            )}

            <Gap height={16} />
            {/* {data.order_status === 'completed' && (
              <>
                <Text style={styles.p2GrayRegular}>Foto Bukti Pengiriman</Text>
                <Gap height={8} />
                <Image
                  source={
                    details
                      ? {uri: details[0].image.url}
                      : {
                          uri:
                            'https://d2l12sz4ewcavz.cloudfront.net/assets/boxes/oversized_items/oversized_02-155efcabd68291d16f8fbb2376dea0dd69219898688e934490e21f6cb50eba30.jpg',
                        }
                  }
                  style={styles.image}
                />
                <Gap height={16} />
              </>
            )} */}
            <Gap height={24} />
            {data.order_status === 'pending' && (
              <>
                <Button
                  text="Lanjutkan"
                  onPress={() =>
                    navigation.navigate('CreateOrder2', {
                      request_order_id: data.request_order_id.id,
                      item: data.request_order_id,
                    })
                  }
                />
                <Gap height={24} />
              </>
            )}
            {data.order_status === 'going_to_pick_up' && (
              <>
                <Text style={styles.p1Bold}>Upload Foto Barang *</Text>
                <Gap height={8} />
                <UploadButton type="product-pick-up" />
                <Gap height={24} />
                <TouchableOpacity
                  onPress={() => setMore(!isMore)}
                  style={styles.rowCenter}>
                  <View style={isMore ? styles.radioOn : styles.radioOff} />
                  <Gap width={4} />
                  <Text style={styles.p2GrayRegular}>Ada Barang Tambahan?</Text>
                </TouchableOpacity>
                {isMore && (
                  <>
                    <Gap height={24} />
                    <Input
                      keyboardType="number-pad"
                      onChangeText={(val) => setItemForm('nominal', val)}
                      theme="light"
                      label="Nominal *"
                      placeholder="Masukkan jumlah nominal"
                    />
                    <Gap height={8} />
                    <Input
                      onChangeText={(val) => setItemForm('description', val)}
                      theme="light"
                      label="Deskripsi *"
                      type="description"
                      placeholder="Masukkan Deskripsi Barang"
                    />
                    <Gap height={24} />
                    <Text style={styles.p1Bold}>
                      Upload Foto Barang Tambahan *
                    </Text>
                    <Gap height={8} />
                    <UploadButton
                      type="product-image"
                      sectionType="product-image"
                    />
                  </>
                )}
                <Gap height={24} />
              </>
            )}
            {data.order_status === 'pick_up_by_driver' && (
              <View>
                <Text style={styles.p1Bold}>Upload bukti pengiriman *</Text>
                <Gap height={8} />
                <UploadButton type="product-delivered" />
              </View>
            )}
          </ScrollView>
          {data.order_status !== 'completed' && (
            <View style={{padding: 16}}>
              {data.order_status === 'pick_up_by_driver' && (
                <View>
                  <Button
                    type="edit"
                    onPress={() =>
                      navigation.navigate('AvailableDriverList', {
                        id,
                      })
                    }
                    text="Alihkan ke Driver yang lain"
                  />
                  <Gap height={8} />
                </View>
              )}
              <Button
                onPress={() =>
                  data.order_status === 'approved'
                    ? dispatch(goingToPickUpAction(id, navigation))
                    : data.order_status === 'going_to_pick_up'
                    ? handlePickUp()
                    : handleComplete()
                }
                text={
                  data.order_status === 'approved'
                    ? 'Jemput Barang'
                    : data.order_status === 'going_to_pick_up'
                    ? 'Melakukan Pengambilan Barang'
                    : 'Selesaikan Pesanan'
                }
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white2,
  },
  image: {
    width: '100%',
    height: 130,
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  p2GrayRegular: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.gray,
  },
  p3BoldWhite: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    color: colors.white,
  },
  p1Bold: {
    fontSize: 15,
    fontFamily: fonts.primary[700],
    color: colors.text.black,
  },
  badges: {
    backgroundColor: colors.tersiary,
    width: 72,
    height: 22,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 41,
    height: 41,
    borderRadius: 200,
  },
  avatarContainer: {
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderColor: colors.border.off,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWhiteText: {
    fontSize: 16,
    fontFamily: fonts.primary[500],
    color: colors.text.white,
  },
  radioOff: {
    backgroundColor: colors.border.off,
    width: 16,
    height: 16,
    borderRadius: 200,
  },
  radioOn: {
    backgroundColor: colors.secondary,
    width: 16,
    height: 16,
    borderRadius: 200,
  },
});
