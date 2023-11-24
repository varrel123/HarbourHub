import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegistration = () => {
    if (name && email && address && phone) {
      // Navigate back to the Login screen
      navigation.navigate('Login');
    } else {
      // Show an error message
      alert('Please fill in all fields.');
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigate back to the Login screen
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#84D3EB' }}>
      <View style={{ backgroundColor: 'white', padding: 16, width: Dimensions.get('window').width * 0.8 , borderRadius: 8}}>
      <Text style={{ fontSize: 24, color: 'gray', marginBottom: 16, textAlign:'center', color: '#3780D1' }}>Registrasi</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setAddress}
          value={address}
          placeholder="Alamat"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setPhone}
          value={phone}
          placeholder="Telepon"
          keyboardType="phone-pad"
        />
        <TouchableOpacity
            style={{ backgroundColor: '#3780D1', padding: 16, alignItems: 'center', borderRadius: 8 }}
            onPress={handleRegistration}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>REGISTER</Text>
          </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginTop: 16 }} onPress={navigateToLogin}>
        <Text style={{ color: '#3780D1' }}>Sudah punya akun?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationPage;
