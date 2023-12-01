import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
  const HomeNelayan = () => {
    const navigation = useNavigation();
    // Replace this with your actual data
    const products = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      name: `Ikan Tongkol ${i}`,
      price: `Rp. ${30_000 }/Kg`,
      image: 'https://i.ibb.co/g4BCmjD/OIP.jpg',
    }));

    const navigateToAddProduct = () => {
      console.log('Navigating to AddProduct screen...');
      navigation.navigate('AddProduct'); // Navigate to the AddProduct screen
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
              <Text style={styles.price}>{item.price}</Text>
              <Button style={{marginBottom:10}} title="View Details" onPress={() => {}} />
            </View>
            
          )}
        />
      

      <View style={styles.tabBar}>
        <Button title="Home" onPress={() => {}} />
        <Button title="Add Product" onPress={navigateToAddProduct} />
        <Button title="History" onPress={() => {}} />
        <Button title="Account" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
  },
  price: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default HomeNelayan;