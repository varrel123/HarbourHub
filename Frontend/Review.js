import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const AddReview = ({ navigation }) => {
    const [accountid, setAccountID] = useState('');
    const [productid, setproductid] = useState('');
    const [reviewcontent, setreviewcontent] = useState('');
    const [rating, setrating] = useState('');

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
            const response = await axios.post('http://192.168.0.137:5000/addReview', {
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
                <Text>Review Content:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setreviewcontent}
                    value={reviewcontent}
                />
                <Text>Rating:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setrating}
                    value={rating}
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity style={[styles.addButton, { paddingHorizontal: 20 }]} onPress={handleAddReview}>
                <Text style={{ color: 'white' }}>Add Review</Text>
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

export default AddReview;