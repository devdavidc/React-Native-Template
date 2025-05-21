import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.102:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Login correcto', `Bienvenido, ${data.user.username}`);
        // Aquí puedes navegar a otra pantalla si usas react-navigation
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View className='flex-1 items-center justify-center bg-white p-10'>
      <Text className='text-3xl font-bold mb-8'>Iniciar sesión</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-lg"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 rounded-lg p-3 w-full mb-6 text-lg"
        secureTextEntry
      />

      <TouchableOpacity
        className='bg-emerald-500 p-4 rounded-lg w-full mb-4'
        onPress={handleLogin}
      >
        <Text className="text-white text-2xl font-bold text-center">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
