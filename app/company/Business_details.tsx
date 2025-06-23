// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const BusinessDetailsScreen: React.FC = () => {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Business Details</Text>
//             {/* Add your business details form here */}
//         </View>
//     );
// };

// export default BusinessDetailsScreen;

// const styles = StyleSheet.create({
//     container: { padding: 20 },
//     heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
// }); 


import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function BusinessDetails() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Business Details</Text>
          <Text style={styles.cardInfo}>
            Based on your selected business type <Text style={{ fontWeight: 'bold' }}>(Registered company)</Text>, please complete the required KYC details below:
          </Text>

          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <Text key={index} style={styles.stepText}>
                Step {index + 1} : {step}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity 
        style={styles.proceedButton}
        onPress={() => router.push('/company/CompanyDetails')}
      >
        <Text style={styles.buttonText}>Proceed to next</Text>
      </TouchableOpacity>
    </View>
  );
}

const steps = [
  "Shop/Store Details",
  "PAN Details",
  "Aadhaar Details",
  "FSSAI License Details",
  "GSTIN Details",
  "Bank Details",
  "Agreement & signatures"
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    paddingTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // space for button
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 13,
    color: '#333',
    marginBottom: 16,
    lineHeight: 20,
  },
  stepsContainer: {
    marginTop: 4,
  },
  stepText: {
    fontSize: 14,
    color: '#222',
    marginVertical: 6,
  },
  proceedButton: {
    backgroundColor: '#2E5CAE',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});