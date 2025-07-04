import React, { useState } from "react";
import { getToken } from "../utils/storage";
import api from "../utils/api";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function StoreDetails() {
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState<{
    pincode: string;
    door: string;
    landmark: string;
    village: string;
    city: string;
    district: string;
    state: string;
  }>({
    pincode: "",
    door: "",
    landmark: "",
    village: "",
    city: "",
    district: "",
    state: "",
  });
  const [sameAsBusiness, setSameAsBusiness] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const router = useRouter();
  const pickImage = async (setImage: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getFileName = (uri: string | null): string | undefined => {
    return uri?.split("/").pop();
  };

  const handleSubmit = async () => {
    try {
      const token = await getToken();
      if (!token) {
        alert("Authentication token missing.");
        return;
      }

      const formData = new FormData();
      formData.append("businessName", businessName);
      formData.append("pincode", address.pincode);
      formData.append("doorNumber", address.door);
      formData.append("landmark", address.landmark);
      formData.append("colony", address.village);
      formData.append("city", address.city);
      formData.append("district", address.district);
      formData.append("state", address.state);
      formData.append("pickupAddressSame", sameAsBusiness.toString());

      if (logo) {
        formData.append("logo", {
          uri: logo,
          name: getFileName(logo),
          type: "image/jpeg",
        } as any);
      }

      if (banner) {
        formData.append("banner", {
          uri: banner,
          name: getFileName(banner),
          type: "image/jpeg",
        } as any);
      }

      if (selfie) {
        formData.append("selfiePhoto", {
          uri: selfie,
          name: getFileName(selfie),
          type: "image/jpeg",
        } as any);
      }

      const response = await api.post("/api/shop", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Shop details submitted successfully");
      console.log("Response:", response.data);

      // Optional: Navigate to next step
      router.push("/Business_details/pan-details");
    } catch (error: any) {
      console.error("❌ Error submitting shop details:", error);
      alert("Failed to submit shop details.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.stepText}>Step-1</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Shop/Store Details</Text>

        {/* Business Name */}
        <Text style={styles.subheading}>Business Name</Text>
        <TextInput
          style={styles.input}
          placeholder="ex : sai@gmail.com"
          value={businessName}
          onChangeText={setBusinessName}
        />

        {/* Business Address */}
        <Text style={styles.subheading}>Business address</Text>
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={address.pincode}
          onChangeText={(text: string) =>
            setAddress({ ...address, pincode: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Door number"
          value={address.door}
          onChangeText={(text: string) =>
            setAddress({ ...address, door: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Landmark"
          value={address.landmark}
          onChangeText={(text: string) =>
            setAddress({ ...address, landmark: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="colony / village"
          value={address.village}
          onChangeText={(text: string) =>
            setAddress({ ...address, village: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="City / mandal"
          value={address.city}
          onChangeText={(text: string) =>
            setAddress({ ...address, city: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="District"
          value={address.district}
          onChangeText={(text: string) =>
            setAddress({ ...address, district: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Select State"
          value={address.state}
          onChangeText={(text: string) =>
            setAddress({ ...address, state: text })
          }
        />

        {/* Pickup Address */}
        <Text style={styles.subheading}>Pickup address</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox value={sameAsBusiness} onValueChange={setSameAsBusiness} />
          <Text style={styles.checkboxLabel}>Same as business address</Text>
        </View>

        {/* Upload Logo */}
        <Text style={styles.subheading}>Upload Logo</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pickImage(setLogo)}
        >
          <Text style={styles.buttonText}>Upload Logo</Text>
        </TouchableOpacity>
        {logo && (
          <View style={styles.fileTag}>
            <Text style={styles.fileName}>{getFileName(logo)}</Text>
            <TouchableOpacity onPress={() => setLogo(null)}>
              <Ionicons name="close" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        )}

        {/* Upload Banner */}
        <Text style={styles.subheading}>Upload Banner</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pickImage(setBanner)}
        >
          <Text style={styles.buttonText}>Upload Banner</Text>
        </TouchableOpacity>
        {banner && (
          <View style={styles.fileTag}>
            <Text style={styles.fileName}>{getFileName(banner)}</Text>
            <TouchableOpacity onPress={() => setBanner(null)}>
              <Ionicons name="close" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        )}

        {/* Upload Selfie */}
        <Text style={styles.subheading}>Upload selfie photo</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pickImage(setSelfie)}
        >
          <Text style={styles.buttonText}>Upload selfie photo</Text>
        </TouchableOpacity>
        {selfie && (
          <View style={styles.fileTag}>
            <Text style={styles.fileName}>{getFileName(selfie)}</Text>
            <TouchableOpacity onPress={() => setSelfie(null)}>
              <Ionicons name="close" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        )}

        {/* Submit */}
        {/* <TouchableOpacity 
          style={[styles.submitBtn, { backgroundColor: '#2E5CAE' }]}
        >
          <Text style={styles.submitText}>Proceed to next</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Proceed to next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  stepText: {
    fontSize: 18,
    fontWeight: "500",
  },
  form: {
    backgroundColor: "#f8f9ff",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  subheading: {
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    marginTop: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  fileTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  fileName: {
    marginRight: 8,
    color: "#333",
  },
  submitBtn: {
    marginTop: 24,
    backgroundColor: "#b491a6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});
