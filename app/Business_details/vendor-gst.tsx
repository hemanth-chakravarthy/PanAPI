import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useRouter } from 'expo-router';

const VendorGstForm = () => {
  const router = useRouter();

  const [gstNumber, setGstNumber] = useState('');
  const [gstDetails, setGstDetails] = useState<null | {
    name: string;
    type: string;
    status: string;
  }>(null);
  const [detailsMatched, setDetailsMatched] = useState(false);

  const handleVerify = () => {
    // Dummy verification logic — replace with API call if needed
    if (gstNumber.length > 5) {
      setGstDetails({
        name: 'sai',
        type: 'tax collector',
        status: 'Valid',
      });
    }
  };

  const handleProceed = () => {
    if (detailsMatched) {
      router.push('/next-step'); // replace with actual path
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.stepText}>Step-5</Text>
        <View style={styles.card}>
          <Text style={styles.label}>vendor GST Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GST number"
            value={gstNumber}
            onChangeText={setGstNumber}
          />
          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
            <Text style={styles.verifyBtnText}>Verify GST details</Text>
          </TouchableOpacity>
          {gstDetails && (
            <View style={styles.detailsBox}>
              <Text style={styles.detailText}>Name: {gstDetails.name}</Text>
              <Text style={styles.detailText}>Type: {gstDetails.type}</Text>
              <Text style={styles.detailText}>Status: {gstDetails.status}</Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={detailsMatched}
                  onValueChange={() => setDetailsMatched(!detailsMatched)}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>
                  Details match with GST database
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.proceedBtn,
            { backgroundColor: detailsMatched ? '#bb86fc' : '#d3cde6' },
          ]}
          onPress={handleProceed}
          disabled={!detailsMatched}
        >
          <Text style={styles.proceedBtnText}>Proceed to next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VendorGstForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  stepText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  verifyBtn: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  verifyBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  detailsBox: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#4630EB',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  proceedBtn: {
    marginTop: 30,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#B79CD9',
  },
  proceedBtnText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f7f7ff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#2563eb',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
});
