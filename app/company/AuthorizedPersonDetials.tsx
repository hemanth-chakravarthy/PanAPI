import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CompanyDetails from './CompanyDetails';

const AuthorizedPersonDetails = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [pan, setPan] = useState('');

  return (

    <View style={{flex:1, alignItems: 'center' }}>
        <View style={styles.container}>
        <Text style={[styles.heading, {alignSelf: 'center'}]}>Authorized Person Details</Text>
        
        <Text style={styles.label}>Full Name (authorized signatory)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          placeholderTextColor="#AFAFAF"
          value={fullName}
          onChangeText={setFullName}
        />
        
        <Text style={styles.label}>Personal Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#AFAFAF"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
          maxLength={10}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor="#AFAFAF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Designation (e.g. Director, Managing Partner)"
          placeholderTextColor="#AFAFAF"
          value={designation}
          onChangeText={setDesignation}
        />
        
        <TextInput
          style={styles.input}
          placeholder="PAN of Authorized Person"
          placeholderTextColor="#AFAFAF"
          value={pan}
          onChangeText={setPan}
          autoCapitalize="characters"
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 354,
    height: 365,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#C2DAFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 23,
    
    
  },
  heading: {
    alignItems: 'center',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 15,
    fontFamily: 'Roboto',
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#000000',
    textAlignVertical: 'center',
  },
});

export default AuthorizedPersonDetails;