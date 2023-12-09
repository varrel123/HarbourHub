import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import the AntDesign icon library

const FisherManAccount = ({ navigation }) => {
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
            <View style={styles.row}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>muklis</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>muklis@gmail.com</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Password</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>muklis123</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>Jl. Mawar No. 123</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>082121213533</Text>
            </View>
        </View>
        <TouchableOpacity style={[styles.editButton, { paddingHorizontal: 20 }]} onPress={() => navigation.navigate('EditFisherManAccount')}>
            <Text style={{color:'white'}}>Edit Account</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const TraderAccount = () => {
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
         <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
            <View style={styles.row}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>muklis</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>muklis@gmail.com</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Password</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>muklis123</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>Jl. Mawar No. 123</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.info}>082121213533</Text>
            </View>
        </View>
        <TouchableOpacity style={[styles.editButton, { paddingHorizontal: 20 }]} onPress={EditTraderAccount}>
            <Text style={{color:'white'}}>Edit Account</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const EditTraderAccount = () => {
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
                    value={name}
                    placeholder="Name"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Password</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setAddress}
                    value={address}
                    placeholder="Address"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={phone.toString()}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditAccount}>
                <Text style={{color:'white'}}>Edit Account</Text>
            </TouchableOpacity>
        </View>
    );
  };
  const EditFisherManAccount = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('0');

    const handleEditAccount = () => {
        // Logic to handle editing the account information
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
                    value={name}
                    placeholder="Name"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Password</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setAddress}
                    value={address}
                    placeholder="Address"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={phone.toString()}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditAccount}>
                <Text style={{color:'white'}}>Edit Account</Text>
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
        bottom: 20, // Atur jarak dari bawah layar
        left: '8%', // Pusatkan tombol di tengah layar
        backgroundColor: '#3780D1',
        padding: 10,
        borderRadius: 8,
        width: 350,
        alignItems: 'center',
      },
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
        borderRadius: 50, // Make it a circle
    },
    inputContainer: {
        marginBottom: 30,
        marginTop: 30
    }
});
  
export  {FisherManAccount, TraderAccount, EditTraderAccount, EditFisherManAccount};