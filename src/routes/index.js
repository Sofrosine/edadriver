import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Detail, Home, Login, Passing, Splash} from '../pages';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
      })}
      initialRouteName="Splash">
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Passing} name="Passing" />
      <Stack.Screen component={Detail} name="Detail" />
    </Stack.Navigator>
  );
};

export default Routes;
