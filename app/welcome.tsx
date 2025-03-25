import React, { useState } from 'react';
import {
  View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal, Alert, ToastAndroid
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { router } from 'expo-router';

const WelcomeScreen = ({ navigation }: any) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Register State
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  
  // Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Fungsi untuk Register
  const handleRegister = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, fullname, password })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage({
            message: "Registrasi Berhasil!",
            type: "success",
        });
        setFullname('');
        setUsername('');
        setPassword('');
        setShowRegisterModal(false);
      } else {
        showMessage({
            message: "Registrasi Gagal!",
            type: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Gagal terhubung ke server.",
        type: "danger",
      })
    }
  };

  // Fungsi untuk Login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage({
            message: "Login Berhasil!",
            type: "success",
        });
        router.push({
            pathname: "/homepage",
            params: {accessToken: data.access_token }
        });
        setShowLoginModal(false);
      } else {
        showMessage({
            message: "Login Gagal!",
            type: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Gagal terhubung ke server.",
        type: "danger",
      })
    }
  };

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/livin_mandiri_logo.png')} style={styles.logo} />
      </View>

      {/* BUTTON CONTAINER */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowLoginModal(true)}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShowRegisterModal(true)}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL REGISTER */}
      <Modal visible={showRegisterModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register</Text>
            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Nama Lengkap" value={fullname} onChangeText={setFullname} />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowRegisterModal(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL LOGIN */}
      <Modal visible={showLoginModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login</Text>
            <TextInput style={styles.input} placeholder="Username" value={loginUsername} onChangeText={setLoginUsername} />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                secureTextEntry={!showLoginPassword}
                value={loginPassword}
                onChangeText={setLoginPassword}
              />
              <TouchableOpacity onPress={() => setShowLoginPassword(!showLoginPassword)}>
                <Ionicons name={showLoginPassword ? "eye" : "eye-off"} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowLoginModal(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// STYLE
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E90FF', justifyContent: 'center' },
  logoContainer: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  logo: { width: Dimensions.get('window').width * 0.5, resizeMode: 'contain' },
  buttonContainer: {
    backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30,
    paddingVertical: 20, alignItems: 'center',
  },
  button: { width: '80%', padding: 15, backgroundColor: '#1E90FF', borderRadius: 25, alignItems: 'center', margin: 15 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold'},
  
  // MODAL
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, marginBottom: 10 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 5, width: '100%', paddingRight: 10 },
  inputPassword: { flex: 1, padding: 10 },
  closeButton: { marginTop: 10 },
  closeButtonText: { color: 'red', fontWeight: 'bold' }
});

export default WelcomeScreen;
