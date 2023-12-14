import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base64, encode } from 'base-64';


const HomeNelayan = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const [accountInfo, setAccountInfo] = useState({
      accountid: 0,
      name: '',
      email: '',
      password: '',
      address: '',
      phone: 0,
      role: '',
  });

useEffect(() => {
      // Mengambil informasi akun berdasarkan accountid yang disimpan
      AsyncStorage.getItem('accountid')
          .then((accountid) => {
              console.log('ID akun yang diambil dari AsyncStorage:', accountid);

              if (accountid) {
                  // Menggunakan permintaan GET untuk mendapatkan informasi pengguna
                  axios.post('http://192.168.1.2:5000/showuser', { accountid })
                      .then((response) => {
                          if (response.status === 200) {
                              setAccountInfo(response.data.account);
                          } else {
                              console.error('Kesalahan mengambil informasi akun:', response.data.message);
                          }
                      })
                      .catch((error) => {
                          console.error('Kesalahan mengambil informasi akun:', error);
                      });
              } else {
                  console.error('ID Akun tidak terdefinisi');
              }
          })
          .catch((error) => {
              console.error('Kesalahan mengambil ID akun dari AsyncStorage:', error);
          });
  }, []);

  const fetchProducts = async () => {
    try {
      const accountid = await AsyncStorage.getItem('accountid');
      const response = await axios.post('http://192.168.1.2:5000/showproduct', { accountid });

      if (response.status === 200) {
        console.log('Products:', response.data.accounts);
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

  const navigateToProductDetails = async (productId) => {
    // Simpan productid ke AsyncStorage sebelum menavigasi ke halaman detail
    await AsyncStorage.setItem('productid', productId);
    navigation.navigate('ProductDetails');
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer);
    const base64String = encode(binary);
    return 'data:image/jpeg;base64,' + base64String;
  };

  const renderProductImage = (product) => {
    console.log('Rendering product image:', product);

    if (product.productimg && product.productimg.data) {
      try {
        console.log('Product Image Data:', product.productimg.data);
        const base64Image = arrayBufferToBase64(product.productimg.data);
        console.log('Base64 Image:', base64Image);
        // return <Image source={{ uri: base64Image }} style={styles.productImage} />;
        return <Image source={{ uri: 'https://4.bp.blogspot.com/-HcxBqohShO8/XEDWBFODU_I/AAAAAAAAACE/40-C4_gIA4gLFpMAtl0XtfiRsskQEdyWACLcBGAs/s1600/Ikan%2Btongkol%2Bmemiliki%2Bciri%2Bkhusus.jpg' }} style={styles.productImage} />;
      }
      catch (error) {
        console.error('Error converting image data to base64:', error);
        return <Text>Error loading image</Text>;
      }
    }
    console.log('No Image Data');
    return <Text>No Image</Text>;
  };


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 0 }}>
        <Text style={{color: '#3780D1', fontWeight: 'bold'}}>Trader Address </Text>
        <Text style={{marginLeft: 'auto', color: '#3780D1', fontWeight:'bold'}}>{accountInfo.role}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#3780D1', paddingHorizontal: 20 }}>
        <Text style={{marginBottom: 5}}>{accountInfo.address}</Text>
        <Text style={{marginLeft: 'auto',marginBottom: 5}}>{accountInfo.name}</Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.productid}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {renderProductImage(item)}
            <Text style={{    fontSize: 14, textAlign: 'center', color: '#3780D1', fontWeight: 'bold'}}>{item.productname}</Text>
            <Text style={styles.details}>Rp.{item.productcost}/kg</Text>
            <TouchableOpacity style={styles.viewDetails} onPress={() => navigateToProductDetails(item.productid, item.productname)}>
              <Text style={{ color: 'white'}}>View Detail</Text>
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

const HomeTrader = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

    const [accountInfo, setAccountInfo] = useState({
        accountid: 0,
        name: '',
        email: '',
        password: '',
        address: '',
        phone: 0,
        role: '',
    });

    useEffect(() => {
        // Mengambil informasi akun berdasarkan accountid yang disimpan
        AsyncStorage.getItem('accountid')
            .then((accountid) => {
                console.log('ID akun yang diambil dari AsyncStorage:', accountid);

                if (accountid) {
                    // Menggunakan permintaan GET untuk mendapatkan informasi pengguna
                    axios.post('http://192.168.1.2:5000/showuser', { accountid })
                        .then((response) => {
                            if (response.status === 200) {
                                setAccountInfo(response.data.account);
                            } else {
                                console.error('Kesalahan mengambil informasi akun:', response.data.message);
                            }
                        })
                        .catch((error) => {
                            console.error('Kesalahan mengambil informasi akun:', error);
                        });
                } else {
                    console.error('ID Akun tidak terdefinisi');
                }
            })
            .catch((error) => {
                console.error('Kesalahan mengambil ID akun dari AsyncStorage:', error);
            });
    }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.1.2:5000/Allshowproduct');
      if (response.status === 200) {
        console.log('Products:', response.data.accounts);
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

  const navigateToShowCart = () => {
    console.log('Navigating to My Cart...');
    navigation.navigate('ShowCart');
  };

  const navigateToAccount = () => {
    console.log('Navigating to Account...');
    navigation.navigate('TraderAccount');
  };

  const navigateToProductDetails = async (productId, productName) => {
    // Simpan productid dan productname ke AsyncStorage sebelum menavigasi ke halaman detail
    try {
      await AsyncStorage.setItem('productid', productId);
      await AsyncStorage.setItem('productname', productName);
      navigation.navigate('ProductDetailsTrader');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer);
    const base64String = encode(binary);
    return 'data:image/jpeg;base64,' + base64String;
  };

  const renderProductImage = (product) => {
    console.log('Rendering product image:', product);

    if (product.productimg && product.productimg.data) {
      try {
        console.log('Product Image Data:', product.productimg.data);
        const base64Image = arrayBufferToBase64(product.productimg.data);
        console.log('Base64 Image:', base64Image);
        // return <Image source={{ uri: base64Image }} style={styles.productImage} />;
        return <Image source={{ uri: 'https://4.bp.blogspot.com/-HcxBqohShO8/XEDWBFODU_I/AAAAAAAAACE/40-C4_gIA4gLFpMAtl0XtfiRsskQEdyWACLcBGAs/s1600/Ikan%2Btongkol%2Bmemiliki%2Bciri%2Bkhusus.jpg' }} style={styles.productImage} />;
      }
      catch (error) {
        console.error('Error converting image data to base64:', error);
        return <Text>Error loading image</Text>;
      }
    }
    console.log('No Image Data');
    return <Text>No Image</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 0 }}>
        <Text style={{color: '#3780D1', fontWeight: 'bold'}}>Trader Address </Text>
        <Text style={{marginLeft: 'auto', color: '#3780D1', fontWeight:'bold'}}>{accountInfo.role}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#3780D1', paddingHorizontal: 20 }}>
        <Text style={{marginBottom: 5}}>{accountInfo.address}</Text>
        <Text style={{marginLeft: 'auto',marginBottom: 5}}>{accountInfo.name}</Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.productid}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {renderProductImage(item)}
            <Text style={{    fontSize: 14, textAlign: 'center', color: '#3780D1', fontWeight: 'bold'}}>{item.productname}</Text>
            <Text style={styles.details}>Rp.{item.productcost}/kg</Text>
            <TouchableOpacity style={styles.viewDetails} onPress={() => navigateToProductDetails(item.productid, item.productname)}>
              <Text style={{ color: 'white'}}>View Detail</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.bottomNavButton} onPress={navigateToShowCart}>
          <AntDesign name="shoppingcart" size={24} color='#3780D1' />
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
    backgroundColor: 'white',
  },
  viewDetails: {
    backgroundColor: '#3780D1',
    borderRadius: 8,
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productContainer: {
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3780D1',
    borderWidth: 1,
    margin: 20,
    borderRadius: 15
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

export { HomeNelayan, HomeTrader };
