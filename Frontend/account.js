import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FisherManAccount = ({ navigation }) => {

    const [accountInfo, setAccountInfo] = useState({
        accountid: 0,
        name: '',
        email: '',
        password: '',
        address: '',
        phone: 0,
        role: '',
    });

    useEffect(() => {
        // Mengambil informasi akun berdasarkan accountid yang disimpan
        AsyncStorage.getItem('accountid')
            .then((accountid) => {
                console.log('ID akun yang diambil dari AsyncStorage:', accountid);

                if (accountid) {
                    // Menggunakan permintaan GET untuk mendapatkan informasi pengguna
                    axios.post('http://192.168.1.3:5000/showuser', { accountid })
                        .then((response) => {
                            if (response.status === 200) {
                                setAccountInfo(response.data.account);
                            } else {
                                console.error('Kesalahan mengambil informasi akun:', response.data.message);
                            }
                        })
                        .catch((error) => {
                            console.error('Kesalahan mengambil informasi akun:', error);
                        });
                } else {
                    console.error('ID Akun tidak terdefinisi');
                }
            })
            .catch((error) => {
                console.error('Kesalahan mengambil ID akun dari AsyncStorage:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Account Information</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeNelayan')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={styles.profileImageContainer}>
                <AntDesign name="user" size={150} color='#3780D1' style={styles.profileImage} />
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                {Object.entries(accountInfo).map(([key, value]) => (
                    <View style={styles.row} key={key}>
                        <Text style={styles.label}>{key}</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.info}>{key === 'password' ? 'Hidden' : value}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={[styles.editButton, { paddingHorizontal: 20 }]} onPress={() => navigation.navigate('EditFisherManAccount')}>
                <Text style={{ color: 'white' }}>Edit Account</Text>
            </TouchableOpacity>
        </View>
    );
    
};

const TraderAccount = () => {
    const [accountInfo, setAccountInfo] = useState({
        accountid: 0,
        name: '',
        email: '',
        password: '',
        address: '',
        phone: 0,
        role: '',
    });

    useEffect(() => {
        // Mengambil informasi akun berdasarkan accountid yang disimpan
        AsyncStorage.getItem('accountid')
            .then((accountid) => {
                console.log('ID akun yang diambil dari AsyncStorage:', accountid);

                if (accountid) {
                    // Menggunakan permintaan GET untuk mendapatkan informasi pengguna
                    axios.post('http://192.168.1.3:5000/showuser', { accountid })
                        .then((response) => {
                            if (response.status === 200) {
                                setAccountInfo(response.data.account);
                            } else {
                                console.error('Kesalahan mengambil informasi akun:', response.data.message);
                            }
                        })
                        .catch((error) => {
                            console.error('Kesalahan mengambil informasi akun:', error);
                        });
                } else {
                    console.error('ID Akun tidak terdefinisi');
                }
            })
            .catch((error) => {
                console.error('Kesalahan mengambil ID akun dari AsyncStorage:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Account Information</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeTrader')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                {Object.entries(accountInfo).map(([key, value]) => (
                    <View style={styles.row} key={key}>
                        <Text style={styles.label}>{key}</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.info}>{key === 'password' ? 'Hidden' : value}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={[styles.editButton, { paddingHorizontal: 20 }]} onPress={EditTraderAccount}>
                <Text style={{ color: 'white' }}>Edit Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const EditTraderAccount = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Address, setAddress] = useState('');
    const [Phone, setPhone] = useState('0');
    const [accountid, setAccountID] = useState('0');
    const [Role, setRole] = useState('');

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
    }, []); // The empty dependency array ensures this effect runs once on component mount

    const handleEditAccount = async () => {
        if (accountid && Name && Email && Password && Address && Phone && Role) {
            // Modify the request to include the user's information
            const response = await axios.put('http://192.168.0.137:5000/updateaccount', {
                accountid,
                Name,
                Email,
                Password,
                Address,
                Phone,
                Role,
            })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        if (response.data.message === 'Update account successful') {
                            alert('Update account successful!');
                            navigation.navigate('homeNelayan');
                        } else {
                            alert(response.data.message);
                        }
                    } else if (response.status === 404) {
                        alert('Update account Failed!');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert('Update account failed. Please try again.');
                });
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Edit Account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeTrader')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={styles.profileImageContainer}>
                <AntDesign name="user" size={150} color='#3780D1' style={styles.profileImage} />
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <View style={styles.row}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={Name}
                        placeholder="Name"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={Email}
                        placeholder="Email"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Password</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={Password}
                        placeholder="Password"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={Address}
                        placeholder="Address"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={Phone.toString()}
                        keyboardType="numeric"
                    />
                    <View style={styles.row}>
                        <Text style={styles.label}>Role User</Text>
                        <Text style={styles.colon}>:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setRole}
                            value={Role}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditAccount}>
                <Text style={{ color: 'white' }}>Edit Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const EditFisherManAccount = ({ navigation }) => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Address, setAddress] = useState('');
    const [Phone, setPhone] = useState('0');
    const [accountid, setAccountID] = useState('0');
    const [Role, setRole] = useState('');

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
    }, []); // The empty dependency array ensures this effect runs once on component mount

    const handleEditAccount = async () => {
        if (accountid && Name && Email && Password && Address && Phone && Role) {
            // Modify the request to include the user's information
            const response = await axios.put('http://192.168.1.19:5000/updateaccount', {
                accountid,
                Name,
                Email,
                Password,
                Address,
                Phone,
                Role,
            })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        if (response.data.message === 'Update account successful') {
                            alert('Update account successful!');
                            navigation.navigate('homeNelayan');
                        } else {
                            alert(response.data.message);
                        }
                    } else if (response.status === 404) {
                        alert('Update account Failed!');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert('Update account failed. Please try again.');
                });
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color='#3780D1' />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Edit Account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('homeNelayan')}>
                    <AntDesign name="home" size={24} color='#3780D1' />
                </TouchableOpacity>
            </View>
            <View style={styles.profileImageContainer}>
                <AntDesign name="user" size={150} color='#3780D1' style={styles.profileImage} />
            </View>
            <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <View style={styles.row}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={Name}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={Email}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Password</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={Password}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={Address}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={Phone.toString()}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Role User</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setRole}
                        value={Role}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditAccount}>
                <Text style={{ color: 'white' }}>Edit Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
        padding: 10,
        paddingRight: 5,
    },
    colon: {
        padding: 10,
        width: 10,
        textAlign: 'center',
    },
    info: {
        flex: 1,
        textAlign: 'right',
        padding: 10
    },
    editButton: {
        position: 'absolute',
        bottom: 20,
        left: '8%',
        backgroundColor: '#3780D1',
        padding: 10,
        borderRadius: 8,
        width: 350,
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        color: '#3780D1',
        alignContent: 'center'
    },
    profileImageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },
    inputContainer: {
        marginBottom: 30,
        marginTop: 30
    }
});

export { FisherManAccount, TraderAccount, EditTraderAccount, EditFisherManAccount };