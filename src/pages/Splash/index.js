import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ICEda} from '../../assets';
import {colors, getData} from '../../utils';

const Splash = ({navigation}) => {
  const getToken = async () => {
    const token = await getData('@user_token');
    const check = setTimeout(() => {
      token ? navigation.replace('Home') : navigation.replace('Login');
    }, 2000);
  };
  useEffect(() => {
    getToken();
    () => {
      clearTimeout('check');
    };
  }, []);
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
