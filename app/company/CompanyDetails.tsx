
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView,TouchableOpacity, Image  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox'
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

let states = [
    "select state",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
]


const CompanyDetails = () => {
  const [businessName, setBusinessName] = useState('');
  const [pincode, setPincode] = useState('');
  const [doorNumber, setDoorNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [colony, setColony] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedState, setSelectedState] = useState(states[0]);
  const [sameAsBusiness, setSameAsBusiness] = useState(false);
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [bannerUri, setBannerUri] = useState<string | null>(null);
  const [officeContact, setOfficeContact] = useState('');
  const [officeWebsite, setOfficeWebsite] = useState('');

  const router = useRouter();

  const pickImage = async (setImage: (uri: string | null) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex:1, alignItems: 'center' }}>
        <Text style={styles.heading}>company details</Text>
      </View>
      <Text style={styles.label}>Business Name</Text>
      <TextInput
        style={styles.input}
        placeholder="xxxxxxxxxxxxxxxx"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <Text style={styles.label}>Business Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Door number"
        value={doorNumber}
        onChangeText={setDoorNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark"
        value={landmark}
        onChangeText={setLandmark}
      />
      <TextInput
        style={styles.input}
        placeholder="colony/ village"
        value={colony}
        onChangeText={setColony}
      />
      <TextInput
        style={styles.input}
        placeholder="city/ mandal"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedState}
          onValueChange={setSelectedState}
          style={styles.picker}
        >
          {states.map((state) => (
            <Picker.Item key={state} label={state} value={state} />
          ))}
        </Picker>
      </View>
            <Text style={styles.sectionLabel}>Pickup Address</Text>
      <View style={styles.checkboxRow}>
        <CheckBox
          value={sameAsBusiness}
          onValueChange={setSameAsBusiness}
          tintColors={{ true: '#007bff', false: '#ccc' }}
        />
        <Text style={[styles.label, {marginLeft: 8}]}>Same as business address</Text>
      </View>
      <View style={styles.uploadRow}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => pickImage(setLogoUri)}
        >
          <Text style={styles.btnText}>Upload Logo</Text>
        </TouchableOpacity>
        {logoUri ? (
          <View style={styles.fileInfoContainer}>
            <Image source={{ uri: logoUri }} style={styles.imagePreview} />
            <View style={styles.filenameContainer}>
              <Text style={styles.filenameText} numberOfLines={1} ellipsizeMode="middle">
                {logoUri.split('/').pop()}
              </Text>
              <TouchableOpacity 
                onPress={() => setLogoUri(null)}
                style={styles.dismissButton}
              >
                <Text style={styles.dismissText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
      <View style={styles.uploadRow}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => pickImage(setBannerUri)}
        >
          <Text style={styles.btnText}>Upload Banner</Text>
        </TouchableOpacity>
        {bannerUri ? <Image source={{ uri: bannerUri }} style={styles.imagePreview} /> : null}
      </View>

      <Text style={styles.label}>Office Contact No. (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="+91xxxxxxxxxx"
        value={officeContact}
        onChangeText={setOfficeContact}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Office Website (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter website"
        value={officeWebsite}
        onChangeText={setOfficeWebsite}
        keyboardType="url"
        autoCapitalize="none"
      />

      <TouchableOpacity
  style={styles.button}
  onPress={() => router.push('/company/AuthorizedPersonDetials')} // Replace with your actual route
>
  <Text style={styles.buttonText}>Proceed to Next</Text>
</TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 23,
    marginTop: 50,
    shadowColor: '#C2DAFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 19.9,
    elevation: 5,
    marginBottom: 100,
  },
  heading:{
    fontWeight: '700',
    fontSize: 12,
    marginVertical: 12,
    fontFamily: 'Roboto',
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 10,
    boxShadow: '#C2DAFF',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
   btn: {
    backgroundColor: '#000000',
    color: '#fff',
    height: 44,
    paddingHorizontal: 20,
    paddingTop: 12,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center', // Centers the button horizontally
    flex: 1, // Takes available space but respects other elements
    maxWidth: '100%', // Prevents overflow
  },
  
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  imagePreview: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sectionLabel: {
    fontWeight: '500',
    fontSize: 12,
    fontFamily: 'Roboto',
  },
    fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#B5B5B5',
    padding: 8,
    marginLeft: 10,
    maxWidth: '50%',
  },
  filenameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    flex: 1,
  },
  filenameText: {
    fontSize: 12,
    color: '#717171',
    fontFamily: 'Roboto',
    fontWeight: '700',
    flex: 1,
  },
  dismissButton: {
    height: 11.67,
    width: 11.67,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  dismissText: {
    fontSize: 10,
    color: '#949494',
    textAlign: 'center',
    lineHeight: 11.67,
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



export default CompanyDetails

