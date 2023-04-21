import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Accounts from './screens/Accounts';
import AccountDetails from './screens/AccountDetails';
import Records from './screens/Records';
import RecordDetails from './screens/RecordDetails';
import AddDoc from './screens/AddDoc';

function Routes(props) {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false, headerStyle: {
          backgroundColor: "blue", headerTintColor: '#fff'
        }
      }} >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Accounts' component={Accounts} />
        <Stack.Screen name='AccountDetails' component={AccountDetails} />
        <Stack.Screen name='All Records' component={Records} />
        <Stack.Screen name='RecordDetail' component={RecordDetails} />
        <Stack.Screen name='AddDoc' component={AddDoc} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;