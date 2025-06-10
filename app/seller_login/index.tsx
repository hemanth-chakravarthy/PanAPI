import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function SellerLogin() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Seller Login</Text>
      <Link href="/seller_login/register" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Go to Registration
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}