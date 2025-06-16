import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useRouter } from 'expo-router';
const AadhaarVerification = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [timer, setTimer] = useState(60);
  const [detailsMatched, setDetailsMatched] = useState(false);
  const router = useRouter();
  // OTP state
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const otpInputRefs = useRef<(TextInput | null)[]>([]);
  
  // Format Aadhaar number with spaces
  const formatAadhaar = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setAadhaarNumber(formatted);
  };
  
  // Handle OTP input
  const handleOtpChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      
      // Auto focus next input
      if (text.length === 1 && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };
  
  // Handle backspace in OTP
  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      otpInputRefs.current[index - 1]?.focus();
    }
  };
  
  // Fetch Aadhaar details
  const fetchAadhaarDetails = () => {
    setShowOtpSection(true);
    // Start timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Verify OTP
  const verifyOtp = () => {
    setShowDetails(true);
  };
  
  // Resend OTP
  const resendOtp = () => {
    if (timer === 0) {
      setTimer(60);
      // Resend OTP logic
    }
  };

  return (

    <View style={{flex:1, alignItems: 'center' }}>
      
        <View style={styles.container}>
          <Text style={[styles.header, {alignSelf: 'center'}]}>Aadhaar Details</Text>
    
          <Text style={styles.label}>Enter Aadhaar Number</Text>
          <TextInput
            style={styles.input}
            placeholder="XXXX XXXX XXXX XXXX"
            placeholderTextColor="#AFAFAF"
            value={aadhaarNumber}
            onChangeText={formatAadhaar}
            keyboardType="numeric"
            maxLength={14} // 12 digits + 2 spaces
          />
          
          <TouchableOpacity 
            style={styles.button}
            onPress={fetchAadhaarDetails}
          >
            <Text style={styles.buttonText}>Fetch Aadhaar Details</Text>
          </TouchableOpacity>
          
            <>
              <View style={styles.divider} />
              
              <Text style={styles.otpInstruction}>
                Enter the OTP sent to your aadhaar linked mobile number by UIDAI
              </Text>
              
              <View style={styles.otpContainer}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputRefs.current[index] = ref)}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    placeholder="1"
                    placeholderTextColor="#AFAFAF"
                    value={otp[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
                  />
                ))}
              </View>
              
              <TouchableOpacity 
                onPress={resendOtp}
                disabled={timer > 0}
              >
                <Text style={[styles.resendText, timer > 0 && styles.disabledText]}>
                  Resend OTP ({timer} seconds)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.button}
                onPress={verifyOtp}
              >
                <Text style={styles.buttonText}>Verify Aadhaar Details</Text>
              </TouchableOpacity>
            </>
        
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Name: Satyanarayana Reddy</Text>
              <Text style={styles.detailText}>Date of birth: 11-01-2000</Text>
              <Text style={styles.detailText}>Address: 111, Sai Ra, Road No 1, Colony, Hyderabad, Telangana, 500072</Text>
              
              <View style={styles.checkboxRow}>
                <CheckBox
                  value={detailsMatched}
                  onValueChange={setDetailsMatched}
                  color={detailsMatched ? '#007BFF' : undefined}
                />
                <Text style={styles.checkboxLabel}>Aadhaar details matched</Text>
              </View>
            </View>

        </View>
        <TouchableOpacity
  style={styles.button}
  onPress={() => router.push('/company/Terms')} // Replace with your actual route
>
  <Text style={styles.buttonText}>Proceed to Next</Text>
</TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 354,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#C2DAFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 23,
  },
  header: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 15,
    fontFamily: 'Roboto',
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#000000',
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#000000',
    color: '#fff',
    height: 44,
    paddingHorizontal: 20,
    paddingTop: 12,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center', // Centers the button horizontally
    flex: 1, // Takes available space but respects other elements
    width: '100%', // Prevents overflow
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  otpInstruction: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#666666',
    marginBottom: 15,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  resendText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  disabledText: {
    color: '#999999',
  },
  detailsContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    marginBottom: 5,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: 'Roboto',
    marginLeft: 8,
  },


  button: {
    backgroundColor: '#007AFF', // iOS system blue color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AadhaarVerification;