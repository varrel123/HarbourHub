import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SelectRolePage = () => {
  const handleNelayanPress = () => {
    // Handle Nelayan button press
  };

  const handlePedagangIkanPress = () => {
    // Handle Pedagang Ikan button press
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
      <Text style={{ fontSize: 24, color: 'white', marginBottom: 16 }}>Select Role:</Text>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16 }}
        onPress={handleNelayanPress}
      >
        <Text style={{ color: 'blue', fontSize: 18 }}>Nelayan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}
        onPress={handlePedagangIkanPress}
      >
        <Text style={{ color: 'blue', fontSize: 18 }}>Pedagang Ikan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectRolePage;
