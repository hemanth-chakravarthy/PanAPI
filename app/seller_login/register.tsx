
import { useState,useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function SellerRegistration() {
  // Registration form states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState<"individual" | "company">(
    "individual"
  );
  
  // OTP verification states
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  //const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const otpInputRefs = useRef<(TextInput | null)[]>([]);
const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

const handleOtpChange = (text: string, index: number) => {
  const newOtp = [...otp];
  newOtp[index] = text;
  setOtp(newOtp);

  // Auto focus to next input
  if (text && index < 5) {
    otpInputRefs.current[index + 1]?.focus();
  }
};

const handleOtpKeyPress = (key: string, index: number) => {
  if (key === 'Backspace' && !otp[index] && index > 0) {
    otpInputRefs.current[index - 1]?.focus();
  }
};

  const handleSubmit = () => {
    // When user clicks Continue, show OTP screen
    setMobileNumber(phone); // Save the entered phone number
    setShowOTPScreen(true);
  };

  const handleOTPVerification = () => {
    // Handle OTP verification logic here
    console.log("Verifying OTP:", otp);
    // After successful verification, navigate to next screen
  };

  const handleResendOTP = () => {
    console.log("Resending OTP to:", mobileNumber);
    // Implement OTP resend logic
  };

//   if (showOTPScreen) {
//     return (
//       <ScrollView 
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Time Header */}
//         {/* <Text style={styles.timeHeader}>3:30</Text> */}
        
//         {/* Main Header */}
//         <Text style={styles.mainHeader}>OTP verification</Text>
        
//         {/* Sub Header */}
//         {/* <Text style={styles.subHeader}>OTP verification</Text> */}

//         {/* OTP Message */}
//         <Text style={styles.otpMessage}>
//           Enter the OTP sent to us +91 {mobileNumber} to verify and create your account.
//         </Text>

//         {/* OTP Input */}
//         <TextInput
//           style={styles.otpInput}
//           placeholder="Enter OTP"
//           placeholderTextColor="#999"
//           value={otp}
//           onChangeText={setOtp}
//           keyboardType="number-pad"
//           maxLength={6}
//         />

//         {/* Resend OTP */}
//         {/* <TouchableOpacity onPress={handleResendOTP}>
//           <Text style={styles.resendText}>Didn't receive OTP? Resend</Text>
//         </TouchableOpacity> */}

//         {/* Verify Button */}
//         <TouchableOpacity 
//           style={styles.submitButton} 
//           onPress={handleOTPVerification}
//         >
//           <Text style={styles.submitButtonText}>Proceed to next</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     );
//   }

if (showOTPScreen) {
    return (
      <View style={styles.otpContainer}>
        {/* Centered OTP Header */}
        <Text style={styles.otpHeader}>OTP verification</Text>
        
        {/* OTP Instruction Text */}
        <Text style={styles.otpInstruction}>
          {/* Enter the log serial as v1: 5/64:32:23 to verify and
          {"\n"}create your account */}
          Enter the OTP sent to us +91 {mobileNumber} to verify and create your accountttt.
        </Text>

        {/* OTP Input Fields */}
        <View style={styles.otpInputContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpInputRefs.current[index] = ref)}
              style={styles.otpDigitInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
              value={otp[index] ? otp[index].toString() : ''}
            />
          ))}
        </View>

        {/* Blue Proceed Button */}
        <TouchableOpacity 
          style={styles.proceedButton} 
          onPress={handleOTPVerification}
          disabled={otp.length < 6}
        >
          <Text style={styles.proceedButtonText}>PROCEED TO NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Time Header */}
      {/* <Text style={styles.timeHeader}>9:30</Text> */}
      
      {/* Main Header */}
      <Text style={styles.mainHeader}>Create an account</Text>
      
      {/* Sub Header */}
      {/* <Text style={styles.subHeader}>Create an account</Text> */}

      {/* Form Fields */}
      <View style={styles.formContainer}>
        {/* Email Field */}
        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          style={styles.inputField}
          placeholder="ex: johns1.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Phone Number Field */}
        <Text style={styles.fieldLabel}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>
          <TextInput
            style={[styles.inputField, { flex: 1 }]}
            placeholder="ex: 0122348431"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Name Field */}
        <Text style={styles.fieldLabel}>Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="ex: full name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        {/* Business Type Field */}
        <Text style={styles.fieldLabel}>Select your business type</Text>
        
        {/* Radio Buttons */}
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setBusinessType("individual")}
          >
            <View style={styles.radioOuter}>
              {businessType === "individual" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Shop / Individual / Proprietor</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setBusinessType("company")}
          >
            <View style={styles.radioOuter}>
              {businessType === "company" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Partnership / LLP / Pvt Ltd</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Proceed to next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  timeHeader: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  mainHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 32,
  },
  formContainer: {
    width: "100%",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  countryCode: {
    height: 50,
    width: 70,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  countryCodeText: {
    fontSize: 16,
    color: "#000",
  },
  radioGroup: {
    marginBottom: 32,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  // OTP Screen Styles
//   otpMessage: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 32,
//     lineHeight: 24,
//   },
//   otpInput: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     marginBottom: 16,
//     fontSize: 16,
//     backgroundColor: "#FAFAFA",
//     textAlign: "center",
//     letterSpacing: 8,
//   },
//   resendText: {
//     fontSize: 14,
//     color: "#007bff",
//     textAlign: "center",
//     marginBottom: 32,
//   },
// });

otpContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  otpInstruction: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  otpDigitInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FAFAFA',
  },
  proceedButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});