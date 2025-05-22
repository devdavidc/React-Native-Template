import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function Home() {

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      router.replace('/(tabs)/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  return (
   <ScrollView
         className="flex-1 bg-white p-10"
         contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
         showsVerticalScrollIndicator={false}>
      <CustomHeader />
      <Text className='text-3xl font-bold mb-8'>HOME</Text>
      <TouchableOpacity
        className='bg-primary p-4 rounded-lg w-full '
        onPress={handleLogout}
      >
        <Text className='text-light-100 text-center text-lg font-bold'>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}