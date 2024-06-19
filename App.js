import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SigninScreen from './src/screens/SigninScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabs from './src/screens/tabNavigator';
import SignupScreen from './src/screens/SignupScreen';
import FlatScreen from './src/screens/FlatScreen';
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Signin' screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={BottomTabs} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Signin" component={SigninScreen} />
              <Stack.Screen name="Flat" component={FlatScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}

export default App;
