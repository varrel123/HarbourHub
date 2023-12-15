import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity,FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const Payment = ({ navigation }) => {
    const [accountid, setAccountID] = useState('');
    const [shoppingcartid, setShoppingCartID] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [details, setDetails] = useState('Select a payment method');


    const paymentMethods = [
        { label: 'Select a payment method', value: '' },
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'Debit Card', value: 'Debit Card' },
        { label: 'PayPal', value: 'PayPal' },
        { label: 'Bank Transfer', value: 'Bank Transfer' },
        { label: 'Cash', value: 'Cash' },
    ];

    const handleSelect = (itemValue) => {
        console.log('Selected item value:', itemValue);
        setDetails(itemValue);
        setModalVisible(false);
    };
    
      const renderDropdownItem = ({ item }) => (
        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item.label)}>
          <Text style={{ color: '#3780D1' }}>{item.label}</Text>
        </TouchableOpacity>
    );

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
                const response = await axios.post('http://192.168.1.2:5000/pay', {
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
                <Text style={styles.navTitle}>  </Text>
            </View>
            <View style={[styles.inputContainer]}>
                <Text style={{ color: '#3780D1', fontSize: 16, fontWeight: 'bold' }}>Payment Method:</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.input}>
                    <Text style={{ color: '#3780D1', paddingVertical: 10, alignSelf: 'center' }}>{details}</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                        data={paymentMethods}
                        renderItem={renderDropdownItem}
                        keyExtractor={(item) => item.label}
                        contentContainerStyle={styles.dropdownList}
                        />
                    </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.addButton]}
                    onPress={() => navigateToReview(accountid, shoppingcartid, details)}
                >
                    <Text style={{ color: 'white' }}>Checkout</Text>
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
        marginBottom: 60,
        paddingHorizontal: 20
    },
    input: {
        marginVertical: 10,
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
        backgroundColor: '#3780D1',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        width: 150
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 250,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10
      },
      dropdownList: {
        borderRadius: 5,
      },
      dropdownItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
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

export default Payment;