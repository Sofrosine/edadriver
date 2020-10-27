import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Navbar} from '../../components';
import {getAvailableDriverAction} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const AvailableDriverList = ({navigation}) => {
  const {getAvailableDriverReducer} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAvailableDriverAction());
  }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <Navbar
        title="Driver List"
        type="back"
        onPress={() => navigation.goBack()}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={getAvailableDriverReducer.data}
        contentContainerStyle={{padding: 16}}
        renderItem={({item}) =>
          getAvailableDriverReducer.error ? (
            <Button
              type="nude"
              text="Reload Data"
              onPress={() => dispatch(getAvailableDriverAction())}
            />
          ) : (
            <TouchableOpacity style={styles.cardContainer}>
              <View style={styles.rowBetweenCenter}>
                <Text style={styles.p1Primary}>{item.id}</Text>
                <Text style={styles.p1Primary}>{item.driver_phone}</Text>
              </View>
              <Gap height={4} />
              <Text style={styles.p1Secondary}>{item.driver_name}</Text>
            </TouchableOpacity>
          )
        }
        ListEmptyComponent={() =>
          getAvailableDriverReducer.loading ? (
            <ActivityIndicator size={32} color={colors.secondary} />
          ) : (
            <Text style={styles.p1Secondary}>Data Kosong</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default AvailableDriverList;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  cardContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: colors.white,
  },
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  p1Primary: {
    fontFamily: fonts.primary[600],
    color: colors.primary,
    fontWeight: 'bold',
  },
  p1Secondary: {
    fontFamily: fonts.primary[600],
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
