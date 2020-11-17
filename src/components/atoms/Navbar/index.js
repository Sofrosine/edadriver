import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {api} from '../../../api';
import {
  ICHomeWhite,
  ICInvoiceWhite,
  ICLeftWhite,
  ICLogoutWhite,
} from '../../../assets';
import {setLoadingAction} from '../../../redux/actions';
import {colors, fonts, getData} from '../../../utils';

const Navbar = ({title, onPress, type}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {name} = route;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert(
      'Apakah Anda yakin ingin keluar?',
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
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            );
            const imei = await getData('imeiToken');
            try {
              const apiReq = await api('post', 'auth/logout', {
                imei,
              });
              console.log('apiReq logout success', apiReq);
              AsyncStorage.removeItem('@user_token');
              ToastAndroid.show('Berhasil logout', 2000);
            } catch (error) {
              console.log('apiReq logout error', error);
              Alert.alert('Ada masalah saat melakukan logout, harap coba lagi');
            }
            dispatch(setLoadingAction(false));
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    console.log('anana', name);
  }, []);
  if (type === 'back') {
    return (
      <LinearGradient
        start={{x: 0.0, y: 0}}
        end={{x: 0.7, y: 1.0}}
        colors={['#4557B2', '#1E2F89']}
        style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
          <ICLeftWhite />
        </TouchableOpacity>
        <Text style={styles.h6White}>{title}</Text>
        <View />
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      start={{x: 0.0, y: 0}}
      end={{x: 0.7, y: 1.0}}
      colors={['#4557B2', '#1E2F89']}
      style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(name === 'Home' ? 'ListOrderRequest' : 'Home')
        }
        style={styles.hamburger}>
        {name !== 'Home' ? (
          <ICHomeWhite height={24} width={24} />
        ) : (
          <ICInvoiceWhite height={24} width={24} />
        )}
      </TouchableOpacity>
      <Text style={[styles.h6White]}>{title}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <ICLogoutWhite height={24} width={24} />
      </TouchableOpacity>
      <View />
    </LinearGradient>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.primary,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  h6White: {
    fontFamily: fonts.primary[500],
    fontSize: 18,
    lineHeight: 25,
    color: colors.white,
  },
  btnContainer: {
    width: 60,
    alignItems: 'flex-start',
    position: 'absolute',
    paddingLeft: 16,
    left: 8,
    borderColor: 'white',
    height: '100%',
    justifyContent: 'center',
  },
  hamburger: {
    position: 'absolute',
    left: 16,
  },
  logoutBtn: {
    position: 'absolute',
    right: 16,
  },
  buttonPrimary: {
    fontFamily: fonts.primary[500],
    fontSize: 16,
    lineHeight: 25,
    color: colors.secondary,
  },
});
