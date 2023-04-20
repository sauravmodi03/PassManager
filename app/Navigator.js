import { StyleSheet } from 'react-native';
import { useDeviceOrientation} from '@react-native-community/hooks';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

export default function Navigator() {
  
  const {landscape} =  useDeviceOrientation();

  const Stack = createNativeStackNavigator();

  const handleAdd = () => {
    console.log("Pressed");
  }

  return (
          <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: true, headerStyle:{
                backgroundColor: "blue", headerTintColor: '#fff'}}} >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Register' component={Register}/>
              </Stack.Navigator>
          </NavigationContainer>
  );
}