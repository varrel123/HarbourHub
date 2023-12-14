import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; //npm install @react-native-async-storage/async-storage


const LoginFisherman = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route
  const [role, setRole] = useState(''); // Initialize role state

  useEffect(() => {
    if (route.params && route.params.role) {
      setRole(route.params.role); // Set the role from the route parameters
    }
  }, [route.params]);

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    if (Email && Password) {
      try {
        const response = await axios.post('http://192.168.1.2:5000/loginFisherMan', { Email, Password });
  
        console.log('Response from server:', response);
  
        if (response.status === 200) {
          if (response.data.message === 'Login successful') {
            AsyncStorage.setItem('accountid', response.data.user.accountid.toString())
              .then(() => {
                console.log('Account ID saved to AsyncStorage');
              })
              .catch((error) => {
                console.error('Error saving account ID to AsyncStorage:', error);
              });
            alert('Login successful!');
            navigation.navigate('homeNelayan');
          } else {
            alert(response.data.message);
          }
        } else if (response.status === 404) {
          alert('Account not found');
        } else {
          // Handle other response status codes if needed
          alert(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };
  
  
  const navigateToRegister = () => {
    navigation.navigate('register'); // Navigate to the Register screen
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3780D1' }}>
        <View style={{ backgroundColor: 'white', padding: 16, width: Dimensions.get('window').width * 0.8, borderRadius: 8 }}>
          <Text style={{ fontSize: 24, marginBottom: 16, textAlign: 'center', color: '#3780D1' }}>Login Fisherman</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
            onChangeText={setEmail}
            value={Email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
            onChangeText={setPassword}
            value={Password}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity
            style={{ backgroundColor: '#3780D1', padding: 16, alignItems: 'center', borderRadius: 8 }}
            onPress={handleLogin}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ marginTop: 16 }} onPress={navigateToRegister}>
          <Text style={{ color: '#3780D1' }}>Belum punya akun?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoginTrader = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route
  const [role, setRole] = useState(''); // Initialize role state

  useEffect(() => {
    if (route.params && route.params.role) {
      setRole(route.params.role); // Set the role from the route parameters
    }
  }, [route.params]);

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    if (Email && Password) {
      try {
        const response = await axios.post('http://192.168.1.2:5000/loginTraders', { Email, Password });
  
        console.log('Response from server:', response);
  
        if (response.status === 200) {
          if (response.data.message === 'Login successful') {
            AsyncStorage.setItem('accountid', response.data.user.accountid.toString())
              .then(() => {
                console.log('Account ID saved to AsyncStorage');
              })
              .catch((error) => {
                console.error('Error saving account ID to AsyncStorage:', error);
              });
            alert('Login successful!');
            navigation.navigate('homeTrader');
          } else {
            alert(response.data.message);
          }
        } else if (response.status === 404) {
          alert('Account not found');
        } else {
          // Handle other response status codes if needed
          alert(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('register'); // Navigate to the Register screen
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3780D1' }}>
        <View style={{ backgroundColor: 'white', padding: 16, width: Dimensions.get('window').width * 0.8, borderRadius: 8 }}>
          <Text style={{ fontSize: 24, marginBottom: 16, textAlign: 'center', color: '#3780D1' }}>Login as Trader</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
            onChangeText={setEmail}
            value={Email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
            onChangeText={setPassword}
            value={Password}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity
            style={{ backgroundColor: '#3780D1', padding: 16, alignItems: 'center', borderRadius: 8 }}
            onPress={handleLogin}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ marginTop: 16 }} onPress={navigateToRegister}>
          <Text style={{ color: '#3780D1' }}>Belum punya akun?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topLeft: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
});

export{
  LoginFisherman,
  LoginTrader
};