import React, { useState } from 'react';
import api from '../utils/api';
import { getToken } from '../utils/storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const PanDetailsScreen = () => {
  const router = useRouter();
  const [panNumber, setPanNumber] = useState('');
  const [nameOnPan, setNameOnPan] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [panInfo, setPanInfo] = useState<any>(null);

  const isValidPAN = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  const handleVerify = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('authentication not found ');
    }

    if (!isValidPAN(panNumber)) {
      Alert.alert('Invalid PAN', 'Please enter a valid PAN number.');
      return;
    }

    if (!nameOnPan) {
      Alert.alert('Missing Name', 'Please enter the name as per PAN.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/api/pan/verify', {
        pan: panNumber,
        name: nameOnPan,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPanInfo(res.data);
      setIsVerified(true);
      setIsMatched(false); // Require manual confirmation
      Alert.alert('Success', 'PAN verified successfully.');
    } catch (err: any) {
      console.error('PAN verify error:', err.response?.data || err.message);
      Alert.alert('Verification Failed', err.response?.data?.message || 'PAN verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // const canProceed = isVerified && isMatched && panInfo?.pan_status === 'VALID';
  const canProceed = true; // Temporarily set to true for testing
  return (
    <>
      <Stack.Screen options={{ title: 'Step-2', headerTitleAlign: 'center' }} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>PAN Details</Text>

          <Text style={styles.label}>PAN Number</Text>
          <TextInput
            style={styles.input}
            value={panNumber}
            onChangeText={(text) => setPanNumber(text.toUpperCase())}
            placeholder="ABCDE1234F"
          />

          <Text style={styles.label}>Name as per PAN</Text>
          <TextInput
            style={styles.input}
            value={nameOnPan}
            onChangeText={setNameOnPan}
            placeholder="Full Name"
          />

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.verifyText}>Verify PAN</Text>
            )}
          </TouchableOpacity>

          {isVerified && panInfo && (
            <View style={styles.panInfo}>
              <Text><Text style={styles.bold}>PAN</Text>: {panInfo.pan}</Text>
              <Text><Text style={styles.bold}>Name</Text>: {panInfo.registered_name}</Text>
              <Text><Text style={styles.bold}>Type</Text>: {panInfo.type}</Text>
              <Text><Text style={styles.bold}>Status</Text>: {panInfo.pan_status}</Text>

              {/* Confirmation checkbox */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.customCheckbox}
                  onPress={() => setIsMatched(!isMatched)}
                >
                  {isMatched && <Entypo name="check" size={14} color="black" />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>PAN details matched</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Footer */}
      <LinearGradient
        colors={['rgba(30, 144, 255, 0.2)', 'transparent']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.footerShadow}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            { backgroundColor: canProceed ? '#1d4b96' : '#888' },
          ]}
          onPress={() => {
            if (canProceed) router.push('/Business_details/aadhaarVerication');
            else Alert.alert('Error', 'Please verify PAN and confirm match.');
          }}
          disabled={!canProceed}
        >
          <Text style={styles.bottomText}>Proceed to Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PanDetailsScreen;

// Reuse your existing styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 20, elevation: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  label: { fontSize: 14, marginBottom: 8 },
  input: {
    borderColor: '#663399',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: 'black',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyText: { color: 'white', fontWeight: '600' },
  panInfo: { marginTop: 8, gap: 4 },
  bold: { fontWeight: '700' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  checkboxLabel: { marginLeft: 8 },
  customCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerShadow: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    height: 6,
    zIndex: 1,
  },
  footer: { paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center' },
  bottomButton: {
    borderRadius: 6,
    paddingVertical: 12,
    width: 275,
    alignItems: 'center',
  },
  bottomText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
