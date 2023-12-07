import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; // Import the AntDesign icon library

const AddProduct = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [productCost, setProductCost] = useState(0); // Assuming product cost is an integer
    const [productImage, setProductImage] = useState(null); // Assuming product image is a PNG file
    const [description, setDescription] = useState('');

    const handleAddProduct = () => {
        navigation.navigate('ProductDetails', {
            productName: productName,
            productCost: productCost,
            productImage: productImage,
            description: description,
          });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProductImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Add Product</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeNelayan')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <Text>Product Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setProductName}
                    value={productName}
                />
                <Text>Product Cost:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setProductCost}
                    value={productCost.toString()}
                    keyboardType="numeric"
                />
                <Text>Product Image:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                        <Text style={{color:'white'}}>Pick Image</Text>
                    </TouchableOpacity>
                    {productImage && <Image source={{ uri: productImage }} />}
                </View>
                <Text>Description:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                />
            </View>
            <TouchableOpacity style={[styles.addButton, { paddingHorizontal: 20 }]} onPress={handleAddProduct}>
                <Text style={{color:'white'}}>Add Product</Text>
            </TouchableOpacity>
        </View>
    );
};
const EditProduct = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [productCost, setProductCost] = useState(0); // Assuming product cost is an integer
    const [productImage, setProductImage] = useState(null); // Assuming product image is a PNG file
    const [description, setDescription] = useState('');

    const handleEditProduct = () => {
        // Handle the add product logic here
        // Navigate to the HomeNelayan screen
        navigation.navigate('homeNelayan');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProductImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Edit Product</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeNelayan')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <Text>Product Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setProductName}
                    value={productName}
                />
                <Text>Product Cost:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setProductCost}
                    value={productCost.toString()}
                    keyboardType="numeric"
                />
                <Text>Product Image:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                        <Text style={{color:'white'}}>Pick Image</Text>
                    </TouchableOpacity>
                    {productImage && <Image source={{ uri: productImage }} />}
                </View>
                <Text>Description:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                />
            </View>
            <TouchableOpacity style={[styles.addButton, { paddingHorizontal: 20 }]} onPress={handleEditProduct}>
                <Text style={{color:'white'}}>Edit Product</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({

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
        marginBottom: 30,
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
});

export { AddProduct, EditProduct };