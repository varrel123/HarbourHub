import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; // Import the AntDesign icon library
import DateTimePicker from '@react-native-community/datetimepicker'; //npm install @react-native-community/datetimepicker
import axios from 'axios';

const AddProduct = ({ navigation }) => {
    const [productname, setProductName] = useState('');
    const [productcost, setProductCost] = useState(0); // Assuming product cost is an integer
    const [productimg, setProductImage] = useState(null);
    const [description, setDescription] = useState('');
    const [accountid, setAccountID] = useState('');
    const [catchdate, setCatchDate] = useState(new Date());
    const [posteddate, setPostedDate] = useState(new Date());

    const handleAddProduct = async () => {
        if (productname && productcost && description && accountid && posteddate && catchdate && productimg) {
            const response = await axios.post('http://192.168.1.6:5000/addproduct', { productname, productcost, accountid, posteddate, description, catchdate, productimg })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        if (response.data.message === 'Product Added') {
                            alert('Add product successful!');
                            navigation.navigate('homeNelayan');
                        } else {
                            alert(response.data.message);
                        }
                    } else if (response.status === 404) {
                        alert('Add product Failed!');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert('Add product failed. Please try again.');
                });
        } else {
            alert('Please fill in all fields.');
        }
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
                    value={productname}
                />
                <Text>Product Cost:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setProductCost}
                    value={productcost.toString()}
                    keyboardType="numeric"
                />
                <Text>Product Image:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                        <Text style={{ color: 'white' }}>Pick Image</Text>
                    </TouchableOpacity>
                    {productimg && <Image source={{ uri: productimg }} />}
                </View>
                <Text>Description:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                />
                <Text>Account ID:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    onChangeText={setAccountID}
                    value={accountid}
                    keyboardType="numeric"
                />
                <Text>Catch Date:</Text>
                <DateTimePicker
                    style={{ width: 200 }}
                    onChangeText={setCatchDate}
                    value={catchdate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { setDate(date) }}
                />
                <Text>Posted Date:</Text>
                <DateTimePicker
                    style={{ width: 200 }}
                    onChangeText={setPostedDate}
                    value={posteddate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { setDate(date) }}
                />
            </View>
            <TouchableOpacity style={[styles.addButton, { paddingHorizontal: 20 }]} onPress={handleAddProduct}>
                <Text style={{ color: 'white' }}>Add Product</Text>
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
                        <Text style={{ color: 'white' }}>Pick Image</Text>
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
                <Text style={{ color: 'white' }}>Edit Product</Text>
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