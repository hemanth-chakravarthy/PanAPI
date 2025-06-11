// // company/BankVerification.tsx
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

// const BankVerification = () => {
//   const [isVerified, setIsVerified] = useState(false);
//   const [accountNumber, setAccountNumber] = useState('');
//   const [ifscCode, setIfscCode] = useState('');

//   const handleVerify = () => {
//     if (accountNumber && ifscCode) {
//       setIsVerified(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Bank Details</Text>
      
//       <View style={styles.section}>
//         {/* <Text style={styles.sectionTitle}>Start Details</Text>
//          */}
//         <Text style={styles.subTitle}>Book account number</Text>
//         <TextInput
//           style={styles.input}
//           value={accountNumber}
//           onChangeText={setAccountNumber}
//           placeholder="Enter account number"
//           keyboardType="numeric"
//         />
        
//         <Text style={styles.subTitle}>PSC code</Text>
//         <TextInput
//           style={styles.input}
//           value={ifscCode}
//           onChangeText={setIfscCode}
//           placeholder="Enter IFSC code"
//           keyboardType="numeric"
//         />
//       </View>

//       <TouchableOpacity 
//         style={[styles.verifyButton, (!accountNumber || !ifscCode) && styles.disabledButton]}
//         onPress={handleVerify}
//         disabled={!accountNumber || !ifscCode}
//       >
//         <Text style={styles.buttonText}>Verify</Text>
//       </TouchableOpacity>

//       {isVerified && (
//         <>
//           <View style={styles.divider} />
          
//           <View style={styles.section}>
//             {/* <Text style={styles.sectionTitle}>Verify basic details</Text>
            
//             <Text style={styles.notice}>Notice here: categoryspan-only</Text> */}
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Holder Name:</Text>
//               <Text style={styles.detailValue}>geeta chilla</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Account number:</Text>
//               <Text style={styles.detailValue}>{accountNumber}</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>IFSC code:</Text>
//               <Text style={styles.detailValue}>{ifscCode}</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>City:</Text>
//               <Text style={styles.detailValue}>Andhra Pradesh</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Branch:</Text>
//               <Text style={styles.detailValue}>Vijayawada</Text>
//             </View>
            
//             <View style={styles.checkboxContainer}>
//               <Text style={styles.checkboxLabel}>Bank detail: matched</Text>
//             </View>
//           </View>

          
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ccc',
//     marginVertical: 15,
//   },
//   notice: {
//     fontStyle: 'italic',
//     marginBottom: 10,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     width: 120,
//   },
//   detailValue: {
//     flex: 1,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//   },
//   protectedText: {
//     marginBottom: 20,
//     fontStyle: 'italic',
//   },
//   verifyButton: {
//     backgroundColor: '#000000',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default BankVerification;




// company/BankVerification.tsx
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
// import { CheckBox } from 'react-native-elements';

// const BankVerification = () => {
//   const [isVerified, setIsVerified] = useState(false);
//   const [accountNumber, setAccountNumber] = useState('');
//   const [pscCode, setPscCode] = useState('');
//   const [isMatched, setIsMatched] = useState(false);

//   const handleVerify = () => {
//     if (accountNumber && pscCode) {
//       setIsVerified(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Step-6</Text>
      
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Start Details</Text>
        
//         <Text style={styles.subTitle}>Book account number</Text>
//         <TextInput
//           style={styles.input}
//           value={accountNumber}
//           onChangeText={setAccountNumber}
//           placeholder="Enter account number"
//           keyboardType="numeric"
//         />
        
//         <Text style={styles.subTitle}>PSC code</Text>
//         <TextInput
//           style={styles.input}
//           value={pscCode}
//           onChangeText={setPscCode}
//           placeholder="Enter PSC code"
//           keyboardType="numeric"
//         />
//       </View>

//       <TouchableOpacity 
//         style={[styles.verifyButton, (!accountNumber || !pscCode) && styles.disabledButton]}
//         onPress={handleVerify}
//         disabled={!accountNumber || !pscCode}
//       >
//         <Text style={styles.buttonText}>Verify</Text>
//       </TouchableOpacity>

//       {isVerified && (
//         <>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               checked={isMatched}
//               onPress={() => setIsMatched(!isMatched)}
//               checkedColor="#007bff"
//             />
//             <Text style={styles.checkboxLabel}>Bank details matched</Text>
//           </View>
          
//           <View style={styles.divider} />
          
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Verify basic details</Text>
            
//             <Text style={styles.notice}>Notice here: categoryspan-only</Text>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Book Name:</Text>
//               <Text style={styles.detailValue}>Code base</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Account number:</Text>
//               <Text style={styles.detailValue}>{accountNumber}</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Free code:</Text>
//               <Text style={styles.detailValue}>9999999999</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>City:</Text>
//               <Text style={styles.detailValue}>Hydronoad</Text>
//             </View>
            
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Branch:</Text>
//               <Text style={styles.detailValue}>Subquality</Text>
//             </View>
//           </View>

//           <Text style={styles.protectedText}>Protected or not</Text>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ccc',
//     marginVertical: 15,
//   },
//   notice: {
//     fontStyle: 'italic',
//     marginBottom: 10,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     width: 120,
//   },
//   detailValue: {
//     flex: 1,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   protectedText: {
//     marginBottom: 20,
//     fontStyle: 'italic',
//   },
//   verifyButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default BankVerification;




// company/BankVerification.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';

const BankVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [pscCode, setPscCode] = useState('');
  const [isMatched, setIsMatched] = useState(false);

  const handleVerify = () => {
    if (accountNumber && pscCode) {
      setIsVerified(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Step-6</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Start Details</Text>
        
        <Text style={styles.subTitle}>Book account number</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="Enter account number"
          keyboardType="numeric"
        />
        
        <Text style={styles.subTitle}>PSC code</Text>
        <TextInput
          style={styles.input}
          value={pscCode}
          onChangeText={setPscCode}
          placeholder="Enter PSC code"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity 
        style={[styles.verifyButton, (!accountNumber || !pscCode) && styles.disabledButton]}
        onPress={handleVerify}
        disabled={!accountNumber || !pscCode}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      {isVerified && (
        <>
          <View style={styles.divider} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Verify basic details</Text>
            
            
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Book Name:</Text>
              <Text style={styles.detailValue}>Code base</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account number:</Text>
              <Text style={styles.detailValue}>{accountNumber}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Free code:</Text>
              <Text style={styles.detailValue}>9999999999</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>City:</Text>
              <Text style={styles.detailValue}>Hydronoad</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Branch:</Text>
              <Text style={styles.detailValue}>Subquality</Text>
            </View>
          </View>

          <View></View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={isMatched}
              onPress={() => setIsMatched(!isMatched)}
              checkedColor="#007bff"
            />
            <Text style={styles.checkboxLabel}>Bank details matched</Text>
          </View>

         
        </>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  notice: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 120,
  },
  detailValue: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: -10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  protectedText: {
    marginBottom: 20,
    fontStyle: 'italic',
  },
  verifyButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BankVerification;