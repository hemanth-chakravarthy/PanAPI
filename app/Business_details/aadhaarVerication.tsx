// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
// } from 'react-native';

// const AadhaarScreen = () => {
//   const [aadhaarNumber, setAadhaarNumber] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [showOtpSection, setShowOtpSection] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const otpInputs = useRef<Array<TextInput | null>>([]);
//   const userDetails  ={
//     name:'Haswanth',
//     DOB:'20-06-2004',
//     Address:'Sathupally,Khammam District, Telangana 507303'
//   }

//   // Timer for OTP resend
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (showOtpSection && timer > 0) {
//       interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setIsResendDisabled(false);
//     }
//     return () => clearInterval(interval);
//   }, [showOtpSection, timer]);

//   const handleFetchDetails = () => {
//     const cleanedAadhaar = aadhaarNumber.replace(/\s/g, '');
//     if (cleanedAadhaar.length === 12) {
//       setShowOtpSection(true);
//       setTimer(60);
//       setIsResendDisabled(true);
//       Alert.alert('OTP Sent', 'OTP has been sent to your registered mobile number');
//     } else {
//       Alert.alert('Invalid Aadhaar', 'Please enter a valid 12-digit Aadhaar number');
//     }
//   };

//   const handleVerifyOtp = () => {
//     const enteredOtp = otp.join('');
//     if (enteredOtp.length === 6) {
//       // In real app, you would verify with your backend here
//       setShowDetails(true);
//     } else {
//       Alert.alert('Invalid OTP', 'Please enter complete 6-digit OTP');
//     }
//   };

//   const handleResendOtp = () => {
//     setTimer(60);
//     setIsResendDisabled(true);
//     setOtp(['', '', '', '', '', '']);
//     Alert.alert('OTP Resent', 'New OTP has been sent to your mobile number');
//   };

//   const handleOtpChange = (index: number, value: string) => {
//     if (/^\d*$/.test(value) && value.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto focus next input
//       if (value && index < 5) {
//         otpInputs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const formatAadhaar = (text: string) => {
//     const cleaned = text.replace(/\s/g, '').replace(/\D/g, '');
//     let formatted = '';
//     for (let i = 0; i < cleaned.length; i++) {
//       if (i > 0 && i % 4 === 0) formatted += ' ';
//       formatted += cleaned[i];
//     }
//     return formatted;
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.content}>
//           <Text style={styles.title}>Step-3</Text>
//           <Text style={styles.sectionTitle}>Aadhaar Details</Text>

//           <Text style={styles.label}>Enter Aadhaar number</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Your aadhaar Number Here"
//             keyboardType="numeric"
//             maxLength={14} // 12 digits + 2 spaces
//             value={aadhaarNumber}
//             onChangeText={(text) => setAadhaarNumber(formatAadhaar(text))}
//             editable={!showOtpSection}
//           />

//           {!showOtpSection ? (
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 aadhaarNumber.replace(/\s/g, '').length < 12 && styles.disabledButton,
//               ]}
//               onPress={handleFetchDetails}
//               disabled={aadhaarNumber.replace(/\s/g, '').length < 12}
//             >
//               <Text style={styles.buttonText}>Fetch Aadhaar details</Text>
//             </TouchableOpacity>
//           ) : (
//             <>
//               <View style={styles.divider} />
//               <Text style={styles.otpText}>
//                 Enter the OTP sent to your Aadhaar linked mobile number by UIDAI
//               </Text>

//               <View style={styles.otpContainer}>
//                 {otp.map((digit, index) => (
//                   <TextInput
//                     key={index}
//                     ref={(ref) => (otpInputs.current[index] = ref)}
//                     style={styles.otpInput}
//                     keyboardType="numeric"
//                     maxLength={1}
//                     value={digit}
//                     onChangeText={(value) => handleOtpChange(index, value)}
//                     onKeyPress={({ nativeEvent }) => {
//                       if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
//                         otpInputs.current[index - 1]?.focus();
//                       }
//                     }}
//                   />
//                 ))}
//               </View>

//               <TouchableOpacity
//                 style={styles.resendButton}
//                 onPress={handleResendOtp}
//                 disabled={isResendDisabled}
//               >
//                 <Text
//                   style={[
//                     styles.resendText,
//                     isResendDisabled && styles.disabledResend,
//                   ]}
//                 >
//                   Resend OTP({timer} seconds)
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.button,
//                   otp.join('').length < 6 && styles.disabledButton,
//                 ]}
//                 onPress={handleVerifyOtp}
//                 disabled={otp.join('').length < 6}
//               >
//                 <Text style={styles.buttonText}>Verify Aadhaar details</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {showDetails && (
//             <>
//               <View style={styles.divider} />
//               <Text style={styles.sectionTitle}>Verify Aadhaar details</Text>
//               <Text style={styles.detailText}>Name : {userDetails.name}</Text>
//               <Text style={styles.detailText}>Date of birth :{userDetails.DOB}</Text>
//               <Text style={styles.detailText}>
//                 {userDetails.Address}
//               </Text>
              
             
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 8,
//     color: '#555',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 20,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   disabledButton: {
//     backgroundColor: '#ccc',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: 20,
//   },
//   otpText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   otpInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     width: 45,
//     height: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     backgroundColor: '#fff',
//   },
//   resendButton: {
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   resendText: {
//     color: '#007AFF',
//     fontSize: 14,
//   },
//   disabledResend: {
//     color: '#ccc',
//   },
//   detailText: {
//     fontSize: 14,
//     marginBottom: 12,
//     color: '#333',
//     lineHeight: 20,
//   },
// });

// export default AadhaarScreen;












import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const AadhaarScreen = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const otpInputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();
  const userDetails  ={
    name:'Haswanth',
    DOB:'20-06-2004',
    Address:'Sathupally,Khammam District, Telangana 507303'
  }

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpSection && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [showOtpSection, timer]);

  const handleFetchDetails = () => {
    const cleanedAadhaar = aadhaarNumber.replace(/\s/g, '');
    if (cleanedAadhaar.length === 12) {
      setShowOtpSection(true);
      setTimer(60);
      setIsResendDisabled(true);
      Alert.alert('OTP Sent', 'OTP has been sent to your registered mobile number');
    } else {
      Alert.alert('Invalid Aadhaar', 'Please enter a valid 12-digit Aadhaar number');
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      // In real app, you would verify with your backend here
      setShowDetails(true);
    } else {
      Alert.alert('Invalid OTP', 'Please enter complete 6-digit OTP');
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
    Alert.alert('OTP Resent', 'New OTP has been sent to your mobile number');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        otpInputs.current[index + 1]?.focus();
      }
    }
  };

  const formatAadhaar = (text: string) => {
    const cleaned = text.replace(/\s/g, '').replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += cleaned[i];
    }
    return formatted;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Step-3</Text>
          <Text style={styles.sectionTitle}>Aadhaar Details</Text>

          <Text style={styles.label}>Enter Aadhaar number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your aadhaar Number Here"
            keyboardType="numeric"
            maxLength={14} // 12 digits + 2 spaces
            value={aadhaarNumber}
            onChangeText={(text) => setAadhaarNumber(formatAadhaar(text))}
            editable={!showOtpSection}
          />

          {!showOtpSection ? (
            <TouchableOpacity
              style={[
                styles.button,
                aadhaarNumber.replace(/\s/g, '').length < 12 && styles.disabledButton,
              ]}
              onPress={handleFetchDetails}
              disabled={aadhaarNumber.replace(/\s/g, '').length < 12}
            >
              <Text style={styles.buttonText}>Fetch Aadhaar details</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.divider} />
              <Text style={styles.otpText}>
                Enter the OTP sent to your Aadhaar linked mobile number by UIDAI
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputs.current[index] = ref)}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(index, value)}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                        otpInputs.current[index - 1]?.focus();
                      }
                    }}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendOtp}
                disabled={isResendDisabled}
              >
                <Text
                  style={[
                    styles.resendText,
                    isResendDisabled && styles.disabledResend,
                  ]}
                >
                  Resend OTP({timer} seconds)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  otp.join('').length < 6 && styles.disabledButton,
                ]}
                onPress={handleVerifyOtp}
                disabled={otp.join('').length < 6}
              >
                <Text style={styles.buttonText}>Verify Aadhaar details</Text>
              </TouchableOpacity>
            </>
          )}

          {showDetails && (
            <>
              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>Verify Aadhaar details</Text>
              <Text style={styles.detailText}>Name : {userDetails.name}</Text>
              <Text style={styles.detailText}>Date of birth :{userDetails.DOB}</Text>
              <Text style={styles.detailText}>
                {userDetails.Address}
              </Text>
            </>
          )}
        </View>
      </ScrollView>

      {/* Footer with gradient shadow and proceed button */}
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
            { backgroundColor: showDetails ? '#1d4b96' : '#94788a' }
          ]}
          onPress={() => {
            if (!showDetails) {
              Alert.alert('Verification Needed', 'Please complete Aadhaar verification first.');
              return;
            }
            // Navigate to next screen
            router.push('/Business_details/fssai');
          }}
        >
          <Text style={styles.bottomText}>Proceed to next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding to account for footer
  },
  content: {
    padding: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  otpText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 45,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: '#007AFF',
    fontSize: 14,
  },
  disabledResend: {
    color: '#ccc',
  },
  detailText: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
    lineHeight: 20,
  },
  // Footer styles
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

export default AadhaarScreen;