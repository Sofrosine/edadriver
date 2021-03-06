import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CardTask,
  Gap,
  HomeTabBar,
  Navbar,
  NotificationAlert,
} from '../../components';
import {
  getOrderActiveAction,
  getOrderInactiveAction,
  getOrderPaginationActiveAction,
  getOrderPaginationInactiveAction,
} from '../../redux/actions';
import {colors, fonts} from '../../utils';

const Home = ({navigation}) => {
  const [tabBarActive, setTabBar] = useState(true);
  const dispatch = useDispatch();
  const {getOrderReducer} = useSelector((state) => state);
  const {showNotificationAlert, notificationTitle} = useSelector(
    (state) => state.showNotificationAlertReducer,
  );

  useEffect(() => {
    setTimeout(() => {
      tabBarActive
        ? dispatch(getOrderActiveAction())
        : dispatch(getOrderInactiveAction());
    }, 1000);
  }, [navigation]);
  return (
    <>
      {showNotificationAlert && <NotificationAlert title={notificationTitle} />}
      <SafeAreaView style={styles.pages}>
        <Navbar title="Home" />
        <View style={styles.content}>
          <Gap height={16} />
          <View style={{paddingHorizontal: 16}}>
            <HomeTabBar setState={setTabBar} isActive={tabBarActive} />
          </View>
          <Gap height={16} />
          <View style={[styles.content]}>
            {tabBarActive ? (
              getOrderReducer.activeData &&
              getOrderReducer.activeData.length > 0 ? (
                <FlatList
                  onEndReached={() =>
                    dispatch(getOrderPaginationActiveAction())
                  }
                  onEndReachedThreshold={0.5}
                  contentContainerStyle={{paddingHorizontal: 16}}
                  keyExtractor={(item) => item.id}
                  data={getOrderReducer.activeData}
                  renderItem={({item}) => (
                    <>
                      <CardTask
                        name={item.receiver_name}
                        type={item.order_status}
                        phone={item.receiver_phone}
                        location={item.receiver_address}
                        date={item.created_at}
                        onPress={() =>
                          navigation.navigate('Detail', {
                            id: item.id,
                          })
                        }
                      />
                      <Gap height={16} />
                    </>
                  )}
                />
              ) : (
                <Text
                  style={[
                    styles.h6Black,
                    {textAlign: 'center', marginTop: 20},
                  ]}>
                  No active data
                </Text>
              )
            ) : getOrderReducer.inactiveData &&
              getOrderReducer.inactiveData.length > 0 ? (
              <FlatList
                onEndReached={() =>
                  dispatch(getOrderPaginationInactiveAction())
                }
                onEndReachedThreshold={0.5}
                contentContainerStyle={{paddingHorizontal: 16}}
                keyExtractor={(item) => item.id}
                data={getOrderReducer.inactiveData}
                renderItem={({item}) => (
                  <>
                    <CardTask
                      name={item.receiver_name}
                      type={item.order_status}
                      phone={item.receiver_phone}
                      location={item.receiver_address}
                      date={item.created_at}
                      onPress={() =>
                        navigation.navigate('Detail', {
                          id: item.id,
                        })
                      }
                    />
                    <Gap height={16} />
                  </>
                )}
              />
            ) : (
              <Text
                style={[styles.h6Black, {textAlign: 'center', marginTop: 20}]}>
                No inactive data
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white2,
  },
  content: {
    flex: 1,
  },
  contentScroll: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  h6Black: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: fonts.primary[600],
    color: colors.text.black,
  },
  p3Regular: {
    fontSize: 10,
    fontFamily: fonts.primary[400],
    color: colors.text.gray,
  },
  bottomBarTextWrapper: {
    alignSelf: 'center',
    elevation: 4,
    backgroundColor: colors.white,
    padding: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    bottom: 0,
    position: 'absolute',
  },
  buttonBarWrapper: {
    backgroundColor: colors.white,
    height: 61,
  },
  buttonFloatWrapper: {
    width: 68,
    height: 68,
    borderRadius: 200,
    backgroundColor: colors.white2,
    alignSelf: 'center',
    bottom: 28,
    position: 'absolute',
  },
});
