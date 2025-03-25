import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current; // Default 1 (terlihat)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Animasi fading out sebelum berpindah ke halaman berikutnya
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // Fading selama 1 detik sebelum pindah
        useNativeDriver: true,
      }).start(() => {
        router.replace('/welcome'); // Pindah ke halaman Welcome
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, router]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Logo di tengah */}
      <Image source={require('../assets/images/livin_mandiri_logo.png')} style={styles.logo} />

      {/* Footer text di bagian bawah */}
      <Text style={styles.footerText}>
        PT Bank Mandiri (Persero) Tbk. berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK) dan Bank Indonesia (BI), serta merupakan peserta penjaminan Lembaga Penjamin Simpanan (LPS).
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D3B70', // Warna solid
    padding: 20,
  },
  logo: {
    width: Dimensions.get('window').width * 0.6,
    resizeMode: 'contain',
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default SplashScreen;
