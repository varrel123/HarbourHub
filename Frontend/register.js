import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegistrationPage = () => {
  const navigation = useNavigation();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [Role, setRole] = useState('');

  const handleRegistration = async () => {
    if (Name && Email && Address && Phone && Password && Role) {
                                       //sesuaikan dengan IP Address masing"
      const response = await axios.post('http://192.168.1.19:5000/register', { Name, Email, Password, Address, Phone, Role })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            if (response.data.message === 'Register successful') {
              alert('Register successful!');
              navigation.navigate('SelectRole');
            } else {
              alert(response.data.message);
            }
          } else if (response.status === 404) {
            alert('Register Failed');
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('Register failed. Please try again.');
        });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('SelectRole'); // Navigate back to the Login screen
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#84D3EB' }}>
      <View style={{ backgroundColor: 'white', padding: 16, width: Dimensions.get('window').width * 0.8, borderRadius: 8 }}>
        <Text style={{ fontSize: 24, color: 'gray', marginBottom: 16, textAlign: 'center', color: '#3780D1' }}>Registrasi</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setName}
          value={Name}
          placeholder="Name"
        />
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
          secureTextEntry={true}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setAddress}
          value={Address}
          placeholder="Alamat"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setPhone}
          value={Phone}
          placeholder="Telepon"
          keyboardType="phone-pad"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 10, borderRadius: 8 }}
          onChangeText={setRole}
          value={Role}
          placeholder="Role"
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
