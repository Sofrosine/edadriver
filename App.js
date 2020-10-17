import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider, useSelector} from 'react-redux';
import Loading from './src/components/molecules/Loading';
import configureStore from './src/redux/store';
import Routes from './src/routes';

const MainApp = () => {
  const {loading} = useSelector((state) => state.loadingReducer);
  return (
    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      {loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={configureStore()}>
      <MainApp />
    </Provider>
  );
};

export default App;
