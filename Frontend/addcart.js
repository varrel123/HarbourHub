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
            if (totalAmount === "0" || totalAmount === "") {
                alert("Please enter the correct amount.");
            } else if (productid && accountid) {
                const response = await axios.post('http://192.168.1.2:5000/addcart', {
                    accountid,
                    productid,
                    productname,
                    totalamount: totalAmount,
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
                <Text style={styles.navTitle}></Text>

            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <Text style={{fontSize: 20, color: '#3780D1'}}>Total Amount:</Text>
                <TextInput
                    style={[styles.input, ]}
                    onChangeText={setTotalAmount}
                    value={totalAmount}
                />
            </View>
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.editButton, { paddingHorizontal: 20 }]}
                    onPress={() => handleAddCart()}
                >
                    <Text style={{ color: 'white' }}>Add Cart</Text>
                </TouchableOpacity>
            </View>
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
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#3780D1'
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
    editButton: {
        backgroundColor: '#3780D1',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        width: 150
      },
      tabBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
      },
});

export default Cart;