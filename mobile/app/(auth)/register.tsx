import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.100:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Registro exitoso', 'Bienvenido ' + data.user.username);
        router.replace('/(auth)/login');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ScrollView
          className="flex-1 bg-white p-10"
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}>
      <Text className="text-4xl font-bold mb-10">Registro</Text>

      <View className="w-full mb-5">
        <Text className="text-lg font-semibold mb-2">Nombre de usuario</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          className="border border-gray-300 p-4 rounded-lg"
        />
      </View>

      <View className="w-full mb-5">
        <Text className="text-lg font-semibold mb-2">Email</Text>
        <TextInput
          placeholder="ejemplo@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 p-4 rounded-lg"
        />
      </View>

      <View className="w-full mb-8">
        <Text className="text-lg font-semibold mb-2">Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 p-4 rounded-lg"
        />
      </View>
      <Text className="text-sm text-blue-500 mb-4"
        onPress={() => router.replace('/(auth)/login')}
      >
        ¿Ya tienes una cuenta? Inicia sesión
      </Text>
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg w-full"
        onPress={handleRegister}
      >
        <Text className="text-light-100 text-center text-lg font-bold">Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
