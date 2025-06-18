import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import AuthorizedPersonDetails from './AuthorizedPersonDetials';
import AadhaarVerification from './AadhaarVerification';

const Step2 = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [pan, setPan] = useState('');

  return (
    <>
      <ScrollView>
        <AuthorizedPersonDetails/>
        <AadhaarVerification/>
      </ScrollView>
    </>
    
  )}
export default Step2;