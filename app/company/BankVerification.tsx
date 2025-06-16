import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

export default function BankVerificationScreen() {
  const [isVerified, setIsVerified] = useState(false);
  const [bankAccountNumber, setBankAccountNumber] = useState('9911223344464444');
  const [ifscCode, setIfscCode] = useState('9911223344464444');
const router = useRouter();

  const handleVerification = () => {
    // Simulate verification process
    setIsVerified(true);
  };

  const handleProceed = () => {
    // Handle proceed to next step
    router.push('/company/Terms');
    console.log('Proceeding to next step...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step - 5</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Bank Details</Text>

        {/* Bank Account Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bank account number</Text>
          <TextInput
            style={styles.textInput}
            value={bankAccountNumber}
            onChangeText={setBankAccountNumber}
            placeholder="Enter bank account number"
            keyboardType="numeric"
          />
        </View>

        {/* IFSC Code */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>IFSC code</Text>
          <TextInput
            style={styles.textInput}
            value={ifscCode}
            onChangeText={setIfscCode}
            placeholder="Enter IFSC code"
            autoCapitalize="characters"
          />
        </View>

        {/* Verify Button */}
        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={handleVerification}
        >
          <Text style={styles.verifyButtonText}>Verify bank details</Text>
        </TouchableOpacity>

        {/* Verification Details - Only shown after verification */}
        {isVerified && (
          <View style={styles.verificationDetails}>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Holder Name : </Text>
              <Text style={styles.detailValue}>raghavendra reddy</Text>
            </Text>
            
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Bank : </Text>
              <Text style={styles.detailValue}>State Bank of India</Text>
            </Text>
            
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account number : </Text>
              <Text style={styles.detailValue}>99999999999</Text>
            </Text>
            
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ifsc code : </Text>
              <Text style={styles.detailValue}>123456789999</Text>
            </Text>
            
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>City : </Text>
              <Text style={styles.detailValue}>Hyderabad</Text>
            </Text>
            
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Branch : </Text>
              <Text style={styles.detailValue}>kukatpally</Text>
            </Text>

            {/* Checkbox */}
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox}>
                <Ionicons name="checkmark" size={16} color="#fff" />
              </View>
              <Text style={styles.checkboxText}>Bank details matched</Text>
            </View>
          </View>
        )}
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[styles.proceedButton, isVerified ? styles.proceedButtonActive : styles.proceedButtonInactive]}
          onPress={handleProceed}
          disabled={!isVerified}
        >
          <Text style={[styles.proceedButtonText, isVerified ? styles.proceedButtonTextActive : styles.proceedButtonTextInactive]}>
            Proceed to next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  verificationDetails: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailRow: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailLabel: {
    color: '#666',
  },
  detailValue: {
    color: '#000',
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 16,
  },
  proceedButton: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  proceedButtonActive: {
    backgroundColor: '#1976D2',
  },
  proceedButtonInactive: {
    backgroundColor: '#9E9E9E',
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  proceedButtonTextActive: {
    color: '#fff',
  },
  proceedButtonTextInactive: {
    color: '#fff',
  },
});