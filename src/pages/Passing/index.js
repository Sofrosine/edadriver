import React, {useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {IMGMenuBackground} from '../../assets';
import {
  Badge,
  Button,
  Gap,
  ListDetailOrder,
  Navbar,
  NotificationAlert,
} from '../../components';
import {
  acceptRequestDriverAction,
  declineRequestDriverAction,
  getDetailOrderAction,
  getDetailRequestSwitchOrderAction,
  resetUploadImageAction,
} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const Passing = ({route, navigation}) => {
  const [update, setUpdate] = useState(false);
  const {id} = route.params;
  const {data} = useSelector((state) => state.detailRequestSwitchOrderReducer);
  const {showNotificationAlert, notificationTitle} = useSelector(
    (state) => state.showNotificationAlertReducer,
  );
  const {details} = data;
  const dispatch = useDispatch();

  const handleAccept = () => {
    const formData = new FormData();
    formData.append('id', id);
    dispatch(acceptRequestDriverAction(formData, navigation));
  };
  const handleDecline = () => {
    const formData = new FormData();
    formData.append('id', id);
    dispatch(declineRequestDriverAction(formData, navigation));
  };

  const openMap = () => {
    var scheme =
      Platform.OS === 'ios'
        ? 'http://maps.apple.com/maps?daddr='
        : 'http://maps.google.com/maps?daddr=';
    var url =
      scheme +
      `${Number(data.order.sender_latitude)},${Number(
        data.order.sender_longitude,
      )}`;
    console.log('urur', url);
    Linking.openURL(url);
  };

  useEffect(() => {
    dispatch(getDetailRequestSwitchOrderAction(id));
    console.log('aiwkawk', data);
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
              <FastImage source={IMGMenuBackground} style={styles.avatar} />
              <Gap width={8} />
              <View>
                <Text style={styles.p2GrayRegular}>Nama Requester</Text>
                <Gap height={4} />
                <Text style={styles.p1Bold}>
                  {(data.requester && data.requester.driver_name) || ''}
                </Text>
              </View>
            </View>
            <Gap height={16} />
            <ListDetailOrder
              title="Nama Penerima"
              subtitle={data.order && data.order.receiver_name}
            />
            <Gap height={16} />
            <ListDetailOrder
              title="Nomor Handphone"
              subtitle={data.order && data.order.receiver_phone}
            />
            <Gap height={16} />
            <ListDetailOrder
              title="Alamat Penerima"
              subtitle={data.order && data.order.receiver_address}
            />
            <Gap height={16} />
            <Button onPress={openMap} type="nude" text="Lihat Lokasi" />
            <Gap height={16} />
            <ListDetailOrder
              title="Harga"
              subtitle={data.order && data.order.total_amount}
            />
            <Gap height={24} />
            <Button onPress={handleDecline} type="delete" text="Reject Order" />
            <Gap height={16} />
            <Button
              onPress={handleAccept}
              type="edit"
              text="Pick Up Order Now"
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Passing;

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
    height: 200,
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
});
