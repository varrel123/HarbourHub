import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#84D3EB' }}>
      <Text style={{ fontSize: 30, color: 'white', marginBottom: 16 }}>Welcome to:</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SelectRole')}>
        <Image 
          
          style={{ height: 200, width: 200, marginBottom: 50 }} 
          source={{ uri: 'https://i.ibb.co/R2pr1S9/Gojo-Logo-Template-1.png' }} 
        />
      </TouchableOpacity>
      
    </View>
  );
};

const SelectRole = ({ navigation }) => {
  const handleNelayanPress = () => {
    navigation.navigate('Login', { role: 'Nelayan' });
  };

  const handlePedagangIkanPress = () => {
    navigation.navigate('Login', { role: 'Pedagang Ikan' });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#84D3EB' }}>
      <Text style={{ fontSize: 24, color: 'white', marginBottom: 16 }}>Select Role:</Text>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16, width: 200, alignItems: 'center' }}
        onPress={handleNelayanPress}
      >
        <Text style={{ color: '#3780D1', fontSize: 18 }}>Nelayan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, width: 200, alignItems: 'center' }}
        onPress={handlePedagangIkanPress}
      >
        <Text style={{ color: '#3780D1', fontSize: 18 }}>Pedagang Ikan</Text>
      </TouchableOpacity>
    </View>
  );
};

export  {SelectRole, WelcomePage};