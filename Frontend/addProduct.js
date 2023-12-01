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
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Add Product</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeNelayan')}>
                    <AntDesign name="home" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
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
                <Text>Product Image (PNG):</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                        <Text>Pick Image</Text>
                    </TouchableOpacity>
                    {productImage && <Image source={{ uri: productImage }} style={{ width: 100, height: 100 }} />}
                </View>
                <Text>Description:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={{color:'white'}}>Add Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20, // Add padding to the top
        paddingHorizontal: 20,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1, // Add a border at the bottom
        borderBottomColor: 'lightgray', // Set the border color
    },
    navTitle: {
        fontSize: 20,
        fontWeight: 'bold',
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
        backgroundColor: '#F5FCFF',
        padding: 10,
        marginRight: 10,
        borderRadius: 8,
    },
    addButton: {
        alignItems: 'center',
        backgroundColor: '#3780D1',
        padding: 10,
        marginTop: 250,
        borderRadius: 8,
    },
});

export default AddProduct;