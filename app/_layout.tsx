import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import SplashScreen from './splashscreen';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { NativeBaseProvider } from 'native-base';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Tampilkan splash selama 3 detik

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Saat pertama kali refresh, tetap tampilkan SplashScreen dulu
  }

  return (
    <NativeBaseProvider>
      <>
        <Stack>
          <Stack.Screen name="splashscreen" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="homepage" options={{ headerShown: false }} />
          <Stack.Screen name="splitbill" options={{ headerShown: false }} />
          <Stack.Screen name="examplescan" options={{ headerShown: false }} />
          <Stack.Screen name="examplebill" options={{ headerShown: false }} />
        </Stack>

        <FlashMessage position="top" />
      </>
    </NativeBaseProvider>
    
  );
}
