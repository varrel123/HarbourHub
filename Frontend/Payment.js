import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Payment = ({ navigation }) => {
    const [accountid, setAccountID] = useState('');
    const [shoppingcartid, setShoppingCartID] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        // Retrieve the account ID and ShoppingCartID from AsyncStorage
        AsyncStorage.getItem('accountid')
            .then((accountId) => {
                console.log('Retrieved account ID from AsyncStorage:', accountId);
                setAccountID(accountId);
            })
            .catch((error) => {
                console.error('Error retrieving account ID from AsyncStorage:', error);
            });

        AsyncStorage.getItem('shoppingcartid')
            .then((shoppingcartid) => {
                console.log('Retrieved ShoppingCartID from AsyncStorage:', shoppingcartid);
                setShoppingCartID(shoppingcartid);
            })
            .catch((error) => {
                console.error('Error retrieving ShoppingCartID from AsyncStorage:', error);
            });
    }, []);

    const handlePayment = async (accountid, shoppingcartid, details) => {
        try {
            if (accountid && shoppingcartid && details) {
                const response = await axios.post('http://172.20.10.2:5000/pay', {
                    accountid,
                    shoppingcartid,
                    details,
                });

                console.log(response);

                if (response.status === 200) {
                    if (response.data.message === 'Payment Added') {
                        alert('Payment successful!');
                        navigation.navigate('Review');
                    } else {
                        alert(response.data.message);
                    }
                } else if (response.status === 404) {
                    alert('Payment Failed!');
                }
            } else {
                alert('Please fill in all fields.');
            }
        } catch (error) {
            console.error(error);
            alert('Payment failed. Please try again.');
        }
    };

    const navigateToReview = async (accountid, shoppingcartid, details) => {
        try {
            const paymentid = await handlePayment(accountid, shoppingcartid, details);
            if (paymentid) {
                navigation.navigate('Review');
            }
        } catch (error) {
            console.error('Error saving data to AsyncStorage or handling order:', error);
        }
    };
    
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Payment</Text>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <Text>Payment Method:</Text>
                <TextInput
                    style={[styles.input, { height: 50 }]}
                    onChangeText={setDetails}
                    value={details}
                />
            </View>
            <TouchableOpacity
                style={[styles.addButton, { paddingHorizontal: 50 }]}
                onPress={() => navigateToReview(accountid, shoppingcartid, details)}
            >
                <Text style={{ color: 'white' }}>Checkout</Text>
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
        bottom: 40, // Atur jarak dari bawah layar
        left: '6%', // Pusatkan tombol di tengah layar
        backgroundColor: '#3780D1',
        padding: 20,
        borderRadius: 8,
        width: 350,
        alignItems: 'center',
    },
});

export default Payment;