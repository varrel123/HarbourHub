import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { encode } from 'base-64';

const HomeNelayan = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const accountid = await AsyncStorage.getItem('accountid');
      const response = await axios.post('http://192.168.0.137:5000/showproduct', { accountid });

      if (response.status === 200) {
        setProducts(response.data.accounts);
      } else {
        console.error('Error fetching products:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigateToAddProduct = () => {
    console.log('Navigating to AddProduct...');
    navigation.navigate('AddProduct');
  };

  const navigateToAccount = () => {
    console.log('Navigating to Account...');
    navigation.navigate('FisherManAccount');
  };

  const navigateToProductDetails = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer);
    const base64 = encode(binary);
    return 'data:image/png;base64,' + base64;
  };

  const renderProductImage = (product) => {
    console.log('Rendering product image:', product);

    if (product.productimg && product.productimg.data) {
      const base64Image = arrayBufferToBase64(product.productimg.data);
      console.log('Base64 Image:', base64Image);
      return <Image source={{ uri: base64Image }} style={styles.productImage} />;
    }

    console.log('No Image Data');
    return <Text>No Image</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.address}>Harbour Address</Text>
      <Text style={styles.location}>Muara Angke, DKI Jakarta</Text>
      <TextInput style={styles.searchBar} placeholder="Your Searches here" />

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.productid}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {renderProductImage(item)}
            <Text style={styles.details}>{item.productname}</Text>
            <Text style={styles.details}>{item.productcost}</Text>
            <TouchableOpacity style={styles.viewDetails} onPress={() => navigateToProductDetails(item.productid)}>
              <Text style={{ color: 'white', fontSize: 8 }}>View Detail</Text>
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
  viewDetails: {
    backgroundColor: '#3780D1',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    width: 150,
    height: 30,
    alignItems: 'center',
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
