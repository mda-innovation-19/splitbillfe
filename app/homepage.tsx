import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Box, VStack, HStack, Icon, Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const Homepage = () => {
  const { accessToken } = useLocalSearchParams();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (accessToken) {
      try {
        const payloadBase64 = (accessToken as string).split(".")[1]; // Ambil payload
        const decodedPayload = JSON.parse(atob(payloadBase64));

        // Simpan data yang diperlukan ke userData
        const user_data = {
          id: decodedPayload.id,
          fullname: decodedPayload.fullname,
          username: decodedPayload.username,
          account_number: decodedPayload.account_number,
          balance: decodedPayload.balance,
        };

        setUserData(user_data);
        console.log("User Data:", user_data);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [accessToken]);

  return (
    <VStack style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <ScrollView style={{ flex: 1}}>
        {/* Header */}
        <Box backgroundColor="#1E90FF" padding={4}>
            <HStack justifyContent="space-between" alignItems="center">
            <Image source={require("../assets/images/livin_mandiri_logo.png")} style={{ width: 150, height: 100 }} />
            <HStack space={3}>
                <TouchableOpacity>
                <Icon as={MaterialIcons} name="message" size={6} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                <Icon as={MaterialIcons} name="logout" size={6} color="white" />
                </TouchableOpacity>
            </HStack>
            </HStack>
            <VStack mt={4} backgroundColor="white" borderRadius={10} padding={4}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Halo, {userData?.fullname}</Text>
            <Text style={{ color: "gray" }}>Nasabah Biasa</Text>
            <HStack justifyContent="space-between" alignItems="center" mt={2}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rp {userData?.balance?.toLocaleString()}</Text>
                <Image source={require("../assets/images/Kartu.png")} style={{ width: 100, height: 70 }} />
            </HStack>
            </VStack>
        </Box>

        {/* Fitur Utama */}
        <VStack mt={4} px={4}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Fitur Utama Anda</Text>
            <HStack justifyContent="space-between" mt={3}>
                <VStack alignItems="center" marginLeft={5}>
                    <Image source={require("../assets/images/transfer-rupiah-button.png")} style={{ width: 60, height: 60 }} />
                    <Text style={{ fontSize: 14, marginTop: 15, textAlign: "center", width: 60 }}>Transfer Uang</Text>
                </VStack>

                <TouchableOpacity
                    onPress={() => {
                        router.push({
                        pathname: "/splitbill",
                        params: { userData: JSON.stringify(userData) }, // Kirim sebagai string JSON
                        });
                    }}
                    >
                    <VStack alignItems="center">
                        <Image
                        source={require("../assets/images/Group 107.png")}
                        style={{ width: 60, height: 60 }}
                        />
                        <Text style={{ fontSize: 14, marginTop: 15, textAlign: "center", width: 60 }}>
                        Split Bill
                        </Text>
                    </VStack>
                </TouchableOpacity>

                <VStack alignItems="center">
                    <Image source={require("../assets/images/virtual-account-button.png")} style={{ width: 60, height: 60 }} />
                    <Text style={{ fontSize: 14, marginTop: 15, textAlign: "center", width: 60 }}>Bayar VA</Text>
                </VStack>

                <VStack alignItems="center" marginRight={5}>
                    <Image source={require("../assets/images/topup-ewallet-button.png")} style={{ width: 60, height: 60 }} />
                    <Text style={{ fontSize: 14, marginTop: 15, textAlign: "center", width: 60 }}>Isi Saldo E-Wallet</Text>
                </VStack>
            </HStack>
        </VStack>

        </ScrollView>

        <HStack
            position="absolute"
            bottom={0}
            width="100%"
            backgroundColor="white"
            padding={3}
            justifyContent="space-between"
            alignItems="center"
            borderTopWidth={1}
            borderColor="gray.200"
        >
            {/* Home */}
            <VStack alignItems="center" marginLeft={5}>
                <Icon as={MaterialIcons} name="home" size={6} color="gray.500" />
                <Text style={{ fontSize: 12, color: "gray" }}>Beranda</Text>
            </VStack>

            {/* Saldo */}
            <VStack alignItems="center">
                <Icon as={MaterialIcons} name="account-balance-wallet" size={6} color="gray.500" />
                <Text style={{ fontSize: 12, color: "gray" }}>Saldo</Text>
            </VStack>

            {/* QRIS - Ikon besar di tengah */}
            <Center position="absolute" bottom={5} left="50%" style={{ transform: [{ translateX: -30 }] }}>
                <Image
                    source={require("../assets/images/scan-barcode-icon.png")}
                    style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "#007bff",
                    padding: 10,
                    }}
                />
                <Text style={{ fontSize: 12, fontWeight: "bold", color: "black", marginTop: 4 }}>QRIS</Text>
            </Center>

            {/* Sukha */}
            <VStack alignItems="center" marginLeft={10}>
                <Image source={require("../assets/images/sukha-icon.png")} style={{ width: 30, height: 30 }} />
                <Text style={{ fontSize: 12, color: "gray" }}>Sukha</Text>
            </VStack>

            {/* Akun */}
            <VStack alignItems="center" marginRight={5}>
                <Icon as={MaterialIcons} name="person" size={6} color="gray.500" />
                <Text style={{ fontSize: 12, color: "gray" }}>Akun</Text>
            </VStack>
        </HStack>
    </VStack>
  );


//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
//       <Box bg="#007bff" p={4}>
//         <Image source={require("../assets/images/livin_mandiri_logo.png")} style={{ width: 100, height: 30 }} />
//         {userData && (
//           <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
//             Halo, {userData.fullname}
//           </Text>
//         )}
//       </Box>
//       <Box bg="white" p={4} m={4} borderRadius={10} shadow={2}>
//         <HStack justifyContent="space-between" alignItems="center">
//           <VStack>
//             <Text style={{ fontSize: 16, fontWeight: "bold" }}>Tabungan Now IDR</Text>
//             <Text style={{ fontSize: 24, fontWeight: "bold" }}>Rp {userData?.balance?.toLocaleString()}</Text>
//           </VStack>
//           <Image source={require("../assets/images/Kartu.png")} style={{ width: 50, height: 30 }} />
//         </HStack>
//       </Box>

//       <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 16 }}>Fitur Utama Anda</Text>
//       <HStack justifyContent="space-around" m={4}>
//         <VStack alignItems="center">
//           <Image source={require("../assets/images/transfer-rupiah-button.png")} style={{ width: 50, height: 50 }} />
//           <Text>Transfer Uang</Text>
//         </VStack>
//         <VStack alignItems="center">
//           <Image source={require("../assets/images/topup-emoney-button.png")} style={{ width: 50, height: 50 }} />
//           <Text>Isi Saldo E-Money</Text>
//         </VStack>
//         <VStack alignItems="center">
//           <Image source={require("../assets/images/virtual-account-button.png")} style={{ width: 50, height: 50 }} />
//           <Text>Bayar VA</Text>
//         </VStack>
//         <VStack alignItems="center">
//           <Image source={require("../assets/images/topup-ewallet-button.png")} style={{ width: 50, height: 50 }} />
//           <Text>Isi Saldo E-Wallet</Text>
//         </VStack>
//       </HStack>
//     </ScrollView>
//   );
};

export default Homepage;