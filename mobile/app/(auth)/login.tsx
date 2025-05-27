import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Función para manejar login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.100:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white p-10"
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      
      <View className="w-full mb-8">

        <Text className="text-lg font-semibold mb-2">Email</Text>
        <TextInput
          placeholder="ejemplo@email.com"
          value={email}
          onChangeText={setEmail}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-lg"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View className="w-full mb-8">
        <Text className="text-lg font-semibold mb-2">Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-lg p-3 w-full mb-6 text-lg"
          secureTextEntry
        />
      </View>
      <Text className="text-sm text-blue-500 mb-4"
        onPress={() => router.replace('/(auth)/register')}
      >
        ¿No tienes una cuenta? ¡Registrate!
      </Text>
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg w-full"
        onPress={handleLogin}
      >
        <Text className="text-light-100 text-center text-lg font-bold">Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
