import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
    const [totalAmount, setTotalAmount] = useState("0");
    const [productid, setProductid] = useState("");
    const [productname, setProductname] = useState("");
    const [accountid, setAccountid] = useState("");

    useEffect(() => {
        // Load data from AsyncStorage
        const loadUserData = async () => {
            try {
                const storedProductid = await AsyncStorage.getItem('productid');
                const storedProductname = await AsyncStorage.getItem('productname');
                const storedAccountid = await AsyncStorage.getItem('accountid');

                if (storedProductid && storedProductname && storedAccountid) {
                    setProductid(storedProductid);
                    setProductname(storedProductname);
                    setAccountid(storedAccountid);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleAddCart = async () => {
        try {
            if (totalAmount && productid && accountid) {
                const response = await axios.post('http://192.168.0.137:5000/addcart', {
                    accountid,
                    productid,
                    productname,
                    totalamount: totalAmount, // Ensure the correct field name is used
                });

                if (response.status === 200 && response.data.message === 'Product Added to Cart') {
                    alert('Add product to cart successful!');
                    navigation.navigate('homeTrader');
                } else {
                    alert(response.data.message || 'Failed to add product to cart.');
                }
            } else {
                alert('Please fill in all fields.');
            }
        } catch (error) {
            console.error(error);
            alert('Add product to cart failed. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Add Cart</Text>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <Text>Total Amount:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    onChangeText={setTotalAmount}
                    value={totalAmount}
                />
            </View>
            <TouchableOpacity
                style={[styles.addButton, { paddingHorizontal: 20 }]}
                onPress={() => handleAddCart()}
            >
                <Text style={{ color: 'white' }}>Add Cart</Text>
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

export default Cart;