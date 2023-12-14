import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { encode } from 'base-64';

const ShowCart = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
      try {
        const accountid = await AsyncStorage.getItem('accountid');
        const response = await axios.post('http://192.168.1.2:5000/showcart', { accountid });
  
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
  
    const navigateToPayment = async(productId, accountid,shoppingcartid) => {
      await AsyncStorage.setItem('shoppingcartid', shoppingcartid);
      await AsyncStorage.setItem('productid', productId);
      await AsyncStorage.setItem('accountid', accountid);
      console.log('Navigating to Order...');
      navigation.navigate('Payment');
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
        return <Image source={{ uri: 'https://4.bp.blogspot.com/-HcxBqohShO8/XEDWBFODU_I/AAAAAAAAACE/40-C4_gIA4gLFpMAtl0XtfiRsskQEdyWACLcBGAs/s1600/Ikan%2Btongkol%2Bmemiliki%2Bciri%2Bkhusus.jpg' }} style={styles.productImage} />;
      }
  
      console.log('No Image Data');
      return <Image source={{ uri: 'https://4.bp.blogspot.com/-HcxBqohShO8/XEDWBFODU_I/AAAAAAAAACE/40-C4_gIA4gLFpMAtl0XtfiRsskQEdyWACLcBGAs/s1600/Ikan%2Btongkol%2Bmemiliki%2Bciri%2Bkhusus.jpg' }} style={styles.productImage} />;
    };
  
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>My Cart</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeTrader')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>

                <FlatList
                data={products}
                numColumns={1}
                keyExtractor={(item) => item.productid}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}> 
                      {renderProductImage(item)}
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.details}>Shopping Cart ID: {item.shoppingcartid}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.details}>Product Name: {item.productname}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.details}>Account ID: {item.accountid}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.details}>Product ID:{item.productid}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.details}>Total : Rp.{item.total}</Text>
                      </View>
                      <TouchableOpacity style={styles.viewDetails} onPress={() => navigateToPayment(item.productid, item.accountid, item.shoppingcartid)}>
                          <Text style={{ color: 'white'}}>Payment</Text>
                      </TouchableOpacity>
                    </View>
                )}
                />

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
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        width: 150
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
      height: 350,
      width: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#3780D1',
      borderRadius: 15,
      marginHorizontal: 60,
      marginVertical: 10

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
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Mengatur jarak antara elemen di dalam bar
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#3780D1',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    navTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3780D1'
    },
    inputContainer: {
        marginBottom: 60
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    pickImageButton: {
        backgroundColor: '#3780D1',
        padding: 10,
        marginRight: 10,
        borderRadius: 8,
        width: 100,
        height: 40,
    },
    addButton: {
        position: 'absolute',
        bottom: 20, // Atur jarak dari bawah layar
        left: '8%', // Pusatkan tombol di tengah layar
        backgroundColor: '#3780D1',
        padding: 10,
        borderRadius: 8,
        width: 350,
        alignItems: 'center',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 12,
    },
  });

  export default ShowCart;