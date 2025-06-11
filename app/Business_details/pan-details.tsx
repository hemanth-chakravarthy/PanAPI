// app/pan-details.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';

import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';



const PanDetailsScreen = () => {
  const router = useRouter();
  const [panNumber, setPanNumber] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  const panInfo = {
    pan: 'ABCDE1234F',
    name: 'Satyanarayana Reddy',
    type: 'Individual',
    status: 'Valid',
  };

  const isValidPAN = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const handleVerify = () => {
    if (!isValidPAN(panNumber)) {
      setIsVerified(false);
      setIsMatched(false);
      Alert.alert('Invalid PAN', 'Please enter a valid PAN number.');
      return;
    } 
    setIsVerified(true);
  };

  return (
    <>
      {/* Header */}
      <Stack.Screen
        options={{
          title: 'Step-2',
          headerTitleAlign: 'center',
        }}
      />
      <StatusBar style="dark" />

      {/* Main */}
      <View style={styles.container}>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>PAN Details</Text>
          <Text style={styles.label}>Enter PAN number</Text>

          <TextInput
            style={styles.input}
            value={panNumber}
            onChangeText={(text) => {
              setPanNumber(text.toUpperCase()); // force uppercase
            }}
            placeholder="ABCDE1234F"
            placeholderTextColor="#CCCCCC"
          />

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
          >
            <Text style={styles.verifyText}>Verify PAN details</Text>
          </TouchableOpacity>


          <View style={styles.panInfo}>
            {isVerified ? (
              <>
                { !isMatched && <Text><Text style={styles.bold}>PAN no</Text>: {panInfo.pan}</Text> }
                <Text><Text style={styles.bold}>R.Name</Text>: {panInfo.name}</Text>
                <Text><Text style={styles.bold}>PAN type</Text>: {panInfo.type}</Text>
                <Text><Text style={styles.bold}>Pan status</Text>: {panInfo.status}</Text>

                <View style={styles.checkboxContainer}>
                  {/* <Checkbox style={[
                    styles.checkboxStyle, 
                    ]} 
                    color='black'
                    value={isMatched} 
                    onValueChange={setIsMatched}
                  />
                  <Text style={styles.checkboxLabel}>PAN details matched</Text> */}
                  
                  {/* <TouchableOpacity
                    style={styles.customCheckbox}
                    onPress={() => setIsMatched(!isMatched)}
                  >
                    {isMatched && <Ionicons name="checkmark-sharp" size={14} color="black" />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>PAN details matched</Text> */}

                  {/* <TouchableOpacity
                    style={styles.customCheckbox}
                    onPress={() => setIsMatched(!isMatched)}
                  >
                    {isMatched && (
                      <>
                        <MaterialIcons name="check" size={14} color="black" style={{ position: 'absolute' }} />
                        <MaterialIcons name="check" size={14} color="black" style={{ marginLeft: 0.5, marginTop: 0.5 }} />
                      </>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>PAN details matched</Text> */}

                  <TouchableOpacity
                    style={styles.customCheckbox}
                    onPress={() => setIsMatched(!isMatched)}
                  >
                    {isMatched && <Entypo name="check" size={14} color="black" style={{ transform: [{ rotate: '8deg' }] }}/>}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>PAN details matched</Text>


                </View>
              </>
            ) : (
              // Placeholder to reserve space before PAN is verified
              <View style={{ height: 125.5 }} /> 
            )}
          </View>

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
            { backgroundColor: isMatched ? '#1d4b96' : '#94788a' }
          ]}
          onPress={() => {
            if (!isVerified) {
              Alert.alert('Invalid PAN', 'Please enter a valid PAN number and confirm that PAN details are matched.');
              return;
            }
            if (!isMatched) {
              Alert.alert('Confirmation Needed', 'Please confirm that PAN details are matched.');
              return;
            }
            router.push('./next-step');
          }}
        >
          <Text style={styles.bottomText}>Proceed to next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PanDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: 'dodgerblue',
    
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderColor: '#663399',
    
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: 'black',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyText: {
    color: 'white',
    fontWeight: '600',
  },
  panInfo: {
    marginTop: 8,
    gap: 4,
  },
  bold: {
    fontWeight: '700',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  // checkboxStyle: {
  //   borderRadius: 4,    
  //   borderWidth: 2,      
  //   borderColor: 'black',
  //   backgroundColor: 'white',
  //   width: 18,
  //   height: 18,
  // },
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

  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  bottomButton: {
    backgroundColor: '#94788a',
    borderRadius: 6,
    paddingVertical: 12,
    width: 275,
    alignItems: 'center',
  },
  bottomText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});