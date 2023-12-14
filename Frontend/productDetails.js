import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
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

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <Text>
        <Text style={{ color: '#3780D1' }}>{filledStars}</Text>
        {emptyStars}
      </Text>
    );
  };
  
  useEffect(() => {
    // Mengambil informasi product berdasarkan productid yang disimpan
    AsyncStorage.getItem('productid')
      .then((productid) => {
        console.log('ID product yang diambil dari AsyncStorage:', productid);
        if (productid) {
          // Menggunakan permintaan POST untuk mendapatkan informasi product
          axios.post('http://192.168.1.2:5000/showproductID', { productid })
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
            axios.post('http://192.168.1.2:5000/showReview', { productid })
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

  const [ReviewInfo, setReviewInfo] = useState([]);

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
        {productInfo.hasOwnProperty('productimg') && (
          <View style={styles.row}>
            <Image source={{ uri: 'https://4.bp.blogspot.com/-HcxBqohShO8/XEDWBFODU_I/AAAAAAAAACE/40-C4_gIA4gLFpMAtl0XtfiRsskQEdyWACLcBGAs/s1600/Ikan%2Btongkol%2Bmemiliki%2Bciri%2Bkhusus.jpg' }}
              style={styles.productImage}
            />
          </View>
        )}

      <View style={styles.inputContainer2}>
        <Text style={styles.productName}>{productInfo.productname}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#3780D1' }}>
          <Text style={styles.productCost}>Rp. {productInfo.productcost}/Kg</Text>
          <Text style={{ marginLeft: 'auto' }}>{ReviewInfo.length} Reviews</Text>
        </View>
      </View>

        <View style={styles.descriptionContainer}>
          <Text style={{fontSize:16, paddingHorizontal: 20, color:'#3780D1', fontWeight: 'bold', marginTop: 10 }}>Description</Text>
            <Text style={{fontSize: 15, paddingHorizontal: 20}}>{productInfo.description}</Text>
            
            <View style={styles.row }>
              <Text style={styles.label}>Caught On</Text>
              <Text style={styles.colon}>:</Text>
              {productInfo.hasOwnProperty('catchdate') ? (
                <Text style={styles.info}> {new Date(productInfo.catchdate).toLocaleDateString()}</Text>
              ) : (
                <Text style={styles.info}>Not Available</Text>
              )}
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Posted On</Text>
              <Text style={styles.colon}>:</Text>
              {productInfo.hasOwnProperty('posteddate') ? (
                <Text style={styles.info}> {new Date(productInfo.posteddate).toLocaleDateString()}</Text>
              ) : (
                <Text style={styles.info}>Not Available</Text>
              )}
            </View>

        </View>

        <View>  
          <Text style={styles.reviewLabel}>Review</Text>
        </View>
        
        <FlatList
          data={ReviewInfo}
          keyExtractor={(item) => item.accountid.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer} key={item.accountid}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.reviewRating}>Rating: </Text>
                <Text>{renderStars(item.rating)}</Text>
              </View>
              <Text style={styles.reviewContent}>Content: {item.reviewcontent}</Text>
            </View>
          )}
        />
        <View style={styles.tabBar}>
          <TouchableOpacity
              style={[styles.editButton, { paddingHorizontal: 20 }]}
              onPress={() => navigation.navigate('EditProduct', { productInfo })}
            >
              <Text style={{ color: 'white' }}>Edit Product</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </View>

  );
};

const ProductDetailsTrader = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);


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

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <Text>
        <Text style={{ color: '#3780D1' }}>{filledStars}</Text>
        {emptyStars}
      </Text>
    );
  };

  useEffect(() => {
    // Mengambil informasi product berdasarkan productid yang disimpan
    AsyncStorage.getItem('productid')
      .then((productid) => {
        console.log('ID product yang diambil dari AsyncStorage:', productid);
        if (productid) {
          // Menggunakan permintaan POST untuk mendapatkan informasi product
          axios.post('http://192.168.1.2:5000/showproductID', { productid })
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
          axios.post('http://192.168.1.2:5000/showReview', { productid })
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
        {productInfo.hasOwnProperty('productimg') && (
          <View style={styles.row}>
            <Image source={{ uri: 'https://4.bp.blogspot.com/-HcxBqohShO8/XEDWBFODU_I/AAAAAAAAACE/40-C4_gIA4gLFpMAtl0XtfiRsskQEdyWACLcBGAs/s1600/Ikan%2Btongkol%2Bmemiliki%2Bciri%2Bkhusus.jpg' }}
              style={styles.productImage}
            />
          </View>
        )}

      <View style={styles.inputContainer2}>
        <Text style={styles.productName}>{productInfo.productname}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#3780D1' }}>
          <Text style={styles.productCost}>Rp. {productInfo.productcost}/Kg</Text>
          <Text style={{ marginLeft: 'auto' }}>{ReviewInfo.length} Reviews</Text>
        </View>
      </View>

        <View style={styles.descriptionContainer}>
          <Text style={{fontSize:16, paddingHorizontal: 20, color:'#3780D1', fontWeight: 'bold', marginTop: 10 }}>Description</Text>
            <Text style={{fontSize: 15, paddingHorizontal: 20}}>{productInfo.description}</Text>
            
            <View style={styles.row }>
              <Text style={styles.label}>Caught On</Text>
              <Text style={styles.colon}>:</Text>
              {productInfo.hasOwnProperty('catchdate') ? (
                <Text style={styles.info}> {new Date(productInfo.catchdate).toLocaleDateString()}</Text>
              ) : (
                <Text style={styles.info}>Not Available</Text>
              )}
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Posted On</Text>
              <Text style={styles.colon}>:</Text>
              {productInfo.hasOwnProperty('posteddate') ? (
                <Text style={styles.info}> {new Date(productInfo.posteddate).toLocaleDateString()}</Text>
              ) : (
                <Text style={styles.info}>Not Available</Text>
              )}
            </View>

        </View>

        <View>  
          <Text style={styles.reviewLabel}>Review</Text>
        </View>
        
        <FlatList
          data={ReviewInfo}
          keyExtractor={(item) => item.accountid.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer} key={item.accountid}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.reviewRating}>Rating: </Text>
                <Text>{renderStars(item.rating)}</Text>
              </View>
              <Text style={styles.reviewContent}>Content: {item.reviewcontent}</Text>
            </View>
          )}
        />
        <View style={styles.tabBar}>
            <TouchableOpacity style={[styles.editButton]} onPress={navigateToaddCart}>
              <Text style={{ color: 'white' }}>Add to Cart</Text>
            </TouchableOpacity>
        </View> 
      </View>
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
    borderBottomColor: '#3780D1',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3780D1',
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer2: {
    paddingHorizontal: 20,
    marginTop: 10
  },
  descriptionContainer:{
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  info: {
  },
  productImage: {
    width: 200, // Adjust the width percentage as needed
    height: 200, // Adjust the height percentage as needed
    marginLeft: '25%', // Adjust horizontal margin percentage as needed
  },
  editButton: {
    backgroundColor: '#3780D1',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    width: 150
  },
  reviewContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#3780D1',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 5
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#3780D1'
  },
  reviewContent: {
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  reviewRating: {
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  productName:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3780D1'
  },
  productCost:{
    fontSize: 16,
  },
  tabBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export { ProductDetails, ProductDetailsTrader };
