import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  AvailableDriverList,
  Detail,
  Home,
  ListRequestOrder,
  Login,
  Passing,
  Splash,
} from '../pages';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const DrawerRouter = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <DrawerContent {...props} />}
//       drawerContentOptions={{}}
//       drawerStyle={{width: '80%', zIndex: 999}}
//       initialRouteName="Home">
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="List Order Request" component={ListRequestOrder} />
//     </Drawer.Navigator>
//   );
// };

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
      <Drawer.Screen name="ListOrderRequest" component={ListRequestOrder} />
      <Drawer.Screen
        name="AvailableDriverList"
        component={AvailableDriverList}
      />
    </Stack.Navigator>
  );
};

export default Routes;
