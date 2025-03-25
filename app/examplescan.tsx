import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { VStack, HStack } from "native-base";
import React from "react";

export default function ExampleScan() {
  const { userData } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "gray", position: "absolute", top: 40, left: 20, fontSize: 16 }}>Ambil foto galeri</Text>
      
      {/* Gambar Dummy Struk */}
      <Image source={require("../assets/images/contoh struk 1.png")} style={{ width: "90%", height: "60%" }} />

      {/* Tombol Aksi */}
      <HStack position="absolute" bottom={20} width="90%" justifyContent="space-between">
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 10,
            flex: 1,
            marginRight: 10,
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>Batal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 10,
            flex: 1,
            marginLeft: 10,
          }}
          onPress={() => router.push({ pathname: "/examplebill", params: { userData } })}
        >
          <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>Konfirmasi</Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
}
