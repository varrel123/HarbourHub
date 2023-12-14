import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,FlatList  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProductDetails = () => {
  const navigation = useNavigation();

  const [productInfo, setProductInfo] = useState({
    productid: 0,
    productname: '',
    productcost: '',
    accountid: 0,
    posteddate: new Date(), // Default to current date
    description: '',
    catchdate: new Date(),
    productimg: null, // Assuming productimg is a base64 string
  });

  useEffect(() => {
    // Mengambil informasi product berdasarkan productid yang disimpan
    AsyncStorage.getItem('productid')
      .then((productid) => {
        console.log('ID product yang diambil dari AsyncStorage:', productid);
        if (productid) {
          // Menggunakan permintaan POST untuk mendapatkan informasi product
          axios.post('http://192.168.0.137:5000/showproductID', { productid })
            .then((response) => {
              if (response.data && response.data.accounts && response.data.accounts.length > 0) {
                setProductInfo(response.data.accounts[0]);
              } else {
                console.error('Kesalahan mengambil product informasi:', response.data.message);
              }
            })
            .catch((error) => {
              console.error('Kesalahan mengambil product informasi:', error);
            });
        } else {
          console.error('ID product tidak terdefinisi');
        }
      })
      .catch((error) => {
        console.error('Kesalahan mengambil ID product dari AsyncStorage:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#3780D1" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('homeNelayan')}>
          <AntDesign name="home" size={24} color="#3780D1" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        {Object.entries(productInfo).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.colon}>:</Text>
            {key === 'posteddate' || key === 'catchdate' ? (
              <Text style={styles.info}>{new Date(value).toLocaleDateString()}</Text>
            ) : key === 'productimg' && value ? (
              <Image source={{ uri: `data:image/png;base64,${value}` }} style={styles.productImage} />
            ) : (
              <Text style={styles.info}>{value}</Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.editButton, { paddingHorizontal: 20 }]}
        onPress={() => navigation.navigate('EditProduct', { productInfo })}
      >
        <Text style={{ color: 'white' }}>Edit Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductDetailsTrader = () => {
  const navigation = useNavigation();
  

  const [productInfo, setProductInfo] = useState({
    productid: 0,
    productname: '',
    productcost: '',
    accountid: 0,
    posteddate: new Date(), // Default to current date
    description: '',
    catchdate: new Date(),
    productimg: null, // Assuming productimg is a base64 string
  });

  // const [ReviewInfo, setReviewInfo] = useState({
  //   productid: 0,
  //   accountid: 0,
  //   reviewcontent: '',
  //   rating:0,
  // });

  const [ReviewInfo, setReviewInfo] = useState([]);

  const navigateToaddCart = () => {
    console.log('Navigating to My Cart...');
    navigation.navigate('Cart');
  };

  useEffect(() => {
    // Mengambil informasi product berdasarkan productid yang disimpan
    AsyncStorage.getItem('productid')
      .then((productid) => {
        console.log('ID product yang diambil dari AsyncStorage:', productid);
        if (productid) {
          // Menggunakan permintaan POST untuk mendapatkan informasi product
          axios.post('http://172.20.10.2:5000/showproductID', { productid })
            .then((response) => {
              if (response.data && response.data.accounts && response.data.accounts.length > 0) {
                setProductInfo(response.data.accounts[0]);
              } else {
                console.error('Kesalahan mengambil product informasi:', response.data.message);
              }
            })
            .catch((error) => {
              console.error('Kesalahan mengambil product informasi:', error);
            });
        } else {
          console.error('ID product tidak terdefinisi');
        }
      })
      .catch((error) => {
        console.error('Kesalahan mengambil ID product dari AsyncStorage:', error);
      });
  }, []);

  useEffect(() => {
    // Mengambil informasi product berdasarkan productid yang disimpan
    AsyncStorage.getItem('productid')
      .then((productid) => {
        console.log('ID product yang diambil dari AsyncStorage:', productid);
        if (productid) {
          // Menggunakan permintaan POST untuk mendapatkan informasi product
          axios.post('http://172.20.10.2:5000/showReview', { productid })
            .then((response) => {
              if (response.data && response.data.accounts) {
                setReviewInfo(response.data.accounts); // Change this line
              } else {
                console.error('Kesalahan mengambil product informasi:', response.data.message);
              }
            })
            .catch((error) => {
              console.error('Kesalahan mengambil product informasi:', error);
            });
        } else {
          console.error('ID product tidak terdefinisi');
        }
      })
      .catch((error) => {
        console.error('Kesalahan mengambil ID product dari AsyncStorage:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#3780D1" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('homeTrader')}>
          <AntDesign name="home" size={24} color="#3780D1" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        {Object.entries(productInfo).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.colon}>:</Text>
            {key === 'posteddate' || key === 'catchdate' ? (
              <Text style={styles.info}>{new Date(value).toLocaleDateString()}</Text>
            ) : key === 'productimg' && value ? (
              <Image source={{ uri: `data:image/png;base64,${value}` }} style={styles.productImage} />
            ) : (
              <Text style={styles.info}>{value}</Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.editButton, { paddingHorizontal: 20 }]}
        onPress={navigateToaddCart}
      >
        <Text style={{ color: 'white' }}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Menampilkan FlatList untuk reviewInfo */}
      <FlatList
        data={ReviewInfo}
        keyExtractor={(item) => item.accountid.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer} key={item.accountid}>
            <Text style={styles.reviewLabel}>Review</Text>
            <Text style={styles.reviewContent}>Content: {item.reviewcontent}</Text>
            <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3780D1',
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  colon: {
    marginHorizontal: 5,
  },
  info: {
    flex: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  editButton: {
    backgroundColor: '#3780D1',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  reviewContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewContent: {
    fontSize: 14,
    marginTop: 5,
  },
  reviewRating: {
    fontSize: 14,
    marginTop: 5,
  },
});

export {ProductDetails, ProductDetailsTrader};
