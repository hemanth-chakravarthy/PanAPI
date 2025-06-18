// screens/Step3PanScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useRouter } from 'expo-router';
import { RootStackParamList } from '../../types/navigation';

const Step3PanScreen: React.FC = () => {
  const router = useRouter();
  const [pan, setPan] = useState('');
  const [verified, setVerified] = useState(false);
  const [panDetails, setPanDetails] = useState<{ panNo: string; name: string; type: string; status: string } | null>(null);
  const [isMatched, setIsMatched] = useState(false);

  const verifyPan = () => {
    setPanDetails({
      panNo: pan,
      name: 'Tastezy LLP',
      type: 'LLP',
      status: 'Valid',
    });
    setVerified(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Company PAN Details</Text>
      <Text style={styles.label}>Enter PAN Number</Text>
      <TextInput
        style={styles.input}
        placeholder="KFFOO####H"
        value={pan}
        onChangeText={setPan}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={verifyPan}>
        <Text style={styles.verifyText}>Verify PAN details</Text>
      </TouchableOpacity>
      {verified && panDetails && (
        <View style={styles.result}>
          <Text><Text style={styles.bold}>PAN no:</Text> {panDetails.panNo}</Text>
          <Text><Text style={styles.bold}>R. Name:</Text> {panDetails.name}</Text>
          <Text><Text style={styles.bold}>PAN type:</Text> {panDetails.type}</Text>
          <Text><Text style={styles.bold}>Pan status:</Text> {panDetails.status}</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox isChecked={isMatched} onClick={() => setIsMatched(!isMatched)} />
            <Text> PAN details matched</Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        disabled={!isMatched}
        style={[styles.nextButton, !isMatched && { backgroundColor: '#ccc' }]}
        onPress={() => router.push('/company/GSTVerfication')}
      >
        <Text style={styles.nextText}>Proceed to next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step3PanScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333'
  },
  input: { borderWidth: 1, borderColor: 'purple', padding: 10, marginBottom: 10, borderRadius: 10 },
  verifyButton: { backgroundColor: '#000', padding: 12, borderRadius: 8 },
  verifyText: { color: '#fff', textAlign: 'center' },
  result: { marginTop: 20 },
  bold: { fontWeight: 'bold' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  nextButton: { marginTop: 30, padding: 15, backgroundColor: '#947288', borderRadius: 8 },
  nextText: { color: '#fff', textAlign: 'center' },
});