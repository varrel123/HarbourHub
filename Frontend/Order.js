import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = ({ navigation }) => {
    const [accountid, setAccountID] = useState('');
    const [productid, seteProductid] = useState('');
    const [totalamount, settotalamount] = useState('');

    useEffect(() => {
        // Retrieve the account ID from AsyncStorage
        AsyncStorage.getItem('accountid')
            .then((accountid) => {
                console.log('Retrieved account ID from AsyncStorage:', accountid);
                setAccountID(accountid); // Set the retrieved account ID to the state
            })
            .catch((error) => {
                console.error('Error retrieving account ID from AsyncStorage:', error);
            });
    }, []);


    useEffect(() => {
        // Retrieve the product ID from AsyncStorage
        AsyncStorage.getItem('productid')
            .then((productid) => {
                console.log('Retrieved product ID from AsyncStorage:', productid);
                seteProductid(productid); // Set the retrieved product ID to the state
            })
            .catch((error) => {
                console.error('Error retrieving product ID from AsyncStorage:', error);
            });
    }, []);

    const handleOrder = async (accountid, productid, totalamount) => {
        if (accountid && productid && totalamount) {
            const response = await axios.post('http://172.20.10.2:5000/orders', {
                accountid,
                productid,
                totalamount,
            })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        if (response.data.message === 'Order Added') {
                            alert('Order successful!');
                            navigation.navigate('Payment');
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

    const navigateToPayment = async (accountid, productid, totalamount) => {
        try {
            const order = await handleOrder(accountid, productid, totalamount);

            if (order) {
                
                navigation.navigate('Payment');
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
                <Text style={styles.navTitle}>Order</Text>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <Text>Total Amount:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    onChangeText={settotalamount}
                    value={totalamount}
                />
            </View>
            <TouchableOpacity
                style={[styles.addButton, { paddingHorizontal: 20 }]}
                onPress={() => navigateToPayment(accountid, productid, totalamount)}
            >
                <Text style={{ color: 'white' }}>Add Order</Text>
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

export default Orders;