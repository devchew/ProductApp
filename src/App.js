import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import AddProductScreen from './screens/AddProductScreen';
import {Appearance} from 'react-native';
import {SCREENS} from './strings';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: '#333333',
  },
};

function App() {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name={SCREENS.Login} component={LoginScreen} />
        <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
        <Stack.Screen
          name={SCREENS.ProductDetails}
          component={ProductDetailsScreen}
        />
        <Stack.Screen name={SCREENS.AddProduct} component={AddProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
