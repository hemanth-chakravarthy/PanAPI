import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SellerRegistrationScreen() {
  const router = useRouter();
  const steps = [
    { step: 1, title: 'Company Details' },
    { step: 2, title: 'Authorized Person Details' },
    { step: 3, title: 'Company PAN details' },
    { step: 4, title: 'company gst details' },
    { step: 5, title: 'Upload Supporting Documents' },
    { step: 6, title: 'FSSAI License Number' },
    { step: 7, title: 'Bank Account Verification' },
    { step: 8, title: 'Agreement & signatures' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Registration</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Business Details
          </Text>
          
          <Text style={styles.description}>
            Based on your selected business type (Registered company), 
            please complete the required KYC details below:
          </Text>

          <View style={styles.stepsContainer}>
            {steps.map((item, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>
                    Step {item.step}
                  </Text>
                </View>
                <View style={styles.stepTitle}>
                  <Text style={styles.stepTitleText}>
                    : {item.title}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity 
          onPress={() => router.push('/')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: '#444',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#4299e1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 80,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  stepTitle: {
    flex: 1,
  },
  stepTitleText: {
    fontSize: 14,
    color: '#555',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});