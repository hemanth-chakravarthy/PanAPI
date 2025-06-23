//fssai.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
// import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";

const FssaiForm = () => {
  const [fssaiNumber, setFssaiNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleChange = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '').slice(0, 14);
    setFssaiNumber(numeric);
  };
 const router = useRouter();

  const handleNext = () => {
    router.push("/Business_details/company-gst");
  };
 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step-4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Fssai Details</Text>

          <Text style={styles.label}>Fssai number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Fssai number"
            value={fssaiNumber}
            onChangeText={handleChange}
            keyboardType="numeric"
            maxLength={14}
          />

          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload fssai document</Text>
          </TouchableOpacity>

          <View style={styles.checkboxRow}>
            <CheckBox
              value={selectedOption === 'uploadLater'}
              onValueChange={() => setSelectedOption(selectedOption === 'uploadLater' ? null : 'uploadLater')}
              color={selectedOption === 'uploadLater' ? '#000' : undefined}style={styles.roundCheckbox} 
            />
            <Text style={styles.checkboxLabel}>I will upload later within 30 days</Text>
          </View>

          <View style={styles.checkboxRow}>
            <CheckBox
              value={selectedOption === 'notRequired'}
              onValueChange={() => setSelectedOption(selectedOption === 'notRequired' ? null : 'notRequired')}
              color={selectedOption === 'notRequired' ? '#000' : undefined}style={styles.roundCheckbox} 
            />
            <Text style={styles.checkboxLabel}>My products doesn’t require fssai</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Proceed to next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FssaiForm;

const styles = StyleSheet.create({
  roundCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11, // Half of width/height for perfect circle
    borderWidth: 2,
    borderColor: '#000',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#2563eb',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
      minHeight: 500, 

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  bottomButtonContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderColor: '#ddd',
  shadowColor: '#2563eb',           // Blue shadow
  shadowOpacity: 0.18,              // Shadow opacity
  shadowRadius: 8,                  // Shadow blur
  shadowOffset: { width: 0, height: -6 }, // Shadow to the top
  elevation: 8,                     // For Android
},
  nextButton: {
    backgroundColor: '#1D4ED8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#2563eb',      // Add shadow color (dark blue)
    shadowOpacity: 0.28,         // Add shadow opacity
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 }, // Optional: control shadow direction
    elevation: 8,                // For Android shadow
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
