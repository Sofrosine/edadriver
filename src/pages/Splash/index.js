import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import firebase from 'react-native-firebase';
import {useDispatch, useSelector} from 'react-redux';
import {ICEda} from '../../assets';
import {showNotificationAction} from '../../redux/actions';
import {colors, getData, storeData} from '../../utils';
import UUIDGenerator from 'react-native-uuid-generator';

const Splash = ({navigation}) => {
  const unsubscribe = async () => {
    const token = await getData('@user_token');
    const check = setTimeout(() => {
      token ? navigation.replace('Home') : navigation.replace('Login');
    }, 2000);
  };

  // CHECK PERMISSION
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  // GET FCM TOKEN
  const getToken = async () => {
    let fcmToken = await getData('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('fcmToken', fcmToken);
      if (fcmToken) {
        // user has a device token
        await storeData('fcmToken', fcmToken);
      }
    }
    let imeiToken = await getData('imeiToken');
    if (!imeiToken) {
      UUIDGenerator.getRandomUUID().then(async (uuid) => {
        await storeData('imeiToken', uuid);
      });
    }
    unsubscribe();
  };

  // REQUEST PERMISSION
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
      unsubscribe();
    }
  };

  const {showNotificationAlertReducer} = useSelector((state) => state);

  const messageListener = async () => {
    // [***SAAT DI APP***]
    const notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const {title, body, data} = notification;
        console.log('notiff', notification);
        showNotificationAlert(title, body, data);
        console.log('1');
      });

    // [***SAAT APP JALAN DI BG***]
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const {title, body} = notificationOpen.notification;
        // showNotificationAlert(title, body);
        // navigation.navigate('Passing', {
        //   id: title,
        // });
        navigation.navigate('ListOrderRequest');
        console.log('2');
      });

    // [***DIBUKA SAAT KONDISI APP CLOSE***]
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      // showNotificationAlert(title, body);
      console.log('3');
    }

    const messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  };
  const dispatch = useDispatch();

  const showNotificationAlert = (title, body, data) => {
    console.log(title, body, data);
    dispatch(showNotificationAction(true, title, body, data));
  };

  useEffect(() => {
    // AsyncStorage.clear()
    messageListener();
    setTimeout(() => {
      checkPermission();
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.pages}>
      <ICEda />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
