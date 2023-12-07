import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
 
  const HomeNelayan = () => {
    const navigation = useNavigation();
    // Replace this with your actual data
    const products = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      name: `Ikan Tongkol`,
      price: `Rp. ${30_000 }/Kg`,
      image: 'https://i.ibb.co/g4BCmjD/OIP.jpg',
    }));

    const navigateToAddProduct = () => {
      console.log('Navigating to AddProduct...');
      navigation.navigate('AddProduct'); // Navigate to the AddProduct screen
    };

    const navigateToAccount = () => {
      console.log('Navigating to Account...');
      navigation.navigate('Account'); // Navigate to the AddProduct screen
    };

    const navigateToProductDetails = (productId) => {
      navigation.navigate('ProductDetails', { productId }); // Navigate to the ProductDetails screen with the productId
    };
    return (
      <View style={styles.container}>
        <Text style={styles.address}>Harbour Address</Text>
        <Text style={styles.location}>Muara Angke, DKI Jakarta</Text>
        <TextInput style={styles.searchBar} placeholder="Your Searches here" />
  
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.details}>{item.name}</Text> 
              <Text style={styles.details}>{item.price}</Text> 
              <TouchableOpacity style={styles.viewDetails} onPress={() => navigateToProductDetails(item.id)}>
                <Text style={{color: 'white', fontSize: 8}}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      

      <View style={styles.tabBar}>
      <TouchableOpacity style={styles.bottomNavButton} onPress={navigateToAddProduct}>
        <AntDesign name="plus" size={24} color='#3780D1' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomNavButton} onPress={navigateToAccount}>
        <AntDesign name="user" size={24} color='#3780D1' />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  viewDetails:{
    backgroundColor: '#3780D1',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    width: 150, 
    height: 30,
    alignItems: 'center' 
  },
  address: {
    fontSize: 12,
    textAlign: 'left',
    margin: 10,
  },
  location: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  productContainer: {
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
  },
  details: {
    fontSize: 12,
    textAlign: 'center',
    margin: 5,
  },
  tabBar: {
    height: 60,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#3780D1',
  },
});

export default HomeNelayan;