import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router'; // Import from expo-router

const UploadDocumentsScreen = () => {
  const [incorporationNumber, setIncorporationNumber] = useState('KFFOO###H');
  const [fileName, setFileName] = useState('');
  const router = useRouter(); // Using expo-router's useRouter

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      
      if (result.type === 'success') {
        setFileName(result.name);
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const handleContinue = () => {
    router.push('/company/fssaii'); // Using router.push to navigate
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Supporting Documents</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter INCORPORATE number</Text>
        <TextInput
          style={styles.input}
          value={incorporationNumber}
          onChangeText={setIncorporationNumber}
        />
      </View>
      
      <View style={styles.uploadContainer}>
        {/* <Text style={styles.label}>Upload Certificate of Incorporation</Text> */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload Certificate of Incorporation</Text>
        </TouchableOpacity>
        {fileName ? (
          <Text style={styles.fileName}>{fileName}</Text>
        ) : (
          <Text style={styles.placeholder}>No file selected</Text>
        )}
      </View>
      
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
  uploadContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#000002',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
    
  },
  fileName: {
    color: '#333',
    fontStyle: 'italic',
  },
  placeholder: {
    color: '#999',
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: '#007AFF', // Blue color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UploadDocumentsScreen;