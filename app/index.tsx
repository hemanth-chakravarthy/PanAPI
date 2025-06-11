import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>neuxa team</Text>
      
      <Link href="/seller_login/register" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Go to Seller Registration
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/Business_details/BusinessDetails" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#6c5ce7",
            padding: 15,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Go to Business Details
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/company/BankVerification" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#28a745",
            padding: 15,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Go to Bank Verification
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href='/Business_details/aadhaarVerication' asChild>
        <TouchableOpacity 
          style={{
            backgroundColor: 'powderblue',
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Go to Aadhaar Details
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}


