// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {/* <Text>Edit app/index.tsx to edit this screen. neuxa te</Text> */}
//       <Text> neuxa team </Text>
//     </View>
//   );
// }



// import { Text, View, TouchableOpacity } from "react-native";
// import { Link } from "expo-router";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 20,
//       }}
//     >
//       <Text style={{ fontSize: 24, fontWeight: "bold" }}>neuxa team</Text>
//       {/* <Link href="/seller_login/register" asChild> */}
//       <Link href="/seller_login/register" asChild>
//         <TouchableOpacity
//           style={{
//             backgroundColor: "#007bff",
//             padding: 15,
//             borderRadius: 5,
//           }}
//         >
//           <Text style={{ color: "white", fontWeight: "bold" }}>
//             Go to Seller Registration
//           </Text>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// }


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
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Go to Seller Registration
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/company/BankVerification" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#28a745",
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Go to Bank Verification
          </Text>
        </TouchableOpacity>
        

      </Link>
      <Link href='/Business_details/aadhaarVerication' asChild>
      <TouchableOpacity style = {{
          backgroundColor:'powderblue',
          padding:25,
          borderRadius:5.
        }}>
          <Text>Go to aadhaar Details</Text>
        </TouchableOpacity>
      </Link>


        <Link href="/company/fssaii" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#28a745",
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Fssai Details
          </Text>
        </TouchableOpacity>
        

      </Link>


    </View>
  );
}


