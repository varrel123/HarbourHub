import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Import the AntDesign icon library

const ProductDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { productName, productCost, description } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#3780D1" />
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
        <View style={{ width: 20 }}></View>
      </View>

      <View style={{ padding: 20 }}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: 'url_to_product_image' }} style={{ flex: 1 }} resizeMode="cover" />
        </View>
        <Text style={styles.productName}>{productName}</Text>
        <Text>{productCost}/Kg</Text>
        <View style={styles.profileSection}>
          <Image source={{ uri: 'url_to_profile_picture' }} style={{ width: 50, height: 50, borderRadius: 25 }} />
          <Text style={{ marginLeft: 10 }}>username Pembeli</Text>
        </View>
        <Text style={styles.productDescription}>Description of Product</Text>
        <Text>{description}</Text>
        

      </View>
        <TouchableOpacity style={[styles.Button, { paddingHorizontal: 20 }]} onPress={() => navigation.navigate('EditProduct')}>
            <Text style={{ color: 'white' }}>Edit Information</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3780D1',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#3780D1'
  },
  productImageContainer: {
    borderWidth: 1,
    borderColor: 'white',
    height: 200,
    marginVertical: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: '#3780D1',
  },
  Button: {
    position: 'absolute',
    bottom: 20, // Atur jarak dari bawah layar
    left: '8%', // Pusatkan tombol di tengah layar
    backgroundColor: '#3780D1',
    padding: 10,
    borderRadius: 8,
    width: 350,
    alignItems: 'center',
  },
});

export default ProductDetails;