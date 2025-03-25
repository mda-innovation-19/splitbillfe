import { router, useLocalSearchParams } from "expo-router";
import { Box, VStack, HStack, Text, Button, Image, Divider } from "native-base";
import { Router } from "expo-router";
import React from "react";

export default function ExampleBill() {
  const { userData } = useLocalSearchParams();
  const user = typeof userData === "string" ? JSON.parse(userData) : null;

  return (
    <Box safeArea p={4} bg="white" flex={1}>
      {/* Header */}
      <HStack alignItems="center" space={3} mb={4}>
        <Button variant="ghost" onPress={() => router.back() }>⬅</Button>
        <Text fontSize="lg" fontWeight="bold">Masukkan Detail Split Bill</Text>
      </HStack>

      {/* Nama Split Bill */}
      <Text fontSize="sm" color="blue.600" mb={1}>Nama Split Bill</Text>
      <Box borderWidth={1} borderColor="gray.300" p={2} borderRadius={5}>
        <Text>Warung Pasta</Text>
      </Box>

      {/* Struk berhasil di-scan */}
      <Text fontSize="sm" color="blue.600" mt={4} mb={1}>Struk berhasil di-scan</Text>
      <Text fontSize="xs" color="gray.500">Klik gambar di bawah buat lihat foto struk lebih jelas</Text>
      <Image source={require("../assets/images/contoh struk 1.png")} alt="Struk" size={20} mt={2} borderRadius={5} />

      <Divider my={4} />

      {/* List Items */}
      <Text fontSize="md" fontWeight="bold">Item</Text>
      <VStack space={2} mt={2}>
        {["Cheezy Freezy", "Red Bull", "Lemon Tea", "Cappuccino Frozen"].map((item, index) => (
          <HStack key={index} justifyContent="space-between">
            <Text>{item} x1</Text>
            <Text bold>Rp. {index * 5000 + 25000}</Text>
          </HStack>
        ))}
      </VStack>

      <Divider my={4} />

      {/* Summary */}
      <VStack space={2}>
        <HStack justifyContent="space-between">
          <Text>Subtotal</Text>
          <Text bold>Rp. 80.000</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Servis</Text>
          <Text bold>Rp. 4.000</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Diskon</Text>
          <Text bold>Rp. 0</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Pajak</Text>
          <Text bold>Rp. 8.400</Text>
        </HStack>
      </VStack>

      <Divider my={4} />

      {/* Total */}
      <HStack justifyContent="space-between">
        <Text fontSize="lg" fontWeight="bold">Jumlah Total</Text>
        <Text fontSize="lg" fontWeight="bold">Rp. 92.400</Text>
      </HStack>

      {/* Button */}
      <Button mt={4} bg="blue.500" py={3} _text={{ fontSize: "md", fontWeight: "bold" }}>
        Konfirmasi
      </Button>
    </Box>
  );
}
