import { View, Text, Image, TouchableOpacity } from 'react-native';
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

export default WelcomePage;