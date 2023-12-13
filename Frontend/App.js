import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginFisherman,LoginTrader} from './login';
import RegistrationPage from './register';
import { SelectRole, WelcomePage } from './selectRole';
import {HomeNelayan, HomeTrader} from './homeNelayan';
import { AddProduct, EditProduct } from './product';
import {ProductDetails, ProductDetailsTrader} from './productDetails';
import {FisherManAccount,TraderAccount,EditTraderAccount,EditFisherManAccount} from './account';
import ShowCart from './shoppingCart';
import Payment from './Payment';
import Cart from './addcart';
import AddReview from './Review';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="SelectRole" component={SelectRole} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="LoginFisherman" component={LoginFisherman} /> 
        <Stack.Screen name="LoginTrader" component={LoginTrader} />
        <Stack.Screen name="register" component={RegistrationPage} />
        <Stack.Screen name="homeNelayan" component={HomeNelayan} />
        <Stack.Screen name="homeTrader" component={HomeTrader} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="ProductDetailsTrader" component={ProductDetailsTrader} />
        <Stack.Screen name="FisherManAccount" component={FisherManAccount} />
        <Stack.Screen name="TraderAccount" component={TraderAccount} />
        <Stack.Screen name="EditTraderAccount" component={EditTraderAccount} />
        <Stack.Screen name="EditFisherManAccount" component={EditFisherManAccount} />
        <Stack.Screen name="ShowCart" component={ShowCart} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Review" component={AddReview} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
