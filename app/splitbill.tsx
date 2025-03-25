import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { VStack, HStack, Divider } from "native-base";

export default function SplitBillScreen() {
  const { userData } = useLocalSearchParams();
  const user = typeof userData === "string" ? JSON.parse(userData) : null;

  const [billHistory, setBillHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      fetch(`https://splitbillbe.fly.dev/bill/get_bill_by_user_id/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setBillHistory(data);
        })
        .catch((error) => console.error("Error fetching bills:", error))
        .finally(() => setLoading(false));
    }
  }, [userData]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <VStack bg="blue.500" py={4} px={4} borderBottomRadius={20}>
        <HStack alignItems="center">
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: "white", fontSize: 16 }}>Kembali</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginLeft: "auto", marginRight: "auto" }}>
            Split Bill
          </Text>
        </HStack>
      </VStack>

      {/* Bikin Baru */}
      <VStack bg="white" mx={4} mt={4} p={4} borderRadius={10} shadow={2}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Bikin Baru</Text>
        <Divider my={2} />
        <HStack justifyContent="space-between">
        <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => router.push({ pathname: "/examplescan", params: { userData } })}
            >
            <Image source={require("../assets/images/Camera.png")} style={{ width: 50, height: 50 }} />
            <Text style={{ fontSize: 14, marginTop: 8 }}>Scan Otomatis</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>Foto struk atau ambil dari galeri</Text>
            </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image source={require("../assets/images/Purchase Order.png")} style={{ width: 50, height: 50 }} />
            <Text style={{ fontSize: 14, marginTop: 8 }}>Atur Jumlah</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>Lebih cepat untuk bagi rata</Text>
          </TouchableOpacity>
        </HStack>
      </VStack>

      {/* Riwayat Split Bill */}
      <VStack bg="white" mx={4} mt={4} p={4} borderRadius={10} shadow={2}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Riwayat Split Bill</Text>
        <Divider my={2} />

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : billHistory.length === 0 ? (
          <Text style={{ textAlign: "center", fontSize: 14, color: "gray", marginTop: 10 }}>
            Tidak ada riwayat split bill. Ayo buat split bill pertama kamu!
          </Text>
        ) : (
          billHistory.map((bill, index) => (
            <HStack key={index} justifyContent="space-between" alignItems="center" py={3}>
                <HStack alignItems="center">
                <Image source={require("../assets/images/Split.png")} style={{ width: 40, height: 40 }} />
                <VStack ml={3}>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>{bill.title}</Text>
                </VStack>
                </HStack>
                <VStack alignItems="flex-end">
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Rp. {bill.total_amount.toLocaleString("id-ID")}
                </Text>
                <Text
                    style={{
                    fontSize: 12,
                    color: bill.total_paid === bill.total_participant ? "green" : "red",
                    }}
                >
                    {bill.total_paid} dari {bill.total_participant} sudah bayar
                </Text>
            </VStack>
        </HStack>
          ))
        )}
      </VStack>
    </ScrollView>
  );
}
