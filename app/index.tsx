
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

{/* 
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

    
      <Link href='/Business_details/vendor-gst' asChild>
      <TouchableOpacity style = {{
          backgroundColor:'powderblue',
          padding:10,
          borderRadius:5.
        }}>
          <Text>vendor gst Details</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/Business_details/pan-details' asChild>
      <TouchableOpacity style = {{
          backgroundColor:'powderblue',
          padding:10,
          borderRadius:5.
        }}>
          <Text>pan Details</Text>
        </TouchableOpacity>
      </Link>

     

      
      <Link href="/Business_details/fssai" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
           business fssai
          </Text>
        </TouchableOpacity>
      </Link>
      
      
      

      <Link href="/Business_details/company-gst" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
           business gst
          </Text>
        </TouchableOpacity>
      </Link>

 <Link href="/Business_details/terms" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
           business terms
          </Text>
        </TouchableOpacity>
      </Link> */}



{/* company steps */}


{/* 
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
      
      <Link href="/company/CompanyDetails" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#28a745",
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Company Details
          </Text>
        </TouchableOpacity>
        

      </Link>
      <Link href="/company/Step2" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#28a745",
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Step2
          </Text>
        </TouchableOpacity>
        
      </Link> */}
      
    </View>
  );
}




