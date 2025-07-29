// screens/Step4GstScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useRouter } from 'expo-router';
import { getToken } from '../utils/storage'; 

// import { RootStackParamList } from '../../types/navigation'; // Assuming this type is defined elsewhere

const API_BASE_URL = 'http://localhost:5000/api'; // <<< IMPORTANT: Replace with your actual backend API base URL

const Step4GstScreen: React.FC = () => {
  const router = useRouter();
  const [gstNumber, setGstNumber] = useState('');
  const [declaration, setDeclaration] = useState(false);
  const [reason, setReason] = useState<'20L' | 'intra' | 'exempt'>('20L');
  const [isVerifying, setIsVerifying] = useState(false); 

  const RadioButton = ({ selected, onPress, label }: { selected: boolean; onPress: () => void; label: string }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );

  const handleVerifyGst = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert('Error', 'You must be logged in to verify GST details');
      return;
    }

    if (!gstNumber) {
      Alert.alert('Input Required', 'Please enter a GST number to verify.');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gstin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ gstin: gstNumber }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.message) {
          Alert.alert('Success', result.message);
        } else if (result.warning) {
          Alert.alert('Warning', result.warning);
        } else {
          Alert.alert('Success', 'GSTIN verified successfully.');
        }
      } else {
        Alert.alert('Error', result.error || 'Failed to verify GSTIN. Please try again.');
      }
    } catch (error) {
      console.error('Network or API error:', error);
      Alert.alert('Error', 'Could not connect to the server. Please check your network connection.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Company GST Details</Text>
      <Text style={styles.label}>Enter GST Number</Text>
      <TextInput
        style={styles.input}
        placeholder="KFFOO####H"
        value={gstNumber}
        onChangeText={setGstNumber}
        maxLength={15}
        autoCapitalize="characters" // GSTIN is usually uppercase
      />
      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={handleVerifyGst}
        disabled={isVerifying} // Disable button while verifying
      >
        {isVerifying ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyText}>Verify GST details</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.sectionLabel}>GST mandatory unless exempt</Text>
      <RadioButton
        selected={reason === '20L'}
        onPress={() => setReason('20L')}
        label="Turnover below ₹20L"
      />
      <RadioButton
        selected={reason === 'intra'}
        onPress={() => setReason('intra')}
        label="Only intra-state sales"
      />
      <RadioButton
        selected={reason === 'exempt'}
        onPress={() => setReason('exempt')}
        label="Selling exempt products"
      />
      <View style={styles.checkboxContainer}>
        <CheckBox isChecked={declaration} onClick={() => setDeclaration(!declaration)} />
        <Text> I declare that I am not required to register under GST laws as my turnover is below the prescribed limit.</Text>
      </View>
      <TouchableOpacity
        disabled={!declaration}
        style={[styles.nextButton, !declaration && { backgroundColor: '#ccc' }]}
        onPress={() => router.push('/company/Uploading')}
      >
        <Text style={styles.nextText}>Proceed to next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step4GstScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333'
  },
  sectionLabel: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333'
  },
  input: { borderWidth: 1, borderColor: 'purple', padding: 10, marginBottom: 10, borderRadius: 10 },
  verifyButton: { backgroundColor: '#000', padding: 12, borderRadius: 8 },
  verifyText: { color: '#fff', textAlign: 'center' },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 4
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'purple'
  },
  radioText: {
    fontSize: 16,
    color: '#333'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  nextButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#947288',
    borderRadius: 8
  },
  nextText: {
    color: '#fff',
    textAlign: 'center'
  }
});