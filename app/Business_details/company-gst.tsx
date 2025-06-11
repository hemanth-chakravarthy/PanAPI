import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useRouter } from 'expo-router';

const CompanyGst = () => {
  const [gstNumber, setGstNumber] = useState('');
  const [selectedExemption, setSelectedExemption] = useState<string | null>(null);
  const [declarationChecked, setDeclarationChecked] = useState(false);
    const router = useRouter();
  const handleGSTChange = (text: string) => {
    const value = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15); // Only alphanumerics, max 15
    setGstNumber(value);
  };

  const handleNext = () => {
    if (!declarationChecked) {
      Alert.alert('Declaration Required', 'Please confirm declaration to proceed.');
      return;
    }
    router.push("/Business_details/vendor-gst"); // <-- Use your actual next route
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step-5</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Company GST Details</Text>

          <Text style={styles.label}>Enter GST number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GST number"
            value={gstNumber}
            onChangeText={handleGSTChange}
            maxLength={15}
          />

          <TouchableOpacity style={styles.verifyButton}>
            <Text style={styles.verifyButtonText}>Verify GST details</Text>
          </TouchableOpacity>

          <Text style={styles.subTitle}>GST mandatory unless exempt</Text>

          <View style={styles.checkboxRow}>
            <CheckBox
              value={selectedExemption === 'below20L'}
              onValueChange={() =>
                setSelectedExemption(selectedExemption === 'below20L' ? null : 'below20L')
              }
              color={selectedExemption === 'below20L' ? '#000' : undefined}
              style={styles.roundCheckBox}
            />
            <Text style={styles.checkboxLabel}>Turnover below ₹20L</Text>
          </View>

          <View style={styles.checkboxRow}>
            <CheckBox
              value={selectedExemption === 'intraSales'}
              onValueChange={() =>
                setSelectedExemption(selectedExemption === 'intraSales' ? null : 'intraSales')
              }
              color={selectedExemption === 'intraSales' ? '#000' : undefined}
              style={styles.roundCheckBox}
            />
            <Text style={styles.checkboxLabel}>Only intra-state sales</Text>
          </View>

          <View style={styles.checkboxRow}>
            <CheckBox
              value={selectedExemption === 'exemptProducts'}
              onValueChange={() =>
                setSelectedExemption(selectedExemption === 'exemptProducts' ? null : 'exemptProducts')
              }
              color={selectedExemption === 'exemptProducts' ? '#000' : undefined}
              style={styles.roundCheckBox}
            />
            <Text style={styles.checkboxLabel}>Selling exempt products</Text>
          </View>

          <View style={styles.declarationRow}>
            <CheckBox
              value={declarationChecked}
              onValueChange={setDeclarationChecked}
              color={declarationChecked ? '#000' : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
              I declare that I am not required to register under GST laws as my turnover is below the prescribed limit
            </Text>
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

export default CompanyGst;

const styles = StyleSheet.create({
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  verifyButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  declarationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
  },
  roundCheckBox:{
    width: 22,
    height: 22,
    borderRadius: 11, // Half of width/height for perfect circle
    borderWidth: 2,
    borderColor: '#000',
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
    elevation: 8,
  },
  nextButton: {
    backgroundColor: '#6B4C68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
