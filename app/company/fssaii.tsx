import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function FssaiStep4() {
  const [fssaiNumber, setFssaiNumber] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const handleUpload = () => {
    Alert.alert('Upload', 'FSSAI document upload triggered.');
  };

  const handleProceed = () => {
    Alert.alert('Next', 'Proceeding to next step...');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Step-4</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fssai Details</Text>

          <Text style={styles.label}>Fssai number</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={fssaiNumber}
            onChangeText={setFssaiNumber}
            placeholder="Enter FSSAI number"
          />

          <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
            <Text style={styles.uploadBtnText}>Upload fssai document</Text>
          </TouchableOpacity>

          <View style={styles.radioGroup}>
            <RadioButton.Group
              onValueChange={value => setRadioValue(value)}
              value={radioValue}
            >
              <View style={styles.radioRow}>
                <RadioButton value="later" />
                <Text>I will upload later within 30 days</Text>
              </View>
              <View style={styles.radioRow}>
                <RadioButton value="not_required" />
                <Text>My products doesn't require fssai</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
        <Text style={styles.proceedBtnText}>Proceed to next</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9ff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  uploadBtn: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  radioGroup: {
    marginTop: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  proceedBtn: {
    backgroundColor: '#0057d9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  proceedBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
