

import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

// Import individual flow components
import BusinessDetails from "../Business_details/BusinessDetails";
//  import PanDetailsScreen from "../Business_details/pan-details"
// import AadhaarScreen from "../Business_details/aadhaarVerication";
// import BankVerificationScreen from "../Business_details/BankVerificationBusiness";
// import FssaiForm from "../Business_details/fssai";
// import SellerRegistrationScreen from "../Business_details/sellerRegistration"
// import StoreDetails from "../Business_details/StoreDetails";
// import Terms from "../Business_details/terms";
// import VendorGstForm from "../Business_details/vendor-gst";
// import CompanyGst from "../Business_details/company-gst";
// import NextStepScreen from "../Business_details/next-step"



// Import company flow components

// import CompanyDetails from "../company/CompanyDetails";
// import FssaiStep4 from "../company/fssaii";
// import Step4GstScreen from "../company/GSTVerfication";
// import Step3PanScreen from "../company/PANVerification";
// import Step2 from "../company/Step2"
 
// import CompanyFinalReview from "./company/FinalReview";
// import BankVerification from "../company/BankVerification";
// import AadhaarVerification from "../company/AadhaarVerification";
// import AuthorizedPersonDetails from "../company/AuthorizedPersonDetials";
 import BusinessDetailsScreen from "../company/Business_details";
import { storeToken } from "../utils/storage";
import api from "../utils/api";

export default function SellerRegistration() {
  // Registration form states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState<"individual" | "company">("individual");
  
  // OTP verification states
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Form data state to collect all registration data
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    businessType: "",
    // Add other fields as needed
  });

  const otpInputRefs = useRef<(TextInput | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  // Individual flow components
  const individualComponents = [
    BusinessDetails,
    // PanDetailsScreen,
    //  AadhaarScreen,
    //  FssaiForm,
    //  CompanyGst,
    // VendorGstForm,
    //  BankVerificationScreen,
    // SellerRegistrationScreen,
    // Terms,
    
    // NextStepScreen,
   // StoreDetails,

  ];

  // Company flow components
  const companyComponents = [
    
    // CompanyDetails,
    // BankVerification,
    // AadhaarVerification,
    // AuthorizedPersonDetails,
    // FssaiStep4,
    BusinessDetailsScreen,
// Step2,
//    Step4GstScreen,
//    Step3PanScreen
    // CompanyFinalReview
  ];

  // Page titles
  const individualPages = [
    "Business Details",
    "PAN Details",
    "Bank Details",
    "Address Proof",
    "Business Proof",
    "Product Details",
    "Tax Details",
    "Shop Photos",
    "Payment Setup",
    "Final Review"
  ];

  const companyPages = [
    "Company Details",
    "PAN Details",
    "Bank Details",
    "Address Proof",
    "Business Registration",
    "Director Details",
    "Tax Details",
    "Product Details",
    "Warehouse Details",
    "Payment Setup",
    "Legal Documents",
    "Final Review"
  ];

  const pages = businessType === "individual" ? individualPages : companyPages;
  const currentComponents = businessType === "individual" ? individualComponents : companyComponents;

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

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
  if (!email.trim() || !phone.trim() || !name.trim()) {
    alert("Please fill all the fields");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Enter a valid 10-digit phone number");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Enter a valid email address");
    return;
  }

  // If all valid
  setMobileNumber(phone);
  setShowOTPScreen(true);
  setFormData({
    ...formData,
    email,
    phone,
    name,
    businessType
  });
};


  const handleOTPVerification = async () => {
    const otpValue = otp.join("");

    if (otpValue.length < 6 || otp.some((d) => d.trim() === "")) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await api.post('/api/Seller/createAccount', {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        businessType: formData.businessType,
      });

      const token = response.data.token;
      await storeToken(token);

      // console.log("Token stored successfully:", token);

      setShowOTPScreen(false);
      setCurrentPage(1);
      console.log("✅ User created and token stored");
    } catch (error: any) {
      console.error("❌ Error creating seller:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong during registration.");
    }
};


  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageSubmit = (pageData: any) => {
    // Update form data with current page's data
    setFormData(prev => ({
      ...prev,
      ...pageData
    }));
    
    // Move to next page
    handleNextPage();
  };

  const handleFinalSubmit = () => {
    console.log("Final form data:", formData);
    // Submit all data to your backend
    // navigation.navigate('SuccessScreen');
  };

  if (showOTPScreen) {
    return (
      <View style={styles.otpContainer}>
        <Text style={styles.otpHeader}>OTP verification</Text>
        <Text style={styles.otpInstruction}>
          Enter the OTP sent to us +91 {mobileNumber} to verify and create your account.
        </Text>

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

  if (currentPage > 0) {
    const CurrentComponent = currentComponents[currentPage - 1];
    const isLastPage = currentPage === pages.length;

    return (
      <View style={styles.pageContainer}>
        <Text style={styles.pageHeader}>{pages[currentPage - 1]}</Text>
        <Text style={styles.pageSubHeader}>
          {businessType === "individual" ? "Individual" : "Company"} registration - Step {currentPage} of {pages.length}
        </Text>
        
        <ScrollView style={styles.pageContent}>
          <CurrentComponent 
            formData={formData}
            onSubmit={isLastPage ? handleFinalSubmit : handlePageSubmit}
            onPrevious={handlePreviousPage}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.mainHeader}>Create an account</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          style={styles.inputField}
          placeholder="ex: john@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

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

        <Text style={styles.fieldLabel}>Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="ex: full name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.fieldLabel}>Select your business type</Text>
        
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
  mainHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
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
  pageContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  pageHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  pageSubHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  pageContent: {
    flex: 1,
    marginBottom: 20,
  },
});