import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

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
                                        //sesuaikan dengan IP Address masing"
      const response = await axios.post('http://192.168.0.137:5000/loginFisherMan', { Email, Password })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            if (response.data.message === 'Login successful') {
              alert('Login successful!');
              navigation.navigate('homeNelayan');
            } else {
              alert(response.data.message);
            }
          } else if (response.status === 404) {
            alert('Account not found');
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('Login failed. Please try again.');
        });

    } else {
      alert('Please fill in all fields.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('register'); // Navigate to the Register screen
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topRight}>
        <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 10, color: '#3780D1', backgroundColor: '#84D3EB' }}>Select Role</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#84D3EB' }}>
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
            <Text style={{ color: 'white', fontSize: 18 }}>NEXT</Text>
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
      const response = await axios.post('http://192.168.0.137:5000/loginTraders', { Email, Password })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            if (response.data.message === 'Login successful') {
              alert('Login successful!');
              navigation.navigate('homeNelayan');
            } else {
              alert(response.data.message);
            }
          } else if (response.status === 404) {
            alert('Account not found');
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('Login failed. Please try again.');
        });

    } else {
      alert('Please fill in all fields.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('register'); // Navigate to the Register screen
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topRight}>
        <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 10, color: '#3780D1', backgroundColor: '#84D3EB' }}>Select Role</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#84D3EB' }}>
        <View style={{ backgroundColor: 'white', padding: 16, width: Dimensions.get('window').width * 0.8, borderRadius: 8 }}>
          <Text style={{ fontSize: 24, marginBottom: 16, textAlign: 'center', color: '#3780D1' }}>Login Trader</Text>
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
            <Text style={{ color: 'white', fontSize: 18 }}>NEXT</Text>
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