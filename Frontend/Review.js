import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';


const AddReview = ({ navigation }) => {
    const [accountid, setAccountID] = useState('');
    const [productid, setproductid] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewcontent, setReviewContent] = useState('');
    const [rating, setRating] = useState('1');

    useEffect(() => {
        // Retrieve the account ID from AsyncStorage
        AsyncStorage.getItem('productid')
            .then((productid) => {
                console.log('Retrieved product ID from AsyncStorage:', productid);
                setproductid(productid); // Set the retrieved account ID to the state
            })
            .catch((error) => {
                console.error('Error retrieving product ID from AsyncStorage:', error);
            });
    }, []);

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

    const handleAddReview = async () => {
        if (accountid, productid, reviewcontent, rating) {
            const response = await axios.post('http://192.168.1.2:5000/addReview', {
                accountid,
                productid,
                reviewcontent,
                rating,
            })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        if (response.data.message === 'Review Added') {
                            alert('Review Added successful!');
                            navigation.navigate('homeTrader');
                        } else {
                            alert(response.data.message);
                        }
                    } else if (response.status === 404) {
                        alert('Review Added Failed!');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert('Review Added failed. Please try again.');
                });
        } else {
            alert('Please fill in all fields.');
        }
    };

    const handleSelect = (itemValue) => {
        console.log('Selected item value:', itemValue);
        setRating(itemValue);
        setModalVisible(false);
    };
    
      const renderDropdownItem = (value) => (
        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(value)}>
          <Text style={{ color: '#3780D1' }}>{value}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Review</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeTrader')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <Text style={{ marginRight: 10, fontSize: 16, fontWeight: 'bold', color: '#3780D1' }}>Review Content:</Text>
                <TextInput
                style={styles.input}
                onChangeText={setReviewContent}
                value={reviewcontent}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: 10, fontSize: 16, fontWeight: 'bold', color: '#3780D1' }}>Rate:</Text>
                    <Text style={{ color: '#3780D1', fontWeight: 'bold' }}>{rating} / 5 </Text>
                </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {[1, 2, 3, 4, 5].map((value) => renderDropdownItem(value.toString()))}
                </View>
                </View>
            </Modal>
            <View style={styles.tabBar}>
                <TouchableOpacity style={[styles.addButton, { paddingHorizontal: 20 }]} onPress={handleAddReview}>
                    <Text style={{ color: 'white' }}>Add Review</Text>
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
        marginBottom: 50,
    },
    input: {
        height: 40,
        borderColor:  '#3780D1',
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
        backgroundColor: '#fff'
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
        paddingVertical: 10,
      },
      dropdownItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
      },
});

export default AddReview;