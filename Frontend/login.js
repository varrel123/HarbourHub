import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route
  const [role, setRole] = useState(''); // Initialize role state

  useEffect(() => {
    if (route.params && route.params.role) {
      setRole(route.params.role); // Set the role from the route parameters
    }
  }, [route.params]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      // Navigate back to the Login screen
      navigation.navigate('home');
    } else {
      // Show an error message
      alert('Please fill in all fields.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('register'); // Navigate to the Register screen
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topRight}>
        <Text style={{ fontSize: 20, paddingLeft:10, paddingTop:10, color: '#3780D1',backgroundColor: '#84D3EB' }}>Select Role</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#84D3EB' }}>
        <View style={{ backgroundColor: 'white', padding: 16, width: Dimensions.get('window').width * 0.8, borderRadius: 8  }}>
          <Text style={{ fontSize: 24, marginBottom: 16, textAlign: 'center', color: '#3780D1' }}>Login</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft:10, borderRadius: 8 }}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft:10, borderRadius: 8 }}
            onChangeText={setPassword}
            value={password}
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

export default LoginPage;